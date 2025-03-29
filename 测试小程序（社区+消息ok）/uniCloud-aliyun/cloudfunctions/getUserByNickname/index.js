'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 支持两种输入方式: 单个昵称或昵称数组
  const { nickname, nicknames } = event;
  
  let targetNicknames = [];
  
  // 兼容单个昵称或昵称数组的输入
  if (nickname) {
    targetNicknames = [nickname]; // 单个昵称
  } else if (nicknames && Array.isArray(nicknames)) {
    targetNicknames = nicknames; // 昵称数组
  } else {
    return {
      code: 1,
      msg: '参数不完整或格式错误'
    };
  }
  
  try {
    console.log('根据昵称查询用户:', targetNicknames);
    
    // 查询匹配昵称的用户
    const users = await db.collection('users')
      .where({
        nickname: db.command.in(targetNicknames)
      })
      .field({ _id: 1, nickname: 1, avatar: 1 })
      .get();
    
    console.log('查询结果:', users.data);
    
    return {
      code: 0,
      msg: '查询成功',
      data: users.data || []
    };
  } catch (error) {
    console.error('查询用户失败:', error);
    return {
      code: 1,
      msg: '查询失败'
    };
  }
}; 