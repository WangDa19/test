'use strict';

const db = uniCloud.database();
const commentsCollection = db.collection('comments'); // 评论表名称
const commentImagesCollection = db.collection('comment_images'); // 评论图片表名称

exports.main = async (event, context) => {
  console.log('getCommentDetail请求参数:', JSON.stringify(event));
  
  // 检查是否提供了commentId
  if (!event.commentId) {
    console.log('缺少必要参数commentId');
    return {
      code: 1,
      msg: '缺少必要参数commentId'
    };
  }
  
  // 处理action参数，提供给调试使用
  if (event.action === 'getTableInfo') {
    return getTableStructure();
  }
  
  const commentId = event.commentId;
  console.log(`尝试查询评论ID: ${commentId}`);
  
  try {
    // 并行查询评论数据和评论图片，提高效率
    console.time('并行查询操作');
    const [commentResult, imagesResult] = await Promise.all([
      // 查询评论数据 - 使用timeout设置超时
      commentsCollection.doc(commentId).get().catch(err => {
        console.error('查询评论失败:', err);
        return { data: [] };
      }),
      
      // 查询评论图片 - 使用或条件查询两种可能的字段名
      commentImagesCollection.where({
        $or: [
          { comment_id: commentId },
          { commentId: commentId }
        ]
      }).get().catch(err => {
        console.error('查询评论图片失败:', err);
        return { data: [] };
      })
    ]);
    console.timeEnd('并行查询操作');
    
    // 记录查询结果
    console.log('评论查询结果:', JSON.stringify(commentResult.data || []));
    console.log('图片查询结果:', JSON.stringify(imagesResult.data || []));
    
    // 检查评论是否存在
    if (!commentResult.data || commentResult.data.length === 0) {
      console.log(`评论不存在: ${commentId}`);
      return {
        code: 2,
        msg: '评论不存在'
      };
    }
    
    // 合并评论数据和图片数据
    const commentData = commentResult.data[0];
    const fileIDs = (imagesResult.data || [])
      .map(img => img.fileID)
      .filter(id => id);
    
    // 记录处理结果
    console.log('合并后的fileIDs:', fileIDs);
    
    const result = {
      ...commentData,
      fileID: fileIDs
    };
    
    return {
      code: 0,
      msg: '获取成功',
      data: result
    };
  } catch (error) {
    console.error('获取评论详情失败:', error);
    return {
      code: 3,
      msg: '获取评论详情失败: ' + error.message
    };
  }
};

// 获取表结构信息
async function getTableStructure() {
  try {
    console.log('获取表结构信息');
    
    // 使用Promise.all并行获取多个集合的结构
    const collections = ['comments', 'comment_images'];
    const promises = collections.map(collection => 
      db.collection(collection).limit(1).get()
    );
    
    const results = await Promise.all(promises);
    const result = {};
    
    collections.forEach((collection, index) => {
      const colRes = results[index];
      if (colRes.data && colRes.data.length > 0) {
        const sample = colRes.data[0];
        result[collection] = {
          fields: Object.keys(sample),
          sample
        };
      } else {
        result[collection] = {
          fields: [],
          sample: null
        };
      }
    });
    
    return {
      code: 0,
      msg: '获取表结构成功',
      data: result
    };
  } catch (error) {
    console.error('获取表结构失败:', error);
    return {
      code: 9,
      msg: '获取表结构失败: ' + error.message
    };
  }
}

// 从对象中提取所有可能的图片URL
async function extractImagesFromObject(obj) {
  if (!obj) return [];
  
  const imageUrls = [];
  const possibleImageFields = ['fileID', 'images', 'image', 'url', 'urls', 'imgUrl', 'imgUrls', 'files', 'fileIDs'];
  
  // 针对特定字段进行处理
  for (const field of possibleImageFields) {
    if (obj[field]) {
      if (typeof obj[field] === 'string') {
        imageUrls.push(obj[field]);
      } else if (Array.isArray(obj[field])) {
        imageUrls.push(...obj[field]);
      }
    }
  }
  
  // 遍历所有字段，查找可能是图片URL的字段
  Object.entries(obj).forEach(([key, value]) => {
    // 如果字段名包含image或file，且值是字符串或数组
    if ((key.toLowerCase().includes('image') || key.toLowerCase().includes('file') || key.toLowerCase().includes('url')) && 
        !possibleImageFields.includes(key)) {
      if (typeof value === 'string') {
        // 检查是否为URL或云文件ID格式
        if (isCloudFileId(value)) {
          imageUrls.push(value);
        }
      } else if (Array.isArray(value)) {
        // 对数组中的每个元素检查是否为URL或云文件ID
        value.forEach(item => {
          if (typeof item === 'string' && isCloudFileId(item)) {
            imageUrls.push(item);
          }
        });
      }
    }
  });
  
  return imageUrls;
}

// 判断字符串是否为云文件ID格式
function isCloudFileId(str) {
  if (typeof str !== 'string') return false;
  
  // 判断是否是云文件ID的简单判断
  return str.includes('cloud://') || str.startsWith('http') || str.startsWith('cloud-');
} 