'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, targetUserId, postId, commentId, type, content, postSummary } = event;
  
  if (!userId || !targetUserId || !postId || !type) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  // 避免给自己发送消息
  if (userId === targetUserId) {
    return {
      code: 0,
      msg: '不需要给自己发送互动消息'
    };
  }
  
  try {
    // 查询用户信息
    const userResult = await db.collection('users')
      .doc(userId)
      .field({ nickname: 1, avatar: 1 })
      .get();
    
    if (!userResult.data || userResult.data.length === 0) {
      return {
        code: 1,
        msg: '发送者用户不存在'
      };
    }
    
    // 检查目标用户是否存在
    const targetUserResult = await db.collection('users')
      .doc(targetUserId)
      .field({ _id: 1 })
      .get();
    
    if (!targetUserResult.data || targetUserResult.data.length === 0) {
      return {
        code: 1,
        msg: '目标用户不存在'
      };
    }
    
    // 查询帖子信息，获取摘要
    const postResult = await db.collection('posts')
      .doc(postId)
      .field({ content: 1 })
      .get();
    
    if (!postResult.data || postResult.data.length === 0) {
      return {
        code: 1,
        msg: '帖子不存在'
      };
    }
    
    // 创建互动记录
    const interaction = {
      userId: userId,
      targetUserId: targetUserId,
      postId: postId,
      commentId: commentId || null,
      type: type, // 'reply' 或 'mention'
      content: content || '',
      postSummary: postSummary || (postResult.data[0].content ? postResult.data[0].content.substring(0, 20) + '...' : '查看详情'),
      userInfo: {
        _id: userId,
        nickname: userResult.data[0].nickname,
        avatar: userResult.data[0].avatar
      },
      read: false,
      createTime: Date.now()
    };
    
    const result = await db.collection('interactions').add(interaction);
    
    return {
      code: 0,
      msg: '互动消息已发送',
      data: { id: result.id }
    };
  } catch (error) {
    console.error('创建互动消息失败:', error);
    return {
      code: 500,
      msg: '创建互动消息失败'
    };
  }
}; 