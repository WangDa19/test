<template>
  <view class="upload-component">
    <view class="image-list">
      <!-- 已上传图片展示 -->
      <view 
        v-for="(item, index) in imageList" 
        :key="index" 
        class="image-item"
      >
        <image 
          :src="item" 
          mode="aspectFill" 
          class="preview-image" 
          @tap="previewImage(index)"
        />
        <view class="delete-btn" @tap.stop="removeImage(index)">
          <text class="icon-delete">×</text>
        </view>
      </view>
      
      <!-- 上传按钮 -->
      <view 
        v-if="imageList.length < maxCount" 
        class="upload-btn" 
        @tap="chooseImage"
      >
        <text class="icon-plus">+</text>
        <text class="upload-text">{{ btnText }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 已有图片列表
    value: {
      type: Array,
      default: () => []
    },
    // 最大上传数量
    maxCount: {
      type: Number,
      default: 9
    },
    // 按钮文字
    btnText: {
      type: String,
      default: '上传图片'
    }
  },
  
  data() {
    return {
      imageList: [],
      uploadLoading: false
    }
  },
  
  watch: {
    value: {
      handler(val) {
        this.imageList = [...val];
      },
      immediate: true
    }
  },
  
  methods: {
    // 选择图片
    chooseImage() {
      if (this.uploadLoading) return;
      
      uni.chooseImage({
        count: this.maxCount - this.imageList.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.uploadImages(res.tempFilePaths);
        }
      });
    },
    
    // 上传图片
    async uploadImages(tempFilePaths) {
      if (!tempFilePaths.length) return;
      
      this.uploadLoading = true;
      uni.showLoading({ title: '上传中...' });
      
      const uploadPromises = tempFilePaths.map(filePath => this.uploadSingleImage(filePath));
      
      try {
        const results = await Promise.all(uploadPromises);
        const successResults = results.filter(item => item);
        
        if (successResults.length) {
          const newImageList = [...this.imageList, ...successResults];
          this.imageList = newImageList;
          this.$emit('input', newImageList);
          this.$emit('change', newImageList);
        }
      } catch (error) {
        console.error('上传失败:', error);
        uni.showToast({ title: '图片上传失败', icon: 'none' });
      } finally {
        this.uploadLoading = false;
        uni.hideLoading();
      }
    },
    
    // 上传单张图片
    uploadSingleImage(filePath) {
      return new Promise((resolve, reject) => {
        // 使用 uniCloud.uploadFile 直接上传文件
        uniCloud.uploadFile({
          filePath: filePath,
          cloudPath: `uploads/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`,
          success: (res) => {
            console.log('上传成功:', res);
            resolve(res.fileID); // 返回图片URL
          },
          fail: (err) => {
            console.error('上传失败:', err);
            reject(err);
          }
        });
      });
    },
    
    // 预览图片
    previewImage(index) {
      uni.previewImage({
        current: this.imageList[index],
        urls: this.imageList
      });
    },
    
    // 删除图片
    removeImage(index) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这张图片吗？',
        success: (res) => {
          if (res.confirm) {
            const newImageList = [...this.imageList];
            newImageList.splice(index, 1);
            this.imageList = newImageList;
            this.$emit('input', newImageList);
            this.$emit('change', newImageList);
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.upload-component {
  width: 100%;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
}

.image-item, .upload-btn {
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

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40rpx;
  height: 40rpx;
  border-radius: 0 0 0 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-delete {
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
}

.upload-btn {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1rpx dashed #ddd;
}

.icon-plus {
  font-size: 60rpx;
  color: #999;
  line-height: 1;
  margin-bottom: 10rpx;
}

.upload-text {
  font-size: 24rpx;
  color: #999;
}
</style> 