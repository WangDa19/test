'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
	const { 
		type = 0,  // 内容类型：0-全部, 1-动态, 2-问答, 3-文章
		sort = 0,  // 排序方式：0-最新, 1-最热, 2-精华
		page = 1,  // 页码
		pageSize = 10  // 每页数量
	} = event;
	
	try {
		const collection = db.collection('community_posts');
		const skip = (page - 1) * pageSize;
		
		// 构建查询条件
		let matchCondition = {};
		
		// 类型筛选
		if (type !== 0) {
			matchCondition.type = type;
		}
		
		// 精华筛选
		if (sort === 2) {
			matchCondition.isEssence = true;
		}
		
		// 构建排序条件
		let sortCondition = {};
		switch(sort) {
			case 0: // 最新
				sortCondition.createTime = -1;
				break;
			case 1: // 最热
				sortCondition.hotScore = -1; // hotScore = 点赞数 * 0.4 + 评论数 * 0.4 + 收藏数 * 0.2
				break;
			case 2: // 精华
				sortCondition.createTime = -1;
				break;
		}
		
		// 执行查询
		const result = await collection
			.where(matchCondition)
			.orderBy(Object.keys(sortCondition)[0], sortCondition[Object.keys(sortCondition)[0]] === 1 ? 'asc' : 'desc')
			.skip(skip)
			.limit(pageSize)
			.get();
			
		// 获取总数
		const total = await collection.where(matchCondition).count();
		
		// 处理内容数据
		const posts = result.data.map(post => ({
			...post,
			timeText: formatTime(post.createTime)
		}));
		
		return {
			code: 0,
			msg: 'success',
			data: {
				list: posts,
				total: total.total,
				hasMore: total.total > skip + pageSize
			}
		};
		
	} catch (error) {
		console.error('获取社区内容失败:', error);
		return {
			code: 1,
			msg: '获取社区内容失败'
		};
	}
};

// 格式化时间
function formatTime(timestamp) {
	const now = Date.now();
	const diff = now - timestamp;
	
	if (diff < 60000) return '刚刚';
	if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
	if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
	if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前';
	
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
} 