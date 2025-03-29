'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	
	try {
		// 1. 检查数据库中所有帖子数量
		const allPosts = await db.collection('posts').count();
		
		// 2. 检查有效帖子数量（status=1）
		const validPosts = await db.collection('posts').where({
			status: 1
		}).count();
		
		// 3. 获取最新的5条帖子进行检查
		const latestPosts = await db.collection('posts')
			.orderBy('createTime', 'desc')
			.limit(5)
			.get();
		
		// 4. 检查是否有帖子需要修复（缺少status字段或status不为1）
		const postsToFix = await db.collection('posts')
			.where({
				status: db.command.exists(false)
			})
			.count();
		
		// 5. 自动修复缺少status字段的帖子
		if (postsToFix.total > 0) {
			await db.collection('posts')
				.where({
					status: db.command.exists(false)
				})
				.update({
					status: 1
				});
		}
		
		return {
			code: 0,
			msg: '检查完成',
			data: {
				total: allPosts.total,
				valid: validPosts.total,
				toFix: postsToFix.total,
				fixed: postsToFix.total > 0 ? `已将${postsToFix.total}条帖子更新为有效状态` : '无需修复',
				latest: latestPosts.data
			}
		};
	} catch (error) {
		console.error('检查帖子失败:', error);
		return {
			code: 1,
			msg: error.message || '检查失败'
		};
	}
}; 