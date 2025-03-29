'use strict';
exports.main = async (event, context) => {
  const { userId } = event;
  const db = uniCloud.database();
  const $ = db.command.aggregate;
  
  try {
    // 获取用户发布的跑腿任务
    const publishedErrandsRes = await db.collection('errands')
      .aggregate()
      .match({
        userId
      })
      .lookup({
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'publisherInfo'
      })
      .project({
        _id: 1,
        title: 1,
        details: 1,
        price: 1,
        images: 1,
        status: 1,
        createTime: 1,
        category: 1,
        userId: 1,
        taskType: $.concat(['errand_', 'published']),
        publisher: {
          $arrayElemAt: ['$publisherInfo', 0]
        }
      })
      .end();
    
    // 获取用户接单的跑腿任务
    const acceptedErrandsRes = await db.collection('errand_accepts')
      .aggregate()
      .match({
        userId
      })
      .lookup({
        from: 'user',
        localField: 'publisherId',
        foreignField: '_id',
        as: 'publisherInfo'
      })
      .project({
        _id: 1,
        taskId: 1,
        title: 1,
        details: 1,
        price: 1,
        images: 1,
        status: 1,
        createTime: 1,
        category: 1,
        publisherId: 1,
        taskType: $.concat(['errand_', 'accepted']),
        publisher: {
          $arrayElemAt: ['$publisherInfo', 0]
        }
      })
      .end();

    // 获取用户发布的技能任务
    const publishedSkillsRes = await db.collection('skills')
      .aggregate()
      .match({
        userId
      })
      .lookup({
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'publisherInfo'
      })
      .project({
        _id: 1,
        title: 1,
        details: $.ifNull(['$content', '']),
        price: 1,
        images: 1,
        status: 1,
        createTime: 1,
        category: 1,
        userId: 1,
        taskType: $.concat(['skill_', 'published']),
        publisher: {
          $arrayElemAt: ['$publisherInfo', 0]
        }
      })
      .end();

    // 获取用户接单的技能任务
    const acceptedSkillsRes = await db.collection('skill_accepts')
      .aggregate()
      .match({
        userId
      })
      .lookup({
        from: 'user',
        localField: 'publisherId',
        foreignField: '_id',
        as: 'publisherInfo'
      })
      .project({
        _id: 1,
        taskId: 1,
        title: 1,
        details: $.ifNull(['$content', '']),
        price: 1,
        images: 1,
        status: 1,
        createTime: 1,
        category: 1,
        publisherId: 1,
        taskType: $.concat(['skill_', 'accepted']),
        publisher: {
          $arrayElemAt: ['$publisherInfo', 0]
        }
      })
      .end();
    
    // 合并并处理结果
    const allTasks = [
      ...processTaskList(publishedErrandsRes.data, 'errand_published'),
      ...processTaskList(acceptedErrandsRes.data, 'errand_accepted'),
      ...processTaskList(publishedSkillsRes.data, 'skill_published'),
      ...processTaskList(acceptedSkillsRes.data, 'skill_accepted')
    ].sort((a, b) => b.createTime - a.createTime);
    
    return {
      code: 0,
      data: allTasks
    };
  } catch (error) {
    console.error('获取我的所有任务失败:', error);
    return {
      code: 1,
      msg: '获取任务列表失败: ' + error.message
    };
  }
};

// 处理任务列表
function processTaskList(tasks, type) {
  return tasks.map(task => ({
    id: task._id,
    title: task.title,
    description: task.details || '',
    images: task.images || [],
    time: formatTime(task.createTime),
    createTime: task.createTime,
    status: task.status,
    statusText: getStatusText(task.status),
    tags: [task.category || getTaskTypeText(type)],
    nickname: task.publisher?.nickname || '未知用户',
    avatar: task.publisher?.avatar || '/static/images/avatar/default.png',
    commentCount: 0,
    likeCount: 0,
    isLiked: false,
    taskType: type
  }));
}

// 格式化时间
function formatTime(timestamp) {
  if (!timestamp) return '';
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) { // 1分钟内
    return '刚刚';
  } else if (diff < 3600000) { // 1小时内
    return Math.floor(diff / 60000) + '分钟前';
  } else if (diff < 86400000) { // 1天内
    return Math.floor(diff / 3600000) + '小时前';
  } else {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
}

// 获取状态文本
function getStatusText(status) {
  const statusMap = {
    'active': '待接单',
    'accepted': '进行中',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return statusMap[status] || '未知状态';
}

// 获取任务类型文本
function getTaskTypeText(type) {
  const typeMap = {
    'errand_published': '跑腿任务',
    'errand_accepted': '跑腿任务',
    'skill_published': '技能任务',
    'skill_accepted': '技能任务'
  };
  return typeMap[type] || '其他任务';
} 