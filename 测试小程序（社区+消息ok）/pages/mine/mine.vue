<template>
	<view class="profile-container">
		<!-- 顶部用户信息 -->
		<view class="user-card">
			<view class="user-info">
				<image class="avatar" :src="getUserAvatar" @tap="isLogin ? editUserInfo() : handleLogin()"></image>
				<view class="user-details">
					<view class="nickname-row">
						<text class="nickname">{{userInfo.nickname || '点击登录'}}</text>
					</view>
					<text class="signature" v-if="isLogin">{{userInfo.signature || '编辑个人资料'}}</text>
					<text class="signature" v-else>登录后查看个人信息</text>
				</view>
			</view>
			<view class="edit-profile-btn" v-if="isLogin" @tap="handleEditProfile">
				<text>编辑资料</text>
			</view>
			<view class="logout-btn" v-if="isLogin" @tap="handleLogout">
				<text>退出登录</text>
			</view>
			<view class="login-now-btn" v-if="!isLogin" @tap="goToLogin">
				<text>立即登录</text>
			</view>
		</view>
		
		<!-- 添加大型登录提示横幅 -->
		<view class="login-banner" v-if="!isLogin" @tap="goToLogin">
			<view class="login-banner-inner">
				<image class="login-icon" src="/static/images/icons/user.png" mode="aspectFit"></image>
				<text class="login-banner-text">登录后查看您的个人信息</text>
			</view>
			<button class="login-banner-btn">立即登录</button>
		</view>
		
		<!-- 用户统计数据 -->
		<view class="user-stats">
			<view class="stat-item" @tap="navigateToFollows">
				<text class="stat-value">{{getFollowCount}}</text>
				<text class="stat-label">关注</text>
			</view>
			<view class="stat-item" @tap="navigateToFans">
				<text class="stat-value">{{userInfo.fansCount || 0}}</text>
				<text class="stat-label">粉丝</text>
			</view>
			<view class="stat-item">
				<text class="stat-value">{{userInfo.likeCount || 0}}</text>
				<text class="stat-label">获赞</text>
			</view>
		</view>
		
		<!-- 我的服务 -->
		<view class="section-card">
			<view class="section-header">
				<view class="section-title-marker"></view>
				<text class="section-title">我的服务</text>
			</view>
			<view class="service-grid">
				<view class="service-item">
					<view class="service-icon" style="background-color: #FF9500;">
						<image src="/static/images/icons/skill.png" mode="aspectFit"></image>
					</view>
					<text class="service-name">我的技能</text>
				</view>
				<view class="service-item">
					<view class="service-icon" style="background-color: #FF3B30;">
						<image src="/static/images/icons/location.png" mode="aspectFit"></image>
					</view>
					<text class="service-name">我的闲置</text>
				</view>
				<view class="service-item">
					<view class="service-icon" style="background-color: #FF2D55;">
						<image src="/static/images/icons/collection.png" mode="aspectFit"></image>
					</view>
					<text class="service-name">我的收藏</text>
				</view>
				<view class="service-item">
					<view class="service-icon" style="background-color: #007AFF;">
						<image src="/static/images/icons/history.png" mode="aspectFit"></image>
					</view>
					<text class="service-name">历史记录</text>
				</view>
			</view>
		</view>
		
		<!-- 任务记录 -->
		<view class="section-card">
			<view class="section-header">
				<view class="section-title-marker"></view>
				<text class="section-title">任务记录</text>
			</view>
			<view class="menu-list">
				<view class="menu-item">
					<view class="menu-item-left">
						<view class="menu-icon" style="background-color: #FFF5F5;">
							<image src="/static/images/icons/publish.png" mode="aspectFit"></image>
						</view>
						<text class="menu-label">发布的任务</text>
					</view>
					<view class="count-badge">3</view>
				</view>
				<view class="menu-item">
					<view class="menu-item-left">
						<view class="menu-icon" style="background-color: #F0F7FF;">
							<image src="/static/images/icons/accept.png" mode="aspectFit"></image>
						</view>
						<text class="menu-label">接受的任务</text>
					</view>
					<view class="count-badge">2</view>
				</view>
				<view class="menu-item">
					<view class="menu-item-left">
						<view class="menu-icon" style="background-color: #F5FFF5;">
							<image src="/static/images/icons/complete.png" mode="aspectFit"></image>
						</view>
						<text class="menu-label">完成的任务</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 设置与反馈 -->
		<view class="section-card">
			<view class="menu-list">
				<view class="menu-item">
					<view class="menu-item-left">
						<view class="menu-icon" style="background-color: #F0F0FF;">
							<image src="/static/images/icons/feedback.png" mode="aspectFit"></image>
						</view>
						<text class="menu-label">意见反馈</text>
					</view>
					<image class="arrow-icon" src="/static/images/icons/arrow-right.png" mode="aspectFit"></image>
				</view>
				<view class="menu-item">
					<view class="menu-item-left">
						<view class="menu-icon" style="background-color: #F8F8F8;">
							<image src="/static/images/icons/settings.png" mode="aspectFit"></image>
						</view>
						<text class="menu-label">设置</text>
					</view>
					<image class="arrow-icon" src="/static/images/icons/arrow-right.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- 院校认证 -->
		<view class="section school-section">
			<view class="section-title">
				<view class="title-bar"></view>
				<text>院校认证</text>
			</view>
			
			<!-- 未认证状态 -->
			<view v-if="!userInfo.educationInfo || !userInfo.educationInfo.verified" class="school-select">
				<picker mode="selector" :range="schools" @change="bindSchoolChange">
					<view class="school-picker">
						<text>请选择院校</text>
						<text class="school-name">{{selectedSchool || '请选择'}}</text>
					</view>
				</picker>
				<button class="verify-btn" @click="verifyLocation">验证位置</button>
			</view>
			
			<!-- 已认证状态 -->
			<view v-else class="school-verified">
				<view class="verified-content">
					<view class="verified-icon">
						<uni-icons type="checkmarkempty" size="24" color="#10C55B"></uni-icons>
					</view>
					<view class="verified-info">
						<text class="verified-school">{{userInfo.educationInfo.schoolName}}</text>
						<text class="verified-time">认证成功 · {{formatDate(userInfo.educationInfo.verifyTime)}}</text>
					</view>
				</view>
				<button class="exit-verify-btn" @click="clearLocationVerify">退出位置验证</button>
			</view>
		</view>
		
		<!-- 底部占位区，确保内容完全显示 -->
		<view class="bottom-spacer"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userId: '',
			isLogin: false,
			userInfo: {
				_id: '',
				nickname: '',
				avatar: '',
				signature: '',
				followCount: 0,
				fansCount: 0,
				likeCount: 0
			},
			serviceMenu: [
				{ name: '我的技能', icon: 'star', color: '#ff9900', path: '/pages/mine/skills' },
				{ name: '我的闲置', icon: 'shop', color: '#ff5757', path: '/pages/mine/idle' },
				{ name: '我的收藏', icon: 'heart', color: '#ff69b4', path: '/pages/mine/collections' },
				{ name: '历史记录', icon: 'time', color: '#1890ff', path: '/pages/mine/history' }
			],
			taskMenu: [
				{ name: '发布的任务', icon: 'upload', color: '#ff5757', path: '/pages/mine/tasks/published', count: 3 },
				{ name: '接受的任务', icon: 'download', color: '#1890ff', path: '/pages/mine/tasks/accepted', count: 2 },
				{ name: '完成的任务', icon: 'checkbox', color: '#52c41a', path: '/pages/mine/tasks/completed' }
			],
			otherMenu: [
				{ name: '意见反馈', icon: 'help', color: '#722ed1', path: '/pages/mine/feedback' },
				{ name: '设置', icon: 'gear', color: '#666666', path: '/pages/mine/settings' }
			],
			schools: [
				'沈阳航空航天大学',
				'大连理工大学',
				'东北大学',
				'辽宁大学',
				'大连海事大学',
				'东北财经大学',
				'沈阳药科大学',
				'沈阳建筑大学',
				'沈阳农业大学',
				'辽宁中医药大学',
				'大连工业大学',
				'沈阳工业大学',
				'辽宁师范大学',
				'沈阳化工大学',
				'大连海洋大学',
				'中国医科大学'
			],
			selectedSchool: '沈阳航空航天大学',
			isVerifying: false,
			verificationStatus: null,
			schoolLocations: {
				'沈阳航空航天大学': {
					latitude: 41.926806,
					longitude: 123.404631,
					radius: 800
				},
				'大连理工大学': {
					latitude: 38.879989,
					longitude: 121.526847,
					radius: 800
				},
				'东北大学': {
					latitude: 41.766544,
					longitude: 123.427179,
					radius: 800
				},
				'辽宁大学': {
					latitude: 41.938839,
					longitude: 123.428849,
					radius: 800
				},
				'大连海事大学': {
					latitude: 38.865799,
					longitude: 121.526897,
					radius: 800
				},
				'东北财经大学': {
					latitude: 38.866969,
					longitude: 121.527075,
					radius: 800
				},
				'沈阳药科大学': {
					latitude: 41.836879,
					longitude: 123.400139,
					radius: 800
				},
				'沈阳建筑大学': {
					latitude: 41.781649,
					longitude: 123.420929,
					radius: 800
				},
				'沈阳农业大学': {
					latitude: 41.827099,
					longitude: 123.566589,
					radius: 800
				},
				'辽宁中医药大学': {
					latitude: 41.772739,
					longitude: 123.420729,
					radius: 800
				},
				'大连工业大学': {
					latitude: 38.878199,
					longitude: 121.525697,
					radius: 800
				},
				'沈阳工业大学': {
					latitude: 41.943839,
					longitude: 123.452849,
					radius: 800
				},
				'辽宁师范大学': {
					latitude: 38.869969,
					longitude: 121.550075,
					radius: 800
				},
				'沈阳化工大学': {
					latitude: 41.677839,
					longitude: 123.428849,
					radius: 800
				},
				'大连海洋大学': {
					latitude: 38.865799,
					longitude: 121.526897,
					radius: 800
				},
				'中国医科大学': {
					latitude: 41.801839,
					longitude: 123.417849,
					radius: 800
				}
			},
			pageLoaded: false,
			checkingLoginStatus: true,  // 添加一个状态表示正在检查登录状态
		}
	},
	onLoad() {
		this.pageLoaded = true;
		// 监听用户信息更新事件
		uni.$on('userInfoUpdated', this.handleUserInfoUpdate);
		this.checkLoginStatus(true);
		this.initPage();
	},
	onShow() {
		// 每次显示页面时都强制刷新用户信息
		if (this.pageLoaded) {
			console.log('mine页面显示，刷新用户信息');
			
			// 从用户ID重新获取最新数据而不是依赖本地存储
			this.forceSyncUserInfo();
		}
		this.checkLoginStatus();
		
		// 如果已登录，刷新用户数据
		if (this.isLogin) {
			this.refreshUserData(true);
		}
	},
	onUnload() {
		uni.$off('userInfoUpdated', this.handleUserInfoUpdate);
		this.pageLoaded = false;
	},
	onReady() {
		// 页面渲染完成后执行
		this.pageLoaded = true;
	},
	created() {
		// 监听登录事件
		uni.$on('loginSuccess', this.handleLoginSuccess);
		// 监听退出登录事件
		uni.$on('logoutSuccess', this.handleLogout);
	},
	beforeDestroy() {
		// 记得在组件销毁时移除事件监听
		uni.$off('loginSuccess', this.handleLoginSuccess);
		uni.$off('logoutSuccess', this.handleLogout);
	},
	methods: {
		handleAvatar() {
			if (!this.isLogin) {
				this.goToLogin();
			}
		},
		handleEditProfile() {
			if (this.isLogin) {
				uni.navigateTo({
					url: '/pages/mine/profile'
				});
			} else {
				this.goToLogin();
			}
		},
		goToLogin() {
			uni.navigateTo({
				url: '/pages/login/index',
				events: {
					loginSuccess: () => {
						this.checkLoginStatus(true);
					}
				}
			});
		},
		handleLogout() {
			console.log('退出登录，清除用户数据');
			this.isLogin = false;
			this.userInfo = {};
			this.clearLoginInfo();
			
			// 强制刷新整个页面
			this.$forceUpdate();
		},
		checkLoginStatus(showLoading = false) {
			console.log('检查登录状态');
			this.checkingLoginStatus = true;
			
			if (showLoading) {
				uni.showLoading({
					title: '加载中...'
				});
			}
			
			try {
				const userId = uni.getStorageSync('userId');
				this.userId = userId;
				this.isLogin = !!userId;
				
				if (this.isLogin) {
					// 获取本地存储的用户信息
					const userInfo = uni.getStorageSync('userInfo') || {};
					// 确保数据一致性
					this.userInfo = {
						_id: userId,
						nickname: userInfo.nickname || '',
						avatar: userInfo.avatar || '',
						signature: userInfo.signature || '',
						followCount: userInfo.followCount || 0,
						fansCount: userInfo.fansCount || 0,
						likeCount: userInfo.likeCount || 0,
						educationInfo: userInfo.educationInfo || {}
					};
					
					console.log('当前用户信息:', JSON.stringify(this.userInfo));
				} else {
					// 未登录时重置用户信息
					this.resetUserInfo();
				}
			} catch (error) {
				console.error('检查登录状态出错:', error);
			} finally {
				this.checkingLoginStatus = false;
				if (showLoading) {
					uni.hideLoading();
				}
			}
		},
		handleLoginSuccess(userInfo) {
			console.log('登录成功，更新用户信息:', userInfo);
			this.isLogin = true;
			this.userInfo = userInfo || {};
			
			// 强制刷新整个页面
			this.$forceUpdate();
			
			// 获取最新用户数据
			this.refreshUserData(true);
		},
		clearLoginInfo() {
			try {
				uni.removeStorageSync('userId');
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('token');
				// 可能还需要清除其他与登录相关的存储项
			} catch (error) {
				console.error('清除登录信息出错:', error);
			}
		},
		navigateTo(url) {
			uni.navigateTo({ url })
		},
		bindSchoolChange(e) {
			console.log('选择的院校索引:', e.detail.value);
			const index = e.detail.value;
			this.selectedSchool = this.schools[index];
			uni.showToast({
				title: '已选择: ' + this.selectedSchool,
				icon: 'none'
			});
		},
		async verifyLocation() {
			if (!this.isLogin) {
				uni.showToast({ title: '请先登录', icon: 'none' });
				return;
			}

			this.isVerifying = true;
			
			try {
				// 直接获取位置信息，系统会自动弹出权限请求
				const location = await new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						isHighAccuracy: true,
						success: (res) => {
							console.log('定位成功:', res);
							resolve(res);
						},
						fail: (err) => {
							console.error('定位失败:', err);
							reject(new Error('获取位置信息失败，请允许位置权限'));
						}
					});
				});

				const schoolLocation = this.schoolLocations[this.selectedSchool];
				if (!location || !schoolLocation) {
					throw new Error('获取位置信息失败');
				}

				const distance = this.calculateDistance(
					location.latitude,
					location.longitude,
					schoolLocation.latitude,
					schoolLocation.longitude
				);

				const verified = distance <= schoolLocation.radius;
				
				if (verified) {
					const educationInfo = {
						verified: true,
						schoolName: this.selectedSchool,
						verifyTime: Date.now()
					};
					
					const res = await uniCloud.callFunction({
						name: 'updateProfile',
						data: {
							userId: uni.getStorageSync('userId'),
							educationInfo
						}
					});

					if (res.result.code === 0) {
						if (!this.userInfo) this.userInfo = {};
						this.userInfo.educationInfo = educationInfo;
						
						const userInfo = uni.getStorageSync('userInfo') || {};
						userInfo.educationInfo = educationInfo;
						uni.setStorageSync('userInfo', userInfo);
						
						uni.$emit('userInfoUpdated', userInfo);
						
						uni.showToast({
							title: '验证成功',
							icon: 'success'
						});
					} else {
						throw new Error(res.result.msg || '数据保存失败');
					}
				} else {
					throw new Error('不在学校范围内');
				}
			} catch (error) {
				console.error('验证失败:', error);
				uni.showToast({
					title: error.message || '验证失败',
					icon: 'none'
				});
			} finally {
				this.isVerifying = false;
			}
		},
		getCurrentLocation() {
			return new Promise((resolve, reject) => {
				uni.getLocation({
					type: 'gcj02',
					isHighAccuracy: true,
					success: (res) => {
						console.log('定位成功:', res);
						resolve(res);
					},
					fail: (err) => {
						console.error('定位失败:', err);
						reject(new Error('获取位置信息失败'));
					}
				});
			});
		},
		calculateTencentMapDistance(lat1, lng1, lat2, lng2) {
			return new Promise((resolve, reject) => {
				const key = 'GJHBZ-J56CQ-IBQ5D-2YUOS-TF23V-MNFA3'; // 替换为您的腾讯地图key
				uni.request({
					url: `https://apis.map.qq.com/ws/distance/v1/matrix`,
					data: {
						key: key,
						from: `${lat1},${lng1}`,
						to: `${lat2},${lng2}`,
						mode: 'walking' // 步行距离
					},
					success: (res) => {
						if (res.data.status === 0 && res.data.result.rows?.[0]?.elements?.[0]?.distance) {
							resolve(res.data.result.rows[0].elements[0].distance);
						} else {
							resolve(this.calculateDistance(lat1, lng1, lat2, lng2));
						}
					},
					fail: () => {
						// 如果腾讯地图API调用失败，使用直线距离计算
						resolve(this.calculateDistance(lat1, lng1, lat2, lng2));
					}
				});
			});
		},
		calculateDistance(lat1, lon1, lat2, lon2) {
			const R = 6371000; // 地球半径（米）
			const dLat = this.toRad(lat2 - lat1);
			const dLon = this.toRad(lon2 - lon1);
			const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
					  Math.sin(dLon/2) * Math.sin(dLon/2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			return R * c;
		},
		toRad(deg) {
			return deg * Math.PI / 180;
		},
		handleUserInfoUpdate(userInfo) {
			this.userInfo = userInfo;
			this.isLogin = true;
			// 更新本地存储
			uni.setStorageSync('userInfo', userInfo);
		},
		showMessage(message, type = 'info') {
			// 确保页面已加载
			if (!this.pageLoaded) {
				setTimeout(() => {
					this.showMessage(message, type);
				}, 100);
				return;
			}

			this.$nextTick(() => {
				if (this.$refs.messagePopup) {
					this.verificationStatus = {
						success: type === 'success',
						message: message
					};
					this.$refs.messagePopup.open();
				} else {
					// 降级处理：如果popup组件未加载，使用uni.showToast
					uni.showToast({
						title: message,
						icon: type === 'success' ? 'success' : 'none'
					});
				}
			});
		},
		// 判断点是否在多边形内（射线法）
		isPointInPolygon(lat, lng, bounds) {
			let inside = false;
			for (let i = 0, j = bounds.length - 1; i < bounds.length; j = i++) {
				const xi = bounds[i].longitude;
				const yi = bounds[i].latitude;
				const xj = bounds[j].longitude;
				const yj = bounds[j].latitude;

				const intersect = ((yi > lat) !== (yj > lat)) &&
					(lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
				
				if (intersect) inside = !inside;
			}
			
			return inside;
		},
		// 可选：添加获取最近边界点的方法
		getNearestBoundaryPoint(lat, lng, bounds) {
			let minDistance = Infinity;
			let nearestPoint = null;

			for (let i = 0; i < bounds.length; i++) {
				const point = bounds[i];
				const distance = this.calculateDistance(lat, lng, point.latitude, point.longitude);
				
				if (distance < minDistance) {
					minDistance = distance;
					nearestPoint = point;
				}
			}

			return {
				point: nearestPoint,
				distance: minDistance
			};
		},
		// 初始化用户信息
		async initUserInfo() {
			const userId = uni.getStorageSync('userId');
			const token = uni.getStorageSync('token');
			
			if (userId && token) {
				this.isLogin = true;
				// 从本地存储获取最新用户信息
				const localUserInfo = uni.getStorageSync('userInfo');
				if (localUserInfo) {
					this.userInfo = localUserInfo;
				}
				
				// 从服务器获取最新数据
				try {
					const res = await uniCloud.callFunction({
						name: 'getUserProfile',
						data: { 
							userId,
							forceUpdate: true
						}
					});
					
					if (res.result.code === 0) {
						const serverUserInfo = res.result.data;
						// 更新本地状态和存储
						this.userInfo = serverUserInfo;
						uni.setStorageSync('userInfo', serverUserInfo);
					}
				} catch (err) {
					console.error('获取用户信息失败:', err);
				}
			} else {
				this.isLogin = false;
				this.userInfo = {
					avatar: '',
					nickname: '未登录用户',
					signature: '登录后体验更多功能'
				};
			}
		},
		// 格式化日期
		formatDate(timestamp) {
			if (!timestamp) return '';
			const date = new Date(timestamp);
			const now = new Date();
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			
			return `${year}-${month}-${day} ${hours}:${minutes}`;
		},
		// 清除位置认证
		async clearLocationVerify() {
			try {
				uni.showModal({
					title: '确认退出验证',
					content: '退出当前位置认证后，需要重新进行位置验证才能使用相关功能，确定要退出吗？',
					confirmColor: '#FF5757',
					success: async (res) => {
						if (res.confirm) {
							uni.showLoading({ title: '处理中...' });
							
							const userId = uni.getStorageSync('userId');
							if (!userId) {
								throw new Error('未登录状态');
							}
							
							// 调用云函数清除认证信息
							const result = await uniCloud.callFunction({
								name: 'updateProfile',
								data: {
									userId,
									educationInfo: {
										verified: false,
										schoolName: '',
										verifyTime: null
									}
								}
							});
							
							if (result.result.code === 0) {
								// 更新本地状态
								if (!this.userInfo) this.userInfo = {};
								this.userInfo.educationInfo = {
									verified: false,
									schoolName: '',
									verifyTime: null
								};
								
								// 重置选择的学校
								this.selectedSchool = '';
								
								// 更新本地存储
								const userInfo = uni.getStorageSync('userInfo') || {};
								userInfo.educationInfo = this.userInfo.educationInfo;
								uni.setStorageSync('userInfo', userInfo);
								
								// 触发全局事件
								uni.$emit('userInfoUpdated', userInfo);
								
								uni.showToast({
									title: '已退出位置认证',
									icon: 'success'
								});
							} else {
								throw new Error(result.result.msg || '操作失败');
							}
						}
					}
				});
			} catch (error) {
				console.error('退出位置认证失败:', error);
				uni.showToast({
					title: error.message || '操作失败',
					icon: 'none'
				});
			} finally {
				uni.hideLoading();
			}
		},
		// 跳转到关注页面
		navigateToFollows() {
			if (!this.isLogin) {
				this.goToLogin();
				return;
			}
			
			console.log('正在跳转到关注页面');
			
			// 确保路径正确
			try {
				uni.navigateTo({
					url: '/pages/mine/follows'
				});
			} catch (error) {
				console.error('导航到关注页面失败:', error);
				uni.showToast({
					title: '页面跳转失败',
					icon: 'none'
				});
			}
		},
		
		// 跳转到粉丝页面
		navigateToFans() {
			if (!this.isLogin) {
				this.goToLogin();
				return;
			}
			
			console.log('正在跳转到粉丝页面');
			
			// 确保路径正确
			try {
				uni.navigateTo({
					url: '/pages/mine/fans'
				});
			} catch (error) {
				console.error('导航到粉丝页面失败:', error);
				uni.showToast({
					title: '页面跳转失败',
					icon: 'none'
				});
			}
		},
		
		// 跳转到获赞页面
		navigateToLikes() {
			if (!this.isLogin) {
				this.goToLogin();
				return;
			}
			uni.navigateTo({
				url: '/pages/mine/likes'
			});
		},
		// 刷新用户数据
		async refreshUserData(showLoading = false) {
			try {
				const userId = uni.getStorageSync('userId');
				if (!userId) {
					this.isLogin = false;
					return;
				}
				
				if (showLoading) {
					uni.showLoading({
						title: '刷新中...',
						mask: true
					});
				}
				
				// 获取用户资料
				const userRes = await uniCloud.callFunction({
					name: 'getUserProfile',
					data: {
						userId,
						forceUpdate: true
					}
				});
				
				if (userRes.result.code === 0) {
					const userInfo = userRes.result.data;
					
					// 确保数值为非负整数
					userInfo.followCount = Math.max(0, parseInt(userInfo.followCount) || 0);
					userInfo.followingCount = Math.max(0, parseInt(userInfo.followingCount) || 0);
					userInfo.fansCount = Math.max(0, parseInt(userInfo.fansCount) || 0);
					userInfo.followerCount = Math.max(0, parseInt(userInfo.followerCount) || 0);
					
					// 更新本地状态和存储
					this.userInfo = userInfo;
					uni.setStorageSync('userInfo', userInfo);
					
					// 确保登录状态为true
					this.isLogin = true;
					
					console.log('更新后的用户数据:', userInfo);
					
					// 强制刷新
					this.$forceUpdate();
				}
			} catch (error) {
				console.error('刷新用户数据失败:', error);
			} finally {
				if (showLoading) {
					uni.hideLoading();
				}
			}
		},
		// 添加一个强制从服务器同步用户信息的方法
		async forceSyncUserInfo() {
			const userId = uni.getStorageSync('userId');
			if (!userId) return;
			
			console.log('正在强制同步用户信息...');
			try {
				uni.showLoading({
					title: '刷新中...',
					mask: true  // 添加遮罩，防止用户在加载时操作UI
				});
				
				// 1. 首先获取用户的follows统计数据
				const followRes = await uniCloud.callFunction({
					name: 'getUserFollowing', 
					data: {
						userId,
						page: 1,
						pageSize: 1
					}
				});
				
				// 2. 获取最新的用户信息
				const res = await uniCloud.callFunction({
					name: 'getUserProfile',
					data: {
						userId,
						forceUpdate: true
					}
				});
				
				if (res.result.code === 0) {
					// 3. 更新本地数据前，先确保关注计数正确
					const userInfo = res.result.data;
					
					// 确保关注计数至少与从getUserFollowing获取的结果一致
					if (followRes.result && followRes.result.code === 0 && followRes.result.data.totalCount !== undefined) {
						const followCount = followRes.result.data.totalCount;
						userInfo.followCount = followCount;
						userInfo.followingCount = followCount;
					}
					
					// 确保关注计数不会为负
					userInfo.followCount = Math.max(0, userInfo.followCount || 0);
					userInfo.followingCount = Math.max(0, userInfo.followingCount || 0);
					
					// 4. 更新本地数据
					this.userInfo = userInfo;
					// 更新本地存储
					uni.setStorageSync('userInfo', this.userInfo);
					
					console.log('同步后的用户数据:', {
						followCount: this.userInfo.followCount,
						followingCount: this.userInfo.followingCount
					});
				}
			} catch (error) {
				console.error('强制同步用户信息失败:', error);
			} finally {
				uni.hideLoading();
			}
		},
		// 在页面初始化或显示时调用
		initPage() {
			this.checkLoginStatus(true);
			
			// 监听全局事件，以便在其他页面登录后能够更新
			uni.$on('loginStateChanged', () => {
				this.checkLoginStatus();
			});
		},
		// 重置用户信息
		resetUserInfo() {
			this.userInfo = {
				_id: '',
				nickname: '',
				avatar: '',
				signature: '',
				followCount: 0,
				fansCount: 0,
				likeCount: 0
			};
		},
	},
	computed: {
		getUserAvatar() {
			// 优化头像处理逻辑
			if (!this.isLogin) {
				return '/static/images/avatar/default.png';
			}
			
			return this.userInfo.avatar || '/static/images/avatar/default.png';
		},
		getMessageType() {
			return this.verificationStatus && this.verificationStatus.success ? 'success' : 'error';
		},
		getMessageContent() {
			return this.verificationStatus ? this.verificationStatus.message : '';
		},
		getFollowCount() {
			// 记录日志以便调试
			console.log('计算关注数，当前用户信息:', JSON.stringify({
				followCount: this.userInfo.followCount,
				followingCount: this.userInfo.followingCount
			}));
			
			// 获取关注数，优先使用followCount，然后是followingCount
			let count = 0;
			if (typeof this.userInfo.followCount === 'number') {
				count = this.userInfo.followCount;
			} else if (typeof this.userInfo.followingCount === 'number') {
				count = this.userInfo.followingCount;
			}
			
			// 确保值为非负整数
			return Math.max(0, parseInt(count) || 0);
		}
	}
}
</script>

