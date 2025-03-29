'use strict';
const db = uniCloud.database()
const sensitiveWords = require('./sensitiveWords.js')

// 内容审核主函数
exports.main = async (event, context) => {
	try {
		const { content, images, price, type } = event
		
		// 审核结果
		const auditResult = {
			pass: true,
			reasons: [],
			riskLevel: 0 // 0-正常 1-低风险 2-中风险 3-高风险
		}
		
		// 1. 文本内容审核
		const textAuditResult = await auditText(content)
		if (!textAuditResult.pass) {
			auditResult.pass = false
			auditResult.reasons.push(...textAuditResult.reasons)
			auditResult.riskLevel = Math.max(auditResult.riskLevel, textAuditResult.riskLevel)
		}
		
		// 2. 图片审核
		if (images && images.length > 0) {
			const imageAuditResult = await auditImages(images)
			if (!imageAuditResult.pass) {
				auditResult.pass = false
				auditResult.reasons.push(...imageAuditResult.reasons)
				auditResult.riskLevel = Math.max(auditResult.riskLevel, imageAuditResult.riskLevel)
			}
		}
		
		// 3. 价格异常检测
		if (price !== undefined) {
			const priceAuditResult = await auditPrice(price, type)
			if (!priceAuditResult.pass) {
				auditResult.pass = false
				auditResult.reasons.push(...priceAuditResult.reasons)
				auditResult.riskLevel = Math.max(auditResult.riskLevel, priceAuditResult.riskLevel)
			}
		}
		
		return {
			code: 0,
			msg: 'ok',
			data: auditResult
		}
	} catch (error) {
		console.error('内容审核失败:', error)
		return {
			code: -1,
			msg: '内容审核失败',
			error: error.message
		}
	}
}

// 文本审核函数
async function auditText(content) {
	const result = {
		pass: true,
		reasons: [],
		riskLevel: 0
	}
	
	if (!content) return result
	
	// 1. 敏感词检测
	const sensitiveResult = checkSensitiveWords(content)
	if (sensitiveResult.length > 0) {
		result.pass = false
		result.reasons.push('包含敏感词：' + sensitiveResult.join('、'))
		result.riskLevel = 2
	}
	
	// 2. 垃圾广告检测
	const spamResult = await checkSpamContent(content)
	if (spamResult.isSpam) {
		result.pass = false
		result.reasons.push('疑似垃圾广告')
		result.riskLevel = Math.max(result.riskLevel, 1)
	}
	
	return result
}

// 图片审核函数
async function auditImages(images) {
	const result = {
		pass: true,
		reasons: [],
		riskLevel: 0
	}
	
	// TODO: 接入第三方图片审核API
	// 这里可以使用阿里云、腾讯云等提供的图片审核服务
	
	return result
}

// 价格异常检测函数
async function auditPrice(price, type) {
	const result = {
		pass: true,
		reasons: [],
		riskLevel: 0
	}
	
	// 价格范围检测
	const priceRanges = {
		skill: { min: 1, max: 500 }, // 技能互换
		idle: { min: 1, max: 10000 }, // 闲置交易
		errand: { min: 1, max: 200 }, // 跑腿代取
		tutor: { min: 1, max: 300 }, // 课程辅导
		carpool: { min: 1, max: 200 } // 交通拼车
	}
	
	const range = priceRanges[type]
	if (range && (price < range.min || price > range.max)) {
		result.pass = false
		result.reasons.push(`价格超出正常范围(${range.min}-${range.max}元)`)
		result.riskLevel = 1
	}
	
	return result
}

// 检查敏感词
function checkSensitiveWords(content) {
	const found = []
	sensitiveWords.forEach(word => {
		if (content.includes(word)) {
			found.push(word)
		}
	})
	return found
}

// 检查垃圾广告
async function checkSpamContent(content) {
	// 简单的垃圾广告特征检测
	const spamPatterns = [
		/[0-9]{6,}/, // 长数字
		/([a-zA-Z0-9][-_.]){3,}[a-zA-Z0-9]@[a-zA-Z0-9][-_.].[a-zA-Z]{2,}/, // 邮箱
		/(https?:\/\/|www\.)[^\s<]*/g, // 网址
		/[①②③④⑤⑥⑦⑧⑨⑩]/g, // 特殊数字字符
		/[（(][0-9]{3,}[)）]/ // 电话号码模式
	]
	
	return {
		isSpam: spamPatterns.some(pattern => pattern.test(content))
	}
} 