'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	
	try {
		// 1. 查找所有没有status字段的帖子
		const postsToFix = await db.collection('posts')
			.where({
				status: db.command.exists(false)
			})
			.get();
		
		console.log(`找到 ${postsToFix.data.length} 条需要修复的帖子`);
		
		// 如果有需要修复的帖子
		if (postsToFix.data.length > 0) {
			// 逐个修复帖子
			for (const post of postsToFix.data) {
				await db.collection('posts')
					.doc(post._id)
					.update({
						status: 1,
						likeCount: post.likeCount || 0,
						commentCount: post.commentCount || 0,
						viewCount: post.viewCount || 0,
						// 确保帖子有创建时间
						createTime: post.createTime || Date.now()
					});
			}
		}
		
		// 2. 检查并修复可能存在的点赞数据不一致问题
		const allPosts = await db.collection('posts').get();
		let updatedPostsCount = 0;
		
		for (const post of allPosts.data) {
			// 获取该帖子的实际点赞数
			const likesCount = await db.collection('likes')
				.where({
					targetId: post._id,
					type: 'post',
					status: 1
				})
				.count();
			
			// 如果点赞数不一致，更新帖子的点赞数
			if (likesCount.total !== post.likeCount) {
				await db.collection('posts')
					.doc(post._id)
					.update({
						likeCount: likesCount.total
					});
				updatedPostsCount++;
			}
		}
		
		return {
			code: 0,
			msg: '修复完成',
			data: {
				fixed: postsToFix.data.length,
				likeCountFixed: updatedPostsCount
			}
		};
	} catch (error) {
		console.error('修复帖子失败:', error);
		return {
			code: 1,
			msg: error.message || '修复失败'
		};
	}
}; 