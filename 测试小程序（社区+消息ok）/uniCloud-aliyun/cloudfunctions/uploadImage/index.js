'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, postId, type = 'comment', fileID } = event;
  
  if (!userId || !fileID) {
    return {
      code: -1,
      msg: '参数不完整'
    };
  }
  
  try {
    // 在评论图片集合中添加记录
    const result = await db.collection('comment_images').add({
      userId,
      postId,
      fileID,
      type,
      createTime: new Date().toISOString()
    });
    
    return {
      code: 0,
      msg: '上传成功',
      data: {
        imageId: result.id,
        fileID
      }
    };
  } catch (error) {
    console.error('上传图片失败:', error);
    return {
      code: -1,
      msg: '上传失败: ' + error.message
    };
  }
}; 