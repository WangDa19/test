'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	const { messageId, userId } = event;
	
	if (!messageId || !userId) {
		return {
			code: 1,
			msg: '参数不完整'
		};
	}
	
	try {
		// 查询消息是否存在
		const message = await db.collection('chat_messages')
			.doc(messageId)
			.get();
			
		if (!message.data || message.data.length === 0) {
			return {
				code: 1,
				msg: '消息不存在'
			};
		}
		
		// 验证是否为消息发送者
		if (message.data[0].senderId !== userId) {
			return {
				code: 1,
				msg: '无权操作'
			};
		}
		
		// 执行删除操作
		await db.collection('chat_messages')
			.doc(messageId)
			.remove();
			
		return {
			code: 0,
			msg: '删除成功'
		};
	} catch (error) {
		console.error('删除消息失败:', error);
		return {
			code: 1,
			msg: '删除失败：' + error.message
		};
	}
}; 