'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const limit = event.limit || 3;
    
    const result = await db.collection('notifications')
      .limit(limit)
      .get();
    
    return {
      code: 0,
      data: result.data
    };
  } catch (error) {
    return {
      code: 1,
      msg: error.message || '获取样本数据失败'
    };
  }
}; 