'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const _ = db.command

exports.main = async (event, context) => {
	const { userId } = event
	
	if (!userId) {
		return {
			code: 1,
			msg: '缺少参数'
		}
	}
	
	try {
		// 获取聊天消息
		const chatListPromise = db.collection('chat_sessions')
			.where({
				participants: userId
			})
			.orderBy('lastMessageTime', 'desc')
			.limit(20)
			.get()
			.then(async (res) => {
				const sessions = res.data || [];
				return Promise.all(sessions.map(async (session) => {
					// 找出另一个用户
					const otherId = session.participants.find(id => id !== userId);
					
					// 获取用户信息
					const userRes = await db.collection('uni-id-users')
						.doc(otherId)
						.field({
							nickname: 1,
							avatar: 1
						})
						.get();
						
					const user = userRes.data && userRes.data.length > 0 ? userRes.data[0] : {};
					
					return {
						id: otherId,
						nickname: user.nickname || '用户',
						avatar: user.avatar || '/static/images/default-avatar.png',
						lastMessage: session.lastMessage || '',
						lastTime: session.lastMessageTime || Date.now(),
						unreadCount: session.unreadCount || 0
					};
				}));
			});
		
		// 获取通知
		const noticeListPromise = db.collection('notices')
			.where({
				userId
			})
			.orderBy('createTime', 'desc')
			.limit(20)
			.get()
			.then(res => res.data || []);
		
		// 获取互动消息
		const interactionListPromise = db.collection('interactions')
			.where({
				targetUserId: userId
			})
			.orderBy('createTime', 'desc')
			.limit(20)
			.get();
		
		// 并行执行以上查询
		const [chatList, noticeList, interactionResult] = await Promise.all([
			chatListPromise,
			noticeListPromise,
			interactionListPromise
		]);
		
		// 处理互动列表
		const interactionList = interactionResult.data || [];
		
		return {
			code: 0,
			data: {
				chatList,
				noticeList,
				interactionList,
				onlineUsers: [] // 暂时不处理在线用户
			},
			msg: '获取成功'
		}
	} catch (error) {
		console.error('获取消息列表失败:', error)
		return {
			code: 1,
			msg: '获取失败'
		}
	}
} 