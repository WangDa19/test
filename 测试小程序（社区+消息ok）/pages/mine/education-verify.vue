<template>
  <view class="verify-container">
    <view v-if="verifyStatus === 'loading'" class="loading-box">
      <image src="/static/images/loading.gif" mode="aspectFit" class="loading-image"></image>
      <text class="loading-text">验证信息获取中...</text>
    </view>
    
    <view v-else-if="verifyStatus === 'success'" class="result-box success">
      <uni-icons type="checkbox-filled" size="60" color="#4CD964"></uni-icons>
      <text class="result-title">学籍验证成功</text>
      <view class="info-card">
        <view class="info-item">
          <text class="label">学校：</text>
          <text class="value">{{educationInfo.schoolName}}</text>
        </view>
        <view class="info-item">
          <text class="label">专业：</text>
          <text class="value">{{educationInfo.major}}</text>
        </view>
        <view class="info-item">
          <text class="label">学历：</text>
          <text class="value">{{educationInfo.degree}}</text>
        </view>
        <view class="info-item">
          <text class="label">学号：</text>
          <text class="value">{{educationInfo.studentId}}</text>
        </view>
      </view>
      <button class="btn" @tap="saveAndBack">确认信息并返回</button>
    </view>
    
    <view v-else-if="verifyStatus === 'error'" class="result-box error">
      <uni-icons type="close-filled" size="60" color="#DD524D"></uni-icons>
      <text class="result-title">验证失败</text>
      <text class="error-msg">{{errorMsg}}</text>
      <button class="btn" @tap="retryVerify">重新验证</button>
      <button class="btn btn-plain" @tap="backToProfile">返回个人中心</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      verifyStatus: 'loading', // loading, success, error
      educationInfo: {
        schoolName: '',
        major: '',
        degree: '',
        studentId: '',
        verified: false
      },
      verifyToken: '',
      errorMsg: ''
    }
  },
  onLoad(options) {
    // 从页面参数或缓存获取token
    this.verifyToken = options.token || '';
    
    if (this.verifyToken) {
      this.getEducationInfo(this.verifyToken);
    } else {
      this.verifyStatus = 'error';
      this.errorMsg = '验证信息丢失，请重新进行验证';
    }
  },
  methods: {
    getEducationInfo(token) {
      // 调用云函数获取学籍信息
      uniCloud.callFunction({
        name: 'getEducationInfo',
        data: { token: token }
      }).then(res => {
        if (res.result.code === 0 && res.result.data) {
          this.educationInfo = res.result.data;
          this.verifyStatus = 'success';
        } else {
          this.verifyStatus = 'error';
          this.errorMsg = res.result.message || '获取学籍信息失败';
        }
      }).catch(err => {
        console.error('获取学籍信息失败', err);
        this.verifyStatus = 'error';
        this.errorMsg = '网络错误，请检查网络连接后重试';
      });
    },
    
    // 模拟从学信网返回的数据解析
    parseEducationInfo(htmlContent) {
      // 这里是模拟解析HTML内容提取学校信息
      // 实际环境中，您需要根据学信网返回的实际数据格式进行解析
      // 在真实环境中，这部分工作应该在后端服务器完成
      const schoolNameMatch = htmlContent.match(/<td[^>]*>学校名称：<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      const majorMatch = htmlContent.match(/<td[^>]*>专业：<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      const degreeMatch = htmlContent.match(/<td[^>]*>学历层次：<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      const studentIdMatch = htmlContent.match(/<td[^>]*>学号：<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      
      return {
        schoolName: schoolNameMatch ? schoolNameMatch[1].trim() : '未知',
        major: majorMatch ? majorMatch[1].trim() : '未知',
        degree: degreeMatch ? degreeMatch[1].trim() : '未知',
        studentId: studentIdMatch ? studentIdMatch[1].trim() : '未知',
        verified: true
      };
    },
    
    saveAndBack() {
      // 保存验证信息到用户档案
      const userInfo = uni.getStorageSync('userInfo') || {};
      userInfo.educationInfo = this.educationInfo;
      uni.setStorageSync('userInfo', userInfo);
      
      // 调用云函数保存到数据库
      uniCloud.callFunction({
        name: 'user',
        data: {
          action: 'updateUserInfo',
          data: {
            userId: userInfo._id,
            educationInfo: this.educationInfo
          }
        }
      }).then(res => {
        if (res.result.code === 0) {
          uni.showToast({
            title: '学籍信息保存成功',
            icon: 'success'
          });
          
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          uni.showToast({
            title: '保存失败：' + res.result.message,
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error('保存学籍信息失败', err);
        uni.showToast({
          title: '保存失败，请重试',
          icon: 'none'
        });
      });
    },
    
    retryVerify() {
      // 重新跳转到学信网验证页面
      uni.redirectTo({
        url: '/pages/mine/mine'
      });
    },
    
    backToProfile() {
      uni.navigateBack();
    }
  }
}
</script>

<style>
.verify-container {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-image {
  width: 200rpx;
  height: 200rpx;
}

.loading-text {
  font-size: 30rpx;
  color: #666;
  margin-top: 30rpx;
}

.result-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.result-title {
  font-size: 36rpx;
  font-weight: bold;
  margin: 30rpx 0;
}

.info-card {
  background: #f8f8f8;
  border-radius: 16rpx;
  padding: 30rpx;
  width: 100%;
  margin-bottom: 40rpx;
}

.info-item {
  display: flex;
  margin-bottom: 20rpx;
}

.label {
  color: #666;
  width: 150rpx;
}

.value {
  flex: 1;
  color: #333;
  font-weight: bold;
}

.btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  background: #1aad19;
  color: #fff;
  font-size: 32rpx;
  margin-top: 30rpx;
}

.btn-plain {
  background: #fff;
  color: #666;
  border: 1rpx solid #ddd;
}

.error-msg {
  color: #DD524D;
  margin-bottom: 40rpx;
  text-align: center;
}
</style> 