'use strict';
exports.main = async (event, context) => {
  const { taskId, userId } = event;
  const db = uniCloud.database();
  
  try {
    // 获取任务信息
    const taskRes = await db.collection('errands').doc(taskId).get();
    const task = taskRes.data[0];
    
    if (!task) {
      return { code: 1, msg: '任务不存在' };
    }
    
    // 检查任务状态
    if (task.status !== 'active') {
      return { code: 1, msg: '该任务已被接取或已完成，请刷新列表' };
    }

    // 检查是否是自己发布的任务
    if (task.userId === userId) {
      return { code: 1, msg: '不能接取自己发布的任务' };
    }
    
    // 获取接单用户信息
    const userRes = await db.collection('user').doc(userId).get();
    const user = userRes.data[0];
    
    if (!user) {
      return { code: 1, msg: '用户不存在' };
    }
    
    // 获取任务发布者信息
    const publisherRes = await db.collection('user').doc(task.userId).get();
    const publisher = publisherRes.data[0];
    
    // 创建接单记录
    const acceptData = {
      taskId,
      userId,
      userInfo: {
        nickname: user.nickname,
        avatar: user.avatar
      },
      publisherId: task.userId,
      publisherInfo: {
        nickname: publisher.nickname,
        avatar: publisher.avatar
      },
      title: task.title,
      details: task.details,
      price: task.price,
      endAddress: task.endAddress,
      category: task.category,
      urgent: task.urgent,
      images: task.images || [],
      status: 'accepted',
      createTime: Date.now()
    };
    
    // 更新任务状态
    await db.collection('errands')
      .doc(taskId)
      .update({
        status: 'accepted',
        acceptUserId: userId,
        acceptUserInfo: {
          nickname: user.nickname,
          avatar: user.avatar
        },
        acceptTime: Date.now()
      });
    
    // 创建接单记录 - uniCloud 会自动创建集合
    const acceptResult = await db.collection('errand_accepts').add(acceptData);
    
    console.log('接单记录创建成功, ID:', acceptResult.id);
    
    return {
      code: 0,
      msg: '接单成功',
      data: {
        ...acceptData,
        _id: acceptResult.id
      }
    };
    
  } catch (error) {
    console.error('接单失败:', error);
    return {
      code: 1,
      msg: '接单失败: ' + error.message
    };
  }
}; 