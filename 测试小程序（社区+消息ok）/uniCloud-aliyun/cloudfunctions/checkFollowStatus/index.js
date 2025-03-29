'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, targetUserId } = event;
  
  if (!userId || !targetUserId) {
    return {
      code: 1,
      msg: '缺少必要参数'
    };
  }
  
  try {
    // 查询用户关注状态
    const followRecord = await db.collection('follows')
      .where({
        userId: userId,
        followUserId: targetUserId,
        status: 1 // 只有状态为1才表示已关注
      })
      .limit(1)
      .get();
    
    // 是否已关注
    const isFollowing = followRecord.data.length > 0;
    
    return {
      code: 0,
      msg: '获取成功',
      data: {
        isFollowing,
        followId: isFollowing ? followRecord.data[0]._id : null
      }
    };
  } catch (error) {
    console.error('获取关注状态失败:', error);
    return {
      code: 1,
      msg: '获取关注状态失败: ' + error.message
    };
  }
}; 