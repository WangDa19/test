<template>
  <view class="publish-container">
    <!-- 顶部信息 -->
    <view class="publish-header">
      <text class="header-title">发布闲置</text>
      <text class="header-school">{{schoolName}}</text>
    </view>
    
    <!-- 发布表单 -->
    <view class="publish-form">
      <!-- 标题 -->
      <view class="form-item">
        <text class="item-label">标题</text>
        <input 
          type="text" 
          v-model="formData.title" 
          placeholder="请输入标题(最多30字)" 
          maxlength="30"
          class="item-input"
        />
      </view>
      
      <!-- 分类 -->
      <view class="form-item">
        <text class="item-label">分类</text>
        <picker mode="selector" :range="categories" @change="bindCategoryChange">
          <view class="picker-view">
            <text>{{formData.category || '请选择分类'}}</text>
            <uni-icons type="right" size="18" color="#ccc"></uni-icons>
          </view>
        </picker>
      </view>
      
      <!-- 价格 -->
      <view class="form-item">
        <text class="item-label">价格</text>
        <view class="price-input">
          <text class="price-symbol">¥</text>
          <input 
            type="digit" 
            v-model="formData.price" 
            placeholder="0.00" 
            class="item-input price"
          />
        </view>
      </view>
      
      <!-- 描述 -->
      <view class="form-item description">
        <text class="item-label">描述</text>
        <textarea 
          v-model="formData.description" 
          placeholder="描述一下物品的成色、转手原因等(最多500字)" 
          maxlength="500"
          class="item-textarea"
        />
      </view>
      
      <!-- 上传图片 -->
      <view class="form-item">
        <text class="item-label">上传图片 (最多9张)</text>
        <view class="upload-box">
          <view 
            class="image-item" 
            v-for="(item, index) in formData.images" 
            :key="index"
          >
            <image :src="item" mode="aspectFill" class="preview-image"></image>
            <view class="delete-icon" @tap="removeImage(index)">
              <uni-icons type="close" size="16" color="#fff"></uni-icons>
            </view>
          </view>
          
          <view class="upload-button" @tap="chooseImage" v-if="formData.images.length < 9">
            <uni-icons type="plusempty" size="32" color="#ccc"></uni-icons>
          </view>
        </view>
      </view>
      
      <!-- 联系方式 -->
      <view class="form-item">
        <text class="item-label">联系方式</text>
        <input 
          type="text" 
          v-model="formData.contact" 
          placeholder="微信/QQ/手机号" 
          class="item-input"
        />
      </view>
    </view>
    
    <!-- 提交按钮 -->
    <view class="button-group">
      <button class="btn-cancel" @tap="goBack">取消</button>
      <button class="btn-submit" @tap="submitForm" :disabled="isSubmitting">
        {{isSubmitting ? '提交中...' : '立即发布'}}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      schoolName: '',
      categories: ['电子产品', '图书教材', '日用百货', '服装鞋帽', '美妆护肤', '运动健身', '其他'],
      formData: {
        title: '',
        category: '',
        price: '',
        description: '',
        images: [],
        contact: ''
      },
      isSubmitting: false
    }
  },
  onLoad() {
    this.initUserInfo();
  },
  methods: {
    initUserInfo() {
      const userInfo = uni.getStorageSync('userInfo');
      
      if (userInfo && userInfo.educationInfo && userInfo.educationInfo.verified) {
        this.schoolName = userInfo.educationInfo.schoolName;
        
        // 尝试初始化联系方式
        if (userInfo.contact) {
          this.formData.contact = userInfo.contact;
        }
      } else {
        uni.showModal({
          title: '提示',
          content: '您需要先完成位置认证才能发布内容',
          showCancel: false,
          success: () => {
            uni.navigateBack();
          }
        });
      }
    },
    bindCategoryChange(e) {
      const index = e.detail.value;
      this.formData.category = this.categories[index];
    },
    async chooseImage() {
      try {
        const res = await uni.chooseImage({
          count: 9 - this.formData.images.length,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera']
        });
        
        // 图片上传前处理 - 显示上传中
        uni.showLoading({ title: '上传中...' });
        
        // 逐个上传图片
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          const filePath = res.tempFilePaths[i];
          
          // 上传到云存储
          const uploadRes = await uniCloud.uploadFile({
            filePath,
            cloudPath: `idle/${Date.now()}_${i}.jpg`
          });
          
          // 存储文件ID
          this.formData.images.push(uploadRes.fileID);
        }
        
        uni.hideLoading();
      } catch (e) {
        uni.hideLoading();
        console.error('选择或上传图片失败:', e);
        uni.showToast({
          title: '上传图片失败',
          icon: 'none'
        });
      }
    },
    removeImage(index) {
      this.formData.images.splice(index, 1);
    },
    goBack() {
      uni.navigateBack();
    },
    async submitForm() {
      // 表单验证
      if (!this.formData.title.trim()) {
        return uni.showToast({ title: '请输入标题', icon: 'none' });
      }
      
      if (!this.formData.category) {
        return uni.showToast({ title: '请选择分类', icon: 'none' });
      }
      
      if (!this.formData.price || isNaN(parseFloat(this.formData.price))) {
        return uni.showToast({ title: '请输入有效价格', icon: 'none' });
      }
      
      if (!this.formData.description.trim()) {
        return uni.showToast({ title: '请输入描述', icon: 'none' });
      }
      
      if (this.formData.images.length === 0) {
        return uni.showToast({ title: '请上传至少一张图片', icon: 'none' });
      }
      
      if (!this.formData.contact.trim()) {
        return uni.showToast({ title: '请填写联系方式', icon: 'none' });
      }
      
      try {
        this.isSubmitting = true;
        uni.showLoading({ title: '发布中...' });
        
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          throw new Error('请先登录');
        }
        
        // 调用云函数发布内容
        const res = await uniCloud.callFunction({
          name: 'publishContent',
          data: {
            userId,
            type: 'idle', // 闲置物品类型
            title: this.formData.title,
            content: this.formData.description,
            price: parseFloat(this.formData.price),
            images: this.formData.images,
            tags: [this.formData.category],
            contact: this.formData.contact
          }
        });
        
        if (res.result.code === 0) {
          uni.showToast({
            title: '发布成功',
            icon: 'success'
          });
          
          // 发布成功后返回列表页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          throw new Error(res.result.msg);
        }
      } catch (e) {
        console.error('发布失败:', e);
        uni.showToast({
          title: e.message || '发布失败，请重试',
          icon: 'none'
        });
      } finally {
        this.isSubmitting = false;
        uni.hideLoading();
      }
    }
  }
}
</script>

