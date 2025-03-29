'use strict';
const db = uniCloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	const { action, data } = event;
	
	// 管理员登录
	if (action === 'login') {
		const { username, password } = data;
		
		try {
			const adminUser = await db.collection('admin_users').where({
				username,
				password: password // 实际应用中应该使用加密后的密码
			}).get();
			
			if (adminUser.data.length === 0) {
				return {
					code: 1,
					msg: '账号或密码错误'
				};
			}
			
			const userInfo = adminUser.data[0];
			delete userInfo.password; // 删除密码字段
			
			return {
				code: 0,
				msg: '登录成功',
				data: userInfo
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '登录失败'
			};
		}
	}
	
	// 获取用户列表
	if (action === 'getUsers') {
		const { page = 1, pageSize = 10, keyword = '' } = data;
		const skip = (page - 1) * pageSize;
		
		try {
			let query = db.collection('users');
			
			if (keyword) {
				query = query.where(_.or([
					{
						nickname: new RegExp(keyword, 'i')
					},
					{
						phone: new RegExp(keyword)
					}
				]));
			}
			
			const total = await query.count();
			const list = await query
				.orderBy('createTime', 'desc')
				.skip(skip)
				.limit(pageSize)
				.get();
			
			return {
				code: 0,
				data: {
					list: list.data,
					hasMore: total.total > skip + list.data.length
				}
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '获取用户列表失败'
			};
		}
	}
	
	// 切换用户状态
	if (action === 'toggleUserStatus') {
		const { userId } = data;
		
		try {
			const user = await db.collection('users').doc(userId).get();
			const currentStatus = user.data[0].status;
			
			await db.collection('users').doc(userId).update({
				status: currentStatus === 'disabled' ? 'normal' : 'disabled'
			});
			
			return {
				code: 0,
				msg: '操作成功'
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '操作失败'
			};
		}
	}
	
	// 获取帖子列表
	if (action === 'getPosts') {
		const { page = 1, pageSize = 10, keyword = '', status = '' } = data;
		const skip = (page - 1) * pageSize;
		
		try {
			let query = db.collection('posts');
			let matchObj = {};
			
			if (keyword) {
				matchObj.content = new RegExp(keyword, 'i');
			}
			
			if (status) {
				matchObj.status = status;
			}
			
			if (Object.keys(matchObj).length > 0) {
				query = query.where(matchObj);
			}
			
			const total = await query.count();
			const list = await query
				.orderBy('createTime', 'desc')
				.skip(skip)
				.limit(pageSize)
				.get();
			
			// 获取发布者信息
			const userIds = [...new Set(list.data.map(item => item.userId))];
			const users = await db.collection('users')
				.where({
					_id: _.in(userIds)
				})
				.field({
					_id: true,
					nickname: true,
					avatar: true
				})
				.get();
			
			const userMap = {};
			users.data.forEach(user => {
				userMap[user._id] = user;
			});
			
			const formattedList = list.data.map(post => ({
				...post,
				userInfo: userMap[post.userId] || {}
			}));
			
			return {
				code: 0,
				data: {
					list: formattedList,
					hasMore: total.total > skip + list.data.length
				}
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '获取帖子列表失败'
			};
		}
	}
	
	// 切换帖子状态
	if (action === 'togglePostStatus') {
		const { postId, status } = data;
		
		try {
			await db.collection('posts').doc(postId).update({
				status
			});
			
			return {
				code: 0,
				msg: '操作成功'
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '操作失败'
			};
		}
	}
	
	// 删除帖子
	if (action === 'deletePost') {
		const { postId } = data;
		
		try {
			await db.collection('posts').doc(postId).remove();
			
			return {
				code: 0,
				msg: '删除成功'
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '删除失败'
			};
		}
	}
	
	// 获取统计数据
	if (action === 'getStatistics') {
		try {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const yesterday = new Date(today - 24 * 60 * 60 * 1000);
			
			// 获取总用户数和今日新增
			const totalUsers = await db.collection('users').count();
			const todayUsers = await db.collection('users')
				.where({
					createTime: _.gte(today.getTime())
				})
				.count();
			const yesterdayUsers = await db.collection('users')
				.where({
					createTime: _.gte(yesterday.getTime()).and(_.lt(today.getTime()))
				})
				.count();
			
			// 获取总帖子数和今日新增
			const totalPosts = await db.collection('posts').count();
			const todayPosts = await db.collection('posts')
				.where({
					createTime: _.gte(today.getTime())
				})
				.count();
			const yesterdayPosts = await db.collection('posts')
				.where({
					createTime: _.gte(yesterday.getTime()).and(_.lt(today.getTime()))
				})
				.count();
			
			// 获取认证用户数
			const verifiedUsers = await db.collection('users')
				.where({
					'educationInfo.verified': true
				})
				.count();
			
			return {
				code: 0,
				data: {
					totalUsers: totalUsers.total,
					totalPosts: totalPosts.total,
					verifiedUsers: verifiedUsers.total,
					verifiedRate: Math.round((verifiedUsers.total / totalUsers.total) * 100),
					userChange: todayUsers.total - yesterdayUsers.total,
					postChange: todayPosts.total - yesterdayPosts.total
				}
			};
		} catch (error) {
			return {
				code: 1,
				msg: error.message || '获取统计数据失败'
			};
		}
	}
	
	return {
		code: 1,
		msg: '未知的操作类型'
	};
}; 