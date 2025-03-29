<template>
  <view class="container">
    <view class="header">
      <text class="title">游玩搭子</text>
      <button class="add-btn" @tap="navigateToAdd">发布搭子</button>
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
        { id: 1, title: '周末去爬山', details: '出发时间：周六早上' },
        { id: 2, title: '周日去游乐园', details: '出发时间：周日中午' }
      ]
    }
  },
  methods: {
    navigateToAdd() {
      uni.navigateTo({ url: '/pages/partner/add.vue' });
    },
    navigateToDetail(id) {
      uni.navigateTo({ url: `/pages/partner/detail?id=${id}` });
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