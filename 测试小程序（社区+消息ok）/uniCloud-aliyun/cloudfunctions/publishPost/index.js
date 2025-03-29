'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const { data } = event;
	
	try {
		const result = await db.collection('posts').add(data);
		return {
			code: 0,
			msg: '发布成功',
			data: result
		};
	} catch (error) {
		return {
			code: 1,
			msg: error.message || '发布失败'
		};
	}
}; 