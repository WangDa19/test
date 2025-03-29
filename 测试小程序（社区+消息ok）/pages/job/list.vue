<template>
  <view class="container">
    <!-- 顶部搜索栏 -->
    <view class="header">
      <view class="location-bar">
        <image src="/static/images/local.png" mode="aspectFit" class="location-icon"/>
        <text class="location-text">{{currentSchool || '请认证'}}</text>
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索实习岗位" 
          v-model="searchKeyword"
          @confirm="onSearch"
        />
      </view>
    </view>

    <!-- 瀑布流内容区 -->
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
        <image src="/static/images/empty.png" mode="aspectFit" class="empty-image"></image>
        <text class="empty-text">{{emptyText}}</text>
      </view>

      <!-- 瀑布流列表 -->
      <view v-else class="waterfall">
        <view class="waterfall-left">
          <view 
            v-for="item in leftList" 
            :key="item._id" 
            class="card" 
            @tap="navigateToDetail(item._id)"
          >
            <image 
              v-if="item.images && item.images.length > 0" 
              :src="item.images[0]" 
              mode="widthFix" 
              class="card-image"
            />
            <view class="card-content">
              <text class="title">{{item.title}}</text>
              <text class="desc">{{item.content}}</text>
              <text class="salary" v-if="item.salary">薪资：{{item.salary}}</text>
              <view class="user-info">
                <image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
                <text class="nickname">{{item.userInfo.nickname}}</text>
              </view>
              <view class="action-btns">
                <button class="btn chat" @tap.stop="chatWithUser(item)">私聊</button>
                <button class="btn apply" @tap.stop="applyJob(item)">投递简历</button>
              </view>
            </view>
          </view>
        </view>

        <view class="waterfall-right">
          <view 
            v-for="item in rightList" 
            :key="item._id" 
            class="card" 
            @tap="navigateToDetail(item._id)"
          >
            <view class="card-content">
              <text class="title">{{item.title}}</text>
              <text class="desc">{{item.content}}</text>
              <text class="salary" v-if="item.salary">薪资：{{item.salary}}</text>
              <view class="user-info">
                <image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
                <text class="nickname">{{item.userInfo.nickname}}</text>
              </view>
              <view class="action-btns">
                <button class="btn chat" @tap.stop="chatWithUser(item)">私聊</button>
                <button class="btn apply" @tap.stop="applyJob(item)">投递简历</button>
              </view>
            </view>
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
            collection: 'jobs',
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
        url: `/pages/job/detail?id=${id}`
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

    applyJob(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      uni.showToast({
        title: '简历投递成功',
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
  padding-top: 100rpx;
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

.content-list {
  height: calc(100vh - 100rpx);
}

.waterfall {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}

.waterfall-left, .waterfall-right {
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  margin-bottom: 20rpx;
}

.card-content {
  padding: 20rpx;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8rpx;
}

.desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 12rpx;
}

.salary {
  font-size: 32rpx;
  color: #ff5757;
  font-weight: bold;
  margin-bottom: 16rpx;
  display: block;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 12rpx 0;
  border-top: 1rpx solid #f5f5f5;
}

.avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  margin-right: 12rpx;
}

.nickname {
  font-size: 24rpx;
  color: #666;
  flex: 1;
}

.action-btns {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
  margin-top: 16rpx;
}

.btn {
  flex: 1;
  font-size: 24rpx;
  padding: 12rpx 0;
  border-radius: 32rpx;
  text-align: center;
  border: none;
}

.btn.chat {
  background: #fff;
  color: #ff5757;
  border: 1rpx solid #ff5757;
}

.btn.apply {
  background: #ff5757;
  color: #fff;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.empty-image {
  width: 240rpx;
  height: 240rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #999;
  text-align: center;
}

.card-image {
  width: 100%;
  border-radius: 16rpx 16rpx 0 0;
}

.loading-state {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}
</style> 