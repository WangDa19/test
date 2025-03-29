'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database();
  const { userId, ...profileData } = event;

  console.log('开始更新用户资料:', { userId, profileData });

  // ID格式强制验证
  if (!userId) {
    return { code: 1, msg: '用户ID不能为空' };
  }

  try {
    // 先检查用户是否存在
    const userCheck = await db.collection('user').doc(userId).get();
    if (!userCheck.data || userCheck.data.length === 0) {
      return { code: 1, msg: '用户不存在' };
    }

    // 构建更新数据
    const updateData = {
      ...profileData,
      updateTime: Date.now()
    };

    // 处理头像更新
    if (profileData.avatar) {
      // 检查是否为云存储文件
      if (profileData.avatar.includes('cloudstorage/')) {
        // 保存完整的文件信息
        updateData.avatarType = 'custom';
        updateData.fileID = profileData.avatar; // 保存原始fileID
        
        // 获取临时访问链接
        const tempFileURL = await uniCloud.getTempFileURL({
          fileList: [profileData.avatar]
        });
        if (tempFileURL.fileList?.[0]?.tempFileURL) {
          updateData.avatar = tempFileURL.fileList[0].tempFileURL;
        }
      }
    }

    // 处理教育信息更新
    if (profileData.educationInfo) {
      updateData.educationInfo = {
        ...profileData.educationInfo,
        verifyTime: Date.now()
      };
    }

    // 更新用户资料
    const res = await db.collection('user')
      .doc(userId)
      .update(updateData);

    console.log('更新结果:', res);

    if (res.updated === 1) {
      // 获取更新后的完整用户信息
      const updatedUser = await db.collection('user')
        .doc(userId)
        .field({
          nickname: true,
          avatar: true,
          fileID: true,
          avatarType: true,
          signature: true,
          contact: true,
          educationInfo: true
        })
        .get();

      return {
        code: 0,
        msg: '更新成功',
        data: updatedUser.data[0]
      };
    } else {
      return { code: 1, msg: '更新失败' };
    }
  } catch (e) {
    console.error('更新操作失败:', e);
    return { code: 1, msg: '服务暂时不可用' };
  }
};