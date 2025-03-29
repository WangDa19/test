'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
	const { 
		type = 0,  // 任务类型
		sort = 0,  // 排序方式
		status = 0,  // 任务状态
		page = 1,  // 页码
		pageSize = 10  // 每页数量
	} = event;
	
	try {
		const collection = db.collection('tasks');
		const skip = (page - 1) * pageSize;
		
		// 构建查询条件
		let matchCondition = {};
		
		// 类型筛选
		if (type !== 0) {
			matchCondition.type = type - 1;
		}
		
		// 状态筛选
		if (status !== 0) {
			matchCondition.status = ['pending', 'processing', 'completed'][status - 1];
		}
		
		// 构建排序条件
		let sortCondition = {};
		switch(sort) {
			case 0: // 最新发布
				sortCondition = { createTime: -1 };
				break;
			case 1: // 最多评论
				sortCondition = { commentCount: -1 };
				break;
			case 2: // 最多点赞
				sortCondition = { likeCount: -1 };
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
		
		return {
			code: 0,
			msg: 'success',
			data: {
				list: result.data,
				total: total.total,
				hasMore: total.total > skip + pageSize
			}
		};
		
	} catch (error) {
		console.error('获取任务列表失败:', error);
		return {
			code: 1,
			msg: '获取任务列表失败'
		};
	}
}; 