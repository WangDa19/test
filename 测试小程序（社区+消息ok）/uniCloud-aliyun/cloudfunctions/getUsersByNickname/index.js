'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { nicknames } = event;
  
  console.log('通过昵称查询用户ID，参数:', event);
  
  if (!nicknames || !Array.isArray(nicknames) || nicknames.length === 0) {
    return {
      code: 1,
      msg: '参数不正确'
    };
  }
  
  try {
    // 使用正则表达式进行不区分大小写的匹配
    const userResult = await db.collection('user')
      .where({
        nickname: db.command.in(nicknames.map(name => new RegExp('^' + name + '$', 'i')))
      })
      .field({
        _id: true,
        nickname: true,
        avatar: true
      })
      .get();
    
    console.log('查询结果:', userResult);
    
    return {
      code: 0,
      msg: '查询成功',
      data: userResult.data || []
    };
  } catch (error) {
    console.error('查询用户ID出错:', error);
    return {
      code: 1,
      msg: '查询失败: ' + error.message
    };
  }
}; 