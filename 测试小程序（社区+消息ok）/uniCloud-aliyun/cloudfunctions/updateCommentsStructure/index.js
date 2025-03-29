'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  try {
    // 查询所有没有status字段的评论
    const commentsRes = await db.collection('comments')
      .where({
        status: dbCmd.exists(false)
      })
      .limit(1000) // 设置一个合理的限制
      .get();
    
    const comments = commentsRes.data;
    
    if (!comments || comments.length === 0) {
      return {
        code: 0,
        msg: '没有需要更新的评论',
        updated: 0
      };
    }
    
    console.log('找到需要更新的评论数量:', comments.length);
    
    // 批量更新评论
    const updatePromises = comments.map(comment => {
      return db.collection('comments')
        .doc(comment._id)
        .update({
          status: 1,
          // 添加可能缺少的其他字段
          likeCount: comment.likeCount || 0
        });
    });
    
    const updateResults = await Promise.all(updatePromises);
    
    return {
      code: 0,
      msg: '更新成功',
      updated: updateResults.length
    };
  } catch (error) {
    console.error('更新评论结构失败:', error);
    return {
      code: 1,
      msg: '更新评论结构失败: ' + error.message
    };
  }
}; 