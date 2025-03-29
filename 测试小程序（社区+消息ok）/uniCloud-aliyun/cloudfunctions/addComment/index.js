'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	console.log('添加评论，参数:', event);
	
	const { postId, userId, content, parentId, replyTo, mentionedUserIds = [], imageUrl } = event;
	
	// 参数检查
	if (!postId || !userId || !content) {
		return {
			code: 1,
			msg: '参数不完整'
		};
	}
	
	try {
		// 查询帖子信息，确认帖子存在并获取作者信息
		const postResult = await db.collection('posts').doc(postId).get();
		if (!postResult.data || postResult.data.length === 0) {
			return {
				code: 1,
				msg: '帖子不存在'
			};
		}
		
		const post = postResult.data[0];
		console.log('找到帖子:', post);
		
		// 开始事务
		const transaction = await db.startTransaction();
		
		try {
			// 1. 创建评论
			const commentData = {
				postId,
				userId,
				content,
				parentId: parentId || null,
				replyTo: replyTo || null,
				likeCount: 0,
				status: 1,
				createTime: Date.now()
			};
			
			console.log('准备添加评论:', commentData);
			
			const commentRes = await transaction.collection('comments').add(commentData);
			const commentId = commentRes.id;
			
			console.log('评论添加成功, ID:', commentId);
			
			// 2. 更新帖子评论计数
			await transaction.collection('posts').doc(postId).update({
				commentCount: dbCmd.inc(1)
			});
			
			console.log('帖子评论计数已更新');
			
			// 3. 创建通知 - 给帖子作者的评论通知
			if (post.userId && post.userId !== userId) {
				const notificationData = {
					type: 'post_comment',
					sender: userId,
					receiver: post.userId,
					postId,
					commentId,
					content,
					isRead: false,
					createTime: Date.now()
				};
				
				console.log('准备创建帖子评论通知:', notificationData);
				await transaction.collection('notifications').add(notificationData);
				console.log('帖子评论通知创建成功');
			}
			
			// 4. 如果是回复其他评论，创建回复通知
			if (replyTo && replyTo !== userId) {
				const replyNotificationData = {
					type: 'reply',
					sender: userId,
					receiver: replyTo,
					postId,
					commentId,
					content,
					isRead: false,
					createTime: Date.now()
				};
				
				console.log('准备创建回复通知:', replyNotificationData);
				await transaction.collection('notifications').add(replyNotificationData);
				console.log('回复通知创建成功');
			}
			
			// 5. 如果有@用户，创建@通知
			if (mentionedUserIds && mentionedUserIds.length > 0) {
				for (const mentionId of mentionedUserIds) {
					// 不给自己发@通知
					if (mentionId === userId) continue;
					
					// 如果已经创建了回复通知，不重复创建@通知
					if (replyTo === mentionId) continue;
					
					// 如果已经创建了评论通知，不重复创建@通知
					if (post.userId === mentionId) continue;
					
					const mentionNotificationData = {
						type: 'mention',
						sender: userId,
						receiver: mentionId,
						postId,
						commentId,
						content,
						isRead: false,
						createTime: Date.now()
					};
					
					console.log('准备创建@通知:', mentionNotificationData);
					await transaction.collection('notifications').add(mentionNotificationData);
					console.log('@通知创建成功');
				}
			}
			
			// 在添加评论后，如果有图片URL，添加到comment_images表
			if (commentId && imageUrl) {
				try {
					await transaction.collection('comment_images').add({
						userId,
						postId,
						commentId,
						fileID: imageUrl,
						type: 'comment',
						createTime: new Date()
					});
					console.log('评论图片添加成功');
				} catch (imageError) {
					console.error('评论图片添加失败:', imageError);
					// 这里可以选择是否因为图片添加失败而回滚评论
				}
			}
			
			// 提交事务
			await transaction.commit();
			
			return {
				code: 0,
				msg: '评论成功',
				data: {
					commentId
				}
			};
		} catch (err) {
			// 回滚事务
			await transaction.rollback();
			console.error('评论事务失败:', err);
			throw err;
		}
	} catch (err) {
		console.error('添加评论失败:', err);
		return {
			code: 1,
			msg: '添加评论失败: ' + err.message
		};
	}
}; 