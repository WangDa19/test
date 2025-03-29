'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	try {
		const tasks = [
			{
				title: 'Python编程指导',
				description: '需要一位Python高手指导数据分析项目，可以用其他技能交换',
				type: 0, // 技能互换
				status: 'pending',
				images: ['/static/images/avatar/default.png'],
				tags: ['编程', 'Python', '数据分析'],
				commentCount: 5,
				likeCount: 12,
				createTime: Date.now(),
				updateTime: Date.now(),
				userInfo: {
					_id: 'test_user_1',
					avatar: '/static/images/avatar/default.png',
					nickname: '小王'
				}
			},
			{
				title: '周末爬山活动',
				description: '本周日组织爬山活动，已有3人报名，还需要2人，费用AA',
				type: 3, // 游玩搭子
				status: 'processing',
				images: ['/static/images/avatar/default.png', '/static/images/avatar/default.png'],
				tags: ['运动', '交友', '户外'],
				commentCount: 8,
				likeCount: 15,
				createTime: Date.now() - 1800000, // 30分钟前
				updateTime: Date.now() - 1800000,
				userInfo: {
					_id: 'test_user_2',
					avatar: '/static/images/avatar/default.png',
					nickname: '小李'
				}
			},
			{
				title: '二手笔记本电脑出售',
				description: '华硕游戏本，九成新，i7处理器，16G内存，配置详情见图片',
				type: 1, // 二手交易
				status: 'pending',
				images: ['/static/images/avatar/default.png'],
				tags: ['电子产品', '笔记本', '二手'],
				commentCount: 12,
				likeCount: 3,
				createTime: Date.now() - 3600000, // 1小时前
				updateTime: Date.now() - 3600000,
				userInfo: {
					_id: 'test_user_3',
					avatar: '/static/images/avatar/default.png',
					nickname: '小张'
				}
			},
			{
				title: '找人拼车回沈阳',
				description: '本周五下午2点从大连出发回沈阳，途径鲅鱼圈，有3个空位',
				type: 2, // 拼车
				status: 'pending',
				images: [],
				tags: ['拼车', '大连', '沈阳'],
				commentCount: 2,
				likeCount: 1,
				createTime: Date.now() - 7200000, // 2小时前
				updateTime: Date.now() - 7200000,
				userInfo: {
					_id: 'test_user_4',
					avatar: '/static/images/avatar/default.png',
					nickname: '小陈'
				}
			}
		];
		
		// 清空现有数据
		await db.collection('tasks').remove();
		
		// 插入新数据
		const result = await db.collection('tasks').add(tasks);
		
		return {
			code: 0,
			msg: '初始化任务数据成功',
			data: result
		};
		
	} catch (error) {
		console.error('初始化任务数据失败:', error);
		return {
			code: 1,
			msg: '初始化任务数据失败'
		};
	}
}; 