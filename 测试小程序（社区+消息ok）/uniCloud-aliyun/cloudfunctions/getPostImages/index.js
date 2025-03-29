'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  console.log('getPostImages函数收到请求:', JSON.stringify(event));
  
  // 检查参数
  if (!event.postId) {
    console.log('缺少必要参数postId');
    return {
      code: 1,
      msg: '缺少必要参数postId'
    };
  }
  
  try {
    console.log(`查询帖子图片，postId: ${event.postId}`);
    
    // 首先查询帖子信息
    const postRes = await db.collection('posts')
      .doc(event.postId)
      .get();
    
    if (postRes.data && postRes.data.length > 0) {
      const post = postRes.data[0];
      console.log('获取到帖子信息:', JSON.stringify(post));
      
      // 提取帖子中的图片
      if (post.images && post.images.length > 0) {
        console.log('从帖子中获取图片:', post.images);
        return {
          code: 0,
          msg: '获取成功',
          data: post.images
        };
      }
    }
    
    // 如果帖子不存在或没有图片，尝试从其他表查询
    const possibleTables = ['post_images', 'task_images'];
    
    for (const tableName of possibleTables) {
      try {
        console.log(`尝试从表 ${tableName} 查询帖子图片`);
        
        const imageRes = await db.collection(tableName)
          .where({
            postId: event.postId
          })
          .get();
        
        if (imageRes.data && imageRes.data.length > 0) {
          const fileIDs = imageRes.data
            .filter(item => item.fileID || item.url || item.fileUrl)
            .map(item => item.fileID || item.url || item.fileUrl);
          
          if (fileIDs.length > 0) {
            console.log(`从表 ${tableName} 获取到帖子图片:`, fileIDs);
            return {
              code: 0,
              msg: '获取成功',
              data: fileIDs
            };
          }
        }
      } catch (e) {
        console.error(`查询表 ${tableName} 失败:`, e);
      }
    }
    
    // 如果没有找到图片
    console.log('未找到帖子图片');
    return {
      code: 0,
      msg: '未找到帖子图片',
      data: []
    };
  } catch (error) {
    console.error('获取帖子图片出错:', error);
    return {
      code: 2,
      msg: '获取帖子图片失败: ' + error.message
    };
  }
}; 