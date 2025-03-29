<template>
	<view class="container">
		<!-- 未登录状态 -->
		<view class="auth-state" v-if="!isLoggedIn">
			<text class="auth-text">请先登录</text>
		</view>

		<!-- 未认证状态 -->
		<view class="auth-state" v-else-if="!isVerified">
			<text class="auth-text">请先认证</text>
		</view>

		<!-- 已认证状态 -->
		<block v-else>
			<!-- 内容列表 -->
			<scroll-view 
				class="content-list"
				scroll-y
				@scrolltolower="loadMore"
				refresher-enabled
				:refresher-triggered="isRefreshing"
				@refresherrefresh="onRefresh"
			>
				<view class="content-wrapper">
					<view 
						class="content-item"
						v-for="(item, index) in contentList"
						:key="item._id"
					>
						<!-- 用户信息 -->
						<view class="user-info">
							<view class="user-left" @tap="navigateToUser(item.userInfo._id)">
								<image class="avatar" :src="item.userInfo.avatar || '/static/images/avatar/default.png'" mode="aspectFill"/>
								<view class="user-meta">
									<view class="nickname-row">
										<text class="nickname">{{item.userInfo.nickname || '未知用户'}}</text>
									</view>
									<text class="time">{{item.timeText || '刚刚'}}</text>
								</view>
							</view>
						</view>
						
						<!-- 内容区域 -->
						<view class="content-body" @tap="navigateToDetail(item._id, false)">
							<text class="content-text">{{item.content}}</text>
							<view class="image-grid" v-if="item.images && item.images.length">
								<image 
									v-for="(img, imgIndex) in item.images.slice(0, 9)"
									:key="imgIndex"
									:src="img"
									mode="aspectFill"
									@tap.stop="previewImage(item.images, imgIndex)"
									:class="['grid-image', `grid-${item.images.length <= 4 ? item.images.length : 9}`]"
								/>
							</view>
						</view>

						<!-- 底部操作栏 -->
						<view class="action-bar">
							<view class="action-item comment" @tap="handleComment(item._id)">
								<image src="/static/images/icons/pinglun.png" mode="aspectFit" class="action-icon"/>
								<text>{{item.commentCount || '评论'}}</text>
							</view>
							<view class="action-item like" @tap="handleLike(item._id, index)">
								<image 
									:src="item.isLiked ? '/static/images/heart-filled.png' : '/static/images/heart.png'"
									mode="aspectFit"
									class="action-icon"
									:class="{'liked': item.isLiked}"
								/>
								<text :class="{'liked': item.isLiked}">{{item.likeCount || '点赞'}}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 加载状态 -->
				<view class="loading-state" v-if="isLoading">
					<uni-icons type="spinner-cycle" size="20" color="#999"/>
					<text>加载中...</text>
				</view>
				
				<!-- 空状态 -->
				<view class="empty-state" v-if="!isLoading && contentList.length === 0">
					<image src="/static/images/empty.png" mode="aspectFit"/>
					<text>暂无内容</text>
				</view>
			</scroll-view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLoggedIn: false,
			isVerified: false,
			contentList: [],
			isLoading: false,
			isRefreshing: false,
			page: 1,
			pageSize: 10,
			hasMore: true
		}
	},
	onShow() {
		console.log('任务列表页面显示');
		this.checkAuth();
		console.log('认证检查后状态:', {
			isLoggedIn: this.isLoggedIn,
			isVerified: this.isVerified
		});
		
		if (this.isLoggedIn && this.isVerified) {
			console.log('用户已登录且已认证，开始加载内容');
			// 重置页码和内容列表，确保每次显示页面都能获取最新数据
			this.page = 1;
			this.contentList = [];
			this.loadContentList(true);
		} else {
			console.log('用户未登录或未认证，不加载内容');
		}
		
		// 临时调试：打印所有帖子的点赞状态
		if (this.contentList && this.contentList.length > 0) {
			console.log('当前列表中的帖子点赞状态:');
			this.contentList.forEach(item => {
				console.log(`帖子 ${item._id}: isLiked=${item.isLiked}, likeCount=${item.likeCount}`);
			});
		}
	},
	methods: {
		async checkAuth() {
			const userId = uni.getStorageSync('userId');
			const userInfo = uni.getStorageSync('userInfo');
			
			const previousLoggedIn = this.isLoggedIn;
			const previousVerified = this.isVerified;
			
			this.isLoggedIn = !!userId;
			this.isVerified = userInfo?.educationInfo?.verified || false;
			
			console.log('认证状态:', {
				userId,
				isLoggedIn: this.isLoggedIn,
				isVerified: this.isVerified,
				userInfo: JSON.stringify(userInfo)
			});
			
			// 仅在首次加载或登录状态改变时才自动加载数据
			if ((this.isLoggedIn && this.isVerified) && 
			   (!previousLoggedIn || !previousVerified || this.contentList.length === 0)) {
				this.loadContentList(true);
			}
		},
		
		async loadContentList(showLoading = false) {
			if (this.isLoading) return;
			this.isLoading = true;
			
			if (showLoading) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
			}
			
			try {
				const userId = uni.getStorageSync('userId');
				console.log('开始获取帖子列表，当前用户ID:', userId);
				
				const res = await uniCloud.callFunction({
					name: 'getPosts',
					data: {
						page: this.page,
						pageSize: 10,
						currentUserId: userId,
						sortBy: 'createTime', 
						sortOrder: 'desc'
					},
					timeout: 30000 // 30秒超时
				});
				
				console.log('getPosts返回结果:', JSON.stringify(res.result));
				
				if (res.result.code === 0) {
					const { list, hasMore } = res.result.data;
					
					console.log('获取到帖子列表:', list ? list.length : 0, '条数据');
					
					if (!list || list.length === 0) {
						console.log('返回列表为空');
						if (this.page === 1) {
							this.contentList = [];
						}
						this.hasMore = false;
						return;
					}
					
					// 处理时间显示
					list.forEach(item => {
						const date = new Date(item.createTime);
						const now = new Date();
						const diff = now - date;
						
						if (diff < 60000) { // 小于1分钟
							item.timeText = '刚刚';
						} else if (diff < 3600000) { // 小于1小时
							item.timeText = Math.floor(diff / 60000) + '分钟前';
						} else if (diff < 86400000) { // 小于24小时
							item.timeText = Math.floor(diff / 3600000) + '小时前';
						} else if (diff < 2592000000) { // 小于30天
							item.timeText = Math.floor(diff / 86400000) + '天前';
						} else {
							item.timeText = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
						}
						
						// 确保isLiked是布尔值（服务器返回的值）
						item.isLiked = !!item.isLiked;
						
						// 只在特定条件下使用本地存储
						if (item.isLiked === false) { // 只有服务器明确返回false时才检查本地存储
							const likedPosts = uni.getStorageSync('likedPosts') || {};
							if (likedPosts[item._id] && 
								likedPosts[item._id].isLiked === true && 
								Date.now() - likedPosts[item._id].timestamp < 10 * 60 * 1000) { // 10分钟内的本地记录
								console.log('使用本地点赞状态:', item._id);
								item.isLiked = true;
							}
						}
						
						// 确保点赞数不为负数
						item.likeCount = Math.max(0, item.likeCount || 0);
						
						console.log(`帖子 ${item._id} 点赞状态:`, item.isLiked, '点赞数:', item.likeCount);
					});
					
					if (this.page === 1) {
						this.contentList = list;
					} else {
						this.contentList = [...this.contentList, ...list];
					}
					
					this.hasMore = hasMore;
					console.log('处理后内容列表长度:', this.contentList.length);
				} else {
					throw new Error(res.result.msg);
				}
			} catch (error) {
				console.error('加载失败:', error);
				let errorMsg = '加载失败';
				
				// 更友好的错误提示
				if (error.message && error.message.includes('time limit')) {
					errorMsg = '加载超时，请稍后重试';
				} else if (error.message && error.message.includes('fail:time out')) {
					errorMsg = '网络请求超时，请检查网络';
				} else if (error.message) {
					errorMsg = error.message;
				}
				
				uni.showToast({
					title: errorMsg,
					icon: 'none',
					duration: 3000
				});
				
				// 如果是首次加载失败且不是网络问题，可以重试一次
				if (this.page === 1 && this.contentList.length === 0 && !error.message?.includes('time out')) {
					setTimeout(() => {
						console.log('首次加载失败，自动重试...');
						this.loadContentList(false);
					}, 2000);
				}
			} finally {
				this.isLoading = false;
				if (showLoading) {
					uni.hideLoading();
				}
			}
		},
		
		async loadMore() {
			if (this.isLoading || !this.hasMore) return;
			this.page += 1;
			await this.loadContentList();
		},

		async onRefresh() {
			this.isRefreshing = true;
			this.page = 1;
			await this.loadContentList(true);
			this.isRefreshing = false;
		},

		previewImage(urls, current) {
			uni.previewImage({
				urls,
				current: urls[current]
			});
		},

		async handleLike(id, index) {
			if (!this.isLoggedIn) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			
			if (!this.isVerified) {
				uni.showToast({
					title: '请先认证',
					icon: 'none'
				});
				return;
			}
			
			// 防止重复点击
			if (this.contentList[index].likeLoading) {
				return;
			}
			
			// 设置点赞加载状态
			this.$set(this.contentList[index], 'likeLoading', true);
			
			// 记录原始状态，用于恢复
			const previousLikeState = this.contentList[index].isLiked || false;
			const previousCount = this.contentList[index].likeCount || 0;
			
			try {
				// 立即更新UI状态，提供即时反馈
				const newLikeState = !previousLikeState;
				this.$set(this.contentList[index], 'isLiked', newLikeState);
				this.$set(this.contentList[index], 'likeCount', Math.max(0, previousCount + (newLikeState ? 1 : -1)));
				
				// 同步更新本地存储
				const likedPosts = uni.getStorageSync('likedPosts') || {};
				if (newLikeState) {
					likedPosts[id] = {
						isLiked: true,
						timestamp: Date.now()
					};
				} else if (likedPosts[id]) {
					likedPosts[id].isLiked = false;
					likedPosts[id].timestamp = Date.now();
				}
				uni.setStorageSync('likedPosts', likedPosts);
				
				// 调用点赞API并添加时间戳避免缓存
				const timestamp = Date.now();
				const res = await uniCloud.callFunction({
					name: 'toggleLike',
					data: {
						userId: uni.getStorageSync('userId'),
						targetId: id,
						type: 'post',
						timestamp: timestamp
					}
				});
				
				// 处理API返回结果
				if (res.result && res.result.code === 0) {
					// API成功，使用返回的实际数据更新UI
					if (res.result.data) {
						// 明确更新isLiked状态
						if (typeof res.result.data.isLiked === 'boolean') {
							this.$set(this.contentList[index], 'isLiked', res.result.data.isLiked);
						}
						
						// 更新点赞数
						if (typeof res.result.data.likeCount === 'number') {
							this.$set(this.contentList[index], 'likeCount', res.result.data.likeCount);
						}
						
						// 同步服务器返回的状态到本地存储
						if (typeof res.result.data.isLiked === 'boolean') {
							likedPosts[id] = {
								isLiked: res.result.data.isLiked,
								timestamp: Date.now()
							};
							uni.setStorageSync('likedPosts', likedPosts);
						}
					}
				} else {
					// API失败，恢复之前的状态
					this.$set(this.contentList[index], 'isLiked', previousLikeState);
					this.$set(this.contentList[index], 'likeCount', previousCount);
					
					// 恢复本地存储
					if (previousLikeState) {
						likedPosts[id] = { isLiked: true, timestamp: Date.now() };
					} else if (likedPosts[id]) {
						likedPosts[id].isLiked = false;
					}
					uni.setStorageSync('likedPosts', likedPosts);
					
					throw new Error(res.result?.msg || '操作失败');
				}
			} catch (error) {
				console.error('点赞操作失败:', error);
				uni.showToast({
					title: error.message || '操作失败',
					icon: 'none'
				});
			} finally {
				// 延迟解除加载状态，防止快速点击
				setTimeout(() => {
					this.$set(this.contentList[index], 'likeLoading', false);
				}, 300);
			}
		},

		handleComment(id) {
			uni.navigateTo({
				url: `/pages/task/detail?id=${id}&toComment=1`
			});
		},

		navigateToDetail(id, toComment = false) {
			uni.navigateTo({
				url: `/pages/task/detail?id=${id}${toComment ? '&toComment=1' : ''}`
			});
		},

		navigateToUser(userId) {
			uni.navigateTo({
				url: `/pages/user/profile?id=${userId}`
			});
		},
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: #f8f8f8;
	padding-bottom: env(safe-area-inset-bottom);
}

