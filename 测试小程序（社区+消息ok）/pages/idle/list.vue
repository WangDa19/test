<template>
	<view class="container">
		<!-- 顶部搜索和定位 -->
		<view class="header">
			<view class="search-wrapper">
				<view class="search-bar">
					<view class="location-mini">
						<image src="/static/images/local.png" mode="aspectFit" class="location-icon"/>
						<text>{{currentSchool || '请认证'}}</text>
					</view>
					<view class="search-input">
						<uni-icons type="search" size="16" color="#666"/>
						<input 
							type="text" 
							placeholder="搜索闲置物品" 
							v-model="searchKeyword"
							@confirm="onSearch"
						/>
					</view>
				</view>
				<view class="search-btn" @tap="onSearch">
					<image src="/static/images/icons/sousuo.png" mode="aspectFit" class="search-icon"/>
				</view>
			</view>
			
			<scroll-view scroll-x class="category-scroll" show-scrollbar="false">
				<view class="category-list">
					<view 
						v-for="(tab, index) in tabs" 
						:key="index"
						:class="['category-item', activeTab === index ? 'active' : '']"
						@tap="switchTab(index)"
					>
						<text>{{tab.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 瀑布流商品列表 -->
		<scroll-view 
			scroll-y 
			class="goods-container"
			@scrolltolower="loadMore"
			refresher-enabled
			:refresher-triggered="refreshing"
			@refresherrefresh="onRefresh"
		>
			<!-- 空状态 -->
			<view v-if="contentList.length === 0" class="empty-state">
				<image src="/static/images/empty.png" mode="aspectFit"></image>
				<text>{{emptyText}}</text>
			</view>

			<!-- 瀑布流列表 -->
			<view v-else class="waterfall">
				<view class="waterfall-left">
					<view 
						v-for="(item, index) in leftList" 
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
							<text class="desc">{{item.content || item.description}}</text>
							<view class="price-row">
								<view class="price-info">
									<text class="price">¥{{item.price}}</text>
									<text class="original-price" v-if="item.originalPrice">¥{{item.originalPrice}}</text>
								</view>
								<view class="cart-btn" @tap.stop="addToCart(item)">
									<image src="/static/images/shoppingcar.png" mode="aspectFit" class="cart-icon"/>
								</view>
							</view>
							<view class="user-info">
								<image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
								<text class="nickname">{{item.userInfo.nickname}}</text>
							</view>
							<view class="action-buttons">
								<button class="action-btn chat" @tap.stop="chatWithSeller(item)">私聊</button>
								<button class="action-btn buy" @tap.stop="buyItem(item)">购买</button>
							</view>
						</view>
					</view>
				</view>
				
				<view class="waterfall-right">
					<view 
						v-for="(item, index) in rightList" 
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
							<text class="desc">{{item.content || item.description}}</text>
							<view class="price-row">
								<view class="price-info">
									<text class="price">¥{{item.price}}</text>
									<text class="original-price" v-if="item.originalPrice">¥{{item.originalPrice}}</text>
								</view>
								<view class="cart-btn" @tap.stop="addToCart(item)">
									<image src="/static/images/shoppingcar.png" mode="aspectFit" class="cart-icon"/>
								</view>
							</view>
							<view class="user-info">
								<image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
								<text class="nickname">{{item.userInfo.nickname}}</text>
							</view>
							<view class="action-buttons">
								<button class="action-btn chat" @tap.stop="chatWithSeller(item)">私聊</button>
								<button class="action-btn buy" @tap.stop="buyItem(item)">购买</button>
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
			currentSchool: '',
			searchKeyword: '',
			tabs: [
				{ name: '全部', value: '' },
				{ name: '电子产品', value: 'electronics' },
				{ name: '图书教材', value: 'books' },
				{ name: '日用百货', value: 'daily' },
				{ name: '服装鞋帽', value: 'clothing' }
			],
			activeTab: 0,
			contentList: [],
			pagination: {
				page: 1,
				pageSize: 10,
				total: 0,
				totalPage: 1
			},
			refreshing: false,
			loading: false,
			hasAuth: false,
			emptyText: '暂无内容',
			collectedItems: []
		}
	},

	computed: {
		// 左侧列表
		leftList() {
			return this.contentList.filter((_, index) => index % 2 === 0);
		},
		// 右侧列表
		rightList() {
			return this.contentList.filter((_, index) => index % 2 === 1);
		}
	},

	onShow() {
		this.checkAuth();
		this.loadCollectedItems();
	},

	methods: {
		// 检查认证状态
		async checkAuth() {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) {
					this.emptyText = '请先登录';
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
					this.emptyText = '请先完成位置认证';
				}
			} catch (error) {
				console.error('检查认证状态失败:', error);
			}
		},

		// 搜索方法
		onSearch() {
			if (!this.searchKeyword.trim()) return;
			this.loadContentList(true);
		},

		// 格式化价格显示
		formatPrice(price) {
			if (typeof price === 'undefined' || price === null) {
				return '0.00';
			}
			return parseFloat(price).toFixed(2);
		},

		// 修改加载内容列表方法
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
						category: this.tabs[this.activeTab].value,
						keyword: this.searchKeyword,
						userId: uni.getStorageSync('userId'),
						page: this.pagination.page,
						pageSize: this.pagination.pageSize
					}
				});

				if (res.result.code === 0) {
					const { list, pagination } = res.result.data;
					
					// 处理价格显示
					const processedList = list.map(item => ({
						...item,
						price: this.formatPrice(item.price),
						originalPrice: item.originalPrice ? this.formatPrice(item.originalPrice) : null
					}));

					if (reset) {
						this.contentList = processedList;
					} else {
						this.contentList = [...this.contentList, ...processedList];
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
				this.refreshing = false;
			}
		},

		// 切换分类
		switchTab(index) {
			if (this.activeTab === index) return;
			this.activeTab = index;
			this.loadContentList(true);
		},

		// 下拉刷新
		async onRefresh() {
			this.refreshing = true;
			await this.loadContentList(true);
		},

		// 加载更多
		loadMore() {
			if (this.pagination.page >= this.pagination.totalPage) return;
			this.pagination.page++;
			this.loadContentList();
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
			// TODO: 实现私聊功能
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
			// TODO: 实现购买功能
			uni.showToast({
				title: '购买功能开发中',
				icon: 'none'
			});
		},

		// 跳转到详情页
		navigateToDetail(id) {
			uni.navigateTo({
				url: `/pages/idle/detail?id=${id}`
			});
		},

		// 加载收藏列表
		async loadCollectedItems() {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) return;
				
				const db = uniCloud.database();
				const res = await db.collection('collections').where({
					userId: userId,
					type: 'idle'
				}).get();
				
				this.collectedItems = res.data.map(item => item.contentId);
			} catch (error) {
				console.error('加载收藏列表失败:', error);
			}
		},

		// 添加到购物车
		async addToCart(item) {
			if (!this.hasAuth) {
				uni.showToast({
					title: '请先登录',
					icon: 'none',
					position: 'center'
				});
				return;
			}
			
			// 不能收藏自己的商品
			if (item.userId === uni.getStorageSync('userId')) {
				uni.showToast({
					title: '不能收藏自己的商品',
					icon: 'none',
					position: 'center'
				});
				return;
			}
			
			try {
				const userId = uni.getStorageSync('userId');
				
				const res = await uniCloud.callFunction({
					name: 'toggleCollection',
					data: {
						userId,
						contentId: item._id,
						type: 'idle',
						content: {
							_id: item._id,
							title: item.title,
							content: item.content,
							price: item.price,
							images: item.images || [],
							userId: item.userId,
							userInfo: item.userInfo
						}
					}
				});
				
				if (res.result.code === 0) {
					// 更新本地收藏状态
					if (res.result.data.collected) {
						this.collectedItems.push(item._id);
					} else {
						this.collectedItems = this.collectedItems.filter(id => id !== item._id);
					}
					
					uni.showToast({
						title: res.result.msg,
						icon: 'success',
						position: 'center'
					});
				} else {
					throw new Error(res.result.msg);
				}
			} catch (error) {
				console.error('操作失败:', error);
				uni.showToast({
					title: '操作失败',
					icon: 'none',
					position: 'center'
				});
			}
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background-color: #f8f8f8;
}

