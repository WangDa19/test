'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, type } = event;
  
  if (!userId) {
    return {
      code: 1,
      msg: '请先登录'
    };
  }
  
  try {
    const query = {
      userId: userId
    };
    
    // 如果指定了类型，添加类型筛选
    if (type) {
      query.type = type;
    }
    
    const res = await db.collection('collections')
      .where(query)
      .orderBy('createTime', 'desc')
      .get();
      
    return {
      code: 0,
      msg: '获取成功',
      data: res.data
    };
    
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    return {
      code: 1,
      msg: '获取收藏列表失败'
    };
  }
}; 