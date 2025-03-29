// uniCloud-aliyun/cloudfunctions/getPosts/index.js
'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	console.time('getPosts-总耗时');
	
	try {
		const { 
			type = 'all', 
			page = 1, 
			pageSize = 10, // 减小默认值，避免一次返回过多数据
			sortBy = 'createTime', 
			sortOrder = 'desc',
			userId,
			school,
			currentUserId
		} = event;
		
		console.log('getPosts请求参数:', JSON.stringify(event));
		
		// 限制字段，只返回需要的数据
		const projection = {
			content: true,
			images: true,
			userId: true,
			createTime: true,
			userInfo: true,
			likeCount: true,
			commentCount: true,
			_id: true,
			type: true,
			school: true
		};
		
		// 构建查询条件 - 更简单的条件
		const queryCondition = {};
		
		// 如果指定了返回特定类型，才添加类型筛选
		if (type && type !== 'all') {
			queryCondition.type = type;
		}
		
		// 如果指定了返回特定学校，才添加学校筛选
		if (school) {
			queryCondition.school = school;
		}
		
		console.log('查询条件:', JSON.stringify(queryCondition));
		
		// 避免不必要的计数查询，减少数据库操作
		// 直接进行主查询
		
		// 创建查询对象，使用projection减少返回的数据量
		let query = db.collection('posts')
			.where(queryCondition)
			.field(projection);
		
		// 应用排序
		if (sortBy === 'hot') {
			query = query.orderBy('likeCount', 'desc').orderBy('commentCount', 'desc');
		} else {
			query = query.orderBy(sortBy, sortOrder);
		}
		
		// 应用分页 - 使用有限的数据量
		const skip = (page - 1) * pageSize;
		query = query.skip(skip).limit(pageSize);
		
		// 执行查询 - 设置超时时间
		console.time('查询数据');
		const postsResult = await query.get({
			timeout: 10000 // 10秒超时
		});
		console.timeEnd('查询数据');
		
		let posts = postsResult.data || [];
		
		console.log('查询返回帖子数量:', posts.length);
		
		// 如果需要当前用户是否点赞的状态，单独查询
		let likeStatusMap = {};
		if (currentUserId && posts.length > 0) {
			try {
				const likesResult = await db.collection('likes')
					.where({
						userId: currentUserId,
						targetId: dbCmd.in(posts.map(p => p._id)),
						type: 'post'
					})
					.field({ targetId: true })
					.get({
						timeout: 5000 // 5秒超时
					});
					
				const likes = likesResult.data || [];
				likeStatusMap = likes.reduce((map, like) => {
					map[like.targetId] = true;
					return map;
				}, {});
			} catch (err) {
				console.error('获取点赞状态失败:', err);
				// 继续处理，即使获取点赞状态失败
			}
		}
		
		// 查询帖子列表后，添加点赞状态
		if (currentUserId) {
			// 查询用户点赞记录
			const userLikes = await db.collection('likes')
				.where({
					userId: currentUserId,
					targetId: db.command.in(posts.map(post => post._id)),
					type: 'post',
					status: 1
				})
				.get();
			
			// 构建点赞映射
			const likeMap = {};
			if (userLikes.data) {
				userLikes.data.forEach(like => {
					likeMap[like.targetId] = true;
				});
			}
			
			// 设置每篇帖子的点赞状态
			posts = posts.map(post => {
				return {
					...post,
					isLiked: !!likeMap[post._id]
				};
			});
		}
		
		// 只在列表不为空且可能有更多数据时才查询总数
		let total = 0;
		let hasMore = false;
		
		if (posts.length >= pageSize) {
			try {
				// 查询总数，设置超时
				const countResult = await db.collection('posts')
					.where(queryCondition)
					.count({
						timeout: 5000
					});
				total = countResult.total || 0;
				hasMore = skip + posts.length < total;
			} catch (countErr) {
				console.error('获取总数失败:', countErr);
				// 如果无法获取总数，假设还有更多数据
				hasMore = posts.length === pageSize;
				total = skip + posts.length + (hasMore ? 1 : 0);
			}
		} else {
			// 如果返回的数据少于页大小，则没有更多数据
			total = skip + posts.length;
			hasMore = false;
		}
		
		console.timeEnd('getPosts-总耗时');
		
		return {
			code: 0,
			msg: '获取成功',
			data: {
				list: posts,
				total: total,
				hasMore: hasMore
			}
		};
	} catch (error) {
		console.error('获取帖子列表失败:', error);
		console.timeEnd('getPosts-总耗时');
		
		return {
			code: 1,
			msg: '获取帖子列表失败: ' + error.message
		};
	}
};