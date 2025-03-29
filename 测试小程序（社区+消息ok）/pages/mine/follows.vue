<template>
  <view class="container">
    <view class="header">
      <view class="back-btn" @tap="goBack">
        <uni-icons type="arrow-left" size="24" color="#333"></uni-icons>
      </view>
      <text class="title">我的关注</text>
    </view>
    
    <view class="loading" v-if="loading">
      <uni-icons type="spinner-cycle" size="30" color="#ff8200"></uni-icons>
      <text>加载中...</text>
    </view>
    
    <view class="empty" v-else-if="followingList.length === 0">
      <image src="/static/images/empty-follow.png" class="empty-img" mode="widthFix"></image>
      <text class="empty-text">还没有关注任何人</text>
      <text class="empty-desc">去发现更多有趣的人吧</text>
    </view>
    
    <scroll-view 
      scroll-y 
      class="user-list-scroll"
      v-else
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view class="user-list">
        <view 
          class="user-item" 
          v-for="(user, index) in followingList" 
          :key="user._id" 
          @tap="gotoUserPage(user._id)"
        >
          <image 
            class="avatar" 
            :src="user.avatar || '/static/images/default-avatar.png'" 
            mode="aspectFill"
          ></image>
          <view class="user-info">
            <text class="nickname">{{user.nickname || '用户'}}</text>
            <text class="signature">{{user.signature || '这个人很懒，什么都没写'}}</text>
          </view>
          <button 
            class="follow-btn"
            :class="{'following': true}"
            @tap.stop="handleUnfollow(user._id, index)"
          >
            <text class="follow-icon-text">✓</text>
            <text>已关注</text>
          </button>
        </view>
      </view>
      
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      followingList: [],
      page: 1,
      pageSize: 20,
      loading: true,
      refreshing: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  onLoad() {
    this.userId = uni.getStorageSync('userId') || '';
    if (!this.userId) {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
      return;
    }
    
    this.loadFollowingUsers();
  },
  methods: {
    async loadFollowingUsers(refresh = false) {
      if (refresh) {
        this.page = 1;
        this.hasMore = true;
      }
      
      if (!this.hasMore && !refresh) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      try {
        console.log('正在加载关注列表，用户ID:', this.userId);
        const res = await uniCloud.callFunction({
          name: 'getUserFollowing',
          data: {
            userId: this.userId,
            page: this.page,
            pageSize: this.pageSize
          }
        });
        
        console.log('获取关注列表结果:', res.result);
        
        if (res.result.code === 0) {
          const data = res.result.data || {};
          const list = data.list || [];
          
          // 确保每个用户对象有必要的属性
          const processedList = list.map(user => ({
            ...user,
            nickname: user.nickname || '用户',
            avatar: user.avatar || '/static/images/default-avatar.png',
            signature: user.signature || '这个人很懒，什么都没写',
            isFollowing: true
          }));
          
          if (refresh || this.page === 1) {
            this.followingList = processedList;
          } else {
            this.followingList = [...this.followingList, ...processedList];
          }
          
          this.hasMore = processedList.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
          this.page++;
          
          // 同步更新关注计数到本地存储
          if (data.totalCount !== undefined) {
            try {
              const userInfo = uni.getStorageSync('userInfo') || {};
              userInfo.followCount = data.totalCount;
              userInfo.followingCount = data.totalCount;
              uni.setStorageSync('userInfo', userInfo);
            } catch (err) {
              console.error('更新本地关注计数失败', err);
            }
          }
        } else {
          uni.showToast({
            title: res.result.msg || '获取关注列表失败',
            icon: 'none'
          });
        }
      } catch (e) {
        console.error('获取关注列表出错：', e);
        uni.showToast({
          title: '获取关注列表失败',
          icon: 'none'
        });
        this.loadMoreStatus = 'more';
      } finally {
        this.loading = false;
        this.refreshing = false;
      }
    },
    
    loadMore() {
      if (!this.loading && this.hasMore) {
        this.loadFollowingUsers();
      }
    },
    
    onRefresh() {
      this.refreshing = true;
      this.loadFollowingUsers(true);
    },
    
    async handleUnfollow(targetUserId, index) {
      uni.showModal({
        title: '取消关注',
        content: '确定取消关注该用户吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '处理中...' });
              
              const result = await uniCloud.callFunction({
                name: 'toggleFollow',
                data: {
                  userId: this.userId,
                  targetUserId: targetUserId
                }
              });
              
              if (result.result.code === 0) {
                // 从列表中移除该用户
                this.followingList.splice(index, 1);
                
                // 更新用户的关注计数
                try {
                  const userInfo = uni.getStorageSync('userInfo') || {};
                  if (userInfo.followCount !== undefined) {
                    userInfo.followCount = Math.max(0, (userInfo.followCount || 0) - 1);
                    uni.setStorageSync('userInfo', userInfo);
                  }
                  
                  // 通知其他页面更新
                  uni.$emit('userInfoUpdated', userInfo);
                } catch (err) {
                  console.error('更新关注计数失败', err);
                }
                
                uni.showToast({
                  title: '已取消关注',
                  icon: 'success'
                });
              } else {
                throw new Error(result.result.msg);
              }
            } catch (e) {
              console.error('取消关注失败：', e);
              uni.showToast({
                title: e.message || '操作失败',
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    gotoUserPage(userId) {
      uni.navigateTo({
        url: `/pages/user/profile?id=${userId}`
      });
    },
    
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f8f8f8;
  }
  
  .header {
    position: relative;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #f0f0f0;
    z-index: 10;
  }
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    height: 44rpx;
    width: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
  }
  
  .loading text {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #999;
  }
  
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 30rpx;
  }
  
  .empty-img {
    width: 200rpx;
    margin-bottom: 30rpx;
  }
  
  .empty-text {
    font-size: 30rpx;
    color: #666;
    margin-bottom: 10rpx;
  }
  
  .empty-desc {
    font-size: 26rpx;
    color: #999;
  }
  
  .user-list-scroll {
    flex: 1;
  }
  
  .user-list {
    padding: 0 30rpx;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
  }
  
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #f0f0f0;
    border: 2rpx solid #fff;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    flex: 1;
    margin-left: 20rpx;
    overflow: hidden;
  }
  
  .nickname {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 8rpx;
  }
  
  .signature {
    font-size: 24rpx;
    color: #999;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .follow-btn {
    padding: 8rpx 24rpx;
    background: #f0f0f0;
    color: #666;
    border-radius: 40rpx;
    font-size: 26rpx;
    font-weight: normal;
    line-height: 1.5;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  
  .follow-btn.following {
    background: #f0f0f0;
    color: #666;
    box-shadow: none;
  }
  
  .follow-icon-text {
    font-size: 26rpx;
    margin-right: 8rpx;
  }
</style> 