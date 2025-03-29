'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  const { userId, notificationIds } = event;
  
  if (!userId || !notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
    return {
      code: 1,
      msg: '参数不正确'
    };
  }
  
  try {
    // 标记指定ID的通知为已读
    const result = await db.collection('notifications')
      .where({
        _id: dbCmd.in(notificationIds),
        receiver: userId
      })
      .update({
        isRead: true
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