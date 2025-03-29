'use strict';
const db = uniCloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	const { userId, targetUserId } = event;
	
	if (!userId || !targetUserId) {
		return {
			code: 1,
			msg: '参数错误'
		};
	}
	
	if (userId === targetUserId) {
		return {
			code: 1,
			msg: '不能关注自己'
		};
	}
	
	try {
		// 查询是否已经存在关注记录
		const followRecord = await db.collection('follows')
			.where({
				userId: userId,
				followUserId: targetUserId
			})
			.get();
		
		let isFollowing = false;
		
		if (followRecord.data.length > 0) {
			// 已存在记录，切换状态
			const currentStatus = followRecord.data[0].status;
			const newStatus = currentStatus === 1 ? 0 : 1;
			
			await db.collection('follows')
				.doc(followRecord.data[0]._id)
				.update({
					status: newStatus,
					updateTime: Date.now()
				});
			
			isFollowing = newStatus === 1;
		} else {
			// 没有记录，创建新的关注记录
			await db.collection('follows')
				.add({
					userId: userId,
					followUserId: targetUserId,
					status: 1,
					createTime: Date.now(),
					updateTime: Date.now()
				});
			
			isFollowing = true;
		}
		
		// 重要：更新用户的关注计数和被关注用户的粉丝计数
		await updateUserFollowStats(userId);
		await updateUserFansStats(targetUserId);
		
		return {
			code: 0,
			msg: isFollowing ? '关注成功' : '取消关注成功',
			data: {
				isFollowing: isFollowing,
				followCount: followCount,
				fansCount: fansCount
			}
		};
	} catch (error) {
		console.error('关注操作失败:', error);
		return {
			code: 1,
			msg: '操作失败: ' + error.message
		};
	}
};

// 更新用户的关注统计数据
async function updateUserFollowStats(userId) {
	try {
		// 统计关注数
		const followCountRes = await db.collection('follows')
			.where({
				userId: userId,
				status: 1
			})
			.count();
		
		const followCount = followCountRes.total || 0;
		
		// 更新用户表中的关注计数
		await db.collection('user').doc(userId).update({
			followCount: followCount,
			followingCount: followCount
		});
		
		return true;
	} catch (error) {
		console.error('更新用户关注统计失败:', error);
		return false;
	}
}

// 更新用户的粉丝统计数据
async function updateUserFansStats(userId) {
	try {
		// 统计粉丝数
		const fansCountRes = await db.collection('follows')
			.where({
				followUserId: userId,
				status: 1
			})
			.count();
		
		const fansCount = fansCountRes.total || 0;
		
		// 更新用户表中的粉丝计数
		await db.collection('user').doc(userId).update({
			fansCount: fansCount,
			followerCount: fansCount
		});
		
		return true;
	} catch (error) {
		console.error('更新用户粉丝统计失败:', error);
		return false;
	}
} 