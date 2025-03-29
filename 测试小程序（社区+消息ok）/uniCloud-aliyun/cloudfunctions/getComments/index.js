'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	const { postId, page = 1, pageSize = 10, sortType = 'time', userId } = event;
	
	console.log('获取评论列表，参数:', event);
	
	if (!postId) {
		return {
			code: 1,
			msg: '缺少帖子ID'
		};
	}
	
	try {
		// 确保page和pageSize是数字类型
		const pageNum = parseInt(page) || 1;
		const pageSizeNum = parseInt(pageSize) || 10;
		const skipCount = (pageNum - 1) * pageSizeNum;
		
		console.log('计算分页参数:', { pageNum, pageSizeNum, skipCount });
		
		// 创建查询对象
		let query = db.collection('comments')
			.where({
				postId: postId,
				status: dbCmd.neq(0)  // 排除已删除的评论
			});
		
		// 应用排序 - 修复排序方法
		if (sortType === 'hot') {
			query = query.orderBy('likeCount', 'desc').orderBy('createTime', 'desc');
		} else {
			query = query.orderBy('createTime', 'desc');
		}
		
		// 执行查询
		console.log('开始查询评论数据');
		const commentsQuery = await query
			.skip(skipCount)
			.limit(pageSizeNum)
			.get();
		
		const comments = commentsQuery.data;
		console.log('查询到评论数量:', comments ? comments.length : 0);
		
		if (!comments || comments.length === 0) {
			console.log('未找到评论数据');
			return {
				code: 0,
				data: {
					list: [],
					hasMore: false,
					total: 0
				}
			};
		}
		
		// 获取评论ID列表
		const commentIds = comments.map(comment => comment._id);
		console.log('评论ID列表:', commentIds);
		
		// 查询评论图片 - 根据数据表的实际结构修改
		console.log('开始查询评论图片，通过postId查询');
		let commentImages = [];
		let imageMap = {};
		try {
			const commentImagesQuery = await db.collection('comment_images')
				.where({
					postId: postId  // 使用帖子ID查询
				})
				.get();
			
			commentImages = commentImagesQuery.data || [];
			console.log('通过postId查询到评论图片数量:', commentImages.length);
			
			// 如果找到了评论图片，创建映射
			if (commentImages.length > 0) {
				console.log('找到的图片记录:', JSON.stringify(commentImages));
				
				// 找出评论数据
				console.log('开始使用userId关联图片与评论');
				
				// 为每条评论关联图片 - 使用userId和时间进行匹配
				commentImages.forEach(img => {
					console.log(`处理图片记录: userId=${img.userId}, time=${img.createTime}`);
					
					// 1. 使用userId进行关联 - 找到该用户在该帖子下的所有评论
					const userComments = comments.filter(comment => comment.userId === img.userId);
					
					if (userComments.length > 0) {
						console.log(`找到用户评论 ${userComments.length} 条`);
						
						// 2. 如果只有一条评论，直接关联
						if (userComments.length === 1) {
							imageMap[userComments[0]._id] = img.fileID;
							console.log(`直接关联: ${userComments[0]._id} -> ${img.fileID}`);
						} 
						// 3. 如果有多条评论，尝试用时间最接近的评论
						else {
							// 先检查是否有评论的时间和图片时间相近
							const imgTime = new Date(img.createTime).getTime();
							
							// 按时间差排序
							userComments.sort((a, b) => {
								const timeA = new Date(a.createTime).getTime();
								const timeB = new Date(b.createTime).getTime();
								return Math.abs(timeA - imgTime) - Math.abs(timeB - imgTime);
							});
							
							// 使用时间最接近的评论
							const closestComment = userComments[0];
							imageMap[closestComment._id] = img.fileID;
							console.log(`时间最近关联: ${closestComment._id} -> ${img.fileID}`);
						}
					}
				});
				
				// 调试用：输出最终映射表
				console.log('最终的图片映射表:', imageMap);
				console.log('映射条目数:', Object.keys(imageMap).length);
			}
		} catch (error) {
			console.error('通过postId查询评论图片失败:', error);
		}
		
		// 获取用户ID列表
		const userIds = [];
		const replyUserIds = [];
		
		comments.forEach(comment => {
			if (comment.userId) userIds.push(comment.userId);
			if (comment.replyTo) replyUserIds.push(comment.replyTo);
		});
		
		// 合并所有需要查询的用户ID并去重
		const allUserIds = [...new Set([...userIds, ...replyUserIds])];
		console.log('需要查询的用户ID:', allUserIds);
		
		// 查询用户信息
		let users = [];
		if (allUserIds.length > 0) {
			try {
				const usersQuery = await db.collection('user')
					.where({
						_id: dbCmd.in(allUserIds)
					})
					.field({
						_id: true,
						nickname: true,
						avatar: true
					})
					.get();
				
				users = usersQuery.data || [];
				console.log('查询到用户数量:', users.length);
			} catch (userError) {
				console.error('查询用户信息失败:', userError);
			}
		}
		
		// 创建用户映射表
		const userMap = {};
		users.forEach(user => {
			if (user && user._id) {
				userMap[user._id] = user;
			}
		});
		
		// 组装结果
		const result = comments.map(comment => {
			// 添加用户信息
			const userInfo = userMap[comment.userId] || {
				_id: comment.userId,
				nickname: '用户',
				avatar: '/static/images/default-avatar.png'
			};
			
			const replyUserInfo = comment.replyTo ? (userMap[comment.replyTo] || {
				_id: comment.replyTo,
				nickname: '用户',
				avatar: '/static/images/default-avatar.png'
			}) : null;
			
			// 添加图片信息
			const image = imageMap[comment._id] || '';
			
			return {
				...comment,
				userInfo,
				replyUserInfo,
				image,
				status: comment.status || 1
			};
		});
		
		// 查询总评论数
		let totalCount = 0;
		try {
			const totalQuery = await db.collection('comments')
				.where({
					postId,
					status: dbCmd.neq(0)
				})
				.count();
			
			totalCount = totalQuery.total;
		} catch (countError) {
			console.error('查询评论总数失败:', countError);
		}
		
		const hasMore = skipCount + result.length < totalCount;
		console.log('查询结果汇总:', {
			评论数量: result.length,
			总评论数: totalCount,
			是否还有更多: hasMore
		});
		
		// 调试代码：检查所有字段
		console.log('查看表中所有字段');
		try {
			const sampleRecord = await db.collection('comment_images').limit(1).get();
			if (sampleRecord.data && sampleRecord.data.length > 0) {
				const record = sampleRecord.data[0];
				console.log('样本记录的所有字段:', Object.keys(record));
				console.log('样本记录详情:', JSON.stringify(record));
			}
		} catch (error) {
			console.error('查询样本记录失败:', error);
		}
		
		const commentsWithImages = result.filter(c => !!c.image);
		console.log(`有图片的评论数量: ${commentsWithImages.length}`);
		if (commentsWithImages.length > 0) {
			console.log('示例图片评论:', {
				commentId: commentsWithImages[0]._id,
				imageUrl: commentsWithImages[0].image
			});
		}
		
		// 如果传入了userId，查询用户对每条评论的点赞状态
		if (userId) {
			const likedCommentIds = await db.collection('likes')
				.where({
					userId: userId,
					targetId: dbCmd.in(commentIds),
					type: 'comment'
				})
				.get()
				.then(likesQuery => likesQuery.data.map(like => like.targetId));
			
			// 为每条评论添加点赞状态
			result.forEach(comment => {
				comment.isLiked = likedCommentIds.includes(comment._id);
			});
		}
		
		return {
			code: 0,
			data: {
				list: result,
				hasMore,
				total: totalCount
			}
		};
	} catch (error) {
		console.error('获取评论失败:', error);
		return {
			code: 1,
			msg: '获取评论失败: ' + (error.message || '未知错误')
		};
	}
}; 