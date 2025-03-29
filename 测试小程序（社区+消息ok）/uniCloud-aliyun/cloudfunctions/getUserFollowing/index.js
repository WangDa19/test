'use strict';

const db = uniCloud.database();
const $ = db.command.aggregate;

exports.main = async (event, context) => {
  const { userId, page = 1, pageSize = 20 } = event;
  
  if (!userId) {
    return {
      code: 1,
      msg: '缺少用户ID'
    };
  }
  
  try {
    // 先进行一次统计，确保数据库中的计数是正确的
    await updateUserFollowStats(userId);
    
    // 获取当前用户关注的用户列表
    const followRes = await db.collection('follows')
      .aggregate()
      .match({
        userId: userId,
        status: 1 // 确保只统计状态为1的记录
      })
      .lookup({
        from: 'user',
        localField: 'followUserId',
        foreignField: '_id',
        as: 'userInfo'
      })
      .replaceRoot({
        newRoot: {
          $mergeObjects: [
            { $arrayElemAt: ['$userInfo', 0] },
            { 
              followId: '$_id',
              followTime: '$createTime' 
            }
          ]
        }
      })
      .project({
        _id: 1,
        avatar: 1,
        nickname: 1,
        signature: 1,
        followId: 1,
        followTime: 1
      })
      .sort({ followTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .end();
    
    // 统计关注总数 - 注意这里添加了status: 1条件
    const followCountRes = await db.collection('follows')
      .where({
        userId: userId,
        status: 1  // 只统计有效关注
      })
      .count();
    
    console.log('关注计数结果:', followCountRes);
    
    // 处理关注列表数据
    const list = followRes.data.map(user => {
      return {
        ...user,
        nickname: user.nickname || '用户',
        avatar: user.avatar || '/static/images/default-avatar.png',
        signature: user.signature || '这个人很懒，什么都没写',
        isFollowing: true
      };
    });
    
    return {
      code: 0,
      msg: '获取成功',
      data: {
        list,
        totalCount: followCountRes.total
      }
    };
  } catch (error) {
    console.error('获取关注列表出错:', error);
    return {
      code: 1,
      msg: '获取关注列表失败: ' + error.message
    };
  }
};

// 添加一个辅助函数来更新用户的关注和粉丝统计
async function updateUserFollowStats(userId) {
  try {
    console.log('开始更新用户关注统计, userId:', userId);
    
    // 统计关注数
    const followCountRes = await db.collection('follows')
      .where({
        userId: userId,
        status: 1
      })
      .count();
    
    // 统计粉丝数
    const fansCountRes = await db.collection('follows')
      .where({
        followUserId: userId,
        status: 1
      })
      .count();
    
    console.log('关注数统计结果:', followCountRes.total);
    console.log('粉丝数统计结果:', fansCountRes.total);
    
    // 更新用户表中的计数
    const updateResult = await db.collection('user').doc(userId).update({
      followCount: followCountRes.total,
      followingCount: followCountRes.total,
      fansCount: fansCountRes.total,
      followerCount: fansCountRes.total
    });
    
    console.log('更新用户统计数据结果:', updateResult);
    return true;
  } catch (error) {
    console.error('更新用户统计数据失败:', error);
    return false;
  }
}