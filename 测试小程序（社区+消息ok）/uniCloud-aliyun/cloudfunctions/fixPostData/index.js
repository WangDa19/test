'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { postId } = event;
  
  if (!postId) {
    return {
      code: 1,
      msg: '缺少帖子ID'
    };
  }
  
  try {
    // 先检查帖子是否存在
    const post = await db.collection('posts').doc(postId).get();
    
    if (!post.data || post.data.length === 0) {
      return {
        code: 1,
        msg: '帖子不存在'
      };
    }
    
    const postData = post.data[0];
    console.log('获取到帖子数据:', JSON.stringify(postData));
    
    // 如果帖子缺少userId字段，尝试查找第一条评论
    if (!postData.userId) {
      const firstComment = await db.collection('comments')
        .where({
          postId: postId,
          parentId: null
        })
        .orderBy('createTime', 'asc')
        .limit(1)
        .get();
      
      let authorId = null;
      
      if (firstComment.data && firstComment.data.length > 0) {
        authorId = firstComment.data[0].userId;
        console.log('使用第一条评论作者:', authorId);
      } else {
        // 使用当前用户ID或系统默认ID
        authorId = event.userId || '000000000000000000000000';
        console.log('使用默认ID:', authorId);
      }
      
      // 更新帖子
      await db.collection('posts').doc(postId).update({
        userId: authorId
      });
      
      return {
        code: 0,
        msg: '帖子数据已修复',
        data: {
          fixed: true,
          userId: authorId
        }
      };
    }
    
    return {
      code: 0,
      msg: '帖子数据正常',
      data: {
        fixed: false,
        userId: postData.userId
      }
    };
  } catch (error) {
    console.error('修复帖子数据失败:', error);
    return {
      code: 1,
      msg: '修复失败: ' + error.message
    };
  }
} 