'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, targetUserId } = event;
  
  if (!userId || !targetUserId) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  // 避免检查自己是否关注自己
  if (userId === targetUserId) {
    return {
      code: 0,
      data: {
        isFollowing: false
      }
    };
  }
  
  try {
    console.log(`检查用户 ${userId} 是否关注了 ${targetUserId}`);
    
    // 查询关注记录
    const followRecord = await db.collection('follows')
      .where({
        userId: userId,
        followUserId: targetUserId,
        status: 1 // 只查询状态为1的有效关注记录
      })
      .limit(1)
      .get();
    
    // 返回是否存在关注记录
    const isFollowing = followRecord.data && followRecord.data.length > 0;
    console.log(`关注状态检查结果: ${isFollowing}`);
    
    return {
      code: 0,
      data: {
        isFollowing
      }
    };
  } catch (error) {
    console.error('检查关注状态失败:', error);
    return {
      code: 1,
      msg: '检查关注状态失败'
    };
  }
}; 