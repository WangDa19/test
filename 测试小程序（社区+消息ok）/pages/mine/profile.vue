<template>
  <view class="profile-container">
    <view class="header">
      <text class="title">编辑个人资料</text>
    </view>
    
    <view class="form-section">
      <view class="avatar-section">
        <image :src="formData.avatar || '/static/images/avatar/default.png'" class="avatar" @tap="chooseAvatar"/>
        <text class="change-text">点击更换头像</text>
      </view>
      
      <view class="form-item">
        <text class="label">昵称</text>
        <input type="text" v-model="formData.nickname" placeholder="请输入昵称"/>
      </view>
      
      <view class="form-item">
        <text class="label">个性签名</text>
        <textarea v-model="formData.signature" placeholder="介绍一下自己吧" maxlength="100"/>
        <text class="word-count">{{formData.signature.length}}/100</text>
      </view>
      
      <view class="form-item">
        <text class="label">联系方式</text>
        <input type="text" v-model="formData.contact" placeholder="选填，方便联系"/>
      </view>
    </view>
    
    <button class="submit-btn" @tap="saveProfile">保存修改</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        avatar: '',
        nickname: '',
        signature: '',
        contact: ''
      },
      isLoading: false
    }
  },
  onLoad() {
    // 加载用户的现有数据
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      this.formData = {
        avatar: userInfo.avatar || '',
        nickname: userInfo.nickname || '',
        signature: userInfo.signature || '',
        contact: userInfo.contact || ''
      };
    }
  },
  methods: {
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          this.uploadAvatar(tempFilePath);
        }
      });
    },
    uploadAvatar(filePath) {
      uni.showLoading({
        title: '上传中...'
      });
      
      console.log('准备上传的文件路径:', filePath);
      
      // 使用 uniCloud.uploadFile 直接上传文件
      uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: `avatars/${Date.now()}_avatar.jpg`,
        success: (res) => {
          console.log('上传成功:', res);
          
          // 构建文件下载链接
          const downloadUrl = res.fileID;
          
          this.formData.avatar = downloadUrl;
          uni.showToast({
            title: '头像上传成功',
            icon: 'success'
          });
        },
        fail: (err) => {
          console.error('上传失败:', err);
          uni.showToast({
            title: '上传失败，请重试',
            icon: 'none'
          });
        },
        complete: () => {
          uni.hideLoading();
        }
      });
    },
    async saveProfile() {
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }

        uni.showLoading({ title: '保存中...' });

        const res = await uniCloud.callFunction({
          name: 'updateProfile',
          data: {
            userId,
            ...this.formData
          }
        });

        if (res.result.code === 0) {
          // 更新本地存储的用户信息
          const userInfo = uni.getStorageSync('userInfo') || {};
          const updatedUserInfo = {
            ...userInfo,
            ...res.result.data
          };
          uni.setStorageSync('userInfo', updatedUserInfo);

          // 触发全局更新事件
          uni.$emit('userInfoUpdated', updatedUserInfo);

          uni.showToast({ title: '保存成功', icon: 'success' });

          // 等待 Toast 显示完成后再返回
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          throw new Error(res.result.msg);
        }
      } catch (err) {
        console.error('保存失败:', err);
        uni.showToast({
          title: err.message || '保存失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    }
  }
}
</script>

<style>
.profile-container {
  padding: 30rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.header {
  margin-bottom: 40rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.form-section {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  margin-bottom: 20rpx;
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.change-text {
  font-size: 28rpx;
  color: #666;
}

.form-item {
  margin-bottom: 30rpx;
  position: relative;
}

.label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

input, textarea {
  width: 100%;
  background: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  border: 2rpx solid #eee;
}

textarea {
  height: 180rpx;
}

.word-count {
  position: absolute;
  bottom: 10rpx;
  right: 20rpx;
  font-size: 24rpx;
  color: #999;
}

.submit-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff5757);
  color: #fff;
  border-radius: 40rpx;
  padding: 24rpx 0;
  font-size: 32rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 16rpx rgba(255, 87, 87, 0.2);
}

.submit-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style> 