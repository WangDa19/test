'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { senderId, receiverId, type, postId, content, commentContent } = event;
  
  if (!senderId || !receiverId || !type || !postId) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  try {
    // 获取发送者信息，用于显示
    const senderInfo = await db.collection('users')
      .doc(senderId)
      .field({ nickname: 1, avatar: 1 })
      .get();
      
    if (!senderInfo.data || senderInfo.data.length === 0) {
      return {
        code: 1,
        msg: '发送者信息不存在'
      };
    }
    
    // 创建互动消息记录
    const messageData = {
      senderId,
      receiverId,
      type,
      postId,
      content,
      commentContent: commentContent || '',
      senderInfo: senderInfo.data[0],
      createTime: Date.now(),
      isRead: false
    };
    
    const result = await db.collection('interactions')
      .add(messageData);
    
    console.log('互动消息创建结果:', result);
    
    // 更新用户未读互动消息计数
    await db.collection('users')
      .doc(receiverId)
      .update({
        unreadInteractionCount: db.command.inc(1)
      });
    
    return {
      code: 0,
      msg: '发送成功',
      data: {
        id: result.id
      }
    };
  } catch (error) {
    console.error('发送互动消息失败:', error);
    return {
      code: 1,
      msg: '发送失败'
    };
  }
}; 