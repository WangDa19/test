<template>
	<view class="container">
		<!-- 状态筛选栏 -->
		<view class="filter-bar">
			<view 
				v-for="(item, index) in statusOptions" 
				:key="index"
				class="filter-item"
				:class="{ active: currentStatus === item.value }"
				@tap="switchStatus(item.value)"
			>
				<text>{{item.label}}</text>
			</view>
		</view>

		<!-- 任务列表 -->
		<scroll-view 
			class="task-list"
			scroll-y
			refresher-enabled
			:refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh"
		>
			<view 
				class="task-item"
				v-for="(item, index) in taskList"
				:key="item.id"
				@tap="navigateToDetail(item.id)"
			>
				<view class="task-header">
					<image class="avatar" :src="item.avatar" mode="aspectFill"/>
					<view class="user-info">
						<text class="nickname">{{item.nickname}}</text>
						<text class="time">{{item.time}}</text>
					</view>
					<view class="status-tag" :class="item.status">{{item.statusText}}</view>
				</view>
				
				<view class="task-body">
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.description}}</view>
					<view class="image-grid" v-if="item.images && item.images.length">
						<image 
							v-for="(img, imgIndex) in item.images.slice(0, 3)"
							:key="imgIndex"
							:src="img"
							mode="aspectFill"
							@tap.stop="previewImage(item.images, imgIndex)"
						/>
					</view>
				</view>

				<view class="task-footer">
					<view class="tags">
						<view class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
							{{tag}}
						</view>
					</view>
				</view>
			</view>

			<!-- 加载状态 -->
			<view class="loading" v-if="isLoading">
				<uni-icons type="spinner-cycle" size="20" color="#999"/>
				<text>加载中...</text>
			</view>
			
			<!-- 空状态 -->
			<view class="empty-state" v-if="!isLoading && taskList.length === 0">
				<image src="/static/images/empty.png" mode="aspectFit"/>
				<text>暂无任务</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'published'
		}
	},
	data() {
		return {
			statusOptions: [
				{ label: '全部状态', value: 'all' },
				{ label: '待接单', value: 'active' },
				{ label: '进行中', value: 'accepted' },
				{ label: '已完成', value: 'completed' }
			],
			currentStatus: 'all',
			allTasks: [],
			taskList: [],
			isLoading: false,
			isRefreshing: false
		}
	},
	created() {
		this.loadTaskList()
	},
	methods: {
		// 切换状态
		switchStatus(status) {
			this.currentStatus = status
			this.filterTasks()
		},
		// 跳转到详情页
		navigateToDetail(id) {
			// 根据任务类型跳转到不同的详情页
			const task = this.taskList.find(t => t.id === id);
			if (!task) return;

			const isSkillTask = task.taskType.startsWith('skill_');
			uni.navigateTo({
				url: isSkillTask ? 
					`/pages/skill/detail?id=${id}` :
					`/pages/errand/detail?id=${id}`
			});
		},
		// 预览图片
		previewImage(urls, current) {
			uni.previewImage({
				urls,
				current: urls[current]
			})
		},
		// 刷新列表
		async onRefresh() {
			this.isRefreshing = true
			await this.loadTaskList()
			this.isRefreshing = false
		},
		// 过滤任务
		filterTasks() {
			if (this.currentStatus === 'all') {
				// 根据任务类型筛选（published/accepted）
				this.taskList = this.allTasks.filter(task => {
					const [taskCategory, taskType] = task.taskType.split('_');
					return taskType === this.type;
				});
			} else {
				// 按状态和类型筛选
				this.taskList = this.allTasks.filter(task => {
					const [taskCategory, taskType] = task.taskType.split('_');
					return taskType === this.type && task.status === this.currentStatus;
				});
			}
		},
		// 加载任务列表
		async loadTaskList() {
			if (this.isLoading) return
			this.isLoading = true
			
			try {
				const userId = uni.getStorageSync('userId')
				if (!userId) {
					throw new Error('请先登录')
				}
				
				const res = await uniCloud.callFunction({
					name: 'getMyAllTasks',
					data: { userId }
				})
				
				if (res.result.code === 0) {
					this.allTasks = res.result.data
					this.filterTasks()
				} else {
					throw new Error(res.result.msg)
				}
			} catch (error) {
				uni.showToast({
					title: error.message || '加载失败',
					icon: 'none'
				})
			} finally {
				this.isLoading = false
			}
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: #f8f8f8;
}

.filter-bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 88rpx;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-bottom: 1rpx solid #eee;
	z-index: 99;
}

.filter-item {
	height: 88rpx;
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: #666;
	position: relative;
}

.filter-item.active {
	color: #007AFF;
	font-weight: 500;
}

.filter-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 4rpx;
	background: #007AFF;
	border-radius: 2rpx;
}

.task-list {
	margin-top: 88rpx;
	height: calc(100vh - 88rpx);
	padding: 20rpx;
}

.task-item {
	background: #fff;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.task-header {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	margin-right: 16rpx;
}

.user-info {
	flex: 1;
}

.nickname {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.time {
	font-size: 24rpx;
	color: #999;
	margin-top: 4rpx;
}

.status-tag {
	font-size: 24rpx;
	padding: 4rpx 12rpx;
	border-radius: 4rpx;
}

.status-tag.active {
	color: #ff9900;
	background: rgba(255, 153, 0, 0.1);
}

.status-tag.accepted {
	color: #007AFF;
	background: rgba(0, 122, 255, 0.1);
}

.status-tag.completed {
	color: #52c41a;
	background: rgba(82, 196, 26, 0.1);
}

.task-body {
	margin-bottom: 20rpx;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 12rpx;
}

.desc {
	font-size: 28rpx;
	color: #666;
	line-height: 1.5;
}

.image-grid {
	display: flex;
	gap: 8rpx;
	margin-top: 16rpx;
}

.image-grid image {
	width: 180rpx;
	height: 180rpx;
	border-radius: 8rpx;
}

.task-footer {
	border-top: 1rpx solid #f5f5f5;
	padding-top: 20rpx;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
}

.tag {
	font-size: 24rpx;
	color: #666;
	background: #f5f5f5;
	padding: 4rpx 12rpx;
	border-radius: 4rpx;
}

.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	color: #999;
	font-size: 24rpx;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 0;
}

.empty-state image {
	width: 200rpx;
	height: 200rpx;
	margin-bottom: 20rpx;
}

.empty-state text {
	font-size: 28rpx;
	color: #999;
}
</style> 