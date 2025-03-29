<template>
  <view class="container">
    <!-- 顶部搜索和定位 -->
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
              placeholder="搜索任务" 
              v-model="searchKeyword"
              @confirm="onSearch"
            />
          </view>
        </view>
        <view class="search-btn" @tap="onSearch">
          <image src="/static/images/icons/sousuo.png" mode="aspectFit" class="search-icon"/>
        </view>
      </view>
      
      <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
        <view class="category-list">
          <view 
            v-for="(category, index) in categories" 
            :key="index"
            :class="['category-item', activeCategory === index ? 'active' : '']"
            @tap="switchCategory(index)"
          >
            <text>{{category.name}}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 任务列表 -->
    <scroll-view 
      scroll-y 
      class="task-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 空状态显示 -->
      <view v-if="tasks.length === 0" class="empty-state">
        <image src="/static/images/empty.png" mode="aspectFit"></image>
        <text>{{emptyText}}</text>
      </view>

      <view class="task-card" v-for="task in tasks" :key="task.id" @tap="goToDetail(task)">
        <!-- 用户信息区域 -->
        <view class="user-info">
          <image class="avatar" :src="task.userAvatar || '/static/images/avatar/default.png'" mode="aspectFill" @tap.stop="viewUserProfile(task.userId)"></image>
          <view class="user-meta">
            <text class="nickname">{{task.userName}}</text>
            <text class="publish-time">{{task.time}}</text>
          </view>
          <button class="chat-btn" @tap.stop="startChat(task.userId)">
            <uni-icons type="chat" size="18" color="#007AFF"></uni-icons>
            <text>私聊</text>
          </button>
        </view>

        <!-- 任务内容区域 -->
        <view class="task-content">
          <view class="main-info">
            <text class="task-title">{{task.title}}</text>
            <text class="task-reward">¥{{task.price}}</text>
          </view>
          <text class="task-details">{{task.details}}</text>
          <view class="image-list" v-if="task.images && task.images.length">
            <image 
              v-for="(img, imgIndex) in task.images.slice(0, 3)" 
              :key="imgIndex"
              :src="img" 
              mode="aspectFill"
              class="task-image"
              @tap.stop="previewImage(task.images, img)"
            />
          </view>
          <view class="location-info">
            <uni-icons type="location" size="16" color="#666"></uni-icons>
            <text class="location-text">{{task.endAddress}}</text>
          </view>
        </view>

        <!-- 底部操作区域 -->
        <view class="task-footer">
          <view class="tags">
            <text class="tag" v-if="task.urgent">加急</text>
            <text class="tag">{{task.category || '跑腿代取'}}</text>
            <text class="tag status-tag active">
              待接单
            </text>
          </view>
          <button 
            class="accept-btn" 
            @tap.stop="acceptTask(task)"
            :disabled="task.userId === currentUserId || isAccepting"
          >
            立即接单
          </button>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="tasks.length > 0">
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
      tasks: [],
      hasAuth: false,
      currentSchool: '',
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 1
      },
      refreshing: false,
      loading: false,
      emptyText: '暂无内容',
      searchKeyword: '',
      activeCategory: 0,
      categories: [
        { name: '全部', type: '' },
        { name: '快递代取', type: 'express' },
        { name: '食品代购', type: 'food' },
        { name: '打印服务', type: 'print' },
        { name: '其他帮助', type: 'other' }
      ],
      isAccepting: false
    }
  },

  onShow() {
    this.checkAuth();
    this.loadTaskList(true);
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
          this.loadTaskList(true);
        } else {
          this.hasAuth = false;
          this.emptyText = '请先完成位置认证';
        }
      } catch (error) {
        console.error('检查认证状态失败:', error);
      }
    },

    // 加载任务列表
    async loadTaskList(reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.tasks = [];
      }

      if (this.loading || !this.hasAuth) return;

      this.loading = true;
      try {
        const res = await uniCloud.callFunction({
          name: 'getErrandsList',
          data: {
            userId: uni.getStorageSync('userId'),
            page: this.pagination.page,
            pageSize: this.pagination.pageSize,
            keyword: this.searchKeyword,
            category: this.categories[this.activeCategory].type
          }
        });

        if (res.result.code === 0) {
          const { list, pagination } = res.result.data;
          
          if (reset) {
            this.tasks = list;
          } else {
            this.tasks = [...this.tasks, ...list];
          }
          
          this.pagination = pagination;
        } else {
          throw new Error(res.result.msg);
        }
      } catch (error) {
        console.error('加载任务列表失败:', error);
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
        this.refreshing = false;
      }
    },

    // 下拉刷新
    async onRefresh() {
      if (!this.hasAuth) return;
      this.refreshing = true;
      await this.loadTaskList(true);
    },

    // 上拉加载更多
    async loadMore() {
      if (this.loading || this.pagination.page >= this.pagination.totalPage) return;
      this.pagination.page++;
      await this.loadTaskList();
    },

    acceptTask(task) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      uni.showModal({
        title: '确认接单',
        content: `确定接受"${task.title}"这个任务吗？`,
        success: (res) => {
          if (res.confirm) {
            this.submitAcceptTask(task);
          }
        }
      });
    },

    async submitAcceptTask(task) {
      try {
        if (this.isAccepting) return;
        this.isAccepting = true;
        
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          this.isAccepting = false;
          return;
        }

        console.log('开始接单，任务ID:', task.id, '用户ID:', userId);

        const res = await uniCloud.callFunction({
          name: 'acceptErrand',
          data: {
            taskId: task.id,
            userId: userId
          }
        });

        console.log('接单结果:', res.result);

        if (res.result.code === 0) {
          uni.showToast({
            title: '接单成功',
            icon: 'success'
          });
          
          // 从列表中移除已接单的任务
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          
          // 延迟刷新以便用户看到确认消息
          setTimeout(() => {
            this.loadTaskList(true);
          }, 1000);
        } else {
          throw new Error(res.result.msg);
        }
      } catch (error) {
        console.error('接单失败:', error);
        uni.showToast({
          title: error.message || '接单失败',
          icon: 'none'
        });
      } finally {
        this.isAccepting = false;
      }
    },

    goToDetail(task) {
      uni.navigateTo({
        url: `/pages/errand/detail?taskId=${task.id}&title=${encodeURIComponent(task.title)}&details=${encodeURIComponent(task.details)}&reward=${task.reward}&endLat=${task.endLocation.latitude}&endLng=${task.endLocation.longitude}&endAddress=${encodeURIComponent(task.endAddress)}`
      });
    },
    viewUserProfile(userId) {
      uni.navigateTo({
        url: `/pages/user/profile?userId=${userId}`
      });
    },
    startChat(userId) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      if (!userId) {
        uni.showToast({
          title: '用户ID不存在',
          icon: 'none'
        });
        return;
      }
      
      uni.navigateTo({
        url: `/pages/chat/chat?targetUserId=${userId}&targetUserName=用户${userId}`
      });
    },
    onSearch() {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      this.loadTaskList(true);
    },
    switchCategory(index) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      this.activeCategory = index;
      this.loadTaskList(true);
    },
    previewImage(images, current) {
      uni.previewImage({
        urls: images,
        current: current
      });
    }
  }
}
</script>

