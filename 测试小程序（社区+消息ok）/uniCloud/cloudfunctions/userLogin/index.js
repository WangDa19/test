'use strict';
exports.main = async (event, context) => {
  // ...其他代码保持不变
  
  let userId;
  if (userRes.data.length === 0) {
    // 创建新用户时显式设置字符串ID
    const newUser = {
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      openid: wxres.openid,
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      createdAt: Date.now()
    };
    
    const createRes = await db.collection('user').add(newUser);
    userId = newUser._id; // 使用自定义的字符串ID
    
    console.log('新用户创建成功:', JSON.stringify(newUser));
  } else {
    userId = userRes.data[0]._id;
    console.log('已有用户登录:', JSON.stringify(userRes.data[0]));
  }
  
  // 返回前验证用户存在
  const checkUser = await db.collection('user').doc(userId).get();
  if (!checkUser.data[0]) {
    console.error('用户数据验证失败:', userId);
    throw new Error('用户数据异常');
  }
  
  // ...返回数据保持不变
}; 