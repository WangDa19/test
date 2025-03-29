<template>
	<view class="index-container">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<image src="/static/images/icons/chaxun.png" class="search-icon" mode="aspectFit" @error="onImageError"/>
			<input type="text" placeholder="搜索" placeholder-class="search-placeholder"/>
		</view>

		<!-- 功能按钮区 -->
		<view class="function-area">
			<!-- 第一行 -->
			<view class="function-row">
				<view class="menu-item" @tap="navigateTo('/pages/idle/list')">
					<image src="/static/images/icons/xianzhi.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">闲置交易</text>
				</view>
				<view class="menu-item" @tap="navigateTo('/pages/errand/list')">
					<image src="/static/images/icons/paotui.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">跑腿代取</text>
				</view>
				<view class="menu-item" @tap="navigateTo('/pages/skill/list')">
					<image src="/static/images/icons/zhuanye.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">专业技能</text>
				</view>
				<view class="menu-item" @tap="navigateTo('/pages/tutor/list')">
					<image src="/static/images/icons/kecheng.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">课程辅导</text>
				</view>
			</view>
			<!-- 第二行 -->
			<view class="function-row">
				<view class="menu-item" @tap="navigateTo('/pages/carpool/list')">
					<image src="/static/images/icons/jiaotong.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">交通拼车</text>
				</view>
				<view class="menu-item" @tap="navigateTo('/pages/outdoor/index')">
					<image src="/static/images/icons/youwan.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">游玩搭子</text>
				</view>
				<view class="menu-item" @tap="navigateTo('/pages/job/list')">
					<image src="/static/images/icons/xiaozhao.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">校招实习</text>
				</view>
				<view class="menu-item" @tap="navigateTo('/pages/more/list')">
					<image src="/static/images/icons/gengduo.png" class="menu-icon" mode="aspectFit"/>
					<text class="menu-text">更多服务</text>
				</view>
			</view>
		</view>

		<!-- 新的内容区域 -->
		<view class="content-area">
			<!-- 热门推荐 -->
			<view class="section hot-section">
				<view class="section-header">
					<text class="section-title">热门推荐</text>
					<text class="more-text" @tap="navigateTo('/pages/task/task')">查看更多</text>
				</view>
				<scroll-view scroll-x class="scroll-content">
					<view class="hot-items">
						<view class="hot-item" v-for="item in hotList" :key="item.id" @tap="navigateToDetail(item.id)">
							<image class="hot-image" :src="item.image" mode="aspectFill"/>
							<view class="hot-info">
								<text class="hot-title">{{item.title}}</text>
								<text class="hot-price" v-if="item.price">¥{{item.price}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 最新发布 -->
			<view class="section new-section">
				<view class="section-header">
					<text class="section-title">最新发布</text>
					<text class="more-text" @tap="navigateTo('/pages/task/task')">更多</text>
				</view>
				<view class="new-list">
					<view class="new-item" v-for="item in newList" :key="item.id" @tap="navigateToDetail(item.id)">
						<image class="user-avatar" :src="item.avatar" mode="aspectFill"/>
						<view class="new-content">
							<view class="new-header">
								<text class="new-nickname">{{item.nickname}}</text>
								<text class="new-time">{{item.time}}</text>
							</view>
							<text class="new-title">{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 校园活动 -->
			<view class="section activity-section">
				<view class="section-header">
					<text class="section-title">校园活动</text>
					<text class="more-text" @tap="navigateTo('/pages/outdoor/index')">全部活动</text>
				</view>
				<view class="activity-grid">
					<view class="activity-item" v-for="item in activityList" :key="item.id" @tap="navigateToActivity(item.id)">
						<image class="activity-image" :src="item.image" mode="aspectFill"/>
						<view class="activity-info">
							<text class="activity-title">{{item.title}}</text>
							<view class="activity-meta">
								<text class="activity-time">{{item.time}}</text>
								<text class="activity-count">{{item.participantCount}}人参与</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<tab-bar class="custom-tab-bar"></tab-bar>
	</view>
</template>

<script>
	import IconButton from '@/components/IconButton.vue';
	import PublishButton from '@/components/publish-button/publish-button.vue'

	export default {
		components: {
			IconButton,
			PublishButton
		},
		data() {
			return {
				hotList: [
					{
						id: 1,
						image: '/static/images/content/default.jpg',
						title: '高等数学辅导',
						price: '50/小时'
					},
					{
						id: 2,
						image: '/static/images/content/default.jpg',
						title: '二手书籍转让',
						price: '20'
					},
					{
						id: 3,
						image: '/static/images/content/default.jpg',
						title: '周末拼车回家',
						price: '30/人'
					}
				],
				newList: [
					{
						id: 1,
						avatar: '/static/images/avatar/default.png',
						nickname: '用户A',
						time: '5分钟前',
						title: '求购高等数学教材'
					},
					{
						id: 2,
						avatar: '/static/images/avatar/default.png',
						nickname: '用户B',
						time: '10分钟前',
						title: '提供Java编程辅导'
					}
				],
				activityList: [
					{
						id: 1,
						image: '/static/images/content/default.jpg',
						title: '周末爬山活动',
						time: '本周六 9:00',
						participantCount: 12
					},
					{
						id: 2,
						image: '/static/images/content/default.jpg',
						title: '篮球友谊赛',
						time: '周日下午',
						participantCount: 20
					}
				],
				currentTab: 'index'
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync()
			const safeAreaBottom = systemInfo.safeArea ? (systemInfo.screenHeight - systemInfo.safeArea.bottom) : 0
			this.safeAreaBottom = safeAreaBottom
		},
		onShow() {
			if (typeof this.getTabBar === 'function' && this.getTabBar()) {
				this.getTabBar().setData({
					selected: 0
				})
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({ url });
			},
			navigateToDetail(id) {
				uni.navigateTo({
					url: `/pages/task/detail?id=${id}`
				})
			},
			navigateToActivity(id) {
				uni.navigateTo({
					url: `/pages/outdoor/detail?id=${id}`
				})
			},
			onImageError() {
				console.error('图标加载失败');
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}

.index-container {
	padding: 0 20rpx;
	background-color: #ffffff;
	min-height: 100vh;
	padding-bottom: calc(240rpx + env(safe-area-inset-bottom)) !important;
	box-sizing: border-box;
	position: relative;
}

.custom-tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
}

.index-container {
	.search-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 60rpx;
		padding: 0 20rpx;
		background: rgba(255, 255, 255, 0.95);
		display: flex;
		align-items: center;
		z-index: 99;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.search-bar input {
		flex: 1;
		height: 40rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
		padding: 0 15rpx 0 40rpx;
		font-size: 22rpx;
	}

	.search-icon {
		width: 45rpx;
		height: 45rpx;
		margin-right: 10rpx;
	}

	.function-area {
		margin-top: 80rpx;
		padding: 10rpx 20rpx;
	}

	.function-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx;
		background: #f9f9f9;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.1);
		transition: background 0.3s;
	}

	.menu-item:hover {
		background: #e0e0e0;
	}

	.menu-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 5rpx;
	}

	.menu-text {
		font-size: 24rpx;
		color: #333;
		text-align: center;
	}

	// 新增样式
	.content-area {
		margin-top: 30rpx;
		padding: 0 10rpx;
	}

	.section {
		margin-bottom: 30rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.more-text {
		font-size: 26rpx;
		color: #999;
	}

	// 热门推荐样式
	.scroll-content {
		white-space: nowrap;
		margin: 0 -20rpx;
		padding: 0 20rpx;
	}

	.hot-items {
		display: flex;
		padding: 10rpx 0;
	}

	.hot-item {
		width: 240rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.hot-image {
		width: 240rpx;
		height: 180rpx;
		border-radius: 12rpx 12rpx 0 0;
	}

	.hot-info {
		padding: 12rpx;
	}

	.hot-title {
		font-size: 26rpx;
		color: #333;
		line-height: 1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.hot-price {
		font-size: 24rpx;
		color: #ff5757;
		margin-top: 8rpx;
		display: block;
	}

	// 最新发布样式
	.new-list {
		margin: 0 -20rpx;
	}

	.new-item {
		display: flex;
		padding: 20rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.user-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 16rpx;
	}

	.new-content {
		flex: 1;
	}

	.new-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8rpx;
	}

	.new-nickname {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	.new-time {
		font-size: 24rpx;
		color: #999;
	}

	.new-title {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
	}

	// 校园活动样式
	.activity-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}

	.activity-item {
		border-radius: 12rpx;
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.activity-image {
		width: 100%;
		height: 160rpx;
		border-radius: 12rpx 12rpx 0 0;
	}

	.activity-info {
		padding: 12rpx;
	}

	.activity-title {
		font-size: 26rpx;
		color: #333;
		line-height: 1.4;
		margin-bottom: 8rpx;
	}

	.activity-meta {
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		color: #999;
	}
}
</style>
