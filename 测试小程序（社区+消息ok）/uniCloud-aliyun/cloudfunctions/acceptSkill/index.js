'use strict';
exports.main = async (event, context) => {
  const { taskId, userId } = event;
  const db = uniCloud.database();
  const _ = db.command;
  
  try {
    // 检查任务是否存在且未被接单
    const taskRes = await db.collection('skills').doc(taskId).get();
    if (!taskRes.data || !taskRes.data.length) {
      return {
        code: 1,
        msg: '任务不存在'
      };
    }
    
    const task = taskRes.data[0];
    if (task.status !== 'active') {
      return {
        code: 1,
        msg: '该任务已被接单或已完成'
      };
    }
    
    // 不能接自己的单
    if (task.userId === userId) {
      return {
        code: 1,
        msg: '不能接自己发布的任务'
      };
    }

    // 1. 更新技能任务状态
    await db.collection('skills').doc(taskId).update({
      status: 'accepted',
      acceptUserId: userId,
      acceptTime: Date.now()
    });
    
    // 2. 创建技能接单记录
    await db.collection('skill_accepts').add({
      taskId: taskId,
      userId: userId,  // 接单人ID
      publisherId: task.userId,  // 发布者ID
      title: task.title,
      content: task.content,
      price: task.price,
      images: task.images || [],
      category: task.category,
      status: 'accepted',
      createTime: Date.now()
    });
    
    return {
      code: 0,
      msg: '接单成功'
    };
  } catch (error) {
    console.error('接单失败:', error);
    return {
      code: 1,
      msg: '接单失败: ' + error.message
    };
  }
}; 