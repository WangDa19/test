'use strict';
const db = uniCloud.database();
const cmd = db.command;

exports.main = async (event, context) => {
	const { collection, data } = event;
	const userId = data.userId;
	
	console.log('接收到的参数:', {
		collection,
		data,
		userId
	});
	
	if (!userId) {
		console.log('未提供用户ID');
		return {
			code: 1,
			msg: '请先登录'
		};
	}
	
	if (!collection || !data) {
		console.log('参数不完整:', { collection, data });
		return {
			code: 1,
			msg: '参数不完整'
		};
	}
	
	try {
		console.log('开始查询用户, userId:', userId);
		
		// 从 user 集合中查询用户信息
		const userResult = await db.collection('user').where({
			_id: userId
		}).limit(1).get();
		
		console.log('用户查询结果:', userResult);
		
		if (!userResult.data || userResult.data.length === 0) {
			console.log('未找到用户');
			return {
				code: 1,
				msg: '用户不存在'
			};
		}
		
		const user = userResult.data[0];
		console.log('找到用户:', user);
		
		// 构建保存数据
		const saveData = {
			...data,
			userId: user._id,
			createTime: Date.now(),
			updateTime: Date.now(),
			userInfo: {
				_id: user._id,
				avatar: user.avatar || '/static/images/avatar/default.png',
				nickname: user.nickname || '未知用户'
			}
		};
		
		console.log('准备保存数据:', saveData);
		
		// 保存内容
		const result = await db.collection(collection).add(saveData);
		console.log('保存结果:', result);
		
		return {
			code: 0,
			msg: '发布成功',
			data: result
		};
		
	} catch (error) {
		console.error('操作失败:', error);
		return {
			code: 1,
			msg: '发布失败: ' + (error.message || '未知错误')
		};
	}
}; 