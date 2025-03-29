<template>
	<view class="container">
		<!-- 顶部分类选择 -->
		<view class="category-nav">
			<scroll-view scroll-x class="nav-scroll" :scroll-into-view="'category-' + currentCategory">
				<view 
					v-for="(item, index) in categories" 
					:key="index"
					:id="'category-' + index"
					class="category-item"
					:class="{ active: currentCategory === index }"
					@tap="switchCategory(index)"
				>
					<text class="category-text">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>

		<!-- 发布表单 -->
		<view class="publish-form">
			<!-- 发帖模式 -->
			<block v-if="currentCategory === 7">
				<!-- 内容输入 -->
				<view class="form-item">
					<textarea 
						class="content-input" 
						v-model="formData.postContent"
						placeholder="分享新鲜事..."
						maxlength="500"
					/>
					<text class="word-count">{{formData.postContent.length}}/500</text>
				</view>

				<!-- 图片选择 -->
				<view class="form-item">
					<view class="image-upload">
						<view class="image-list">
							<view v-for="(item, index) in formData.postImages" :key="index" class="image-item">
								<image :src="item" mode="aspectFill" class="preview-image" @tap="previewImage(index, 'post')"></image>
								<text class="delete-icon" @tap.stop="removeImage(index, 'post')">×</text>
							</view>
							
							<view v-if="formData.postImages.length < 9" class="upload-btn" @tap="chooseImage('post')">
								<text class="plus-icon">+</text>
								<text class="upload-text">添加图片</text>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- 原有表单 -->
			<block v-else>
				<!-- 标题输入 -->
				<view class="form-item">
					<input 
						class="title-input" 
						v-model="formData.title" 
						placeholder="请输入标题（必填）"
						maxlength="30"
					/>
					<text class="word-count">{{formData.title.length}}/30</text>
				</view>

				<!-- 内容输入 -->
				<view class="form-item">
					<textarea 
						class="content-input" 
						v-model="formData.content"
						placeholder="请详细描述您要发布的内容（必填）"
						maxlength="500"
					/>
					<text class="word-count">{{formData.content.length}}/500</text>
				</view>

				<!-- 图片选择 -->
				<view class="form-item" v-if="currentCategory !== 4">
					<view class="image-upload">
						<view class="image-list">
							<view v-for="(item, index) in formData.tempImages" :key="index" class="image-item">
								<image :src="item" mode="aspectFill" class="preview-image" @tap="previewImage(index)"></image>
								<text class="delete-icon" @tap.stop="removeImage(index)">×</text>
							</view>
							
							<view v-if="formData.tempImages.length < 9" class="upload-btn" @tap="chooseImage">
								<text class="plus-icon">+</text>
								<text class="upload-text">添加图片</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 分类特定表单 -->
				<block v-if="currentCategory === 0">
					<!-- 技能互换 -->
					<view class="form-item">
						<text class="label">每小时价格：</text>
						<view class="price-input">
							<text>¥</text>
							<input 
								type="digit" 
								v-model="formData.price" 
								placeholder="请输入每小时价格" 
							/>
							<text class="unit">元/小时</text>
						</view>
					</view>

					<view class="form-item">
						<text class="label">技能等级：</text>
						<picker 
							mode="selector" 
							:range="['初级', '中级', '高级', '专家']" 
							@change="e => formData.level = e.target.value"
						>
							<view class="picker-content">
								{{formData.level || '请选择技能等级'}}
							</view>
						</picker>
					</view>

					<view class="form-item">
						<text class="label">授课方式：</text>
						<checkbox-group @change="handleTeachingMethodChange">
							<label class="checkbox-item">
								<checkbox value="online" />线上授课
							</label>
							<label class="checkbox-item">
								<checkbox value="offline" />线下授课
							</label>
						</checkbox-group>
					</view>

					<view class="form-item">
						<text class="label">可授课时间：</text>
						<textarea 
							class="normal-input" 
							v-model="formData.availableTime" 
							placeholder="请填写您的可授课时间，如：周一至周五晚上、周末全天等"
						/>
					</view>

					<view class="form-item">
						<text class="label">技能标签：</text>
						<view class="tag-list">
							<view 
								v-for="(tag, index) in formData.tags" 
								:key="index"
								class="tag"
							>
								{{tag}}
								<text class="delete-tag" @tap="deleteTag(index)">×</text>
							</view>
							<input 
								class="tag-input" 
								v-model="newTag"
								placeholder="添加标签"
								@confirm="addTag"
							/>
						</view>
					</view>
				</block>
				
				<block v-else-if="currentCategory === 1">
					<!-- 闲置交易 -->
					<view class="form-item">
						<text class="label">价格：</text>
						<view class="price-input">
							<text>¥</text>
							<input type="digit" v-model="formData.price" placeholder="请输入价格" />
							<text class="unit">元</text>
						</view>
					</view>
					<view class="form-item">
						<text class="label">交易类型：</text>
						<view class="type-options">
							<view 
								class="type-item" 
								:class="{ active: formData.tradeType === 'sell' }"
								@tap="formData.tradeType = 'sell'"
							>
								出售
							</view>
							<view 
								class="type-item"
								:class="{ active: formData.tradeType === 'buy' }"
								@tap="formData.tradeType = 'buy'"
							>
								求购
							</view>
						</view>
					</view>
				</block>
				
				<block v-else-if="currentCategory === 5">
					<!-- 游玩搭子特定表单 -->
					<view class="form-item">
						<text class="label">活动类型：</text>
						<input 
							class="normal-input" 
							v-model="formData.type" 
							placeholder="请输入活动类型，如：爬山、骑行等"
						/>
					</view>
					
					<view class="form-item">
						<text class="label">活动时间：</text>
						<input 
							class="normal-input" 
							v-model="formData.time" 
							placeholder="请输入活动时间，如：周末、周六下午等"
						/>
					</view>
					
					<view class="form-item">
						<text class="label">活动地点：</text>
						<input 
							class="normal-input" 
							v-model="formData.location" 
							placeholder="请输入活动地点"
						/>
					</view>
				</block>
				
				<block v-else>
					<!-- 其他类别 -->
					<view class="form-item" v-if="currentCategory === 2 || currentCategory === 3">
						<text class="label">价格：</text>
						<view class="price-input">
							<text>¥</text>
							<input type="digit" v-model="formData.price" placeholder="请输入价格" />
							<text class="unit">元</text>
						</view>
					</view>
				</block>
			</block>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar" :style="{ paddingBottom: safeAreaBottom + 'px' }">
			<button 
				class="submit-btn" 
				:class="{ active: canSubmit }"
				:disabled="!canSubmit || isSubmitting"
				@tap="submitForm"
			>
				{{ isSubmitting ? '发布中...' : '发布' }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categories: [
				{ name: '技能互换' },
				{ name: '闲置交易' },
				{ name: '跑腿代取' },
				{ name: '课程辅导' },
				{ name: '交通拼车' },
				{ name: '游玩搭子' },
				{ name: '校招实习' },
				{ name: '发帖' }
			],
			currentCategory: 0,
			formData: {
				title: '',
				content: '',
				tempImages: [],
				images: [],
				price: '',
				tradeType: 'sell',
				level: '',
				teachingMethod: [],
				availableTime: '',
				tags: [],
				location: '',
				time: '',
				type: '',
				postContent: '',
				postImages: []
			},
			newTag: '',
			isSubmitting: false
		}
	},
	computed: {
		canSubmit() {
			if (this.currentCategory === 7) {
				return this.formData.postContent.trim() !== '';
			}
			
			if (!this.formData.title.trim() || !this.formData.content.trim()) {
				return false;
			}
			
			if (this.currentCategory === 0) {
				return !!this.formData.price && !isNaN(parseFloat(this.formData.price));
			} else if (this.currentCategory === 1) {
				return !!this.formData.price && !isNaN(parseFloat(this.formData.price));
			} else if (this.currentCategory === 5) {
				return !!this.formData.type && !!this.formData.time && !!this.formData.location;
			}
			
			return true;
		}
	},
	methods: {
		switchCategory(index) {
			this.currentCategory = index;
		},
		
		chooseImage(type = 'normal') {
			const images = type === 'post' ? this.formData.postImages : this.formData.tempImages;
			uni.chooseImage({
				count: 9 - images.length,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					if (type === 'post') {
						this.formData.postImages = [...this.formData.postImages, ...res.tempFilePaths];
					} else {
						this.formData.tempImages = [...this.formData.tempImages, ...res.tempFilePaths];
					}
				}
			});
		},
		
		previewImage(index, type = 'normal') {
			const images = type === 'post' ? this.formData.postImages : this.formData.tempImages;
			uni.previewImage({
				current: images[index],
				urls: images
			});
		},
		
		removeImage(index, type = 'normal') {
			if (type === 'post') {
				this.formData.postImages.splice(index, 1);
			} else {
				this.formData.tempImages.splice(index, 1);
			}
		},
		
		uploadSingleImage(filePath, type = 'normal') {
			return new Promise((resolve, reject) => {
				const folder = type === 'post' ? 'posts' : 'uploads';
				uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`,
					success: (res) => {
						resolve(res.fileID);
					},
					fail: (err) => {
						reject(err);
					}
				});
			});
		},
		
		async uploadAllImages(type = 'normal') {
			const images = type === 'post' ? this.formData.postImages : this.formData.tempImages;
			const uploadPromises = images.map(path => this.uploadSingleImage(path, type));
			return Promise.all(uploadPromises);
		},
		
		async submitForm() {
			const userId = uni.getStorageSync('userId');
			const userInfo = uni.getStorageSync('userInfo');
			
			if (!userId || !userInfo) {
				uni.showModal({
					title: '提示',
					content: '您需要先登录才能发布内容',
					showCancel: false,
					success: () => {
						uni.navigateTo({
							url: '/pages/login/index'
						});
					}
				});
				return;
			}

			if (this.currentCategory === 7) {
				if (!this.formData.postContent.trim()) {
					uni.showToast({ title: '请输入内容', icon: 'none' });
					return;
				}
			} else {
				if (!userInfo.educationInfo?.verified) {
					uni.showModal({
						title: '提示',
						content: '您需要先完成位置认证才能发布内容',
						showCancel: false,
						success: () => {
							uni.navigateTo({
								url: '/pages/mine/mine'
							});
						}
					});
					return;
				}

				if (!this.formData.title.trim() || !this.formData.content.trim()) {
					uni.showToast({ title: '请填写标题和内容', icon: 'none' });
					return;
				}
			}

			this.isSubmitting = true;
			
			try {
				// 1. 内容审核
				const auditRes = await uniCloud.callFunction({
					name: 'contentAudit',
					data: {
						content: this.currentCategory === 7 ? 
							this.formData.postContent : 
							this.formData.title + '\n' + this.formData.content,
						images: this.currentCategory === 7 ? 
							this.formData.postImages : 
							this.formData.tempImages,
						type: this.getContentType()
					}
				});
				
				if (!auditRes.result.data.pass) {
					throw new Error('内容审核未通过：' + auditRes.result.data.reasons.join('、'));
				}
				
				// 2. 发布内容
				if (this.currentCategory === 7) {
					let uploadedImages = [];
					if (this.formData.postImages.length > 0) {
						uploadedImages = await this.uploadAllImages('post');
					}
					
					const postData = {
						userId,
						content: this.formData.postContent.trim(),
						images: uploadedImages,
						createTime: Date.now(),
						userInfo: {
							_id: userId,
							avatar: userInfo.avatar || '/static/images/avatar/default.png',
							nickname: userInfo.nickname || '未知用户'
						},
						likeCount: 0,
						commentCount: 0,
						status: 1
					};

					const res = await uniCloud.callFunction({
						name: 'publishPost',
						data: {
							collection: 'posts',
							data: postData
						}
					});

					if (res.result.code === 0) {
						// 3. 更新用户信用分
						await uniCloud.callFunction({
							name: 'userCredit',
							data: {
								action: 'adjust',
								userId,
								value: 2,
								reason: '发布优质内容'
							}
						});
						
						uni.showToast({ 
							title: '发布成功',
							icon: 'success'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						throw new Error(res.result.msg || '发布失败');
					}
				} else {
					let uploadedImages = [];
					if (this.currentCategory !== 4 && this.formData.tempImages.length > 0) {
						uploadedImages = await this.uploadAllImages();
					}
					
					const contentData = {
						userId,
						school: userInfo.educationInfo?.schoolName || '',
						type: this.currentCategory === 5 ? this.formData.type : this.getContentType(),
						title: this.formData.title.trim(),
						content: this.formData.content.trim(),
						images: uploadedImages,
						status: 'active',
						createTime: Date.now(),
						updateTime: Date.now(),
						userInfo: {
							_id: userId,
							avatar: userInfo.avatar || '/static/images/avatar/default.png',
							nickname: userInfo.nickname || '未知用户'
						},
						price: parseFloat(this.formData.price) || 0,
						level: this.formData.level,
						teachingMethod: this.formData.teachingMethod,
						availableTime: this.formData.availableTime,
						tags: this.formData.tags,
					};

					const res = await uniCloud.callFunction({
						name: 'publishContent',
						data: {
							collection: this.getCollectionName(),
							data: contentData
						}
					});

					if (res.result.code === 0) {
						uni.showToast({ 
							title: '发布成功',
							icon: 'success'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						throw new Error(res.result.msg || '发布失败');
					}
				}
			} catch (error) {
				uni.showToast({ 
					title: error.message || '发布失败', 
					icon: 'none'
				});
			} finally {
				this.isSubmitting = false;
			}
		},
		
		getContentType() {
			const types = ['skill', 'idle', 'errand', 'tutor', 'carpool', 'activity', 'job'];
			return types[this.currentCategory];
		},
		
		getCollectionName() {
			const collections = ['skills', 'idles', 'errands', 'tutors', 'carpools', 'activities', 'jobs'];
			return collections[this.currentCategory];
		},

		handleTeachingMethodChange(e) {
			this.formData.teachingMethod = e.detail.value;
		},

		addTag() {
			if (this.newTag.trim()) {
				this.formData.tags.push(this.newTag.trim());
				this.newTag = '';
			}
		},

		deleteTag(index) {
			this.formData.tags.splice(index, 1);
		}
	}
}
</script>

<style lang="scss">
.container {
	padding-bottom: 120rpx;
	background-color: #f8f8f8;
}

.category-nav {
	background-color: #FFFFFF;
	padding: 20rpx 0;
	position: sticky;
	top: 0;
	z-index: 10;
}

.nav-scroll {
	white-space: nowrap;
}

.category-item {
	display: inline-block;
	padding: 16rpx 30rpx;
	font-size: 28rpx;
	color: #666;
	
	&.active {
		color: #ff5757;
		font-weight: bold;
		position: relative;
		
		&:after {
			content: '';
			position: absolute;
			bottom: -4rpx;
			left: 30rpx;
			right: 30rpx;
			height: 4rpx;
			background-color: #ff5757;
			border-radius: 2rpx;
		}
	}
}

.publish-form {
	padding: 30rpx;
}

.form-item {
	background-color: #FFFFFF;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	position: relative;
}

.title-input {
	font-size: 32rpx;
	padding: 10rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.content-input {
	width: 100%;
	height: 240rpx;
	font-size: 28rpx;
	padding: 20rpx 0;
	line-height: 1.6;
}

.word-count {
	position: absolute;
	right: 30rpx;
	bottom: 16rpx;
	font-size: 24rpx;
	color: #999;
}

.image-upload {
	margin-top: 20rpx;
}

.image-list {
	display: flex;
	flex-wrap: wrap;
}

.image-item, .upload-btn {
	width: 200rpx;
	height: 200rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	position: relative;
}

.image-item:nth-child(3n) {
	margin-right: 0;
}

.preview-image {
	width: 100%;
	height: 100%;
	border-radius: 8rpx;
}

.delete-icon {
	position: absolute;
	right: -20rpx;
	top: -20rpx;
	width: 40rpx;
	height: 40rpx;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	z-index: 2;
}

.upload-btn {
	border: 1rpx dashed #ddd;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f9f9f9;
	border-radius: 8rpx;
}

.plus-icon {
	font-size: 60rpx;
	color: #ddd;
	line-height: 1;
	margin-bottom: 10rpx;
}

.upload-text {
	font-size: 24rpx;
	color: #999;
}

.label {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 16rpx;
	display: block;
}

.price-input {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.price-input input {
	flex: 1;
	padding: 12rpx 20rpx;
	background: #f5f5f5;
	border-radius: 8rpx;
	margin: 0 16rpx;
	font-size: 28rpx;
}

.unit {
	font-size: 28rpx;
	color: #666;
}

.trade-type {
	margin-top: 20rpx;
}

.type-options {
	display: flex;
	gap: 20rpx;
	margin-top: 16rpx;
}

.type-item {
	padding: 12rpx 30rpx;
	border-radius: 30rpx;
	background: #f5f5f5;
	font-size: 26rpx;
	color: #666;
}

.type-item.active {
	background: #ff5757;
	color: #fff;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	padding: 20rpx 30rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.submit-btn {
	width: 100%;
	height: 88rpx;
	background: #cccccc;
	border-radius: 44rpx;
	color: #fff;
	font-size: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;
	
	&.active {
		background: #ff5757;
		box-shadow: 0 4rpx 16rpx rgba(255, 87, 87, 0.3);
	}
}

.normal-input {
	width: 100%;
	padding: 20rpx;
	background: #f5f5f5;
	border-radius: 8rpx;
	font-size: 28rpx;
	margin-top: 16rpx;
}

.picker-content {
	padding: 20rpx;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
}

.checkbox-item {
	margin-right: 20rpx;
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.tag {
	background-color: #eef6ff;
	color: #3498db;
	padding: 8rpx 20rpx;
	font-size: 26rpx;
	border-radius: 24rpx;
	margin-right: 16rpx;
	margin-bottom: 16rpx;
	display: flex;
	align-items: center;
}

.delete-tag {
	margin-left: 8rpx;
	color: #999;
	font-size: 28rpx;
}

.tag-input {
	width: 200rpx;
	padding: 8rpx 20rpx;
	background: #f5f5f5;
	border-radius: 24rpx;
	font-size: 26rpx;
}
</style> 