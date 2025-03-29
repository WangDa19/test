'use strict';
const db = uniCloud.database();

/**
 * 获取用户对评论的点赞状态
 * @param {Object} event
 * @param {String} event.userId - 当前用户ID
 * @param {Array} event.commentIds - 需要查询点赞状态的评论ID列表
 */
exports.main = async (event, context) => {
  console.log('获取评论点赞状态参数:', event);
  
  const { userId, commentIds = [] } = event;
  
  if (!userId || !commentIds.length) {
    return {
      code: 0,
      data: []
    };
  }
  
  try {
    // 查询用户对指定评论的点赞记录
    const likesResult = await db.collection('likes')
      .where({
        userId: userId,
        targetId: db.command.in(commentIds),
        type: 'comment',
        status: 1
      })
      .field({
        targetId: true
      })
      .get();
    
    // 提取已点赞的评论ID
    const likedCommentIds = (likesResult.data || []).map(like => like.targetId);
    console.log(`用户 ${userId} 已点赞的评论数: ${likedCommentIds.length}`);
    
    return {
      code: 0,
      data: likedCommentIds
    };
  } catch (error) {
    console.error('获取评论点赞状态失败:', error);
    return {
      code: 1,
      msg: '获取评论点赞状态失败'
    };
  }
}; 