<style>
.publish-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.publish-header {
  background-color: #fff;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.header-school {
  font-size: 28rpx;
  color: #007AFF;
}

.publish-form {
  background-color: #fff;
  margin: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.form-item {
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.item-label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  font-weight: bold;
}

.item-input {
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
  padding: 0 20rpx;
  background-color: #f9f9f9;
  border-radius: 8rpx;
}

.picker-view {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  background-color: #f9f9f9;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333;
}

.price-input {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8rpx;
  padding: 0 20rpx;
}

.price-symbol {
  font-size: 32rpx;
  color: #333;
  margin-right: 10rpx;
}

.price {
  background-color: transparent;
  padding: 0;
}

.description {
  border-bottom: none;
}

.item-textarea {
  width: 100%;
  height: 240rpx;
  font-size: 28rpx;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 8rpx;
}

.upload-box {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10rpx;
}

.image-item, .upload-button {
  width: 200rpx;
  height: 200rpx;
  margin: 10rpx;
  border-radius: 8rpx;
  overflow: hidden;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.delete-icon {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  width: 44rpx;
  height: 44rpx;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-button {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx dashed #ddd;
}

.button-group {
  display: flex;
  padding: 30rpx 20rpx;
  gap: 20rpx;
}

.btn-cancel, .btn-submit {
  flex: 1;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  border-radius: 45rpx;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}

.btn-submit {
  background: linear-gradient(135deg, #1E90FF, #007AFF);
  color: #fff;
}

.btn-submit[disabled] {
  background: linear-gradient(135deg, #9AC5FF, #7CAEFF);
  opacity: 0.6;
}
</style> 