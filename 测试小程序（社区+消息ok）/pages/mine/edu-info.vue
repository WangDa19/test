<template>
  <view class="edu-container">
    <view class="form-section">
      <view class="section-title">学籍信息</view>
      <view class="form-item">
        <text class="item-label">学校名称</text>
        <input type="text" v-model="educationInfo.schoolName" placeholder="请输入学校名称" class="item-input" />
      </view>
      
      <view class="form-item">
        <text class="item-label">专业</text>
        <input type="text" v-model="educationInfo.major" placeholder="请输入专业" class="item-input" />
      </view>
      
      <view class="form-item">
        <text class="item-label">学历层次</text>
        <picker mode="selector" :range="degreeOptions" @change="bindDegreeChange">
          <view class="picker-view">
            <text>{{educationInfo.degree || '请选择'}}</text>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="item-label">学号</text>
        <input type="text" v-model="educationInfo.studentId" placeholder="请输入学号" class="item-input" />
      </view>
      
      <view class="tip-box">
        <text class="tip-text">请打开学信网查看您的学籍信息，然后填写上述表单</text>
      </view>
    </view>
    
    <view class="btn-section">
      <button class="save-btn" @tap="saveEducationInfo" :loading="isSaving">保存信息</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      educationInfo: {
        schoolName: '',
        major: '',
        degree: '',
        studentId: '',
        verified: true
      },
      degreeOptions: ['专科', '本科', '硕士研究生', '博士研究生'],
      isSaving: false
    }
  },
  onLoad() {
    // 如果已经有学籍信息，加载现有信息
    const userInfo = uni.getStorageSync('userInfo') || {};
    if (userInfo.educationInfo) {
      this.educationInfo = JSON.parse(JSON.stringify(userInfo.educationInfo));
    }
    
    // 从页面参数中获取学校名称
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    if (currentPage.options && currentPage.options.school) {
      this.educationInfo.schoolName = decodeURIComponent(currentPage.options.school);
    }
  },
  methods: {
    bindDegreeChange(e) {
      this.educationInfo.degree = this.degreeOptions[e.detail.value];
    },
    
    saveEducationInfo() {
      // 表单验证
      if (!this.educationInfo.schoolName) {
        this.showToast('请输入学校名称');
        return;
      }
      
      if (!this.educationInfo.major) {
        this.showToast('请输入专业');
        return;
      }
      
      if (!this.educationInfo.degree) {
        this.showToast('请选择学历层次');
        return;
      }
      
      if (!this.educationInfo.studentId) {
        this.showToast('请输入学号');
        return;
      }
      
      this.isSaving = true;
      
      // 获取用户信息
      const userInfo = uni.getStorageSync('userInfo');
      const userId = uni.getStorageSync('userId');
      
      if (!userInfo || !userId) {
        this.showToast('用户信息不存在，请重新登录');
        this.isSaving = false;
        return;
      }
      
      // 更新本地存储
      userInfo.educationInfo = this.educationInfo;
      uni.setStorageSync('userInfo', userInfo);
      
      // 调用云函数更新数据库
      uniCloud.callFunction({
        name: 'user',
        data: {
          action: 'updateUserInfo',
          data: {
            userId: userId,
            educationInfo: this.educationInfo
          }
        }
      }).then(res => {
        this.isSaving = false;
        
        if (res.result && res.result.code === 0) {
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          });
          
          // 返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          this.showToast('保存失败：' + (res.result.message || '未知错误'));
        }
      }).catch(err => {
        console.error('保存失败', err);
        this.isSaving = false;
        this.showToast('网络错误，请重试');
      });
    },
    
    showToast(title) {
      uni.showToast({
        title: title,
        icon: 'none'
      });
    }
  }
}
</script>

<style>
.edu-container {
  padding: 30rpx;
}

.form-section {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: #333;
}

.form-item {
  margin-bottom: 30rpx;
}

.item-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  display: block;
}

.item-input {
  height: 88rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.picker-view {
  height: 88rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tip-box {
  background: rgba(0, 122, 255, 0.1);
  padding: 20rpx;
  border-radius: 8rpx;
  margin-top: 30rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #0066cc;
  line-height: 1.5;
}

.btn-section {
  padding: 20rpx 0;
}

.save-btn {
  background: linear-gradient(to right, #1aad19, #39b54a);
  color: #fff;
  border-radius: 45rpx;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(26, 173, 25, 0.3);
}

.save-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style> 