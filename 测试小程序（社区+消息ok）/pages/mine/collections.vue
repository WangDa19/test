<template>
  <view class="container">
    <view class="tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="['tab-item', activeTab === index ? 'active' : '']"
        @tap="switchTab(index)"
      >
        <text>{{tab.name}}</text>
      </view>
    </view>

    <scroll-view 
      scroll-y 
      class="collection-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view v-if="collections.length === 0" class="empty-state-wrapper">
        <view class="empty-state">
          <image src="/static/images/empty.png" mode="aspectFit"></image>
          <text>暂无收藏内容</text>
        </view>
      </view>

      <view v-else class="waterfall">
        <view class="waterfall-left">
          <view 
            v-for="item in leftList" 
            :key="item._id"
            class="card"
            @tap="navigateToDetail(item)"
          >
            <image 
              class="card-image" 
              :src="item.content.images[0] || '/static/images/content/default.jpg'" 
              mode="widthFix"
            />
            <view class="card-content">
              <text class="title">{{item.content.title}}</text>
              <text class="desc">{{item.content.content}}</text>
              <view class="price-row">
                <text class="price">¥{{item.content.price}}</text>
                <view class="button-group">
                  <button class="buy-btn" @tap.stop="buyItem(item)">购买</button>
                  <button class="remove-btn" @tap.stop="removeFromCart(item)">移出购物车</button>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="waterfall-right">
          <view 
            v-for="item in rightList" 
            :key="item._id"
            class="card"
            @tap="navigateToDetail(item)"
          >
            <image 
              class="card-image" 
              :src="item.content.images[0] || '/static/images/content/default.jpg'" 
              mode="widthFix"
            />
            <view class="card-content">
              <text class="title">{{item.content.title}}</text>
              <text class="desc">{{item.content.content}}</text>
              <view class="price-row">
                <text class="price">¥{{item.content.price}}</text>
                <view class="button-group">
                  <button class="buy-btn" @tap.stop="buyItem(item)">购买</button>
                  <button class="remove-btn" @tap.stop="removeFromCart(item)">移出购物车</button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: '全部', type: '' },
        { name: '闲置', type: 'idle' },
        { name: '技能', type: 'skill' }
      ],
      activeTab: 0,
      collections: [],
      refreshing: false,
      loading: false
    }
  },
  
  computed: {
    leftList() {
      return this.collections.filter((_, index) => index % 2 === 0);
    },
    rightList() {
      return this.collections.filter((_, index) => index % 2 === 1);
    }
  },
  
  onShow() {
    this.loadCollections();
  },
  
  methods: {
    async loadCollections() {
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none',
            position: 'center'
          });
          return;
        }
        
        const res = await uniCloud.callFunction({
          name: 'getCollections',
          data: {
            userId,
            type: this.tabs[this.activeTab].type
          }
        });
        
        if (res.result.code !== 0) {
          throw new Error('获取数据失败');
        }
        
        this.collections = res.result.data;
      } catch (error) {
        console.error('加载收藏列表失败:', error);
        uni.showToast({
          title: '加载失败',
          icon: 'none',
          position: 'center'
        });
      }
    },
    
    switchTab(index) {
      this.activeTab = index;
      this.loadCollections();
    },
    
    async removeFromCart(item) {
      try {
        const userId = uni.getStorageSync('userId');
        const res = await uniCloud.callFunction({
          name: 'toggleCollection',
          data: {
            userId,
            contentId: item.contentId,
            type: item.type
          }
        });
        
        if (res.result.code === 0) {
          this.collections = this.collections.filter(i => i._id !== item._id);
          uni.showToast({
            title: res.result.msg,
            icon: 'success',
            position: 'center'
          });
        } else {
          throw new Error(res.result.msg);
        }
      } catch (error) {
        console.error('移出购物车失败:', error);
        uni.showToast({
          title: '操作失败',
          icon: 'none',
          position: 'center'
        });
      }
    },
    
    navigateToDetail(item) {
      const url = `/pages/${item.type}/detail?id=${item.contentId}`;
      uni.navigateTo({ url });
    },
    
    async onRefresh() {
      this.refreshing = true;
      await this.loadCollections();
      this.refreshing = false;
    },
    
    async loadMore() {
      if (this.loading) return;
      this.loading = true;
      // TODO: 实现分页加载
      this.loading = false;
    },
    
    buyItem(item) {
      uni.showModal({
        title: '确认购买',
        content: `确定要购买 ${item.content.title} 吗？`,
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '购买功能开发中',
              icon: 'none',
              position: 'center'
            });
          }
        }
      });
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
}

.tabs {
  display: flex;
  background: #fff;
  padding: 20rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
  padding: 20rpx 0;
}

.tab-item.active {
  color: #ff5757;
  font-weight: bold;
}

.tab-item.active:after {
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

.collection-list {
  margin-top: 120rpx;
  height: calc(100vh - 120rpx);
  padding: 20rpx;
}

.waterfall {
  display: flex;
  justify-content: space-between;
}

.waterfall-left, .waterfall-right {
  width: 48%;
}

.card {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
}

.card-content {
  padding: 16rpx;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 12rpx;
}

.price {
  font-size: 32rpx;
  color: #ff5757;
  font-weight: bold;
}

.buy-btn {
  font-size: 24rpx;
  color: #fff;
  background: #ff5757;
  padding: 8rpx 16rpx;
  border-radius: 24rpx;
  border: none;
}

.remove-btn {
  font-size: 24rpx;
  color: #ff5757;
  border: 1rpx solid #ff5757;
  background: #fff;
  padding: 8rpx 16rpx;
  border-radius: 24rpx;
}

.buy-btn:active,
.remove-btn:active {
  opacity: 0.8;
}

.empty-state-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-15%);
}

.empty-state image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
  opacity: 0.8;
}

.empty-state text {
  font-size: 28rpx;
  color: #999;
  text-align: center;
}
</style> 