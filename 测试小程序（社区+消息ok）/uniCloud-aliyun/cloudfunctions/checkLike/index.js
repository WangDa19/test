'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, targetId, type } = event;
  
  if (!userId || !targetId || !type) {
    return {
      code: 1,
      msg: '缺少必要参数'
    };
  }

  try {
    const likeRecord = await db.collection('likes')
      .where({
        userId,
        targetId,
        type,
        status: 1
      })
      .count();

    return {
      code: 0,
      msg: '查询成功',
      isLiked: likeRecord.total > 0
    };
  } catch (error) {
    console.error('查询点赞状态失败:', error);
    return {
      code: 1,
      msg: '查询失败：' + error.message
    };
  }
};