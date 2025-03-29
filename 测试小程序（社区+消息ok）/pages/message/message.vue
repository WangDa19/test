<template>
	<view class="container">
		<!-- 消息分类导航 -->
		<view class="message-nav">
			<view class="nav-buttons">
				<view 
					class="nav-button" 
					:class="{'active': currentType === 'interaction'}" 
					@tap="changeTab('interaction')"
				>
					<view class="icon-circle interaction-icon" :class="{'active': currentType === 'interaction'}">
						<text class="icon-text">👤</text>
				</view>
					<text class="nav-text">互动</text>
			</view>
				<view 
					class="nav-button" 
					:class="{'active': currentType === 'chat'}" 
					@tap="changeTab('chat')"
				>
					<view class="icon-circle chat-icon" :class="{'active': currentType === 'chat'}">
						<text class="icon-text">💬</text>
				</view>
				<text class="nav-text">聊天</text>
			</view>
				<view 
					class="nav-button" 
					:class="{'active': currentType === 'system'}" 
					@tap="changeTab('system')"
				>
					<view class="icon-circle system-icon" :class="{'active': currentType === 'system'}">
						<text class="icon-text">🔔</text>
				</view>
					<text class="nav-text">系统</text>
				</view>
			</view>
		</view>

		<!-- 内容区域 -->
		<view class="content-area">
			<!-- 互动消息列表 -->
			<view class="message-list" v-if="currentType === 'interaction'">
				<view v-if="interactionList.length === 0 && !interactionLoading" class="empty-tip">
					暂无互动消息
						</view>
				<view v-else class="interaction-list">
					<view v-for="(item, index) in interactionList" :key="item._id" class="interaction-item" 
						  @tap="navigateToInteraction(item)" @longpress="showDeleteConfirm(item, index)">
						<image class="avatar" :src="item.senderAvatar" mode="aspectFill"></image>
						<view class="interaction-content">
							<view class="interaction-header">
								<text class="nickname">{{item.senderNickname || '用户'}}</text>
								<text class="time">{{formatTime(item.createTime)}}</text>
				</view>
							<view class="interaction-body">
								<view class="content">{{item.displayContent || item.content || ''}}</view>
								<!-- 评论图片显示 -->
								<view class="interaction-image" v-if="item.fileID && item.fileID.length > 0" 
									  @tap.stop="previewCommentImage(item.fileID, $event)">
									<image :src="item.fileID[0]" mode="aspectFill"></image>
						</view>
					</view>
							<view class="interaction-meta" v-if="item.postId">
								<view class="interaction-post-info" v-if="item.contentProcessed">
									<uni-icons type="chatbubble" size="14" color="#999"></uni-icons>
									<text>{{item.postContent}}</text>
				</view>
								<view class="interaction-post-info" v-else>
									<uni-icons type="info" size="14" color="#999"></uni-icons>
									<text>加载帖子内容中...</text>
				</view>
								<!-- 显示帖子图片 -->
								<view class="post-images" v-if="item.postImages && item.postImages.length > 0">
									<view class="post-image" v-for="(img, imgIndex) in item.postImages.slice(0, 3)" :key="imgIndex"
										  @tap.stop="previewPostImage(item.postImages, imgIndex, $event)">
										<image :src="img" mode="aspectFill"></image>
			</view>
									<text class="more-images" v-if="item.postImages.length > 3">+{{item.postImages.length - 3}}</text>
					</view>
					</view>
				</view>
						<view class="unread-dot" v-if="!item.isRead"></view>
					</view>
					<view v-if="interactionLoading" class="loading-more">加载中...</view>
				</view>
			</view>

			<!-- 聊天消息列表 -->
			<view class="message-list" v-else-if="currentType === 'chat'">
				<view v-if="chatList.length === 0 && !chatLoading" class="empty-tip">
					暂无聊天消息
						</view>
				<view v-else class="chat-list">
					<view 
						v-for="(item, index) in chatList" 
						:key="item._id" 
						class="chat-item" 
						@tap="navigateToChat(item)"
						@longpress="showChatDeleteConfirm(item, index)"
					>
						<image class="avatar" :src="item.targetUserAvatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
						<view class="chat-content">
							<view class="chat-header">
								<text class="nickname">{{item.targetUserNickname || '用户'}}</text>
								<text class="time">{{formatTime(item.lastMessageTime)}}</text>
							</view>
							<view class="chat-body">
								<text class="last-message">{{item.lastMessage || ''}}</text>
							</view>
						</view>
						<view class="unread-badge" v-if="item.unreadCount > 0">{{item.unreadCount > 99 ? '99+' : item.unreadCount}}</view>
					</view>
					<view v-if="chatLoading" class="loading-more">加载中...</view>
					</view>
				</view>

			<!-- 系统消息列表 - 始终显示"暂无系统消息" -->
			<view class="message-list" v-else-if="currentType === 'system'">
				<view class="empty-tip">
					暂无系统消息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentType: 'interaction',  // 默认显示互动消息
			interactionList: [],
			chatList: [],
			interactionPage: 1,
			chatPage: 1,
			interactionLoading: false,
			chatLoading: false,
			refreshingInteraction: false,
			refreshingChat: false,
			hasMoreInteractions: true,
			hasMoreChats: true,
			pageSize: 20,
			showDebugTools: false, // 是否显示调试工具
			debugItem: null,
			activeTab: 0,
			user: null,
			actionSheetVisible: false,
			currentItem: null,
			currentIndex: -1,
			reportOptions: [
				{ text: '垃圾信息', value: 'spam' },
				{ text: '违法违规', value: 'illegal' },
				{ text: '色情低俗', value: 'pornography' },
				{ text: '人身攻击', value: 'attack' },
				{ text: '引人不适', value: 'uncomfortable' }
			],
			fallbackData: [],
			useFallback: false,
			lastSuccessTime: null
		}
	},
	onLoad() {
		this.checkAuth();
		this.loadInteractions(true);
	},
	onShow() {
		console.log('message页面显示');
		// 检查登录状态
		this.checkAuth();
		
		// 确保不会重复加载：只在页面已显示且没有加载中状态时才刷新数据
		if (this.currentType === 'interaction' && !this.interactionLoading) {
			console.log('页面显示时加载互动消息');
			this.debugInteractionState(); // 添加调试信息
			this.loadInteractions(true);
		} else if (this.currentType === 'chat' && !this.chatLoading) {
			console.log('页面显示时加载聊天消息');
			this.loadChats(true);
		}
		
		// 设置tabbar选中状态
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1
			});
		}
	},
	methods: {
		checkAuth() {
			const userId = uni.getStorageSync('userId');
			console.log('检查登录状态，用户ID:', userId);
			
			// 仅设置登录状态，不加载数据
			if (!userId) {
				console.log('用户未登录，清空数据');
				this.interactionList = [];
				this.chatList = [];
				
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return false;
			}
			
			// 用户已登录，返回true
			return true;
		},
		
		changeTab(type) {
			if (this.currentType === type) return;
			
			console.log('切换到', type, '当前是', this.currentType);
			
			// 更新当前类型
			this.currentType = type;
			
			// 清空原有状态
			if (type === 'interaction') {
				this.interactionList = [];
				this.interactionPage = 1;
				// 不要在这里设置loading为true，避免重复设置
				this.hasMoreInteractions = true;
				
				// 立即加载互动消息
				this.$nextTick(() => {
					this.loadInteractions(true);
				});
			} else if (type === 'chat') {
				this.chatList = [];
				this.chatPage = 1;
				// 不要在这里设置loading为true，避免重复设置
				this.hasMoreChats = true;
				
				// 立即加载聊天列表
				this.$nextTick(() => {
					this.loadChats(true);
				});
			}
		},
		
		// 优化云函数调用方法，增加超时和重试功能
		async callCloudFunction(name, data, options = {}) {
			// 针对不同云函数设置不同的默认超时时间
			let defaultTimeout = 15000; // 默认15秒
			if (name === 'getInteractions') {
				defaultTimeout = 30000; // 互动消息查询给30秒
			} else if (name === 'getChatList') {
				defaultTimeout = 20000; // 聊天列表查询给20秒
			}
			
			const { 
				timeout = defaultTimeout, 
				retries = name === 'getInteractions' ? 3 : 2, // 互动消息增加重试次数
				showError = true 
			} = options;
			
			let attemptCount = 0;
			let lastError = null;
			
			console.log(`准备调用云函数 ${name}，最大重试次数: ${retries}，超时时间: ${timeout}ms`);
			
			while (attemptCount <= retries) {
				try {
					await this.checkNetwork(); // 新增网络检查
					uni.showLoading({
						title: attemptCount > 0 ? `重试中(${attemptCount}/${retries})` : '请求中',
						mask: true
					});
					
					console.log(`调用云函数 ${name}，参数:`, data, `第${attemptCount + 1}次尝试`);
					
					const result = await uniCloud.callFunction({
						name,
						data,
						timeout
					});
					
					uni.hideLoading();
					console.log(`云函数 ${name} 调用成功`);
					return result;
				} catch (error) {
					uni.hideLoading();
					lastError = error;
					console.error(`云函数 ${name} 调用失败(第${attemptCount + 1}次):`, error);
					
					// 检查是否是超时或网络错误，这些错误值得重试
					const isRetryable = error.message && (
						error.message.includes('timeout') || 
						error.message.includes('time out') || 
						error.message.includes('fail') ||
						error.message.includes('network') ||
						error.message.includes('网络') ||
						error.message.includes('connection')
					);
					
					if (!isRetryable || attemptCount >= retries) {
						console.log(`不再重试: ${!isRetryable ? '非可重试错误' : '已达到最大重试次数'}`);
						break; // 不可重试的错误或已达到最大重试次数
					}
					
					// 重试前等待一段时间，避免立即重试
					const waitTime = 1000 * Math.pow(2, attemptCount); // 指数退避策略
					console.log(`等待 ${waitTime}ms 后重试...`);
					
					// 显示重试提示
					uni.showToast({
						title: `请求超时，${Math.round(waitTime/1000)}秒后重试`,
						icon: 'none',
						duration: waitTime
					});
					
					await new Promise(resolve => setTimeout(resolve, waitTime));
				}
				
				attemptCount++;
			}
			
			// 所有重试失败后，显示错误并抛出异常
			if (showError) {
				uni.showToast({
					title: lastError && lastError.message && lastError.message.includes('time out') ? 
						'网络请求超时，请检查网络' : '网络请求失败，请稍后重试',
					icon: 'none',
					duration: 3000
				});
			}
			
			throw lastError;
		},
		
		// 新增降级加载方法
		async loadWithFallback() {
			try {
				const res = await this.callCloudFunction('getInteractions', {
					userId: uni.getStorageSync('userId'),
					page: this.interactionPage,
					pageSize: 20
				}, {
					timeout: 30000,
					retries: 2
				});

				if (res.result.code === 0) {
					this.lastSuccessTime = Date.now();
					this.useFallback = false;
					return res.result.data;
				}
			} catch (e) {
				console.error('主策略失败，尝试降级:', e);
			}

			if (Date.now() - this.lastSuccessTime < 300000) {
				return this.fallbackData;
			}
			
			const cache = uni.getStorageSync('interactionsCache') || [];
			return {
				list: cache.slice(0, 20),
				hasMore: cache.length > 20,
				total: cache.length
			};
		},
		
		// 修改loadInteractions方法，添加保护机制
		async loadInteractions(reset = true) {
				const userId = uni.getStorageSync('userId');
				if (!userId) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}

			// 检查是否正在加载，如果是则不重复加载
			if (this.interactionLoading) {
				console.log('已有互动消息加载任务正在进行，跳过');
				return;
			}
			
			try {
				console.log('开始加载互动消息，设置loading=true');
				this.interactionLoading = true;
				
				if (reset) {
					this.interactionPage = 1;
					this.hasMoreInteractions = true;
				}
				
				console.log('加载互动消息, 用户ID:', userId, '页码:', this.interactionPage);
				
				// 添加调试信息
				console.log('发送参数:', {
					userId,
					page: this.interactionPage,
					pageSize: this.pageSize
				});
				
				// 使用我们优化过的callCloudFunction方法
				const res = await this.callCloudFunction('getInteractions', {
					userId,
					page: this.interactionPage,
					pageSize: this.pageSize
				}, {
					timeout: 30000,
					retries: 2,
					showError: true
				});
				
				console.log('互动消息响应原始数据:', res);
				console.log('获取互动消息结果:', JSON.stringify(res.result));
				
				if (res.result && res.result.code === 0) {
					const data = res.result.data || {};
					const list = data.list || [];
					const hasMore = !!data.hasMore;
					
					console.log('互动消息列表数量:', list.length, '是否有更多:', hasMore);
					
					// 获取已删除的消息ID列表
					const deletedIds = uni.getStorageSync('deletedInteractions') || [];
					
					// 过滤掉已删除的消息
					const filteredList = list.filter(item => !deletedIds.includes(item._id));
					
					// 确保每条互动消息有必要的字段
					const processedList = filteredList.map(item => {
						// 防止覆盖已存在的处理过的数据
						const existingItem = this.interactionList.find(existing => existing._id === item._id);
						if (existingItem && existingItem.contentProcessed) {
							// 保留已处理的数据，仅更新新数据
							return {
								...item,
								senderNickname: item.senderNickname || existingItem.senderNickname || '用户',
								senderAvatar: item.senderAvatar || existingItem.senderAvatar || '/static/images/default-avatar.png',
								displayContent: this.formatInteractionContent(item),
								createTime: item.createTime || existingItem.createTime || Date.now(),
								postContent: existingItem.postContent,
								postImages: existingItem.postImages,
								contentProcessed: existingItem.contentProcessed
							};
						}
						
						// 处理新数据
						return {
							...item,
							senderNickname: item.senderNickname || '用户',
							senderAvatar: item.senderAvatar || '/static/images/default-avatar.png',
							displayContent: this.formatInteractionContent(item),
							createTime: item.createTime || Date.now()
						};
					});
					
					// 获取帖子内容和图片，确保不会覆盖已处理的数据
					await this.enrichInteractionsWithPostData(processedList);
					
					// 安全更新列表，不覆盖已处理的内容
					if (reset) {
						this.interactionList = processedList;
				} else {
						// 合并列表时保留已处理的内容
						const newList = [...this.interactionList];
						processedList.forEach(newItem => {
							const existingIndex = newList.findIndex(item => item._id === newItem._id);
							if (existingIndex !== -1) {
								// 如果已存在，替换为新的但保留处理状态
								if (newList[existingIndex].contentProcessed) {
									newItem.contentProcessed = true;
									newItem.postContent = newList[existingIndex].postContent;
									newItem.postImages = newList[existingIndex].postImages;
								}
								newList[existingIndex] = newItem;
							} else {
								// 不存在则添加到列表中
								newList.push(newItem);
							}
						});
						this.interactionList = newList;
					}
					
					this.hasMoreInteractions = hasMore;
					
					if (hasMore && filteredList.length > 0) {
						this.interactionPage++;
					}
					
					// 强制更新视图
					this.$forceUpdate();
				} else {
					throw new Error(res.result?.msg || '获取互动消息失败');
				}
			} catch (error) {
				console.error('加载互动消息失败:', error);
					uni.showToast({
					title: error.message || '加载失败',
						icon: 'none'
					});
			} finally {
				console.log('互动消息加载完成或出错，设置loading=false');
				this.interactionLoading = false;
				this.refreshingInteraction = false;
			}
		},
		
		// 修改格式化互动消息内容的方法以匹配数据库中的类型字段
		formatInteractionContent(item) {
			if (item.displayContent) return item.displayContent;
			
			let content = item.content || '';
			
			// 根据不同类型进行内容格式化
			switch(item.type) {
				case 'like_post':
					return '点赞了你的帖子';
				case 'like_comment':
					return '点赞了你的评论';
				case 'post_comment':
					return '评论了你的帖子: ' + (content.length > 20 ? content.substring(0, 20) + '...' : content);
				case 'reply':
					return '回复了你的评论: ' + (content.length > 20 ? content.substring(0, 20) + '...' : content);
				case 'mention':
					return '在评论中@了你';
				case 'follow':
					return '关注了你';
				default:
					return content;
			}
		},
		
		loadMoreInteractions() {
			if (!this.loadingInteractions && !this.noMoreInteractions) {
				this.loadInteractions(false);
			}
		},
		
		refreshInteractions() {
			this.refreshingInteraction = true;
			this.loadInteractions(true).then(() => {
				this.refreshingInteraction = false;
			});
		},
		
		// 添加重试加载方法
		reloadInteractions() {
			console.log('手动重新加载互动消息');
			this.loadInteractions(true);
		},
		
		// 聊天消息相关方法
		async loadChats(reset = false) {
			const userId = uni.getStorageSync('userId');
			if (!userId) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			
			// 检查是否正在加载中，避免重复加载
			if (this.chatLoading) {
				console.log('已有聊天列表加载任务正在进行，跳过');
				return;
			}
			
			try {
				console.log('开始加载聊天列表，设置chatLoading=true');
				this.chatLoading = true;
				
				if (reset) {
					this.chatPage = 1;
					this.hasMoreChats = true;
					this.chatList = []; // 重置时立即清空列表
				}
				
				console.log('加载聊天列表, 用户ID:', userId, '页码:', this.chatPage);
				
				// API调用
				const res = await this.callCloudFunction('getChatList', {
					userId,
					page: this.chatPage,
					pageSize: this.pageSize
				}, {
					timeout: 20000,
					retries: 2
				});
				
				console.log('获取聊天列表结果:', JSON.stringify(res.result));
				
				if (res.result && res.result.code === 0) {
					const data = res.result.data || {};
					const list = data.list || [];
					const hasMore = !!data.hasMore;
					
					console.log('聊天列表数量:', list.length, '是否有更多:', hasMore);
					
					// 确保在下一个微任务中更新列表，给视图有时间响应
					this.$nextTick(() => {
						if (reset) {
							this.chatList = list;
						} else {
							this.chatList = [...this.chatList, ...list];
						}
						
						console.log('处理后的聊天列表:', this.chatList.length, '条记录');
						
						this.hasMoreChats = hasMore;
						
						if (hasMore && list.length > 0) {
							this.chatPage++;
						}
						
						// 强制刷新视图
						this.$forceUpdate();
					});
				} else {
					throw new Error((res.result && res.result.msg) || '获取聊天列表失败');
				}
			} catch (error) {
				console.error('加载聊天列表失败:', error);
				uni.showToast({
					title: error.message || '加载失败',
					icon: 'none'
				});
			} finally {
				console.log('聊天列表加载完成或出错，设置chatLoading=false');
				// 移除setTimeout，直接设置loading状态
				this.chatLoading = false;
				this.refreshingChat = false;
			}
		},
		
		loadMoreChats() {
			if (this.hasMoreChats && !this.chatLoading) {
				this.loadChats(false);
			}
		},
		
		refreshChats() {
			this.refreshingChat = true;
			this.loadChats(true);
		},
		
		// 添加导航到聊天页面的方法
		navigateToChat(item) {
			try {
				// 标记消息为已读
				this.markChatRead(item._id);
				
				// 跳转到聊天页面
			uni.navigateTo({
					url: `/pages/chat/chat?targetUserId=${item.targetUserId}&targetUserName=${encodeURIComponent(item.targetUserNickname || '用户')}`
				});
			} catch (e) {
				console.error('跳转失败:', e);
			}
		},
		
		// 标记聊天为已读
		async markChatRead(chatId) {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) return;
				
				const res = await this.callCloudFunction('markChatRead', {
					userId,
					chatId
				}, {
					timeout: 10000,
					retries: 1
				});
				
				if (res.result && res.result.code === 0) {
					// 更新本地状态
					const index = this.chatList.findIndex(item => item._id === chatId);
					if (index !== -1) {
						this.$set(this.chatList[index], 'unreadCount', 0);
					}
				}
			} catch (e) {
				console.error('标记已读失败:', e);
			}
		},
		
		// 格式化时间显示
		formatTime(timestamp) {
			if (!timestamp) return '';
			
			const now = new Date();
			const msgTime = new Date(timestamp);
			const diff = now - msgTime;
			
			// 一分钟内
			if (diff < 60 * 1000) {
				return '刚刚';
			}
			
			// 一小时内
			if (diff < 60 * 60 * 1000) {
				return Math.floor(diff / (60 * 1000)) + '分钟前';
			}
			
			// 24小时内
			if (diff < 24 * 60 * 60 * 1000) {
				return Math.floor(diff / (60 * 60 * 1000)) + '小时前';
			}
			
			// 30天内
			if (diff < 30 * 24 * 60 * 60 * 1000) {
				return Math.floor(diff / (24 * 60 * 60 * 1000)) + '天前';
			}
			
			// 大于30天
			const year = msgTime.getFullYear();
			const month = (msgTime.getMonth() + 1).toString().padStart(2, '0');
			const date = msgTime.getDate().toString().padStart(2, '0');
			
			return `${year}-${month}-${date}`;
		},
		
		// 获取互动类型文本
		getInteractionTypeText(type) {
			switch(type) {
				case 'like_post': return '赞了你的帖子';
				case 'like_comment': return '赞了你的评论';
				case 'post_comment': return '评论了你的帖子';
				case 'reply': return '回复了你的评论';
				case 'mention': return '@了你';
				case 'follow': return '关注了你';
				case 'system': return '系统通知';
				default: return type || '与你互动'; // 显示原始类型或默认文本
			}
		},
		
		// 跳转到互动详情
		navigateToInteraction(item) {
			try {
				console.log('跳转到互动详情:', JSON.stringify(item));
				
				// 标记为已读
				this.markInteractionRead(item._id);
				
				// 根据不同类型跳转到不同页面
				if (item.postId) {
					// 添加评论ID参数，用于定位到特定评论
					let url = `/pages/task/detail?id=${item.postId}`;
					if (item.commentId) {
						url += `&commentId=${item.commentId}`;
					}
					uni.navigateTo({ url });
				} else if (item.type === 'follow') {
					// 关注通知跳转到用户主页
					uni.navigateTo({
						url: `/pages/user/profile?id=${item.sender}`
					});
				} else if (item.type === 'system') {
					// 系统通知可能需要特殊处理
					uni.showToast({
						title: '系统通知',
						icon: 'none'
					});
				} else {
					console.log('无法确定跳转目标，尝试跳转到用户页面:', item);
					// 如果不确定跳转目标，默认跳转到发送者的主页
					if (item.sender) {
						uni.navigateTo({
							url: `/pages/user/profile?id=${item.sender}`
						});
					} else {
						uni.showToast({
							title: '无法跳转',
							icon: 'none'
						});
					}
				}
			} catch (e) {
				console.error('跳转失败:', e);
				uni.showToast({
					title: '跳转失败',
					icon: 'none'
				});
			}
		},
		
		// 标记互动消息为已读
		async markInteractionRead(messageId) {
			if (!messageId) return;
			
			try {
				const res = await uniCloud.callFunction({
					name: 'markNotificationRead',
					data: {
						messageId,
						userId: uni.getStorageSync('userId')
					}
				});
				
				if (res.result && res.result.code === 0) {
					// 在本地更新消息已读状态
					const messageIndex = this.interactionList.findIndex(item => item._id === messageId);
					if (messageIndex !== -1) {
						this.$set(this.interactionList[messageIndex], 'isRead', true);
					}
				}
			} catch (error) {
				console.error('标记消息已读失败:', error);
			}
		},
		
		// 页面返回方法
		goBack() {
			uni.navigateBack();
		},
		
		// 显示互动消息操作菜单
		showInteractionActions(item) {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}
				
				uni.showActionSheet({
					itemList: ['删除消息'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.deleteInteraction(item._id);
						}
					}
				});
			} catch (e) {
				console.error('显示操作菜单失败:', e);
			}
		},
		
		// 删除互动消息
		async deleteInteraction(id) {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) return;
				
				uni.showLoading({
					title: '删除中...'
				});
				
				// 调用deleteInteraction云函数
				const res = await this.callCloudFunction('deleteInteraction', {
					userId,
					interactionId: id
				}, {
					timeout: 10000,
					retries: 1
				});
				
				uni.hideLoading();
				
				if (res.result && res.result.code === 0) {
					// 从列表中移除该条消息
					this.interactionList = this.interactionList.filter(item => item._id !== id);
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					});
				} else {
					// 如果云函数调用失败，使用备用方案
					console.warn('删除失败，尝试使用标记已读作为替代方案');
					this.interactionList = this.interactionList.filter(item => item._id !== id);
					uni.showToast({
						title: '已从列表中移除',
						icon: 'none'
					});
				}
			} catch (e) {
				uni.hideLoading();
				console.error('删除互动消息失败:', e);
				
				// 如果出错，仍然在前端移除
				this.interactionList = this.interactionList.filter(item => item._id !== id);
				uni.showToast({
					title: '已从列表中移除',
					icon: 'none'
				});
			}
		},
		
		// 新增网络检查方法
		checkNetwork() {
			return new Promise((resolve, reject) => {
				uni.getNetworkType({
					success: res => {
						if (res.networkType === 'none') {
							uni.showToast({
								title: '网络不可用，请检查连接',
								icon: 'none'
							});
							reject(new Error('network unavailable'));
						} else {
							resolve();
						}
					}
				});
			});
		},
		
		// 调试互动消息方法
		debugInteractionMessages() {
			this.debugInteractionState();
			
			// 刷新互动消息
			uni.showModal({
				title: '互动消息调试',
				content: `当前有${this.interactionList.length}条互动消息，是否重新加载？`,
				confirmText: '重新加载',
				success: (res) => {
					if (res.confirm) {
						this.loadInteractions(true);
					}
				}
			});
		},
		
		// 互动状态调试方法
		debugInteractionState() {
			console.log('===== 互动消息状态调试 =====');
			const userId = uni.getStorageSync('userId');
			console.log('当前用户ID:', userId);
			console.log('当前互动消息数量:', this.interactionList.length);
			console.log('互动消息加载状态:', this.interactionLoading);
			console.log('当前互动页码:', this.interactionPage);
			console.log('是否有更多互动数据:', this.hasMoreInteractions);
			
			// 手动查询一条notifications示例记录以验证数据结构
			uniCloud.callFunction({
				name: 'getNotificationSample',
				data: { limit: 3 }
			}).then(res => {
				console.log('notifications表样本数据:', res.result);
				
				if (res.result && res.result.data && res.result.data.length > 0) {
					console.log('数据结构验证:');
					console.log('- receiver字段:', res.result.data[0].receiver);
					console.log('- sender字段:', res.result.data[0].sender);
					console.log('- type字段:', res.result.data[0].type);
				}
			}).catch(err => {
				console.error('获取notifications表数据失败:', err);
			});
		},
		
		// 预览帖子图片
		previewPostImage(images, currentIndex, event) {
			if (event) {
				event.stopPropagation(); // 阻止事件冒泡
			}
			
			if (!images || images.length === 0) {
				return;
			}
			
			console.log('预览帖子图片:', images);
			
			// 筛选出有效的图片URL
			const validImages = images.filter(img => 
				typeof img === 'string' && (img.startsWith('http') || img.startsWith('/'))
			);
			
			if (validImages.length === 0) {
				uni.showToast({
					title: '没有可预览的图片',
					icon: 'none'
				});
				return;
			}
			
			uni.previewImage({
				urls: validImages,
				current: validImages[currentIndex] || validImages[0],
				success: function() {
					console.log('帖子图片预览成功');
				},
				fail: function(err) {
					console.error('帖子图片预览失败:', err);
					uni.showToast({
						title: '图片预览失败',
						icon: 'none'
					});
				}
			});
		},
		
		// 预览评论图片
		previewCommentImage(fileIDs, event) {
			if (event) {
				event.stopPropagation(); // 阻止事件冒泡
			}
			
			if (!fileIDs || fileIDs.length === 0) {
				return;
			}
			
			console.log('预览评论图片:', fileIDs);
			
			uni.previewImage({
				urls: fileIDs,
				current: fileIDs[0],
				success: function() {
					console.log('评论图片预览成功');
				},
				fail: function(err) {
					console.error('评论图片预览失败:', err);
					uni.showToast({
						title: '图片预览失败',
						icon: 'none'
					});
				}
			});
		},
		
		// 显示删除确认对话框
		showDeleteConfirm(item, index) {
			uni.showModal({
				title: '删除提示',
				content: '删除后，该条消息将不再显示',
				confirmText: '确认删除',
				confirmColor: '#FF5252',
				success: (res) => {
					if (res.confirm) {
						this.deleteInteractionLocally(item._id, index);
					}
				}
			});
		},
		
		// 本地删除互动消息（不调用云函数）
		deleteInteractionLocally(id, index) {
			// 直接从本地列表中移除
			this.interactionList.splice(index, 1);
			uni.showToast({
				title: '已删除',
				icon: 'success'
			});
			
			// 可以选择在本地存储中标记该消息已删除，以防页面刷新后重新加载
			try {
				let deletedIds = uni.getStorageSync('deletedInteractions') || [];
				deletedIds.push(id);
				uni.setStorageSync('deletedInteractions', deletedIds);
			} catch (e) {
				console.error('存储删除记录失败:', e);
			}
		},
		
		// 修改 enrichInteractionsWithPostData 方法
		async enrichInteractionsWithPostData(interactions) {
			// 提取所有帖子ID
			const postIds = interactions
				.filter(item => item.postId)
				.map(item => item.postId);
			
			if (postIds.length === 0) return;
			
			try {
				// 先尝试从本地缓存获取帖子内容
				const cachedPosts = uni.getStorageSync('cachedPosts') || {};
				let hasAllCached = true;
				
				// 检查是否所有需要的帖子都已缓存
				for (const postId of postIds) {
					if (!cachedPosts[postId]) {
						hasAllCached = false;
						break;
					}
				}
				
				// 使用缓存或重新获取帖子数据
				let postMap = {};
				if (hasAllCached) {
					console.log('使用缓存的帖子数据');
					postMap = cachedPosts;
				} else {
					// 批量获取帖子信息
					const postRes = await uniCloud.callFunction({
						name: 'getBatchPosts',
						data: {
							postIds: postIds
						},
						timeout: 30000 // 增加超时时间
					});
					
					if (postRes.result && postRes.result.code === 0) {
						const posts = postRes.result.data || [];
						
						// 创建帖子ID到帖子的映射
						posts.forEach(post => {
							if (post._id) {
								postMap[post._id] = post;
								// 更新缓存
								cachedPosts[post._id] = post;
							}
						});
						
						// 保存到本地缓存
						uni.setStorageSync('cachedPosts', cachedPosts);
					} else {
						// 获取失败时，尝试单独获取每个帖子
						console.log('批量获取失败，尝试单独获取每个帖子');
						await this.fetchPostsIndividually(postIds, postMap, cachedPosts);
					}
				}
				
				// 确保稳定地为每条互动消息添加帖子内容和图片
				interactions.forEach(item => {
					if (item.postId && postMap[item.postId]) {
						const post = postMap[item.postId];
						
						// 设置帖子内容，不再截断
						item.postContent = post.content || '查看帖子详情';
						
						// 设置帖子图片
						item.postImages = Array.isArray(post.images) ? post.images : [];
						
						// 标记为已处理，防止被覆盖
						item.contentProcessed = true;
					}
				});
				
				// 立即应用更新以防止被覆盖
				this.$forceUpdate();
			} catch (error) {
				console.error('获取帖子信息失败:', error);
				// 出错时也尝试单独获取每个帖子
				const cachedPosts = uni.getStorageSync('cachedPosts') || {};
				const postMap = {};
				await this.fetchPostsIndividually(postIds, postMap, cachedPosts);
				
				// 再次尝试应用数据
				interactions.forEach(item => {
					if (item.postId && postMap[item.postId]) {
						const post = postMap[item.postId];
						item.postContent = post.content || '查看帖子详情';
						item.postImages = Array.isArray(post.images) ? post.images : [];
						item.contentProcessed = true;
					}
				});
				
				this.$forceUpdate();
			}
		},
		
		// 添加单独获取帖子的方法
		async fetchPostsIndividually(postIds, postMap, cachedPosts) {
			for (const postId of postIds) {
				// 如果已缓存，直接使用缓存
				if (cachedPosts[postId]) {
					postMap[postId] = cachedPosts[postId];
					continue;
				}
				
				try {
					const singlePostRes = await uniCloud.callFunction({
						name: 'getPostDetail',
						data: {
							postId: postId
						}
					});
					
					if (singlePostRes.result && singlePostRes.result.code === 0) {
						const post = singlePostRes.result.data;
						if (post) {
							postMap[postId] = post;
							cachedPosts[postId] = post;
						}
					}
				} catch (err) {
					console.error(`获取帖子 ${postId} 失败:`, err);
				}
			}
			
			// 更新缓存
			uni.setStorageSync('cachedPosts', cachedPosts);
			return postMap;
		},
		
		// 显示聊天消息删除确认对话框
		showChatDeleteConfirm(item, index) {
			uni.showModal({
				title: '删除提示',
				content: '确定要删除该会话吗？',
				confirmText: '删除',
				confirmColor: '#FF5252',
				success: (res) => {
					if (res.confirm) {
						this.deleteChatSession(item._id, index);
					}
				}
			});
		},
		
		// 删除聊天会话
		async deleteChatSession(chatId, index) {
			try {
				uni.showLoading({ title: '删除中...' });
				
				const userId = uni.getStorageSync('userId');
				const res = await uniCloud.callFunction({
					name: 'deleteChatSession',
					data: {
						userId,
						chatId
					}
				});
				
				uni.hideLoading();
				
				if (res.result && res.result.code === 0) {
					// 从列表中删除该项
					this.chatList.splice(index, 1);
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					});
				} else {
					// 删除失败时也在本地删除（用户体验考虑）
					this.chatList.splice(index, 1);
					uni.showToast({
						title: '已从列表中移除',
						icon: 'none'
					});
				}
			} catch (error) {
				uni.hideLoading();
				console.error('删除聊天会话失败:', error);
				
				// 出错时也在本地删除（用户体验考虑）
				this.chatList.splice(index, 1);
				uni.showToast({
					title: '已从列表中移除',
					icon: 'none'
				});
			}
		}
	}
}
</script>

