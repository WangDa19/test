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
    // 获取关注当前用户的用户列表
    const fansRes = await db.collection('follows')
      .aggregate()
      .match({
        followUserId: userId,
        status: 1
      })
      .lookup({
        from: 'user',
        localField: 'userId',
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
    
    // 查询当前用户关注的用户列表，用于确定互相关注状态
    const myFollowingRes = await db.collection('follows')
      .where({
        userId: userId,
        status: 1
      })
      .get();
    
    const myFollowingMap = {};
    myFollowingRes.data.forEach(item => {
      myFollowingMap[item.followUserId] = true;
    });
    
    // 处理粉丝列表，添加是否互相关注的标记且确保数据完整
    const list = fansRes.data.map(user => {
      return {
        ...user,
        // 确保必要字段存在
        nickname: user.nickname || '用户',
        avatar: user.avatar || '/static/images/default-avatar.png',
        signature: user.signature || '这个人很懒，什么都没写',
        isFollowing: !!myFollowingMap[user._id]
      };
    });
    
    // 统计粉丝数量
    const fansCountRes = await db.collection('follows')
      .where({
        followUserId: userId,
        status: 1
      })
      .count();
    
    // 更新用户表中的粉丝计数
    // 使用parseInt确保值是数字
    const fansCount = parseInt(fansCountRes.total) || 0;
    await db.collection('user').doc(userId).update({
      fansCount: fansCount,
      followerCount: fansCount 
    });
    
    return {
      code: 0,
      msg: '获取成功',
      data: {
        list,
        totalCount: fansCount
      }
    };
  } catch (error) {
    console.error('获取粉丝列表出错:', error);
    return {
      code: 1,
      msg: '获取粉丝列表失败: ' + error.message
    };
  }
};