<style>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 20rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.search-wrapper {
  display: flex;
  align-items: center;
}

.search-bar {
  flex: 1;
  background: #f5f5f5;
  border-radius: 32rpx;
  padding: 12rpx 24rpx;
  margin-right: 20rpx;
  display: flex;
}

.location-mini {
  display: flex;
  align-items: center;
  padding-right: 24rpx;
  border-right: 1rpx solid #ddd;
}

.location-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 24rpx;
}

.search-input input {
  flex: 1;
  font-size: 28rpx;
  margin-left: 12rpx;
}

.search-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  width: 40rpx;
  height: 40rpx;
}

.category-scroll {
  margin-top: 20rpx;
  white-space: nowrap;
}

.category-list {
  display: inline-flex;
  padding: 0 10rpx;
}

.category-item {
  padding: 12rpx 32rpx;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.category-item.active {
  color: #ff5757;
  font-weight: bold;
}

.category-item.active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: #ff5757;
  border-radius: 2rpx;
}

.task-list {
  margin-top: 200rpx;
  height: calc(100vh - 200rpx);
  padding: 20rpx;
}

.empty-state {
  padding: 100rpx 0;
  text-align: center;
}

.empty-state image {
  width: 200rpx;
  height: 200rpx;
  opacity: 0.8;
}

.empty-state text {
  display: block;
  color: #999;
  font-size: 28rpx;
  margin-top: 20rpx;
}

.loading-state {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}

.task-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.user-meta {
  flex: 1;
}

.nickname {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.publish-time {
  font-size: 24rpx;
  color: #999;
  display: block;
  margin-top: 4rpx;
}

.chat-btn {
  display: flex;
  align-items: center;
  padding: 12rpx 24rpx;
  background: #f0f7ff;
  border-radius: 30rpx;
  border: none;
}

.chat-btn text {
  color: #ff5757;
  font-size: 24rpx;
  margin-left: 8rpx;
}

.task-content {
  padding: 16rpx 0;
}

.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.task-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.task-reward {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff5757;
}

.task-details {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 16rpx;
  line-height: 1.5;
}

.location-info {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
}

.location-text {
  font-size: 26rpx;
  color: #666;
  margin-left: 8rpx;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.tags {
  display: flex;
  gap: 12rpx;
}

.tag {
  font-size: 24rpx;
  color: #666;
  background: #f5f5f5;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}

.tag:first-child {
  color: #ff5757;
  background: #fff0f0;
}

.status-tag {
  font-size: 24rpx;
}

.status-tag.active {
  color: #ff5757;
  background: #fff0f0;
}

.status-tag.accepted {
  color: #999;
  background: #f5f5f5;
}

.accepted-text {
  font-size: 28rpx;
  color: #999;
}

.accept-btn {
  background: #ff5757;
  color: #fff;
  font-size: 28rpx;
  padding: 16rpx 32rpx;
  border-radius: 30rpx;
  border: none;
}

.accept-btn[disabled] {
  background: #ccc;
  opacity: 0.8;
}

.image-list {
  display: flex;
  gap: 12rpx;
  margin-top: 16rpx;
}

.task-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 8rpx;
}
</style> 