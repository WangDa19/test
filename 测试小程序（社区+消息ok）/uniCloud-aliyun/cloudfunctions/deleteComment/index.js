'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	const { commentId, postId, userId } = event;
	
	if (!commentId || !postId || !userId) {
		return {
			code: 1,
			msg: '参数不完整'
		};
	}
	
	try {
		// 查找评论
		const comment = await db.collection('comments')
			.doc(commentId)
			.get();
			
		if (!comment.data || comment.data.length === 0) {
			return {
				code: 1,
				msg: '评论不存在'
			};
		}
		
		// 查找帖子
		const post = await db.collection('posts')
			.doc(postId)
			.get();
			
		if (!post.data || post.data.length === 0) {
			return {
				code: 1,
				msg: '帖子不存在'
			};
		}
		
		// 验证权限（评论作者或帖子作者可删除）
		if (comment.data[0].userId !== userId && post.data[0].userId !== userId) {
			return {
				code: 1,
				msg: '无权删除此评论'
			};
		}
		
		// 开始事务操作
		const transaction = await db.startTransaction();
		
		try {
			// 删除评论
			await transaction.collection('comments')
				.doc(commentId)
				.remove();
				
			// 更新帖子评论数
			await transaction.collection('posts')
				.doc(postId)
				.update({
					commentCount: dbCmd.inc(-1)
				});
				
			// 提交事务
			await transaction.commit();
			
			return {
				code: 0,
				msg: '删除成功'
			};
		} catch (error) {
			// 回滚事务
			await transaction.rollback();
			throw error;
		}
	} catch (error) {
		console.error('删除评论失败:', error);
		return {
			code: 1,
			msg: '删除失败'
		};
	}
}; 