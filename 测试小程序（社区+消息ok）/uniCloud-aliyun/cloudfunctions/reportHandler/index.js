'use strict';
const db = uniCloud.database()
const dbCmd = db.command

// 举报类型及其权重
const REPORT_TYPES = {
	SPAM: { weight: 1, name: '垃圾广告' },
	INAPPROPRIATE: { weight: 2, name: '不当内容' },
	FRAUD: { weight: 3, name: '诈骗' },
	VIOLATION: { weight: 2, name: '违规' },
	ILLEGAL: { weight: 4, name: '违法' }
}

// 自动处理阈值
const AUTO_PROCESS_THRESHOLD = {
	REPORT_COUNT: 3, // 被举报次数阈值
	CREDIT_SCORE: 70, // 举报人信用分阈值
	RISK_SCORE: 8 // 风险分阈值
}

exports.main = async (event, context) => {
	console.log('接收到举报请求:', JSON.stringify(event));
	
	try {
		// 验证必要参数
		const { userId, targetId, targetType, reason, content } = event;
		
		if (!userId || !targetId || !targetType || !reason) {
			console.log('参数不完整:', JSON.stringify(event));
			return {
				code: -1,
				message: '参数不完整，请提供所有必要信息'
			};
		}
		
		// 检查是否重复举报
		const existingReport = await db.collection('reports').where({
			targetId,
			userId,
			status: 'pending'
		}).get();
		
		if (existingReport.data && existingReport.data.length > 0) {
			console.log('重复举报:', userId, targetId);
			return {
				code: -1,
				message: '您已经举报过该内容'
			};
		}
		
		// 检查目标内容是否存在
		let targetExists = false;
		if (targetType === 'comment') {
			const comment = await db.collection('comments').doc(targetId).get();
			targetExists = comment.data && comment.data.length > 0;
		} else if (targetType === 'post') {
			const post = await db.collection('posts').doc(targetId).get();
			targetExists = post.data && post.data.length > 0;
		} else if (targetType === 'message') {
			const message = await db.collection('chat_messages').doc(targetId).get();
			targetExists = message.data && message.data.length > 0;
		}
		
		if (!targetExists) {
			console.log('目标内容不存在:', targetType, targetId);
			return {
				code: -1,
				message: '举报的内容不存在或已被删除'
			};
		}
		
		// 创建举报记录
		const report = {
			targetId,
			targetType,
			reason,
			content: content || '',
			userId,
			status: 'pending',
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString()
		};
		
		const result = await db.collection('reports').add(report);
		console.log('举报记录已创建:', result.id);
		
		return {
			code: 0,
			message: '举报成功',
			data: {
				reportId: result.id
			}
		};
	} catch (error) {
		console.error('举报处理失败:', error);
		return {
			code: -1,
			message: '操作失败: ' + error.message
		};
	}
}

// 检查是否需要自动处理
async function checkAutoProcess(targetId) {
	// 1. 获取该目标的所有未处理举报
	const reports = await db.collection('reports').where({
		targetId,
		status: 'pending'
	}).get()
	
	if (!reports.data || reports.data.length === 0) {
		return
	}
	
	// 2. 计算风险分数
	let riskScore = 0
	let highCreditReports = 0
	
	reports.data.forEach(report => {
		// 举报权重
		riskScore += report.weight
		
		// 举报人信用分因素
		if (report.reporterCredit >= AUTO_PROCESS_THRESHOLD.CREDIT_SCORE) {
			highCreditReports++
			riskScore += 1
		}
	})
	
	// 3. 判断是否达到自动处理阈值
	if (reports.data.length >= AUTO_PROCESS_THRESHOLD.REPORT_COUNT &&
		riskScore >= AUTO_PROCESS_THRESHOLD.RISK_SCORE) {
		
		// 自动处理
		await autoProcessContent(targetId, reports.data)
	}
}

// 自动处理内容
async function autoProcessContent(targetId, reports) {
	// 1. 更新所有相关举报状态
	await db.collection('reports').where({
		targetId,
		status: 'pending'
	}).update({
		status: 'processed',
		updateTime: Date.now(),
		processType: 'auto',
		processResult: 'blocked'
	})
	
	// 2. 处理目标内容（例如：隐藏或标记）
	await db.collection('posts').where({
		_id: targetId
	}).update({
		status: 'blocked',
		updateTime: Date.now()
	})
	
	// 3. 更新发布者信用分
	const post = await db.collection('posts').doc(targetId).get()
	if (post.data && post.data.length > 0) {
		await uniCloud.callFunction({
			name: 'userCredit',
			data: {
				action: 'adjust',
				userId: post.data[0].userId,
				value: -20,
				reason: '内容被多人举报并自动处理'
			}
		})
	}
}

// 获取举报状态
async function getReportStatus(reportId) {
	const report = await db.collection('reports').doc(reportId).get()
	
	if (!report.data) {
		throw new Error('举报记录不存在')
	}
	
	return {
		code: 0,
		msg: 'ok',
		data: report.data
	}
}

// 人工处理举报
async function processReport(reportId) {
	// 这里预留人工处理的逻辑
	// 可以添加人工审核的结果、处理意见等
	return {
		code: 0,
		msg: '处理成功'
	}
} 