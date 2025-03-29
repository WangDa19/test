'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { postId, commentId } = event;
  
  if (!postId) {
    return {
      code: 1,
      msg: '缺少帖子ID'
    };
  }
  
  try {
    // 检查帖子是否存在
    const postResult = await db.collection('posts')
      .doc(postId)
      .field({ _id: 1 })
      .get();
      
    const postExists = postResult.data && postResult.data.length > 0;
    
    // 检查评论是否存在
    let commentExists = false;
    if (commentId) {
      const commentResult = await db.collection('comments')
        .doc(commentId)
        .field({ _id: 1 })
        .get();
        
      commentExists = commentResult.data && commentResult.data.length > 0;
    }
    
    return {
      code: 0,
      data: {
        postExists,
        commentExists
      },
      msg: '检查完成'
    };
  } catch (error) {
    console.error('检查帖子和评论失败:', error);
    return {
      code: 1,
      msg: '检查失败'
    };
  }
}; 