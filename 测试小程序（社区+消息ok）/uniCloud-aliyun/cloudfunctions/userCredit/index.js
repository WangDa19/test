'use strict';
const db = uniCloud.database()
const dbCmd = db.command

// 信用分规则
const CREDIT_RULES = {
	// 初始分
	INITIAL_SCORE: 100,
	
	// 加分项
	BONUS: {
		VERIFY_EDUCATION: 20, // 学生认证
		GOOD_POST: 2, // 发布优质内容
		RECEIVE_LIKE: 1, // 收到点赞
		GOOD_REVIEW: 5, // 好评
	},
	
	// 扣分项
	PENALTY: {
		REPORTED_VALID: -10, // 被举报属实
		BAD_REVIEW: -5, // 差评
		CONTENT_BLOCKED: -20, // 内容被封禁
		SPAM_POST: -10, // 发布垃圾内容
	},
	
	// 信用等级
	LEVELS: [
		{ name: '受限用户', min: 0, max: 59 },
		{ name: '普通用户', min: 60, max: 79 },
		{ name: '信用用户', min: 80, max: 89 },
		{ name: '优质用户', min: 90, max: 100 }
	]
}

exports.main = async (event, context) => {
	const { action, userId, value = 0, reason = '' } = event
	
	try {
		switch (action) {
			case 'init':
				return await initUserCredit(userId)
			case 'adjust':
				return await adjustCredit(userId, value, reason)
			case 'get':
				return await getUserCredit(userId)
			default:
				throw new Error('未知操作类型')
		}
	} catch (error) {
		console.error('信用分操作失败:', error)
		return {
			code: -1,
			msg: '操作失败',
			error: error.message
		}
	}
}

// 初始化用户信用
async function initUserCredit(userId) {
	const userCredit = {
		userId,
		score: CREDIT_RULES.INITIAL_SCORE,
		level: getCreditLevel(CREDIT_RULES.INITIAL_SCORE),
		records: [{
			time: Date.now(),
			type: 'init',
			value: CREDIT_RULES.INITIAL_SCORE,
			reason: '账号初始化'
		}],
		updateTime: Date.now()
	}
	
	await db.collection('user_credit').add(userCredit)
	
	return {
		code: 0,
		msg: '初始化成功',
		data: userCredit
	}
}

// 调整信用分
async function adjustCredit(userId, value, reason) {
	const credit = await db.collection('user_credit').where({
		userId
	}).get()
	
	if (!credit.data || credit.data.length === 0) {
		throw new Error('用户信用记录不存在')
	}
	
	const userCredit = credit.data[0]
	const newScore = Math.max(0, Math.min(100, userCredit.score + value))
	
	await db.collection('user_credit').where({
		userId
	}).update({
		score: newScore,
		level: getCreditLevel(newScore),
		updateTime: Date.now(),
		records: dbCmd.push({
			time: Date.now(),
			type: value >= 0 ? 'bonus' : 'penalty',
			value,
			reason
		})
	})
	
	return {
		code: 0,
		msg: '调整成功',
		data: {
			oldScore: userCredit.score,
			newScore,
			change: value
		}
	}
}

// 获取用户信用信息
async function getUserCredit(userId) {
	const credit = await db.collection('user_credit').where({
		userId
	}).get()
	
	if (!credit.data || credit.data.length === 0) {
		throw new Error('用户信用记录不存在')
	}
	
	return {
		code: 0,
		msg: 'ok',
		data: credit.data[0]
	}
}

// 获取信用等级
function getCreditLevel(score) {
	for (const level of CREDIT_RULES.LEVELS) {
		if (score >= level.min && score <= level.max) {
			return level.name
		}
	}
	return CREDIT_RULES.LEVELS[0].name
} 