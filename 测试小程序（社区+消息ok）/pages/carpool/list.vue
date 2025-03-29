<template>
  <view class="container">
    <!-- 搜索区域 -->
    <view class="header">
      <view class="location-bar">
        <image src="/static/images/local.png" mode="aspectFit" class="location-icon"/>
        <text class="location-text">{{currentSchool || '请认证'}}</text>
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索拼车信息" 
          v-model="searchKeyword"
          @confirm="onSearch"
        />
      </view>
    </view>

    <!-- 分类标签 -->
    <view class="category-tabs">
      <view 
        v-for="(item, index) in filters" 
        :key="index"
        class="tab-item" 
        :class="{active: currentFilter === item.value}"
        @tap="switchFilter(item.value)"
      >
        {{item.name}}
      </view>
    </view>

    <!-- 内容列表区 -->
    <scroll-view 
      scroll-y 
      class="content-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 空状态显示 -->
      <view v-if="contentList.length === 0" class="empty-state">
        <image src="/static/images/empty.png" mode="aspectFit"></image>
        <text class="empty-text">{{emptyText}}</text>
      </view>

      <!-- 列表内容 -->
      <view v-else class="list-container">
        <view 
          v-for="item in contentList" 
          :key="item._id"
          class="carpool-card"
        >
          <view class="card-main">
            <view class="user-info">
              <image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
              <text class="nickname">{{item.userInfo.nickname}}</text>
            </view>
            <view class="carpool-info">
              <text class="title">找拼车</text>
              <text class="content">{{item.content}}</text>
            </view>
          </view>
          <view class="card-actions">
            <button class="action-btn chat" @tap.stop="chatWithUser(item)">私聊</button>
            <button class="action-btn join" @tap.stop="joinCarpool(item)">加入</button>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="contentList.length > 0">
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
      filters: [
        { name: '全部', value: 'all' },
        { name: '周末', value: 'weekend' },
        { name: '机场', value: 'airport' },
        { name: '高铁', value: 'train' }
      ],
      currentFilter: 'all',
      contentList: [],
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
  computed: {
    leftList() {
      return this.contentList.filter((_, index) => index % 2 === 0);
    },
    rightList() {
      return this.contentList.filter((_, index) => index % 2 === 1);
    }
  },
  onShow() {
    this.checkAuth();
  },
  methods: {
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

    async loadContentList(reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.contentList = [];
      }

      if (this.loading || !this.hasAuth) return;

      this.loading = true;
      try {
        const res = await uniCloud.callFunction({
          name: 'getContentList',
          data: {
            collection: 'carpools',
            category: this.currentFilter !== 'all' ? this.currentFilter : '',
            keyword: this.searchKeyword,
            userId: uni.getStorageSync('userId'),
            page: this.pagination.page,
            pageSize: this.pagination.pageSize
          }
        });

        if (res.result.code === 0) {
          const { list, pagination } = res.result.data;
          
          if (reset) {
            this.contentList = list;
          } else {
            this.contentList = [...this.contentList, ...list];
          }
          this.pagination = pagination;
        } else {
          throw new Error(res.result.msg);
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

    switchFilter(filter) {
      if (this.currentFilter === filter) return;
      this.currentFilter = filter;
      this.loadContentList(true);
    },

    onSearch() {
      if (!this.searchKeyword.trim()) return;
      this.loadContentList(true);
    },

    async onRefresh() {
      this.refreshing = true;
      await this.loadContentList(true);
    },

    loadMore() {
      if (this.pagination.page >= this.pagination.totalPage) return;
      this.pagination.page++;
      this.loadContentList();
    },

    navigateToDetail(id) {
      uni.navigateTo({
        url: `/pages/carpool/detail?id=${id}`
      });
    },

    chatWithUser(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      const userId = uni.getStorageSync('userId');
      if (item.userId === userId) {
        uni.showToast({
          title: '不能和自己私聊',
          icon: 'none'
        });
        return;
      }

      uni.navigateTo({
        url: `/pages/chat/chat?targetUserId=${item.userId}&targetUserName=${item.userInfo.nickname}`
      });
    },

    joinCarpool(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      uni.showToast({
        title: '加入成功',
        icon: 'success'
      });
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.location-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 16rpx 24rpx;
  border-radius: 36rpx;
}

.location-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 12rpx;
}

.location-text {
  font-size: 28rpx;
  color: #333;
  margin-right: 24rpx;
  padding-right: 24rpx;
  border-right: 1rpx solid #ddd;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  margin-left: 12rpx;
}

.category-tabs {
  display: flex;
  padding: 20rpx 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #f5f5f5;
}

.tab-item {
  padding: 12rpx 40rpx;
  font-size: 28rpx;
  color: #666;
  background: #f5f5f5;
  border-radius: 32rpx;
  margin-right: 20rpx;
}

.tab-item.active {
  background: #ff5757;
  color: #fff;
}

.content-list {
  margin-top: 160rpx;
  height: calc(100vh - 160rpx);
}

.list-container {
  padding: 0 30rpx;
}

.carpool-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.card-main {
  margin-bottom: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.nickname {
  font-size: 28rpx;
  color: #333;
}

.carpool-info {
  padding: 10rpx 0;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.action-btn {
  min-width: 160rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 36rpx;
  font-size: 28rpx;
  border: none;
  padding: 0 30rpx;
}

.action-btn.chat {
  background: #fff;
  color: #ff5757;
  border: 1rpx solid #ff5757;
}

.action-btn.join {
  background: #ff5757;
  color: #fff;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.empty-state image {
  width: 240rpx;
  height: 240rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #999;
  display: block;
}

.loading-state {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}
</style> 