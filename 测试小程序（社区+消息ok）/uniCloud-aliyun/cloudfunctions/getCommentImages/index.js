'use strict';
const db = uniCloud.database();
const commentImagesCollection = db.collection('comment_images');

exports.main = async (event, context) => {
  console.log('getCommentImages函数收到请求:', JSON.stringify(event));
  
  // 检查评论ID是否存在
  if (!event.commentId) {
    console.log('缺少必要参数commentId');
    return {
      code: 1,
      msg: '缺少必要参数commentId'
    };
  }
  
  try {
    console.log(`查询评论图片，commentId: ${event.commentId}`);
    
    // 尝试所有可能的字段名查询评论图片
    const possibleFields = [
      { field: 'comment_id', value: event.commentId },
      { field: 'commentId', value: event.commentId }
    ];
    
    let fileIDs = [];
    
    // 记录是否已成功查询到图片
    let foundImages = false;
    
    // 遍历所有可能的字段进行查询
    for (const query of possibleFields) {
      if (foundImages) break; // 如果已找到图片，不再继续查询
      
      console.log(`尝试使用字段 ${query.field} 查询评论图片`);
      
      try {
        // 构建查询条件
        const whereCondition = {};
        whereCondition[query.field] = query.value;
        
        // 执行查询
        const result = await commentImagesCollection
          .where(whereCondition)
          .get();
          
        console.log(`使用 ${query.field} 查询结果:`, JSON.stringify(result.data));
        
        // 如果查询到结果
        if (result.data && result.data.length > 0) {
          // 提取fileID字段
          const images = result.data
            .filter(item => item.fileID)
            .map(item => item.fileID);
          
          if (images.length > 0) {
            fileIDs = images;
            foundImages = true;
            console.log(`使用 ${query.field} 查询成功，找到图片:`, fileIDs);
            break; // 找到图片后退出循环
          }
        }
      } catch (err) {
        console.error(`使用 ${query.field} 查询出错:`, err);
        // 继续尝试下一个字段
      }
    }
    
    // 返回查询结果
    if (fileIDs.length > 0) {
      return {
        code: 0,
        msg: '获取评论图片成功',
        data: fileIDs
      };
    }
    
    // 所有字段都查询失败，返回空结果
    console.log(`未找到评论 ${event.commentId} 的图片`);
    return {
      code: 0,
      msg: '评论没有图片',
      data: []
    };
  } catch (error) {
    console.error('获取评论图片出错:', error);
    return {
      code: 2,
      msg: '获取评论图片失败: ' + error.message
    };
  }
}; 