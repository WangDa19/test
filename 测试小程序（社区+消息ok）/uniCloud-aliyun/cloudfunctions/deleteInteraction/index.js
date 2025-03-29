'use strict';

const db = uniCloud.database();
const interactionsCollection = db.collection('interactions'); // 互动消息集合名称

exports.main = async (event, context) => {
  // 参数验证
  const { userId, interactionId } = event;
  
  if (!userId) {
    return {
      code: 1,
      msg: '用户ID不能为空'
    };
  }
  
  if (!interactionId) {
    return {
      code: 2,
      msg: '消息ID不能为空'
    };
  }
  
  try {
    // 查询互动消息是否存在，以及是否有权限删除
    const interaction = await interactionsCollection.doc(interactionId).get();
    
    if (!interaction.data || interaction.data.length === 0) {
      return {
        code: 3,
        msg: '消息不存在'
      };
    }
    
    const interactionData = interaction.data[0];
    
    // 检查用户是否是消息的接收者
    if (interactionData.userId !== userId) {
      return {
        code: 4,
        msg: '无权限删除此消息'
      };
    }
    
    // 执行删除操作
    await interactionsCollection.doc(interactionId).remove();
    
    return {
      code: 0,
      msg: '删除成功'
    };
  } catch (error) {
    console.error('删除互动消息失败:', error);
    return {
      code: 5,
      msg: '删除失败: ' + error.message
    };
  }
}; 