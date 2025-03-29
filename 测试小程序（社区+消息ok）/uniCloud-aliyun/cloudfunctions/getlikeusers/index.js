'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { postId, type = 'post', updateCount = true, timestamp } = event;
  
  console.log('获取点赞用户列表参数:', { postId, type, updateCount, timestamp });
  
  if (!postId) {
    return {
      code: 1,
      msg: '缺少必要参数'
    };
  }
  
  try {
    console.time('获取点赞用户总耗时');
    
    // 获取所有点赞记录
    const likesResult = await db.collection('likes')
      .where({
        targetId: postId,
        type,
        status: 1
      })
      .orderBy('createTime', 'desc')
      .get();
    
    const likes = likesResult.data || [];
    console.log('找到点赞记录数量:', likes.length);
    
    if (!likes || likes.length === 0) {
      console.log('未找到点赞记录');
      return {
        code: 0,
        data: [],
        likeCount: 0
      };
    }
    
    // 提取用户ID列表
    const userIds = Array.from(new Set(likes.map(like => like.userId)));
    console.log('需要查询的用户IDs:', userIds.join(', '));
    
    // 创建点赞记录ID到创建时间的映射
    const likeTimeMap = {};
    likes.forEach(like => {
      likeTimeMap[like.userId] = {
        createTime: like.createTime,
        timeText: formatTime(like.createTime)
      };
    });
    
    // 只从user表查询用户信息
    let users = [];
    try {
      console.log('开始从user表查询所有用户信息...');
      const userRes = await db.collection('user')
        .where({
          _id: db.command.in(userIds)
        })
        .field({
          _id: true,
          nickname: true,
          avatar: true
        })
        .get();
      
      users = userRes.data || [];
      console.log(`从user表获取到${users.length}个用户信息，需要的用户总数:${userIds.length}`);
      
      // 记录未找到的用户
      const foundUserIds = users.map(user => user._id);
      const missingUserIds = userIds.filter(id => !foundUserIds.includes(id));
      
      if (missingUserIds.length > 0) {
        console.log(`警告: 有${missingUserIds.length}个用户在user表中未找到: `, missingUserIds.join(', '));
      }
    } catch (error) {
      console.error('查询user表失败:', error);
    }
    
    // 创建用户信息映射
    const userMap = {};
    users.forEach(user => {
      if (user && user._id) {
        userMap[user._id] = {
          nickname: user.nickname || '用户',
          avatar: user.avatar || '/static/images/default-avatar.png'
        };
        // 记录找到的用户信息
        console.log(`用户 ${user._id} 信息: 昵称="${user.nickname}", 头像="${user.avatar?.substring(0, 30)}..."`);
      }
    });
    
    // 组合结果
    const likeUsers = [];
    for (const like of likes) {
      const userInfo = userMap[like.userId];
      const timeInfo = likeTimeMap[like.userId];
      
      likeUsers.push({
        _id: like.userId,
        nickname: userInfo?.nickname || '用户',
        avatar: userInfo?.avatar || '/static/images/default-avatar.png',
        likeTime: timeInfo.createTime || Date.now(),
        likeTimeText: timeInfo.timeText || '刚刚'
      });
    }
    
    // 添加详细调试信息
    console.log('最终组合的点赞用户列表:', likeUsers.map(u => ({
      id: u._id, 
      name: u.nickname, 
      hasAvatar: u.avatar !== '/static/images/default-avatar.png'
    })));
    
    // 同步更新帖子点赞数量
    if (updateCount) {
      try {
        await db.collection('posts').doc(postId).update({
          likeCount: likeUsers.length
        });
        console.log('更新帖子点赞数为:', likeUsers.length);
      } catch (updateError) {
        console.error('更新点赞数失败:', updateError);
      }
    }
    
    console.timeEnd('获取点赞用户总耗时');
    
    return {
      code: 0,
      data: likeUsers,
      likeCount: likeUsers.length
    };
  } catch (error) {
    console.error('获取点赞用户列表失败:', error);
    
    // 发生错误时，返回简单结果
    try {
      console.log('尝试使用备用方法获取点赞用户');
      
      const likes = await db.collection('likes')
        .where({
          targetId: postId,
          type,
          status: 1
        })
        .orderBy('createTime', 'desc')
        .get();
      
      if (!likes.data || likes.data.length === 0) {
        return {
          code: 0,
          data: [],
          likeCount: 0
        };
      }
      
      const simpleUsers = likes.data.map(like => ({
        _id: like.userId,
        nickname: '用户',
        avatar: '/static/images/default-avatar.png',
        likeTime: like.createTime || Date.now(),
        likeTimeText: formatTime(like.createTime)
      }));
      
      return {
        code: 0,
        data: simpleUsers,
        likeCount: simpleUsers.length,
        isBackupData: true
      };
    } catch (backupError) {
      console.error('备用方法也失败:', backupError);
      return {
        code: 1,
        msg: '获取点赞用户列表失败'
      };
    }
  }
};

// 格式化时间函数
function formatTime(timestamp) {
  if (!timestamp) return '未知时间';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) {
    return '刚刚';
  } else if (diff < 3600) {
    return Math.floor(diff / 60) + '分钟前';
  } else if (diff < 86400) {
    return Math.floor(diff / 3600) + '小时前';
  } else if (diff < 2592000) {
    return Math.floor(diff / 86400) + '天前';
  } else {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}