'use strict';
const db = uniCloud.database();
const commentImagesCollection = db.collection('comment_images'); // 评论图片表名称
const commentsCollection = db.collection('comments'); // 评论表名称
const notificationsCollection = db.collection('notifications');

exports.main = async (event, context) => {
  console.log('getFileByCommentId函数收到请求:', JSON.stringify(event));
  
  // 获取表结构信息的处理
  if (event.action === 'getTableInfo') {
    return await getTableInfo();
  }
  
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
    
    // 方式1: 直接从comment_images表查询
    const imagesRes = await commentImagesCollection
      .where({
        comment_id: event.commentId
      })
      .get();
    
    console.log('查询comment_images表结果:', JSON.stringify(imagesRes.data));
    
    // 如果直接查询到了结果
    if (imagesRes.data && imagesRes.data.length > 0) {
      const fileIDs = imagesRes.data
        .filter(item => item.fileID) // 确保fileID存在
        .map(item => item.fileID);   // 提取fileID字段
      
      console.log('从comment_images表获取到fileIDs:', fileIDs);
      
      return {
        code: 0,
        msg: '获取评论图片成功',
        data: {
          fileIDs: fileIDs,
          source: 'comment_images'
        }
      };
    }
    
    // 方式2: 从comments表查询
    console.log('从comment_images表未找到图片，尝试从comments表查询');
    const commentRes = await db.collection('comments')
      .doc(event.commentId)
      .get();
    
    console.log('查询comments表结果:', JSON.stringify(commentRes.data));
    
    if (commentRes.data && commentRes.data.length > 0) {
      const comment = commentRes.data[0];
      
      // 检查评论中是否包含fileID字段
      if (comment.fileID) {
        // 确保返回数组格式
        const fileIDs = Array.isArray(comment.fileID) 
          ? comment.fileID 
          : [comment.fileID];
        
        console.log('从comments表获取到fileIDs:', fileIDs);
        
        return {
          code: 0,
          msg: '获取评论图片成功',
          data: {
            fileIDs: fileIDs,
            source: 'comments'
          }
        };
      }
    }
    
    // 如果都没找到，返回空数组
    console.log('未找到评论图片');
    return {
      code: 0,
      msg: '未找到评论图片',
      data: {
        fileIDs: [],
        source: 'none'
      }
    };
  } catch (error) {
    console.error('获取评论图片出错:', error);
    return {
      code: 2,
      msg: '获取评论图片失败: ' + error.message
    };
  }
};

// 获取表结构信息
async function getTableInfo() {
  try {
    console.log('获取表结构信息');
    
    const result = {};
    
    // 获取comment_images表结构
    try {
      const commentImagesData = await commentImagesCollection.limit(2).get();
      if (commentImagesData.data && commentImagesData.data.length > 0) {
        // 获取字段列表
        const fields = new Set();
        commentImagesData.data.forEach(item => {
          Object.keys(item).forEach(key => fields.add(key));
        });
        
        result.comment_images = {
          fields: Array.from(fields),
          example: commentImagesData.data[0]
        };
      } else {
        result.comment_images = {
          fields: [],
          example: null,
          message: '表中无数据'
        };
      }
    } catch (e) {
      console.error('获取comment_images表结构失败:', e);
      result.comment_images = {
        error: e.message
      };
    }
    
    // 获取comments表结构
    try {
      const commentsData = await db.collection('comments').limit(2).get();
      if (commentsData.data && commentsData.data.length > 0) {
        // 获取字段列表
        const fields = new Set();
        commentsData.data.forEach(item => {
          Object.keys(item).forEach(key => fields.add(key));
        });
        
        result.comments = {
          fields: Array.from(fields),
          example: commentsData.data[0]
        };
      } else {
        result.comments = {
          fields: [],
          example: null,
          message: '表中无数据'
        };
      }
    } catch (e) {
      console.error('获取comments表结构失败:', e);
      result.comments = {
        error: e.message
      };
    }
    
    return {
      code: 0,
      msg: '获取表结构成功',
      data: result
    };
  } catch (error) {
    console.error('获取表结构失败:', error);
    return {
      code: 3,
      msg: '获取表结构失败: ' + error.message
    };
  }
} 