'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  const { keyword } = event;
  
  if (!keyword) {
    return {
      code: 0,
      msg: '获取成功',
      data: []
    };
  }
  
  try {
    // 使用正则表达式进行模糊搜索
    const userRes = await db.collection('user')
      .where({
        nickname: new RegExp(keyword, 'i')
      })
      .field({
        _id: 1,
        nickname: 1,
        avatar: 1
      })
      .limit(10)
      .get();
    
    return {
      code: 0,
      msg: '搜索成功',
      data: userRes.data || []
    };
  } catch (error) {
    console.error('搜索用户失败:', error);
    return {
      code: 1,
      msg: '搜索用户失败: ' + error.message
    };
  }
}; 