'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId } = event;

  // 检查参数
  if (!userId) {
    return {
      code: 1,
      msg: '缺少用户ID'
    };
  }

  try {
    const res = await db.collection('user')
      .doc(userId)
      .field({
        _id: 1,
        nickname: 1,
        avatar: 1,
        signature: 1
      })
      .get();
    
    if (res.data && res.data.length > 0) {
      return {
        code: 0,
        msg: '获取成功',
        data: res.data[0]
      };
    } else {
      return {
        code: 1,
        msg: '用户不存在'
      };
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return {
      code: 1,
      msg: '获取失败: ' + error.message
    };
  }
}; 