.auth-state {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
}

.auth-text {
	font-size: 32rpx;
	color: #666;
}

.content-list {
	height: calc(100vh - var(--window-top));
	box-sizing: border-box;
	padding-bottom: calc(100rpx + env(safe-area-inset-bottom)); /* 调整底部间距 */
}

.content-wrapper {
	padding: 20rpx;
	padding-bottom: 120rpx; /* 为底部留出足够空间 */
}

.content-item {
	margin-bottom: 24rpx;
	background: #fff;
	padding: 28rpx 24rpx;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
	transition: all 0.3s ease;
}

.content-item:active {
	transform: scale(0.98);
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.user-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}

.user-left {
	display: flex;
	align-items: center;
	flex: 1;
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 16rpx;
	border: 2rpx solid #fff;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.user-meta {
	flex: 1;
}

.nickname-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.nickname {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.time {
	font-size: 24rpx;
	color: #999;
}

.content-body {
	margin-bottom: 16rpx;
}

.content-text {
	font-size: 30rpx;
	color: #333;
	line-height: 1.6;
	margin-bottom: 16rpx;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 6; /* 最多显示6行 */
	-webkit-box-orient: vertical;
}

.image-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 4rpx;
}

.grid-image {
	background: #f5f5f5;
	border-radius: 8rpx;
}

