'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, chatId } = event;
  
  if (!userId || !chatId) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  try {
    // 标记来自特定用户的所有未读消息为已读
    const result = await db.collection('chat_messages')
      .where({
        receiverId: userId,
        senderId: chatId,
        read: false
      })
      .update({
        read: true
      });
    
    return {
      code: 0,
      msg: '标记已读成功',
      data: {
        updated: result.updated || 0
      }
    };
  } catch (error) {
    console.error('标记已读失败:', error);
    return {
      code: 1,
      msg: '标记已读失败',
      error: error.message
    };
  }
}; 