.header {
	background-color: #fff;
	padding: 15rpx 30rpx;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.search-wrapper {
	margin-bottom: 15rpx;
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.search-bar {
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 8rpx 20rpx;
	border-radius: 36rpx;
	height: 64rpx;
	flex: 1;
}

.location-mini {
	display: flex;
	align-items: center;
	padding-right: 20rpx;
	border-right: 1rpx solid #ddd;
	margin-right: 20rpx;
	width: 45%;
	flex-shrink: 0;
}

.location-icon {
	width: 32rpx;
	height: 32rpx;
	margin-right: 8rpx;
	flex-shrink: 0;
}

.location-mini text {
	font-size: 26rpx;
	color: #666;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
}

.search-input {
	width: 55%;
	display: flex;
	align-items: center;
	position: relative;
}

.search-input input {
	flex: 1;
	margin-left: 12rpx;
	font-size: 26rpx;
}

.search-btn {
	width: 64rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.search-icon {
	width: 40rpx;
	height: 40rpx;
}

.category-scroll {
	white-space: nowrap;
}

.category-list {
	display: flex;
	padding: 5px 0;
}

.category-item {
	padding: 8px 20px;
	margin-right: 12px;
	border-radius: 20px;
	background-color: #f5f5f5;
	transition: all 0.3s;
}

.category-item.active {
	background-color: #ff5757;
	transform: scale(1.05);
}

.category-item text {
	font-size: 14px;
	color: #666;
}

.category-item.active text {
	color: #fff;
}

.goods-container {
	margin-top: 120px;
	height: calc(100vh - 120px);
	padding: 10px;
}

.waterfall {
	display: flex;
	justify-content: space-between;
	padding-top: 100rpx;
	margin: 0 10rpx;
}

.waterfall-left, .waterfall-right {
	width: 48%;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.waterfall-left {
	margin-top: -40rpx; /* 增加左侧列的偏移量 */
}

.card {
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	transition: all 0.3s;
}

.card:active {
	transform: scale(0.98);
}

.card-image {
	width: 100%;
	border-radius: 12rpx 12rpx 0 0;
}

.card-content {
	padding: 16rpx;
}

.title {
	font-size: 28rpx;
	color: #333;
	font-weight: bold;
	line-height: 1.4;
	margin-bottom: 8rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.4;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	margin-bottom: 8rpx;
}

.price-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 12rpx 0;
}

.price-info {
	display: flex;
	align-items: baseline;
}

.price {
	font-size: 32rpx;
	color: #ff5757;
	font-weight: bold;
}

.original-price {
	font-size: 24rpx;
	color: #999;
	text-decoration: line-through;
	margin-left: 8rpx;
}

.cart-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.cart-icon {
	width: 40rpx;
	height: 40rpx;
}

.user-info {
	display: flex;
	align-items: center;
	padding-top: 12rpx;
	border-top: 1rpx solid #f5f5f5;
	margin-top: 12rpx;
}

.avatar {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	border: 2rpx solid #fff;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.nickname {
	font-size: 24rpx;
	color: #666;
	margin-left: 8rpx;
	flex: 1;
}

.action-buttons {
	display: flex;
	justify-content: space-between;
	gap: 10rpx;
	margin-top: 12rpx;
}

.action-btn {
	flex: 1;
	padding: 8rpx 0;
	border-radius: 6rpx;
	font-size: 24rpx;
	text-align: center;
	border: none;
	transition: all 0.3s;
}

.action-btn.chat {
	background-color: #fff;
	border: 1rpx solid #ff5757;
	color: #ff5757;
}

.action-btn.chat:active {
	background-color: #fff5f5;
}

.action-btn.buy {
	background-color: #ff5757;
	color: #fff;
}

.action-btn.buy:active {
	background-color: #ff4242;
}

.loading-state {
	text-align: center;
	padding: 20rpx 0;
	color: #999;
	font-size: 24rpx;
}

.empty-state {
	padding: 50px 0;
	text-align: center;
}

.empty-state image {
	width: 150px;
	height: 150px;
	opacity: 0.8;
}

.empty-state text {
	display: block;
	color: #999;
	font-size: 14px;
	margin-top: 10px;
}
</style>