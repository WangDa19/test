<template>
	<view class="tab-bar">
		<view class="tab-item" @tap="switchTab('/pages/index/index', 0)">
			<text class="tab-text" :class="{ active: selected === 0 }">首页</text>
		</view>
		<view class="tab-item" @tap="switchTab('/pages/message/message', 1)">
			<text class="tab-text" :class="{ active: selected === 1 }">消息</text>
		</view>
		<view class="tab-item">
			<view class="publish-btn" @tap="goPublish">
				<text class="plus-icon">+</text>
			</view>
		</view>
		<view class="tab-item" @tap="switchTab('/pages/task/task', 2)">
			<text class="tab-text" :class="{ active: selected === 2 }">社区</text>
		</view>
		<view class="tab-item" @tap="switchTab('/pages/mine/mine', 3)">
			<text class="tab-text" :class="{ active: selected === 3 }">我的</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selected: 0
		}
	},
	methods: {
		switchTab(url, index) {
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
	height: 100rpx;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-top: 1rpx solid #f0f0f0;
	padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s;
}

.tab-item:active {
	transform: scale(0.9);
	opacity: 0.8;
}

.tab-text {
	font-size: 28rpx;
	color: #999999;
}

.tab-text.active {
	color: #ff5757;
	font-weight: 500;
}

.publish-btn {
	width: 120rpx;
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