<style>
.profile-container {
	background-color: #F6F7FB;
	min-height: 100vh;
	padding-bottom: 120rpx; /* 确保底部内容完全显示 */
}

/* 用户信息区域 */
.user-card {
	position: relative;
	display: flex;
	align-items: center;
	padding: 40rpx 30rpx;
	background: #FFFFFF;
	margin-bottom: 20rpx;
}

.user-info {
	flex: 1;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	border: 4rpx solid #FFFFFF;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.user-details {
	flex: 1;
}

.nickname-row {
	margin-bottom: 8rpx;
	display: flex;
	align-items: center;
}

.nickname {
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
	margin-right: 8rpx;
}

.signature {
	font-size: 28rpx;
	color: #999999;
}

.edit-profile-btn {
	background-color: #F8F8F8;
	padding: 12rpx 24rpx;
	border-radius: 30rpx;
	margin-right: 16rpx;
}

.edit-profile-btn text {
	font-size: 26rpx;
	color: #666666;
}

.logout-btn {
	background-color: #FFF5F5;
	padding: 12rpx 24rpx;
	border-radius: 30rpx;
}

.logout-btn text {
	font-size: 26rpx;
	color: #FF5757;
}

/* 立即登录按钮样式 */
.login-now-btn {
	background: linear-gradient(135deg, #4985FF, #2B62FF);
	padding: 12rpx 32rpx;
	border-radius: 30rpx;
	box-shadow: 0 4rpx 12rpx rgba(43, 98, 255, 0.3);
}

.login-now-btn text {
	font-size: 26rpx;
	color: #FFFFFF;
	font-weight: 500;
}

/* 用户统计 */
.user-stats {
	display: flex;
	justify-content: space-around;
	padding: 30rpx 0;
	background: #FFFFFF;
	margin-bottom: 20rpx;
	border-top: 1rpx solid #F5F5F5;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
}

.stat-value {
	font-size: 40rpx;
	font-weight: bold;
	color: #333333;
	margin-bottom: 8rpx;
}

.stat-label {
	font-size: 28rpx;
	color: #999999;
}

/* 卡片区域 */
.section-card {
	background: #FFFFFF;
	border-radius: 16rpx;
	margin: 0 20rpx 20rpx;
	padding: 24rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.section-header {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
}

.section-title-marker {
	width: 8rpx;
	height: 32rpx;
	background: linear-gradient(to bottom, #4985FF, #2B62FF);
	border-radius: 4rpx;
	margin-right: 16rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}

/* 服务网格 */
.service-grid {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.service-item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20rpx;
}

.service-icon {
	width: 88rpx;
	height: 88rpx;
	border-radius: 22rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 12rpx;
}

.service-icon image {
	width: 48rpx;
	height: 48rpx;
}

.service-name {
	font-size: 24rpx;
	color: #666666;
}

/* 菜单列表 */
.menu-list {
	width: 100%;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 0;
	border-bottom: 1rpx solid #F5F5F5;
}

.menu-item:last-child {
	border-bottom: none;
}

.menu-item-left {
	display: flex;
	align-items: center;
}

.menu-icon {
	width: 64rpx;
	height: 64rpx;
	border-radius: 16rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20rpx;
}

.menu-icon image {
	width: 32rpx;
	height: 32rpx;
}

.menu-label {
	font-size: 30rpx;
	color: #333333;
}

.count-badge {
	background-color: #EDF3FF;
	color: #4985FF;
	font-size: 24rpx;
	padding: 6rpx 16rpx;
	border-radius: 20rpx;
}

.arrow-icon {
	width: 32rpx;
	height: 32rpx;
	opacity: 0.5;
}

/* 院校认证部分 */
.school-section {
	margin-bottom: 30rpx;
}

.school-select {
	width: 100%;
}

.school-picker {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #EDF3FF;
	padding: 24rpx 30rpx;
	border-radius: 12rpx;
	margin-bottom: 24rpx;
}

.school-picker text {
	font-size: 30rpx;
	color: #333333;
	font-weight: 500;
}

.school-name {
	font-size: 30rpx;
	color: #2B62FF;
}

.verify-btn {
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	background: linear-gradient(135deg, #4985FF, #2B62FF);
	color: white;
	font-size: 32rpx;
	font-weight: bold;
	border-radius: 12rpx;
	box-shadow: 0 8rpx 16rpx rgba(43, 98, 255, 0.2);
	margin-top: 12rpx;
	border: none;
}

.school-verified {
	background: #FFFFFF;
	border-radius: 12rpx;
	padding: 30rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.verified-content {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
	background: rgba(16, 197, 91, 0.1);
	padding: 20rpx;
	border-radius: 8rpx;
	border-left: 8rpx solid #10C55B;
}

.verified-icon {
	width: 60rpx;
	height: 60rpx;
	background: #10C55B;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
}

.verified-info {
	flex: 1;
}

.verified-school {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
	display: block;
}

.verified-time {
	font-size: 24rpx;
	color: #666;
	display: block;
}

/* 退出位置验证按钮 */
.exit-verify-btn {
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	background: linear-gradient(135deg, #FF6A6A, #FF5757);
	color: white;
	font-size: 32rpx;
	font-weight: bold;
	border-radius: 12rpx;
	box-shadow: 0 8rpx 16rpx rgba(255, 87, 87, 0.2);
	border: none;
}

.exit-verify-btn:active {
	opacity: 0.9;
	transform: scale(0.98);
}

/* 底部占位区 */
.bottom-spacer {
	height: 30rpx;
}

/* 登录横幅样式 */
.login-banner {
	margin: 20rpx;
	background: linear-gradient(to right, #F0F7FF, #EDF3FF);
	border-radius: 16rpx;
	padding: 30rpx 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1rpx solid rgba(73, 133, 255, 0.2);
}

.login-banner-inner {
	display: flex;
	align-items: center;
}

.login-icon {
	width: 48rpx;
	height: 48rpx;
	margin-right: 16rpx;
}

.login-banner-text {
	font-size: 28rpx;
	color: #2B62FF;
}

.login-banner-btn {
	background: linear-gradient(135deg, #4985FF, #2B62FF);
	color: white;
	font-size: 26rpx;
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	margin: 0;
	box-shadow: 0 4rpx 12rpx rgba(43, 98, 255, 0.3);
	border: none;
	line-height: 1.5;
}
</style> 