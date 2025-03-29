<template>
  <view class="tab-bar">
    <view class="tab-bar-item" @tap="switchTab('/pages/index/index', 0)">
      <image class="tab-icon" :src="selected === 0 ? '/static/images/home-active.png' : '/static/images/home.png'" mode="aspectFit"/>
      <text class="tab-text" :class="{ active: selected === 0 }">首页</text>
    </view>
    <view class="tab-bar-item" @tap="switchTab('/pages/message/message', 1)">
      <image class="tab-icon" :src="selected === 1 ? '/static/images/message-active.png' : '/static/images/message.png'" mode="aspectFit"/>
      <text class="tab-text" :class="{ active: selected === 1 }">消息</text>
    </view>
    <view class="tab-bar-item">
      <view class="publish-btn" @tap="goPublish">
        <text class="plus-icon">+</text>
      </view>
    </view>
    <view class="tab-bar-item" @tap="switchTab('/pages/task/task', 3)">
      <image class="tab-icon" :src="selected === 3 ? '/static/images/task-active.png' : '/static/images/task.png'" mode="aspectFit"/>
      <text class="tab-text" :class="{ active: selected === 3 }">社区</text>
    </view>
    <view class="tab-bar-item" @tap="switchTab('/pages/mine/mine', 4)">
      <image class="tab-icon" :src="selected === 4 ? '/static/images/user-active.png' : '/static/images/user.png'" mode="aspectFit"/>
      <text class="tab-text" :class="{ active: selected === 4 }">我的</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'tab-bar',
  data() {
    return {
      selected: 0
    }
  },
  methods: {
    switchTab(url, index) {
      if (this.selected === index) return
      this.selected = index
      uni.switchTab({ url })
    },
    goPublish() {
      uni.navigateTo({
        url: '/pages/publish/publish'
      })
    }
  }
}
</script>

<style>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 110rpx;
  background: #ffffff;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 8rpx;
}

.tab-icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 4rpx;
}

.tab-text {
  font-size: 24rpx;
  color: #999999;
  line-height: 1;
}

.tab-text.active {
  color: #ff5757;
  font-weight: 500;
}

.publish-btn {
  width: 120rpx;
  height: 64rpx;
  background: linear-gradient(to right, #ff4e50, #ff5757);
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(255, 87, 87, 0.3);
  margin-bottom: 6rpx;
}

.plus-icon {
  color: #ffffff;
  font-size: 40rpx;
  font-weight: 300;
  line-height: 1;
}

.publish-btn:active {
  transform: scale(0.95);
  opacity: 0.9;
}
</style>