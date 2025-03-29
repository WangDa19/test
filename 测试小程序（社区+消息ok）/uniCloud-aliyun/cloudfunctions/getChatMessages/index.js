'use strict';
const db = uniCloud.database();
const cmd = db.command;

exports.main = async (event, context) => {
	const { targetUserId, page = 1, pageSize = 20 } = event;
	const userId = event.userId;
	
	console.log('接收到的参数:', {
		userId,
		targetUserId,
		page,
		pageSize
	});
	
	if (!userId || !targetUserId) {
		return {
			code: 1,
			msg: '参数错误'
		};
	}
	
	const skip = (page - 1) * pageSize;
	
	try {
		// 从 user 集合中获取用户信息
		const [currentUser, targetUser] = await Promise.all([
			db.collection('user').doc(userId).get(),
			db.collection('user').doc(targetUserId).get()
		]);
		
		console.log('用户信息查询结果:', {
			currentUser: currentUser.data[0],
			targetUser: targetUser.data[0]
		});
		
		if (!currentUser.data[0] || !targetUser.data[0]) {
			return {
				code: 1,
				msg: '用户信息不存在'
			};
		}
		
		// 直接查询消息记录
		const messagesResult = await db.collection('chat_messages')
			.where({
				$or: [
					{ senderId: userId, receiverId: targetUserId },
					{ senderId: targetUserId, receiverId: userId }
				]
			})
			.orderBy('sendTime', 'desc')
			.skip(skip)
			.limit(pageSize)
			.get();
			
		console.log('消息查询结果:', messagesResult);
		
		if (!messagesResult.data || messagesResult.data.length === 0) {
			return {
				code: 0,
				msg: 'success',
				data: {
					list: [],
					hasMore: false
				}
			};
		}
		
		// 更新未读消息状态
		await db.collection('chat_messages').where({
			senderId: targetUserId,
			receiverId: userId,
			read: false
		}).update({
			read: true
		});
		
		// 检查是否还有更多消息
		const totalCount = await db.collection('chat_messages')
			.where({
				$or: [
					{ senderId: userId, receiverId: targetUserId },
					{ senderId: targetUserId, receiverId: userId }
				]
			})
			.count();
		
		// 处理消息列表
		const messageList = messagesResult.data.map(item => {
			const isSelf = item.senderId === userId;
			const userInfo = isSelf ? currentUser.data[0] : targetUser.data[0];
			
			return {
				_id: item._id,
				content: item.content,
				sendTime: item.sendTime,
				senderId: item.senderId,
				receiverId: item.receiverId,
				read: item.read,
				isSelf,
				userInfo: {
					_id: userInfo._id,
					avatar: userInfo.avatar || '/static/images/avatar/default.png',
					nickname: isSelf ? '我' : (userInfo.nickname || '未知用户')
				}
			};
		});
		
		console.log('处理后的消息列表:', messageList);
			
		return {
			code: 0,
			msg: 'success',
			data: {
				list: messageList,
				hasMore: totalCount > skip + pageSize
			}
		};
	} catch (error) {
		console.error('获取聊天记录失败:', error);
		return {
			code: 1,
			msg: '获取聊天记录失败'
		};
	}
}; 