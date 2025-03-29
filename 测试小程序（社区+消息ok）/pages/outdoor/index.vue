<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <uni-icons type="arrow-left" size="30" color="#333" @tap="goBack"/>
      <view class="nav-right">
        <uni-icons type="share" size="30" color="#333" @tap="shareContent"/>
      </view>
    </view>

    <!-- 搜索与筛选区 -->
    <view class="header">
      <view class="search-wrapper">
        <view class="search-bar">
          <view class="location-mini">
            <image src="/static/images/local.png" mode="aspectFit" class="location-icon"/>
            <text>{{currentSchool || '请认证'}}</text>
          </view>
          <view class="search-input">
            <uni-icons type="search" size="16" color="#666"/>
            <input 
              type="text" 
              placeholder="搜索游玩地点、活动类型等" 
              v-model="searchKeyword"
              @confirm="onSearch"
            />
          </view>
        </view>
        <view class="search-btn" @tap="onSearch">
          <image src="/static/images/icons/sousuo.png" mode="aspectFit" class="search-icon"/>
        </view>
      </view>
    </view>

    <!-- 内容展示区 -->
    <scroll-view 
      scroll-y 
      class="goods-container"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 空状态显示 -->
      <view v-if="activities.length === 0" class="empty-state">
        <image src="/static/images/empty.png" mode="aspectFit"></image>
        <text>{{emptyText}}</text>
      </view>

      <!-- 瀑布流列表 -->
      <view v-else class="waterfall">
        <view class="waterfall-left">
          <view 
            v-for="item in leftList" 
            :key="item.id"
            class="card"
            @tap="navigateToDetail(item.id)"
          >
            <image class="card-image" :src="item.image" mode="widthFix"/>
            <view class="card-content">
              <text class="item-title">{{item.title}}</text>
              <text class="item-content">{{item.content}}</text>
              <view class="item-bottom">
                <view class="item-initiator">
                  <image 
                    class="avatar" 
                    :src="getAvatarUrl(item.userInfo)" 
                    mode="aspectFill"
                  />
                  <text class="user-name">{{getNickname(item.userInfo)}}</text>
                </view>
                <button class="chat-btn" @tap.stop="startChat(item.userId, getNickname(item.userInfo))">
                  <uni-icons type="chat" size="18" color="#007AFF"></uni-icons>
                  <text>私聊</text>
                </button>
              </view>
            </view>
          </view>
        </view>
        
        <view class="waterfall-right">
          <view 
            v-for="item in rightList" 
            :key="item.id"
            class="card"
            @tap="navigateToDetail(item.id)"
          >
            <image class="card-image" :src="item.image" mode="widthFix"/>
            <view class="card-content">
              <text class="item-title">{{item.title}}</text>
              <text class="item-content">{{item.content}}</text>
              <view class="item-bottom">
                <view class="item-initiator">
                  <image 
                    class="avatar" 
                    :src="getAvatarUrl(item.userInfo)" 
                    mode="aspectFill"
                  />
                  <text class="user-name">{{getNickname(item.userInfo)}}</text>
                </view>
                <button class="chat-btn" @tap.stop="startChat(item.userId, getNickname(item.userInfo))">
                  <uni-icons type="chat" size="18" color="#007AFF"></uni-icons>
                  <text>私聊</text>
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="activities.length > 0">
        <text v-if="loading">加载中...</text>
        <text v-else-if="pagination.page >= pagination.totalPage">没有更多了</text>
        <text v-else>上拉加载更多</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 1
      },
      refreshing: false,
      loading: false,
      hasAuth: false,
      currentSchool: '',
      searchKeyword: '',
      emptyText: '暂无内容'
    }
  },
  onShow() {
    this.checkAuth();
  },
  methods: {
    // 检查认证状态
    async checkAuth() {
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          this.emptyText = '请先登录';
          this.hasAuth = false;
          return;
        }

        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo?.educationInfo?.verified) {
          this.hasAuth = true;
          this.currentSchool = userInfo.educationInfo.schoolName;
          this.loadContentList(true);
        } else {
          this.hasAuth = false;
          this.emptyText = '请先完成位置认证';
        }
      } catch (error) {
        console.error('检查认证状态失败:', error);
      }
    },

    // 加载内容列表
    async loadContentList(reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.activities = [];
      }

      if (this.loading || !this.hasAuth) return;

      this.loading = true;
      try {
        const res = await uniCloud.callFunction({
          name: 'getContentList',
          data: {
            collection: 'activities',
            keyword: this.searchKeyword,
            userId: uni.getStorageSync('userId'),
            page: this.pagination.page,
            pageSize: this.pagination.pageSize
          }
        });

        if (res.result.code === 0) {
          const { list, pagination } = res.result.data;
          
          // 直接使用服务器返回的数据，不需要再处理用户信息
          const processedList = list.map(item => ({
            id: item._id,
            title: item.title || '',
            content: item.content || '',
            userId: item.userId,
            userInfo: item.userInfo,  // 直接使用服务器返回的用户信息
            image: Array.isArray(item.images) && item.images.length > 0 
              ? item.images[0] 
              : '/static/images/content/default.jpg'
          }));
          
          if (reset) {
            this.activities = processedList;
          } else {
            this.activities = [...this.activities, ...processedList];
          }
          this.pagination = pagination;
        }
      } catch (error) {
        console.error('获取内容列表失败:', error);
        uni.showToast({
          title: error.message || '获取数据失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
        this.refreshing = false;
      }
    },

    // 搜索方法
    onSearch() {
      if (!this.searchKeyword.trim()) return;
      this.loadContentList(true);
    },

    // 下拉刷新
    async onRefresh() {
      this.refreshing = true;
      await this.loadContentList(true);
    },

    // 加载更多
    loadMore() {
      if (this.pagination.page >= this.pagination.totalPage) return;
      this.pagination.page++;
      this.loadContentList();
    },

    goBack() {
      uni.navigateBack();
    },
    shareContent() {
      uni.showToast({
        title: '分享功能尚未实现',
        icon: 'none'
      });
    },
    openFilter() {
      uni.showToast({
        title: '筛选功能尚未实现',
        icon: 'none'
      });
    },
    navigateToDetail(id) {
      uni.navigateTo({
        url: `/pages/outdoor/detail?id=${id}`
      });
    },
    navigateToPublish() {
      uni.navigateTo({
        url: '/pages/outdoor/publish'
      });
    },
    viewDetails(item) {
      uni.showToast({
        title: '查看详情功能尚未实现',
        icon: 'none'
      });
    },
    joinActivity(item) {
      uni.showToast({
        title: '报名参加功能尚未实现',
        icon: 'none'
      });
    },
    goToHome() {
      uni.navigateTo({
        url: '/pages/index/index'
      });
    },
    goToTasks() {
      // 当前页面
    },
    goToProfile() {
      uni.navigateTo({
        url: '/pages/profile/profile'
      });
    },
    // 私聊功能
    startChat(userId, userName) {
      const currentUserId = uni.getStorageSync('userId');
      
      if (!currentUserId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/index'
          });
        }, 1500);
        return;
      }

      if (!userId) {
        uni.showToast({
          title: '用户不存在',
          icon: 'none'
        });
        return;
      }

      // 检查是否给自己发消息
      if (currentUserId === userId) {
        uni.showToast({
          title: '不能给自己发送消息',
          icon: 'none'
        });
        return;
      }

      uni.navigateTo({
        url: `/pages/chat/chat?targetUserId=${userId}&targetUserName=${encodeURIComponent(userName)}`
      });
    },
    // 添加这些辅助方法
    getAvatarUrl(userInfo) {
      return userInfo && userInfo.avatar ? userInfo.avatar : '/static/images/avatar/default.png';
    },
    
    getNickname(userInfo) {
      return userInfo && userInfo.nickname ? userInfo.nickname : '未知用户';
    }
  },
  computed: {
    // 左侧列表
    leftList() {
      return this.activities.filter((_, index) => index % 2 === 0);
    },
    // 右侧列表
    rightList() {
      return this.activities.filter((_, index) => index % 2 === 1);
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80rpx;
  background-color: #fff;
  padding: 0 20rpx;
  box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.1);
}

