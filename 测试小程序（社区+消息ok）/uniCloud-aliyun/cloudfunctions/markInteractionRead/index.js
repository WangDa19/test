'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { interactionId } = event;
  
  if (!interactionId) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  try {
    await db.collection('interactions')
      .doc(interactionId)
      .update({
        read: true
      });
    
    return {
      code: 0,
      msg: '标记已读成功'
    };
  } catch (error) {
    console.error('标记互动消息已读失败:', error);
    return {
      code: 1,
      msg: '标记已读失败'
    };
  }
}; 