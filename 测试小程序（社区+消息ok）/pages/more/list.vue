<template>
  <view class="container">
    <view class="header">
      <text class="title">更多服务</text>
      <button class="add-btn" @tap="navigateToAdd">发布服务</button>
    </view>
    <view class="item-list">
      <view class="item" v-for="item in items" :key="item.id" @tap="navigateToDetail(item.id)">
        <text class="item-title">{{item.title}}</text>
        <text class="item-details">{{item.details}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, title: '家教服务', details: '地点：线上，价格：50元/小时' },
        { id: 2, title: '翻译服务', details: '地点：线上，价格：100元/小时' }
      ]
    }
  },
  methods: {
    navigateToAdd() {
      uni.navigateTo({ url: '/pages/more/add.vue' });
    },
    navigateToDetail(id) {
      uni.navigateTo({ url: `/pages/more/detail?id=${id}` });
    }
  }
}
</script>

<style>
.container {
  padding: 20rpx;
  background-color: #ffffff;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.add-btn {
  background: #ff5757;
  color: #fff;
  border-radius: 20rpx;
  padding: 10rpx 20rpx;
}

.item-list {
  margin-top: 20rpx;
}

.item {
  padding: 15rpx;
  border: 1rpx solid #f0f0f0;
  border-radius: 10rpx;
  margin-bottom: 10rpx;
}

.item-title {
  font-size: 28rpx;
  color: #333;
}

.item-details {
  font-size: 24rpx;
  color: #999;
}
</style> 