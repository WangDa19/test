'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, targetId, type = 'post' } = event;
  
  if (!userId || !targetId) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  try {
    const like = await db.collection('likes')
      .where({
        userId,
        targetId,
        type,
        status: 1
      })
      .limit(1)
      .get();
    
    return {
      code: 0,
      data: {
        isLiked: !!(like.data && like.data.length > 0)
      }
    };
  } catch (error) {
    console.error('检查点赞状态失败:', error);
    return {
      code: 1,
      msg: '检查点赞状态失败'
    };
  }
}; 