.grid-1 {
	width: 500rpx;
	height: 500rpx;
}

.grid-2, .grid-4 {
	width: calc(50% - 2rpx);
	height: 300rpx;
}

.grid-3, .grid-5, .grid-6, .grid-7, .grid-8, .grid-9 {
	width: calc(33.33% - 3rpx);
	height: 200rpx;
}

.action-bar {
	display: flex;
	justify-content: space-around;
	padding: 20rpx 0 10rpx;
	border-top: 1rpx solid #f5f5f5;
	margin-top: 16rpx;
	width: 100%; /* 确保宽度充满父容器 */
}

.action-item {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12rpx 20rpx;
	border-radius: 30rpx;
	transition: all 0.3s;
	flex: 1; /* 让操作按钮平均分配空间 */
	max-width: 45%; /* 限制最大宽度，避免过度拉伸 */
}

.action-item:active {
	background: #f5f5f5;
}

.action-icon {
	width: 44rpx;
	height: 44rpx;
	transition: all 0.3s;
	margin-right: 8rpx;
}

.action-item text {
	font-size: 28rpx;
	color: #666;
	transition: all 0.2s;
}

.action-item text.liked {
	color: #ff5757;
	font-weight: 500;
}

.action-item.comment:active {
	background: rgba(102, 102, 255, 0.1);
}

.action-item.like:active {
	background: rgba(255, 102, 102, 0.1);
}

.action-item.comment {
	color: #666;
}

.action-item.like {
	color: #ff5757;
}

.action-item.like .action-icon.liked {
	transform: scale(1.1);
}

.loading-state {
	text-align: center;
	padding: 30rpx;
	color: #999;
	font-size: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	width: 100%; /* 确保加载状态显示完整 */
}

.empty-state {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
}

.empty-state image {
	width: 200rpx;
	height: 200rpx;
	margin-bottom: 20rpx;
}

.empty-state text {
	font-size: 28rpx;
	color: #999;
	display: block;
}

.dev-tools {
	display: none;
}

.dev-btn {
	display: none;
}

/* 在这里添加一个重置样式 */
view, text, image {
	box-sizing: border-box;
	max-width: 100%;
}
</style>