'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	try {
		// 检查是否已存在管理员账号
		const adminCollection = db.collection('admin_users');
		const existingAdmin = await adminCollection.where({
			username: 'admin'
		}).get();
		
		if (existingAdmin.data.length > 0) {
			return {
				code: 1,
				message: '管理员账号已存在'
			}
		}
		
		// 创建管理员账号
		const result = await adminCollection.add({
			username: 'admin',
			password: '123456', // 建议在实际使用时对密码进行加密
			createTime: Date.now()
		});
		
		return {
			code: 0,
			message: '管理员账号初始化成功'
		}
		
	} catch (error) {
		return {
			code: -1,
			message: error.message || '初始化失败'
		}
	}
}; 