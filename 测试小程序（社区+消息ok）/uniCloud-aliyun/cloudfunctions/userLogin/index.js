'use strict';

exports.main = async (event, context) => {
  const { code, userInfo } = event;
  
  if (!code) {
    return {
      code: 400,
      message: '缺少参数: code'
    };
  }
  
  try {
    // 直接调用微信接口
    const wxRes = await uniCloud.httpclient.request(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        method: 'GET',
        data: {
          appid: 'wx9dd9bc6981a47e79', // 从manifest.json获取
          secret: '1cfc8b64fd74f0fd2641423b852387b6', // 微信后台获取
          js_code: code,
          grant_type: 'authorization_code'
        },
        dataType: 'json'
      }
    );

    if (wxRes.status !== 200 || wxRes.data.errcode) {
      return {
        code: 500,
        message: '微信登录失败: ' + (wxRes.data.errmsg || '未知错误')
      };
    }

    const { openid } = wxRes.data;
    const db = uniCloud.database();
    const userColl = db.collection('user');
    
    // 先查找是否存在用户
    const existUser = await userColl.where({ openid }).get();
    
    let userId;
    let userData;
    
    if (existUser.data.length > 0) {
      // 已存在用户
      userId = existUser.data[0]._id;
      const currentUser = existUser.data[0];
      
      // 只在必要时更新用户信息
      const updateData = {
        lastLogin: Date.now()
      };
      
      // 只有当微信返回的信息不是默认值，且与现有信息不同时才更新
      if (userInfo.nickName && 
          userInfo.nickName !== '微信用户' && 
          userInfo.nickName !== currentUser.nickname) {
        updateData.nickname = userInfo.nickName;
      }
      
      // 检查是否有自定义头像
      const hasCustomAvatar = currentUser.avatar && (
        currentUser.avatarType === 'custom' || // 检查标记
        currentUser.avatar.includes('cloudstorage/') || // 检查云存储路径
        currentUser.avatar.includes('cdn.bspapp.com') || // 检查CDN地址
        currentUser.avatar.includes('mp-') // 检查uni-app特定标识
      );
      
      // 只有当用户没有自定义头像时，才使用微信头像
      if (!hasCustomAvatar && 
          userInfo.avatarUrl && 
          !userInfo.avatarUrl.includes('tmp') && 
          userInfo.avatarUrl !== currentUser.avatar) {
        updateData.avatar = userInfo.avatarUrl;
      }
      
      // 更新用户信息
      if (Object.keys(updateData).length > 1) { // 如果除了lastLogin外还有其他要更新的字段
        await userColl.doc(userId).update(updateData);
      } else {
        // 只更新登录时间
        await userColl.doc(userId).update({
          lastLogin: Date.now()
        });
      }
      
      // 重新获取完整的用户信息
      const updatedUser = await userColl.doc(userId)
        .field({
          nickname: true,
          avatar: true,
          signature: true,
          contact: true,
          followCount: true,
          fansCount: true,
          likeCount: true,
          createTime: true,
          lastLogin: true,
          avatarType: true
        })
        .get();
      
      userData = updatedUser.data[0];
    } else {
      // 新用户，创建记录
      userId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      userData = {
        _id: userId,
        openid,
        nickname: userInfo.nickName && userInfo.nickName !== '微信用户' 
          ? userInfo.nickName 
          : '新用户' + userId.substr(-6),
        avatar: '/static/images/avatar/default.png', // 始终使用默认头像，等待用户上传
        signature: '这个人很懒，什么都没写~',
        contact: '',
        lastLogin: Date.now(),
        createTime: Date.now(),
        followCount: 0,
        fansCount: 0,
        likeCount: 0
      };
      await userColl.add(userData);
    }

    // 生成token
    const token = Date.now() + '_' + Math.random().toString(36).substr(2, 6);

    // 登录成功后返回完整的用户信息
    return {
      code: 0,
      msg: 'success',
      data: {
        token: token,
        userId: userId,
        userInfo: {
          ...userData,
          openid: undefined
        }
      }
    };
  } catch (error) {
    console.error('登录错误', error);
    return {
      code: 500,
      message: '登录失败: ' + error.message
    };
  }
}; 