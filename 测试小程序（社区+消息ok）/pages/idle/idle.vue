<template>
	<view class="container">
		<!-- 顶部搜索栏 -->
		<view class="header">
			<view class="location-bar">
				<image src="/static/images/local.png" mode="aspectFit" class="location-icon"/>
				<text class="location-text">{{currentSchool || '请认证'}}</text>
				<input 
					type="text" 
					class="search-input" 
					placeholder="搜索闲置物品" 
					v-model="searchKeyword"
					@confirm="onSearch"
				/>
			</view>
		</view>

		<!-- 瀑布流内容区 -->
		<scroll-view 
			scroll-y 
			class="content-list"
			@scrolltolower="loadMore"
			refresher-enabled
			:refresher-triggered="refreshing"
			@refresherrefresh="onRefresh"
		>
			<!-- 空状态显示 -->
			<view v-if="contentList.length === 0" class="empty-state">
				<image src="/static/images/empty.png" mode="aspectFit"></image>
				<text>暂无内容</text>
			</view>

			<!-- 瀑布流列表 -->
			<view v-else class="waterfall">
				<view class="waterfall-left">
					<view 
						v-for="item in leftList" 
						:key="item._id" 
						class="card" 
						@tap="navigateToDetail(item._id)"
					>
						<image 
							class="card-image" 
							:src="item.images[0] || '/static/images/content/default.jpg'" 
							mode="widthFix"
						/>
						<view class="card-content">
							<text class="title">{{item.title}}</text>
							<text class="desc">{{item.description}}</text>
							<text class="price" v-if="item.price">¥{{item.price}}</text>
							<view class="user-info">
								<image 
									class="avatar" 
									:src="item.userInfo.avatar || '/static/images/avatar/default.png'" 
									mode="aspectFill"
								/>
								<text class="nickname">{{item.userInfo.nickname}}</text>
							</view>
							<view class="action-btns">
								<button class="btn chat" @tap.stop="chatWithSeller(item)">私聊</button>
								<button class="btn buy" @tap.stop="buyItem(item)">购买</button>
							</view>
						</view>
					</view>
				</view>

				<view class="waterfall-right">
					<view 
						v-for="item in rightList" 
						:key="item._id" 
						class="card" 
						@tap="navigateToDetail(item._id)"
					>
						<image 
							class="card-image" 
							:src="item.images[0] || '/static/images/content/default.jpg'" 
							mode="widthFix"
						/>
						<view class="card-content">
							<text class="title">{{item.title}}</text>
							<text class="desc">{{item.description}}</text>
							<text class="price" v-if="item.price">¥{{item.price}}</text>
							<view class="user-info">
								<image 
									class="avatar" 
									:src="item.userInfo.avatar || '/static/images/avatar/default.png'" 
									mode="aspectFill"
								/>
								<text class="nickname">{{item.userInfo.nickname}}</text>
							</view>
							<view class="action-btns">
								<button class="btn chat" @tap.stop="chatWithSeller(item)">私聊</button>
								<button class="btn buy" @tap.stop="buyItem(item)">购买</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 加载状态 -->
			<view class="loading-state" v-if="contentList.length > 0">
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
			searchKeyword: '',
			contentList: [],
			loading: false,
			hasMore: true,
			hasAuth: false,
			currentSchool: '',
			pagination: {
				page: 1,
				pageSize: 10,
				total: 0,
				totalPage: 1
			}
		}
	},

	computed: {
		leftList() {
			return this.contentList.filter((_, index) => index % 2 === 0);
		},
		rightList() {
			return this.contentList.filter((_, index) => index % 2 === 1);
		}
	},

	onShow() {
		this.checkAuth();
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.loadContentList(true);
	},

	// 触底加载更多
	onReachBottom() {
		if (!this.loading && this.pagination.page < this.pagination.totalPage) {
			this.loadMore();
		}
	},

	methods: {
		// 检查认证状态
		async checkAuth() {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) {
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
				}
			} catch (error) {
				console.error('检查认证状态失败:', error);
			}
		},

		// 加载内容列表
		async loadContentList(reset = false) {
			if (reset) {
				this.pagination.page = 1;
				this.contentList = [];
			}

			if (this.loading || !this.hasAuth) return;

			this.loading = true;
			try {
				const res = await uniCloud.callFunction({
					name: 'getContentList',
					data: {
						collection: 'idles',
						keyword: this.searchKeyword,
						userId: uni.getStorageSync('userId'),
						page: this.pagination.page,
						pageSize: this.pagination.pageSize
					}
				});

				if (res.result.code === 0) {
					const { list, pagination } = res.result.data;
					if (reset) {
						this.contentList = list;
					} else {
						this.contentList = [...this.contentList, ...list];
					}
					this.pagination = pagination;
				} else {
					throw new Error(res.result.msg);
				}
			} catch (error) {
				console.error('获取内容列表失败:', error);
				uni.showToast({
					title: error.message || '获取数据失败',
					icon: 'none'
				});
			} finally {
				this.loading = false;
				uni.stopPullDownRefresh();
			}
		},

		// 搜索
		onSearch() {
			if (!this.searchKeyword.trim()) return;
			this.loadContentList(true);
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
				url: `/pages/idle/detail?id=${id}`
			});
		},

		// 私聊卖家
		chatWithSeller(item) {
			if (!this.hasAuth) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			uni.showToast({
				title: '私聊功能开发中',
				icon: 'none'
			});
		},

		// 购买商品
		buyItem(item) {
			if (!this.hasAuth) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			uni.showToast({
				title: '购买功能开发中',
				icon: 'none'
			});
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-top: 100rpx;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: #fff;
	padding: 20rpx 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.location-bar {
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 16rpx 24rpx;
	border-radius: 36rpx;
}

.location-icon {
	width: 32rpx;
	height: 32rpx;
	margin-right: 12rpx;
}

.location-text {
	font-size: 28rpx;
	color: #333;
	margin-right: 24rpx;
	padding-right: 24rpx;
	border-right: 1rpx solid #ddd;
}

.search-input {
	flex: 1;
	font-size: 28rpx;
	margin-left: 12rpx;
}

.content-list {
	height: calc(100vh - 100rpx);
}

.waterfall {
	display: flex;
	justify-content: space-between;
	padding: 20rpx;
}

.waterfall-left, .waterfall-right {
	width: 48%;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.waterfall-left {
	margin-top: -20rpx;
}

.card {
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.card-image {
	width: 100%;
	border-radius: 16rpx 16rpx 0 0;
}

.card-content {
	padding: 20rpx;
}

.title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	line-height: 1.4;
	margin-bottom: 8rpx;
}

.desc {
	font-size: 26rpx;
	color: #666;
	line-height: 1.6;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	margin-bottom: 12rpx;
}

.price {
	font-size: 32rpx;
	color: #ff5757;
	font-weight: bold;
	margin-bottom: 16rpx;
	display: block;
}

.user-info {
	display: flex;
	align-items: center;
	padding: 12rpx 0;
	border-top: 1rpx solid #f5f5f5;
}

.avatar {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	margin-right: 12rpx;
}

.nickname {
	font-size: 24rpx;
	color: #666;
	flex: 1;
}

.action-btns {
	display: flex;
	justify-content: space-between;
	gap: 16rpx;
	margin-top: 16rpx;
}

.btn {
	flex: 1;
	font-size: 24rpx;
	padding: 12rpx 0;
	border-radius: 32rpx;
	text-align: center;
	border: none;
}

.btn.chat {
	background: #fff;
	color: #ff5757;
	border: 1rpx solid #ff5757;
}

.btn.buy {
	background: #ff5757;
	color: #fff;
}

.empty-state {
	padding: 120rpx 0;
	text-align: center;
}

.empty-state image {
	width: 240rpx;
	height: 240rpx;
	margin-bottom: 20rpx;
}

.empty-state text {
	font-size: 28rpx;
	color: #999;
}

.loading-state {
	text-align: center;
	padding: 20rpx 0;
	color: #999;
	font-size: 24rpx;
}
</style>