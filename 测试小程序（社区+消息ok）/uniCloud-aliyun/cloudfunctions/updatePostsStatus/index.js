'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;

exports.main = async (event, context) => {
  try {
    // 获取所有帖子
    const postsRes = await db.collection('posts')
      .limit(1000)  // 限制一次处理的数量
      .get();
    
    const posts = postsRes.data;
    const results = [];
    
    // 遍历处理每个帖子
    for (const post of posts) {
      // 获取有效点赞数量
      const likesCount = await db.collection('likes')
        .where({
          targetId: post._id,
          type: 'post',
          status: 1
        })
        .count();
      
      // 更新帖子的点赞数量
      if (likesCount.total !== post.likeCount) {
        await db.collection('posts')
          .doc(post._id)
          .update({
            likeCount: likesCount.total
          });
        
        results.push({
          postId: post._id,
          oldCount: post.likeCount,
          newCount: likesCount.total
        });
      }
    }
    
    return {
      code: 0,
      msg: '更新成功',
      data: results
    };
  } catch (error) {
    console.error('更新帖子状态失败:', error);
    return {
      code: 1,
      msg: '更新失败: ' + error.message
    };
  }
}; 