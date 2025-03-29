'use strict';
exports.main = async (event, context) => {
  const { userId } = event;
  const db = uniCloud.database();
  
  try {
    // 获取用户接单记录
    const res = await db.collection('errand_accepts')
      .where({
        userId
      })
      .orderBy('createTime', 'desc')
      .get();
    
    // 格式化时间戳为友好时间
    const formattedData = res.data.map(item => ({
      ...item,
      timeText: formatTime(item.createTime)
    }));
      
    return {
      code: 0,
      data: formattedData
    };
  } catch (error) {
    console.error('获取接单任务列表失败:', error);
    return {
      code: 1,
      msg: '获取任务列表失败'
    };
  }
};

// 格式化时间函数
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