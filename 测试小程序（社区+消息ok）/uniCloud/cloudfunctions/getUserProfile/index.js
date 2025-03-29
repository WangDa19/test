'use strict';
exports.main = async (event, context) => {
  // ...参数校验保持不变
  
  try {
    const res = await db.collection('user')
      .doc(userId)
      .field({
        // 包含所有需要返回的字段
        _id: true,
        avatar: true,
        nickname: true,
        signature: true,
        contact: true,
        followCount: true,
        fansCount: true,
        likeCount: true,
        educationInfo: true
      })
      .get();

    console.log('数据库查询结果:', JSON.stringify(res));
    
    if (!res.data[0]) {
      console.error('用户不存在:', userId);
      return { 
        code: 1, 
        msg: '用户不存在',
        debug: {
          collection: 'user',
          query: { _id: userId }
        }
      };
    }
    
    return { code: 0, data: res.data[0] };
  } catch (err) {
    console.error('完整错误信息:', {
      error: err,
      userId: userId,
      collection: 'user'
    });
    return { code: 1, msg: '数据查询失败' };
  }
}; 