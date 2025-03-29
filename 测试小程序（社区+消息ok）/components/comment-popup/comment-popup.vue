<template>
  <view class="comment-popup-container" v-if="show">
    <view class="mask" @tap="closePopup"></view>
    <view class="comment-popup">
      <view class="popup-header">
        <text class="popup-title">{{replyInfo && replyInfo.nickname ? `回复 @${replyInfo.nickname}` : '发表评论'}}</text>
        <text class="popup-close" @tap="closePopup">取消</text>
      </view>
      
      <!-- 评论内容区域 -->
      <textarea 
        class="comment-input"
        v-model="commentText"
        :placeholder="replyInfo ? '回复评论...' : '输入评论...'"
        :cursor-spacing="20"
        focus
        auto-height
      />
      
      <!-- 已选图片预览区域 -->
      <view class="image-preview" v-if="selectedImage">
        <image 
          :src="selectedImage" 
          mode="aspectFill" 
          class="preview-image"
        />
        <view class="remove-image" @tap="removeImage">×</view>
      </view>
      
      <!-- @用户列表 -->
      <view class="mention-list" v-if="showMentionList && followingUsers.length > 0">
        <view 
          class="mention-item" 
          v-for="user in followingUsers" 
          :key="user._id"
          @tap="selectUser(user)"
        >
          <image class="mention-avatar" :src="user && user.avatar ? user.avatar : '/static/images/avatar/default.png'" mode="aspectFill"/>
          <text class="mention-name">{{user && user.nickname ? user.nickname : '用户'}}</text>
        </view>
      </view>
      
      <!-- 底部工具栏 -->
      <view class="popup-footer">
        <view class="tool-area">
          <view class="tool-item" @tap="chooseImage">
            <image src="/static/images/icons/tupian.png" class="tool-icon"/>
          </view>
          <view class="tool-item" @tap="handleAtUser">
            <image src="/static/images/icons/aite.png" class="tool-icon"/>
          </view>
        </view>
        <button class="submit-btn" :disabled="!isValidComment" @tap="submitComment">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommentPopup',
  props: {
    detail: {
      type: Object,
      default: null
    },
    replyInfo: {
      type: Object,
      default: null
    },
    postId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      commentText: '',
      selectedImage: '',
      tempFilePath: '',
      uploadedFileID: '',
      showMentionList: false,
      followingUsers: [],
      isLoadingFollowing: false
    }
  },
  computed: {
    isValidComment() {
      return (this.commentText && this.commentText.trim()) || this.selectedImage;
    }
  },
  watch: {
    commentText(newVal, oldVal) {
      if (!newVal) return;
      
      // 检测是否输入了@符号，如果是，则显示关注用户列表
      const lastChar = newVal.slice(-1);
      if (lastChar === '@' && !this.showMentionList) {
        this.loadFollowingUsers();
        this.showMentionList = true;
      } 
      // 如果删除了@或输入了空格，隐藏用户列表
      else if ((newVal.length < oldVal.length && !newVal.endsWith('@')) || lastChar === ' ') {
        this.showMentionList = false;
      }
    }
  },
  methods: {
    // 打开弹窗
    open() {
      this.show = true;
    },
    
    // 关闭弹窗
    close() {
      this.show = false;
      this.commentText = '';
      this.selectedImage = '';
      this.tempFilePath = '';
      this.uploadedFileID = '';
      this.showMentionList = false;
    },
    
    // 关闭弹窗
    closePopup() {
      this.close();
      this.$emit('cancel');
    },
    
    // 提交评论
    async submitComment() {
      if (!this.isValidComment) {
        uni.showToast({
          title: '请输入评论内容或添加图片',
          icon: 'none'
        });
        return;
      }
      
      try {
        let fileID = '';
        
        // 如果选择了图片，先上传图片
        if (this.selectedImage && this.tempFilePath) {
          uni.showLoading({ title: '上传图片中...' });
          try {
            fileID = await this.uploadImage(this.tempFilePath);
            uni.hideLoading();
          } catch (uploadError) {
            uni.hideLoading();
            throw new Error('上传图片失败: ' + (uploadError.message || '未知错误'));
          }
        }
        
        this.$emit('submit', {
          content: this.commentText ? this.commentText.trim() : '',
          replyInfo: this.replyInfo || null,
          image: fileID || ''
        });
        
        // 重置数据
        this.close();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: error.message || '评论失败',
          icon: 'none'
        });
      }
    },
    
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          if (res && res.tempFilePaths && res.tempFilePaths.length > 0) {
            this.tempFilePath = res.tempFilePaths[0];
            this.selectedImage = res.tempFilePaths[0];
          }
        },
        fail: (err) => {
          // 只在非取消操作时记录错误
          if (err && err.errMsg && !err.errMsg.includes('cancel')) {
            console.error('选择图片失败:', err);
          }
        }
      });
    },
    
    // 移除已选图片
    removeImage() {
      this.selectedImage = '';
      this.tempFilePath = '';
    },
    
    // 上传图片到云存储
    async uploadImage(filePath) {
      if (!filePath) {
        throw new Error('图片路径不能为空');
      }
      
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          throw new Error('请先登录');
        }
        
        console.log('开始上传图片');
        
        // 通过uniCloud直接上传文件
        const uploadFileRes = await uniCloud.uploadFile({
          filePath,
          cloudPath: 'comment-images/' + Date.now() + '_' + Math.random().toString(36).slice(2) + filePath.substr(filePath.lastIndexOf('.')),
          onUploadProgress: (progressEvent) => {
            console.log('上传进度:', Math.round(progressEvent.loaded * 100 / progressEvent.total) + '%');
          }
        });
        
        console.log('文件上传结果:', uploadFileRes);
        
        if (!uploadFileRes || !uploadFileRes.fileID) {
          throw new Error('上传失败，未获取到文件ID');
        }
        
        // 记录上传到数据库
        const dbRes = await uniCloud.callFunction({
          name: 'uploadImage',
          data: {
            userId,
            postId: this.postId || '',
            fileID: uploadFileRes.fileID,
            type: 'comment'
          }
        });
        
        console.log('记录数据库结果:', dbRes);
        
        if (dbRes && dbRes.result && dbRes.result.code === 0) {
          return uploadFileRes.fileID;
        } else {
          throw new Error((dbRes && dbRes.result && dbRes.result.msg) || '记录图片信息失败');
        }
      } catch (error) {
        console.error('上传图片错误:', error);
        throw error;
      }
    },
    
    // 处理@用户
    handleAtUser() {
      // 如果尚未加载关注列表，先加载
      if (this.followingUsers.length === 0 && !this.isLoadingFollowing) {
        this.loadFollowingUsers();
      }
      
      // 在光标位置插入@字符
      this.commentText = (this.commentText || '') + '@';
      this.showMentionList = true;
    },
    
    // 加载关注的用户列表
    async loadFollowingUsers() {
      const userId = uni.getStorageSync('userId');
      
      if (!userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      if (this.isLoadingFollowing) return;
      
      this.isLoadingFollowing = true;
      
      try {
        const res = await uniCloud.callFunction({
          name: 'getUserFollowing',
          data: { userId }
        });
        
        if (res && res.result && res.result.code === 0) {
          this.followingUsers = (res.result.data && res.result.data.list) || [];
          
          // 如果没有关注的用户，提示用户
          if (this.followingUsers.length === 0) {
            uni.showToast({
              title: '您还没有关注任何用户',
              icon: 'none'
            });
            this.showMentionList = false;
          }
        } else {
          throw new Error((res && res.result && res.result.msg) || '获取关注列表失败');
        }
      } catch (error) {
        console.error('获取关注列表失败:', error);
        uni.showToast({
          title: (error && error.message) || '获取关注列表失败',
          icon: 'none'
        });
      } finally {
        this.isLoadingFollowing = false;
      }
    },
    
    // 选择要@的用户
    selectUser(user) {
      if (!user) return;
      
      // 替换最后一个@字符为@用户名
      const lastAtIndex = this.commentText ? this.commentText.lastIndexOf('@') : -1;
      if (lastAtIndex !== -1) {
        this.commentText = 
          this.commentText.substring(0, lastAtIndex) + 
          `@${user.nickname || '用户'} `;
      }
      this.showMentionList = false;
    },
    
    // 设置评论内容
    setContent(text) {
      this.commentText = text;
    },
    
    // 清空评论内容
    clear() {
      this.commentText = '';
    }
  }
}
</script>

