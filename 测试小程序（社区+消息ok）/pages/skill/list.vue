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
              placeholder="搜索技能名称、类型等" 
              v-model="searchKeyword"
              @confirm="onSearch"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 分类标签 -->
    <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
      <view class="category-list">
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['category-item', activeTab === index ? 'active' : '']"
          @tap="switchTab(index)"
        >
          <text>{{tab.name}}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 瀑布流列表 -->
    <scroll-view 
      scroll-y 
      class="skill-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 空状态 -->
      <view v-if="skillList.length === 0" class="empty-state">
        <image src="/static/images/empty.png" mode="aspectFit"></image>
        <text>{{emptyText}}</text>
      </view>

      <!-- 瀑布流布局 -->
      <view v-else class="waterfall">
        <view class="waterfall-left">
          <view 
            v-for="item in leftList" 
            :key="item._id"
            class="skill-card"
            @tap="navigateToDetail(item._id)"
          >
            <image 
              class="skill-image" 
              :src="item.images[0] || '/static/images/content/default.jpg'" 
              mode="widthFix"
            />
            <view class="skill-content">
              <view class="skill-header">
                <text class="title">{{item.title}}</text>
                <text class="level">{{item.level || '暂无等级'}}</text>
              </view>
              <text class="desc">{{item.content}}</text>
              <view class="tags" v-if="item.tags && item.tags.length">
                <text v-for="(tag, index) in item.tags" :key="index" class="tag">{{tag}}</text>
              </view>
              <view class="skill-footer">
                <view class="user-info">
                  <image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
                  <text class="nickname">{{item.userInfo.nickname || '未知用户'}}</text>
                </view>
                <view class="price-row">
                  <text class="price">¥{{item.price}}</text>
                  <view class="button-group">
                    <button class="action-btn chat-btn" @tap.stop="startChat(item)">私聊</button>
                    <button class="action-btn accept-btn" @tap.stop="acceptOrder(item)">接单</button>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="waterfall-right">
          <view 
            v-for="item in rightList" 
            :key="item._id"
            class="skill-card"
            @tap="navigateToDetail(item._id)"
          >
            <image 
              class="skill-image" 
              :src="item.images[0] || '/static/images/content/default.jpg'" 
              mode="widthFix"
            />
            <view class="skill-content">
              <view class="skill-header">
                <text class="title">{{item.title}}</text>
                <text class="level">{{item.level || '暂无等级'}}</text>
              </view>
              <text class="desc">{{item.content}}</text>
              <view class="tags" v-if="item.tags && item.tags.length">
                <text v-for="(tag, index) in item.tags" :key="index" class="tag">{{tag}}</text>
              </view>
              <view class="skill-footer">
                <view class="user-info">
                  <image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
                  <text class="nickname">{{item.userInfo.nickname || '未知用户'}}</text>
                </view>
                <view class="price-row">
                  <text class="price">¥{{item.price}}</text>
                  <view class="button-group">
                    <button class="action-btn chat-btn" @tap.stop="startChat(item)">私聊</button>
                    <button class="action-btn accept-btn" @tap.stop="acceptOrder(item)">接单</button>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="skillList.length > 0">
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
      currentSchool: '',
      searchKeyword: '',
      tabs: [
        { name: '全部', value: '' },
        { name: '编程开发', value: 'programming' },
        { name: '设计创作', value: 'design' },
        { name: '语言培训', value: 'language' },
        { name: '学科辅导', value: 'subject' }
      ],
      activeTab: 0,
      skillList: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 1
      },
      refreshing: false,
      loading: false,
      hasAuth: false,
      emptyText: '暂无内容',
      currentUserId: '',
      isAccepting: false
    }
  },
  onShow() {
    this.checkAuth();
    this.currentUserId = uni.getStorageSync('userId');
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
        this.skillList = [];
      }

      if (this.loading || !this.hasAuth) return;

      this.loading = true;
      try {
        const res = await uniCloud.callFunction({
          name: 'getContentList',
          data: {
            collection: 'skills',
            category: this.tabs[this.activeTab].value,
            keyword: this.searchKeyword,
            userId: uni.getStorageSync('userId'),
            page: this.pagination.page,
            pageSize: this.pagination.pageSize
          }
        });

        if (res.result.code === 0) {
          const { list, pagination } = res.result.data;
          
          if (reset) {
            this.skillList = list;
          } else {
            this.skillList = [...this.skillList, ...list];
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

    // 切换分类
    switchTab(index) {
      if (this.activeTab === index) return;
      this.activeTab = index;
      this.loadContentList(true);
    },

    // 搜索
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

    // 跳转到详情页
    navigateToDetail(id) {
      uni.navigateTo({
        url: `/pages/skill/detail?id=${id}`
      });
    },

    // 私聊
    chatWithTeacher(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      uni.navigateTo({
        url: `/pages/chat/chat?targetUserId=${item.userId}&targetUserName=${encodeURIComponent(item.userInfo.nickname)}`
      });
    },

    // 预约课程
    bookLesson(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      uni.navigateTo({
        url: `/pages/skill/booking?id=${item._id}`
      });
    },

    // 开始私聊
    startChat(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          position: 'center'
        });
        return;
      }
      
      // 检查是否给自己发消息
      if (this.currentUserId === item.userId) {
        uni.showToast({
          title: '不能给自己发送消息',
          icon: 'none',
          position: 'center'
        });
        return;
      }
      
      // 跳转到聊天页面
      uni.navigateTo({
        url: `/pages/chat/chat?targetUserId=${item.userId}&targetUserName=${encodeURIComponent(item.userInfo.nickname)}`
      });
    },

    // 修改接单方法
    acceptOrder(item) {
      if (!this.hasAuth) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          position: 'center'
        });
        return;
      }
      
      // 检查是否接自己的单
      if (this.currentUserId === item.userId) {
        uni.showToast({
          title: '不能接自己发布的单',
          icon: 'none',
          position: 'center'
        });
        return;
      }
      
      uni.showModal({
        title: '确认接单',
        content: `确定接受"${item.title}"这个任务吗？`,
        success: (res) => {
          if (res.confirm) {
            this.submitAcceptOrder(item);
          }
        }
      });
    },

    // 添加提交接单方法
    async submitAcceptOrder(item) {
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

        console.log('开始接单，任务ID:', item._id, '用户ID:', userId);

        const res = await uniCloud.callFunction({
          name: 'acceptSkill',
          data: {
            taskId: item._id,
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
          this.skillList = this.skillList.filter(t => t._id !== item._id);
          
          // 延迟刷新以便用户看到确认消息
          setTimeout(() => {
            this.loadContentList(true);
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
    }
  },
  computed: {
    // 左侧列表
    leftList() {
      return this.skillList.filter((_, index) => index % 2 === 0);
    },
    // 右侧列表
    rightList() {
      return this.skillList.filter((_, index) => index % 2 === 1);
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
  background-color: #fff;
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
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.location-mini {
  display: flex;
  align-items: center;
  padding-right: 20rpx;
  border-right: 1px solid #ddd;
}

.location-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

.search-input {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  align-items: center;
}

.search-input input {
  flex: 1;
  font-size: 28rpx;
  margin-left: 10rpx;
}

.category-scroll {
  position: fixed;
  top: 100rpx;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99;
  padding: 20rpx 0;
  white-space: nowrap;
}

.category-list {
  padding: 0 20rpx;
  display: flex;
}

.category-item {
  padding: 10rpx 30rpx;
  margin-right: 20rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
}

.category-item.active {
  background: #ff5757;
  color: #fff;
}

.skill-list {
  margin-top: 180rpx;
  padding: 20rpx;
  height: calc(100vh - 180rpx);
}

.waterfall {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}

.waterfall-left,
.waterfall-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.skill-card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.skill-image {
  width: 100%;
  height: auto;
  background-color: #f5f5f5;
}

.skill-content {
  padding: 16rpx;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  flex: 1;
  margin-right: 12rpx;
}

.level {
  font-size: 22rpx;
  color: #ff5757;
  background: #fff5f5;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  white-space: nowrap;
}

.desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.tag {
  font-size: 22rpx;
  color: #666;
  background: #f5f5f5;
  padding: 4rpx 12rpx;
  border-radius: 16rpx;
}

.skill-footer {
  border-top: 1rpx solid #f5f5f5;
  padding-top: 12rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.avatar {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  margin-right: 8rpx;
}

.nickname {
  font-size: 24rpx;
  color: #666;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 30rpx;
  color: #ff5757;
  font-weight: bold;
}

.button-group {
  display: flex;
  gap: 12rpx;
}

.action-btn {
  font-size: 24rpx;
  padding: 8rpx 20rpx;
  border-radius: 24rpx;
  border: none;
  line-height: 1.2;
}

.accept-btn {
  background: #ff5757;
  color: #fff;
}

.chat-btn {
  background: #fff;
  color: #ff5757;
  border: 1rpx solid #ff5757;
}

.empty-state {
  text-align: center;
  padding: 100rpx 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.empty-state image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.empty-state text {
  font-size: 28rpx;
  color: #999;
  display: block;
  text-align: center;
}

.loading-state {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 26rpx;
}
</style> 