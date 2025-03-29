'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, forceUpdate = true } = event;
  
  if (!userId) {
    return {
      code: 1,
      msg: '缺少用户ID'
    };
  }
  
  try {
    // 1. 获取用户基本信息
    const userRes = await db.collection('user').doc(userId).get();
    if (userRes.data.length === 0) {
      return {
        code: 1,
        msg: '用户不存在'
      };
    }
    
    let userInfo = userRes.data[0];
    
    // 如果强制更新，重新计算关注和粉丝数量
    if (forceUpdate) {
      // 2. 计算关注数量 - 统计我关注了多少人
      const followingCountRes = await db.collection('follows')
        .where({
          userId: userId,
          status: 1
        })
        .count();
      
      // 3. 计算粉丝数量 - 统计有多少人关注我
      const fansCountRes = await db.collection('follows')
        .where({
          followUserId: userId,
          status: 1
        })
        .count();
      
      // 4. 计算获赞数量
      const likeCountRes = await db.collection('likes')
        .where({
          targetUserId: userId,
          status: 1
        })
        .count();
      
      console.log('获取到的关注计数:', followingCountRes.total);
      console.log('获取到的粉丝计数:', fansCountRes.total);
      
      // 5. 更新用户信息中的各种计数
      userInfo.followCount = followingCountRes.total || 0;
      userInfo.followingCount = followingCountRes.total || 0;
      userInfo.fansCount = fansCountRes.total || 0;
      userInfo.followerCount = fansCountRes.total || 0;
      userInfo.likeCount = likeCountRes.total || 0;
      
      // 始终更新数据库中的用户信息，确保数据一致性
      await db.collection('user').doc(userId).update({
        followCount: userInfo.followCount,
        followingCount: userInfo.followingCount,
        fansCount: userInfo.fansCount,
        followerCount: userInfo.followerCount,
        likeCount: userInfo.likeCount
      });
    }
    
    return {
      code: 0,
      msg: '获取成功',
      data: userInfo
    };
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return {
      code: 1,
      msg: '获取用户信息失败: ' + error.message
    };
  }
};