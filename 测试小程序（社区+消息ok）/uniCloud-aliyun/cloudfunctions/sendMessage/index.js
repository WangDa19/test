'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	const { userId, targetUserId, content, sendTime } = event
	
	if (!userId || !targetUserId || !content) {
		return {
			code: 1,
			msg: '参数错误'
		}
	}
	
	// 添加验证：不能给自己发消息
	if (userId === targetUserId) {
		return {
			code: 1,
			msg: '不能给自己发送消息'
		}
	}
	
	try {
		// 创建新消息
		const result = await db.collection('chat_messages').add({
			senderId: userId,
			receiverId: targetUserId,
			content: content,
			sendTime: sendTime || Date.now(),
			read: false
		})
		
		return {
			code: 0,
			msg: 'success',
			data: {
				messageId: result.id
			}
		}
	} catch (error) {
		console.error('发送消息失败:', error)
		return {
			code: 1,
			msg: '发送消息失败'
		}
	}
} 