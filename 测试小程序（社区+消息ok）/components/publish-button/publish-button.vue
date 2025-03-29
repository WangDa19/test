<template>
  <view class="publish-btn" @tap="goPublish">
    <text class="plus-icon">+</text>
  </view>
</template>

<script>
export default {
  name: 'publish-button',
  methods: {
    goPublish() {
      uni.navigateTo({
        url: '/pages/publish/publish',
        animationType: 'pop-in',
        animationDuration: 200
      })
    }
  }
}
</script>

<style>
.publish-btn {
  width: 160rpx;
  height: 60rpx;
  background: #ff5757;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.publish-btn:active {
  transform: scale(0.9);
  opacity: 0.8;
}

.plus-icon {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 300;
}
</style> 