<template>
  <view class="container">
    <!-- 地图区域 -->
    <view class="map-area">
      <map
        id="map"
        class="map"
        :latitude="task.endLocation.latitude"
        :longitude="task.endLocation.longitude"
        :markers="markers"
        :scale="16"
        show-location
      >
        <cover-view class="controls">
          <cover-view class="location-btn" @tap="moveToLocation">
            <cover-image src="/static/images/location.png"></cover-image>
          </cover-view>
        </cover-view>
      </map>
    </view>

    <!-- 任务详情 -->
    <view class="task-detail">
      <view class="detail-card">
        <text class="detail-title">{{task.title}}</text>
        <text class="detail-desc">{{task.details}}</text>
        <view class="location-info">
          <view class="location-item">
            <text class="label">终点位置：</text>
            <text class="value">{{task.endAddress}}</text>
          </view>
        </view>
        <view class="price-info">
          <text class="price">¥{{task.reward}}</text>
          <button class="accept-btn" @tap="acceptTask">接单</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        details: '',
        reward: 0,
        endLocation: {
          latitude: 0,
          longitude: 0
        },
        endAddress: ''
      },
      markers: []
    }
  },
  onLoad(options) {
    // 接收传递过来的任务数据
    if (options.taskId) {
      this.getTaskDetail(options.taskId);
    }
  },
  methods: {
    getTaskDetail(taskId) {
      // 这里应该调用API获取任务详情
      // 示例数据
      this.task = {
        id: taskId,
        title: '代取图书馆快递',
        details: '从图书馆取快递，送到宿舍。',
        reward: 10,
        endLocation: {
          latitude: 41.926806,  // 示例坐标，需要替换为实际坐标
          longitude: 123.404631
        },
        endAddress: '沈阳航空航天大学图书馆'
      };

      // 设置标记点
      this.markers = [{
        id: 1,
        latitude: this.task.endLocation.latitude,
        longitude: this.task.endLocation.longitude,
        title: this.task.title,
        iconPath: '/static/images/location_marker.png',
        width: 40,
        height: 40,
        callout: {
          content: this.task.endAddress,
          display: 'ALWAYS',
          padding: 10
        }
      }];
    },

    moveToLocation() {
      const mapContext = uni.createMapContext('map', this);
      mapContext.moveToLocation({
        latitude: this.task.endLocation.latitude,
        longitude: this.task.endLocation.longitude
      });
    },

    acceptTask() {
      uni.showModal({
        title: '确认接单',
        content: '是否确认接受该任务？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '接单成功',
              icon: 'success'
            });
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          }
        }
      });
    }
  }
}
</script>

<style>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.map-area {
  height: 50vh;
}

.map {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
}

.location-btn {
  width: 80rpx;
  height: 80rpx;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.2);
}

.task-detail {
  flex: 1;
  padding: 20rpx;
  background: #f5f5f5;
}

.detail-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.detail-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.detail-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.location-info {
  margin: 20rpx 0;
}

.location-item {
  display: flex;
  margin-bottom: 10rpx;
}

.label {
  color: #666;
  font-size: 28rpx;
  width: 160rpx;
}

.value {
  flex: 1;
  font-size: 28rpx;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
}

.price {
  font-size: 40rpx;
  color: #ff5757;
  font-weight: bold;
}

.accept-btn {
  background: #ff5757;
  color: #fff;
  padding: 20rpx 40rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
}
</style> 