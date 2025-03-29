'use strict';

exports.main = async (event, context) => {
  const { action, data } = event;
  
  switch (action) {
    case 'updateUserInfo':
      return await updateUserInfo(data);
    case 'getUserInfo':
      return await getUserInfo(data);
    default:
      return {
        code: 404,
        message: '未找到对应的操作'
      };
  }
};

// 更新用户信息
async function updateUserInfo(data) {
  const { userId, avatar, nickname, signature, educationInfo } = data;
  
  if (!userId) {
    return {
      code: 400,
      message: '用户ID不能为空'
    };
  }
  
  try {
    const db = uniCloud.database();
    
    const updateData = {
      update_time: new Date()
    };
    
    if (avatar) updateData.avatar = avatar;
    if (nickname) updateData.nickname = nickname;
    if (signature !== undefined) updateData.signature = signature;
    if (educationInfo) updateData.educationInfo = educationInfo;
    
    await db.collection('users').doc(userId).update(updateData);
    
    return {
      code: 0,
      message: '用户信息更新成功'
    };
  } catch (error) {
    console.error('更新用户信息失败:', error);
    return {
      code: 500,
      message: '更新失败，请稍后再试'
    };
  }
}

// 获取用户信息
async function getUserInfo(data) {
  const { userId } = data;
  
  if (!userId) {
    return {
      code: 400,
      message: '用户ID不能为空'
    };
  }
  
  try {
    const db = uniCloud.database();
    
    const userInfo = await db.collection('users')
      .doc(userId)
      .field({
        openid: 0,
        session_key: 0,
        token: 0
      })
      .get();
    
    if (!userInfo.data || !userInfo.data.length) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }
    
    return {
      code: 0,
      message: '获取用户信息成功',
      data: userInfo.data[0]
    };
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return {
      code: 500,
      message: '获取失败，请稍后再试'
    };
  }
} 