.nav-right {
  display: flex;
  align-items: center;
}

.header {
  background-color: #fff;
  padding: 15rpx 30rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.search-wrapper {
  margin-bottom: 15rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 8rpx 20rpx;
  border-radius: 36rpx;
  height: 64rpx;
  flex: 1;
}

.location-mini {
  display: flex;
  align-items: center;
  padding-right: 20rpx;
  border-right: 1rpx solid #ddd;
  margin-right: 20rpx;
  width: 45%;
  flex-shrink: 0;
}

.location-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
  flex-shrink: 0;
}

.location-mini text {
  font-size: 26rpx;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.search-input {
  width: 55%;
  display: flex;
  align-items: center;
  position: relative;
}

.search-input input {
  flex: 1;
  margin-left: 12rpx;
  font-size: 26rpx;
}

.search-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-icon {
  width: 40rpx;
  height: 40rpx;
}

.goods-container {
  margin-top: 120rpx;
  height: calc(100vh - 120rpx);
  padding: 10rpx;
}

.waterfall {
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
}

.waterfall-left, .waterfall-right {
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.waterfall-left {
  margin-top: -40rpx;
}

.card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.card:active {
  transform: scale(0.98);
}

.card-image {
  width: 100%;
  border-radius: 12rpx 12rpx 0 0;
}

.card-content {
  padding: 16rpx;
}

.item-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.item-content {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-bottom: 8rpx;
}

.item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
  padding-top: 12rpx;
  border-top: 1rpx solid #f5f5f5;
}

.item-initiator {
  display: flex;
  align-items: center;
}

.avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.user-name {
  font-size: 24rpx;
  color: #666;
  margin-left: 8rpx;
}

.chat-btn {
  background: #ff5757;
  color: #fff;
  font-size: 24rpx;
  padding: 8rpx 24rpx;
  border-radius: 24rpx;
  border: none;
  line-height: 1.5;
  margin: 0;
}

.chat-btn:active {
  opacity: 0.8;
}

.loading-state {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}

.empty-state {
  padding: 100rpx 0;
  text-align: center;
}

.empty-state image {
  width: 300rpx;
  height: 300rpx;
  opacity: 0.8;
}

.empty-state text {
  display: block;
  color: #999;
  font-size: 28rpx;
  margin-top: 20rpx;
}
</style> 