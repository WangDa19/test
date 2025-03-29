'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { postId, actualCount } = event;
  
  if (!postId || typeof actualCount !== 'number') {
    return {
      code: 1,
      msg: '参数错误'
    };
  }
  
  try {
    // 首先验证实际点赞数量
    const likeRecords = await db.collection('likes').where({
      targetId: postId,
      type: 'post',
      status: 1 // 只计算有效点赞
    }).count();
    
    const actualLikeCount = likeRecords.total;
    
    // 如果传入的数量与实际不符，以数据库为准
    const finalCount = actualLikeCount;
    
    // 更新帖子的点赞数
    await db.collection('posts').doc(postId).update({
      likeCount: finalCount
    });
    
    return {
      code: 0,
      msg: '点赞数量同步成功',
      data: {
        likeCount: finalCount
      }
    };
  } catch (error) {
    console.error('同步点赞数量失败:', error);
    return {
      code: 1,
      msg: '同步点赞数量失败'
    };
  }
}; 