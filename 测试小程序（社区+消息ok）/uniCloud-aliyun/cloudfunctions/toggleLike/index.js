'use strict';
const db = uniCloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	console.log('toggleLike参数:', event);
	
	// 解构参数，添加isLiked可选参数
	const { userId, targetId, type, isLiked } = event;

	if (!userId || !targetId || !type) {
		return {
			code: 1,
			msg: '参数不完整'
		};
	}

	// 检查类型是否为评论
	const isCommentType = type === 'comment';
	const targetCollection = isCommentType ? 'comments' : 'posts';
	const collection = db.collection('likes');
	
	try {
		// 先检查是否有有效的点赞记录
		const likeRecord = await collection.where({
			userId,
			targetId,
			type,
			status: 1
		}).get();
		
		const hasActive = likeRecord.data && likeRecord.data.length > 0;
		
		// 如果指定了isLiked参数，就按照指定的状态设置
		// 否则切换当前状态
		const shouldLike = isLiked !== undefined ? !!isLiked : !hasActive;
		
		console.log(`用户${userId}对${type} ${targetId}的操作: 当前状态=${hasActive}, 目标状态=${shouldLike}`);
		
		// 如果当前状态和目标状态一致，无需操作
		if (hasActive === shouldLike) {
			console.log('当前状态已经是目标状态，无需操作');
			
			// 查询目标的点赞数
			const targetItem = await db.collection(targetCollection).doc(targetId)
				.field({ likeCount: true })
				.get();
			
			const likeCount = targetItem.data && targetItem.data[0] ? 
				(targetItem.data[0].likeCount || 0) : 0;
			
			return {
				code: 0,
				msg: '状态未改变',
				data: {
					isLiked: shouldLike,
					likeCount
				}
			};
		}
		
		// 检查是否存在任何记录（不管状态如何）
		const existingRecord = await collection.where({
			userId,
			targetId,
			type
		}).get();
		
		let likeCount = 0;
		
		if (existingRecord.data && existingRecord.data.length > 0) {
			// 已存在记录，更新状态
			const newStatus = shouldLike ? 1 : 0;
			const changeValue = shouldLike ? 1 : -1;
			
			await collection.doc(existingRecord.data[0]._id).update({
				status: newStatus,
				updateTime: Date.now()
			});
			
			// 更新目标的点赞计数
			const updateResult = await db.collection(targetCollection).doc(targetId).update({
				likeCount: _.inc(changeValue)
			});
			
			console.log('更新点赞计数结果:', updateResult);
			
			// 查询更新后的点赞数
			const updatedItem = await db.collection(targetCollection).doc(targetId)
				.field({ likeCount: true })
				.get();
			
			likeCount = updatedItem.data && updatedItem.data[0] ? 
				(updatedItem.data[0].likeCount || 0) : 0;
		} else {
			// 不存在记录，创建一个
			if (shouldLike) {
				await collection.add({
					userId,
					targetId,
					type,
					status: 1,
					createTime: Date.now(),
					updateTime: Date.now()
				});
				
				// 增加目标的点赞计数
				const updateResult = await db.collection(targetCollection).doc(targetId).update({
					likeCount: _.inc(1)
				});
				
				console.log('创建点赞记录并更新计数结果:', updateResult);
				
				// 查询更新后的点赞数
				const updatedItem = await db.collection(targetCollection).doc(targetId)
					.field({ likeCount: true })
					.get();
				
				likeCount = updatedItem.data && updatedItem.data[0] ? 
					(updatedItem.data[0].likeCount || 0) : 0;
			} else {
				// 请求取消点赞，但没有点赞记录，无需操作
				console.log('请求取消点赞，但没有点赞记录');
				
				// 查询目标的点赞数
				const targetItem = await db.collection(targetCollection).doc(targetId)
					.field({ likeCount: true })
					.get();
				
				likeCount = targetItem.data && targetItem.data[0] ? 
					(targetItem.data[0].likeCount || 0) : 0;
			}
		}
		
		return {
			code: 0,
			data: {
				isLiked: shouldLike,
				likeCount
			}
		};
	} catch (error) {
		console.error('点赞操作失败:', error);
		return {
			code: 1,
			msg: '点赞操作失败: ' + error.message
		};
	}
};

// 点赞和取消点赞通用逻辑
async function toggleLike(userId, targetId, targetType) {
	// 先查询是否已点赞
	const likeCollection = db.collection('likes');
	const likeRecord = await likeCollection.where({
		userId,
		targetId,
		type: targetType
	}).get();
	
	// 已存在点赞记录，需要取消点赞
	if (likeRecord.data && likeRecord.data.length > 0) {
		// 删除点赞记录
		await likeCollection.doc(likeRecord.data[0]._id).remove();
		
		// 减少目标对象的点赞计数
		if (targetType === 'post') {
			await db.collection('posts').doc(targetId).update({
				likeCount: _.inc(-1)
			});
		} else if (targetType === 'comment') {
			await db.collection('comments').doc(targetId).update({
				likeCount: _.inc(-1)
			});
		}
		
		return {
			action: 'unlike',
			success: true
		};
	} 
	// 不存在点赞记录，需要点赞
	else {
		// 创建点赞记录
		await likeCollection.add({
			userId,
			targetId,
			type: targetType,
			createTime: new Date().getTime()
		});
		
		// 增加目标对象的点赞计数
		if (targetType === 'post') {
			await db.collection('posts').doc(targetId).update({
				likeCount: _.inc(1)
			});
		} else if (targetType === 'comment') {
			await db.collection('comments').doc(targetId).update({
				likeCount: _.inc(1)
			});
		}
		
		return {
			action: 'like',
			success: true
		};
	}
} 