<style>
.comment-popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.comment-popup {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
  padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
  transform: translateY(0);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
}

.popup-close {
  font-size: 28rpx;
  color: #999;
  padding: 10rpx;
}

.comment-input {
  width: 100%;
  min-height: 120rpx;
  background-color: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}

.image-preview {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  margin: 10rpx 0 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.remove-image {
  position: absolute;
  top: 5rpx;
  right: 5rpx;
  width: 40rpx;
  height: 40rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  line-height: 36rpx;
  border-radius: 50%;
  font-size: 32rpx;
}

.mention-list {
  max-height: 400rpx;
  overflow-y: auto;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 20rpx;
}

.mention-item {
  display: flex;
  align-items: center;
  padding: 16rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.mention-item:active {
  background: #f8f8f8;
}

.mention-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.mention-name {
  font-size: 28rpx;
  color: #333;
}

.popup-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-area {
  display: flex;
  align-items: center;
}

.tool-item {
  padding: 15rpx;
  margin-right: 20rpx;
}

.tool-icon {
  width: 48rpx;
  height: 48rpx;
}

.submit-btn {
  background-color: #ff8200;
  color: #fff;
  border-radius: 40rpx;
  font-size: 28rpx;
  padding: 16rpx 40rpx;
  margin: 0;
}

.submit-btn[disabled] {
  background-color: #f5f5f5;
  color: #999;
}
</style> 