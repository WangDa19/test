<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
      <text class="title">校园互助平台</text>
      <text class="subtitle">连接校园资源，共享互助服务</text>
    </view>
    
    <view class="login-body">
      <view class="login-tip">
        <text>登录后体验更多功能</text>
      </view>
      
      <button class="btn-wechat" open-type="getUserInfo" @getuserinfo="handleWechatLogin">
        <text>微信一键登录</text>
      </button>
      
      <view class="agreement">
        <checkbox :checked="isAgree" @tap="toggleAgreement" class="agreement-checkbox"></checkbox>
        <text class="agreement-text">登录即代表您已同意</text>
        <text class="agreement-link" @tap="navigateTo('/pages/about/agreement')">《用户协议》</text>
        <text class="agreement-text">和</text>
        <text class="agreement-link" @tap="navigateTo('/pages/about/privacy')">《隐私政策》</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isAgree: true
    }
  },
  methods: {
    toggleAgreement() {
      this.isAgree = !this.isAgree;
    },
    navigateTo(url) {
      uni.navigateTo({ url });
    },
    async handleWechatLogin(e) {
      if (!this.isAgree) {
        uni.showToast({
          title: '请先同意用户协议和隐私政策',
          icon: 'none'
        });
        return;
      }
      
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
        return;
      }
      
      uni.showLoading({ title: '登录中...' });
      
      try {
        // 使用Promise方式调用uni.login
        const loginRes = await new Promise((resolve, reject) => {
          uni.login({
            provider: 'weixin',
            success: res => resolve(res),
            fail: err => reject(err)
          });
        });

        const res = await uniCloud.callFunction({
          name: 'userLogin',
          data: {
            code: loginRes.code,
            userInfo: e.detail.userInfo
          }
        });

        if (res.result.code === 0) {
          // 保存登录信息
          uni.setStorageSync('token', res.result.data.token);
          uni.setStorageSync('userId', res.result.data.userId);
          uni.setStorageSync('userInfo', res.result.data.userInfo);
          
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });

          // 触发登录成功事件
          await this.handleLoginSuccess(res.result.data.userInfo);
          
          // 返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          throw new Error(res.result.message);
        }
      } catch (err) {
        console.error('登录失败:', err);
        uni.showToast({
          title: err.message || '登录失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    async handleLoginSuccess(userInfo) {
      // 保存用户信息
      uni.setStorageSync('userId', userInfo._id);
      uni.setStorageSync('userInfo', userInfo);
      uni.setStorageSync('token', 'your-token-value'); // 如果有token
      
      // 广播登录成功事件
      uni.$emit('loginSuccess', userInfo);
      uni.$emit('loginStateChanged');
      
      // 返回或跳转
      uni.switchTab({
        url: '/pages/mine/mine'
      });
    }
  }
}
</script>

<style>
.login-container {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 30rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #999;
}

.login-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-tip {
  text-align: center;
  margin-bottom: 40rpx;
}

.login-tip text {
  font-size: 30rpx;
  color: #666;
}

.btn-wechat {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90rpx;
  background: #07c160;
  color: #fff;
  border-radius: 45rpx;
  margin-bottom: 40rpx;
  font-size: 32rpx;
}

.agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.agreement-checkbox {
  transform: scale(0.8);
}

.agreement-text {
  font-size: 26rpx;
  color: #999;
}

.agreement-link {
  font-size: 26rpx;
  color: #007aff;
}
</style> 