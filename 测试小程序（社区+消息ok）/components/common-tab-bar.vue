<template>
	<view></view>
</template>

<script>
export default {
	name: 'common-tab-bar'
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
}

.tab-text {
	font-size: 28rpx;
	color: #999999;
}

.tab-text.active {
	color: #ff5757;
	font-weight: 500;
}
</style> 