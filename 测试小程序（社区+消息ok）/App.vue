<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检查登录状态
			const userId = uni.getStorageSync('userId');
			const token = uni.getStorageSync('token');
			
			if (userId && token) {
				// 获取最新的用户信息
				uniCloud.callFunction({
					name: 'getUserProfile',
					data: { 
						userId,
						forceUpdate: true
					}
				}).then(res => {
					if (res.result.code === 0) {
						// 更新本地存储
						uni.setStorageSync('userInfo', res.result.data);
					} else {
						// 清除无效的登录状态
						uni.removeStorageSync('token');
						uni.removeStorageSync('userId');
						uni.removeStorageSync('userInfo');
					}
				}).catch(console.error);
			}
			
			// 预创建必要的集合，避免后续操作时报错
			setTimeout(() => {
				uniCloud.callFunction({
					name: 'createCollections',
					data: {
						collections: ['errands', 'errand_accepts']
					}
				}).then(res => {
					console.log('初始化集合结果:', res.result);
				}).catch(err => {
					console.error('初始化集合失败:', err);
				});
			}, 1000);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