<style>
/* 添加安全区域适配 */
.safe-area {
	padding-top: calc(var(--status-bar-height, 44px) + 10px);
}

.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f8f8f8;
	padding-top: 20rpx;
}

/* 消息分类导航样式 */
.message-nav {
	background-color: #ffffff;
	padding: 20rpx 0;
	overflow: hidden;
	margin-bottom: 10rpx;
	border-radius: 0 0 20rpx 20rpx;
	box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.03);
}

.nav-buttons {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0 20rpx;
	height: 120rpx;
}

.nav-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	transition: transform 0.2s ease;
	padding: 10rpx 30rpx;
}

.nav-button.active {
	transform: scale(1.05);
}

.icon-circle {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 12rpx;
	transition: all 0.2s ease;
}

.icon-text {
	font-size: 36rpx;
}

.interaction-icon {
	background: linear-gradient(135deg, #a8c7ff, #6FA3FF);
	box-shadow: 0 4rpx 12rpx rgba(111, 163, 255, 0.15);
}

.interaction-icon.active {
	background: linear-gradient(135deg, #6FA3FF, #4985FF);
	box-shadow: 0 6rpx 16rpx rgba(73, 133, 255, 0.25);
}

.chat-icon {
	background: linear-gradient(135deg, #a5f0c5, #4DDC95);
	box-shadow: 0 4rpx 12rpx rgba(77, 220, 149, 0.15);
}

.chat-icon.active {
	background: linear-gradient(135deg, #4DDC95, #35C77D);
	box-shadow: 0 6rpx 16rpx rgba(53, 199, 125, 0.25);
}

.system-icon {
	background: linear-gradient(135deg, #ffb3b3, #ff8080);
	box-shadow: 0 4rpx 12rpx rgba(255, 128, 128, 0.15);
}

.system-icon.active {
	background: linear-gradient(135deg, #ff8080, #ff5252);
	box-shadow: 0 6rpx 16rpx rgba(255, 82, 82, 0.25);
}

.nav-text {
	font-size: 26rpx;
	color: #666;
}

.nav-button.active .nav-text {
	color: #333;
	font-weight: 500;
}

.content-area {
	flex: 1;
	overflow: hidden;
	padding-bottom: calc(env(safe-area-inset-bottom) + 120rpx); /* 增加底部留白 */
}

.message-list {
	height: 100%;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

/* 互动消息样式优化 */
.interaction-list {
	padding: 20rpx 30rpx;
}

.interaction-item {
	display: flex;
	padding: 24rpx;
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	position: relative;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.03);
	align-items: flex-start;
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 20rpx;
	flex-shrink: 0;
}

.interaction-content {
	flex: 1;
	min-width: 0;
}

.interaction-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10rpx;
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

.interaction-body {
	display: flex;
	flex-direction: column;
}

.content {
	font-size: 28rpx;
	color: #666;
	line-height: 1.5;
	margin-bottom: 10rpx;
}

/* 互动消息中的帖子内容 */
.interaction-meta {
	margin-top: 16rpx;
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 16rpx;
	border-left: 4rpx solid #e0e0e0;
	transition: background-color 0.3s;
	position: relative;
}

.interaction-post-info {
	display: flex;
	align-items: flex-start;
	font-size: 26rpx;
	color: #666;
}

.interaction-post-info text {
	margin-left: 8rpx;
	flex: 1;
	line-height: 1.5;
	word-break: break-all;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

/* 帖子图片显示 */
.post-images {
	display: flex;
	flex-wrap: wrap;
	margin-top: 12rpx;
	gap: 8rpx;
}

.post-image {
	width: 150rpx;
	height: 150rpx;
	border-radius: 8rpx;
	overflow: hidden;
	position: relative;
}

.post-image image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.more-images {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 150rpx;
	height: 150rpx;
	border-radius: 8rpx;
	background-color: rgba(0, 0, 0, 0.05);
	color: #666;
	font-size: 24rpx;
}

/* 评论图片样式 */
.interaction-image {
	width: 180rpx;
	height: 180rpx;
	border-radius: 12rpx;
	overflow: hidden;
	margin-top: 10rpx;
	margin-bottom: 10rpx;
}

.interaction-image image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.unread-dot {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: #ff5252;
}

/* 聊天列表样式 */
.chat-list {
	padding: 20rpx 30rpx;
}

.chat-item {
	display: flex;
	padding: 24rpx;
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	position: relative;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.03);
	align-items: center;
}

.chat-content {
	flex: 1;
	min-width: 0;
}

.chat-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8rpx;
}

.chat-body {
	display: flex;
	align-items: center;
}

.last-message {
	font-size: 26rpx;
	color: #999;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.unread-badge {
	min-width: 36rpx;
	height: 36rpx;
	line-height: 36rpx;
	padding: 0 8rpx;
	background-color: #FF5252;
	color: #fff;
	border-radius: 18rpx;
	font-size: 22rpx;
	text-align: center;
	margin-left: 16rpx;
}

.empty-tip {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: #999;
	font-size: 28rpx;
}

.loading-more {
	text-align: center;
	padding: 20rpx 0;
	color: #999;
	font-size: 24rpx;
}

/* 顶部导航栏样式 */
.header {
	display: flex;
	align-items: center;
	padding: 10rpx;
	background-color: #ffffff;
	border-bottom: 1px solid #eee;
}

.header-left {
	padding: 0 10rpx;
}

.header-title {
	flex: 1;
	font-size: 32rpx;
	font-weight: 500;
	text-align: center;
}

.header-right {
	padding: 0 10rpx;
}

/* 调试工具样式 */
.debug-tools {
	padding: 20rpx;
	text-align: center;
}

.debug-btn {
	font-size: 24rpx;
	padding: 10rpx 20rpx;
	background-color: #f5f5f5;
	color: #666;
}

/* 添加帖子图片样式 */
.post-image {
	margin-top: 10rpx;
	width: 160rpx;
	height: 160rpx;
	border-radius: 12rpx;
	overflow: hidden;
	background-color: #f5f5f5;
	position: relative;
}

.post-image image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 12rpx;
}

/* 添加一些操作提示样式 */
.chat-item:active, .interaction-item:active {
	opacity: 0.8;
	transform: scale(0.98);
	transition: all 0.2s ease;
}

.delete-tip {
	position: absolute;
	top: 50%;
	right: 30rpx;
	transform: translateY(-50%);
	background-color: rgba(255, 82, 82, 0.1);
	color: #FF5252;
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
	font-size: 22rpx;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.chat-item.active .delete-tip, .interaction-item.active .delete-tip {
	opacity: 1;
}

/* 添加加载和已加载状态样式区分 */
.interaction-meta::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.02);
	border-radius: 12rpx;
	opacity: 0;
	transition: opacity 0.3s;
}

.interaction-meta:active::after {
	opacity: 1;
}
</style> 