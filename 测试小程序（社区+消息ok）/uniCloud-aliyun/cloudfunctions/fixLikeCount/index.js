'use strict';
const db = uniCloud.database();
const _ = db.command;
const $ = db.command.aggregate;

exports.main = async (event, context) => {
  const { postId } = event; // 可选参数，如果提供则只修复该帖子的点赞
  
  try {
    // 创建查询条件
    let query = {
      status: 1, // 只计算有效点赞
      type: 'post'
    };
    
    if (postId) {
      query.targetId = postId;
    }
    
    // 按帖子ID分组，计算每个帖子的有效点赞数
    const likesAgg = await db.collection('likes')
      .aggregate()
      .match(query)
      .group({
        _id: '$targetId',
        count: $.sum(1)
      })
      .end();
    
    const updateResults = [];
    
    // 更新每个帖子的点赞计数
    for (const item of likesAgg.data) {
      const postId = item._id;
      const likeCount = item.count;
      
      // 更新帖子的点赞计数
      const updateRes = await db.collection('posts')
        .doc(postId)
        .update({
          likeCount: likeCount
        });
      
      updateResults.push({
        postId,
        likeCount,
        updated: updateRes.updated
      });
    }
    
    // 处理点赞数为0的帖子
    if (!postId) {
      const postsWithNoLikes = await db.collection('posts')
        .where({
          likeCount: _.gt(0)
        })
        .field({
          _id: true
        })
        .get();
      
      // 检查这些帖子是否有点赞记录
      for (const post of postsWithNoLikes.data) {
        const likeCount = await db.collection('likes')
          .where({
            targetId: post._id,
            type: 'post',
            status: 1
          })
          .count();
        
        // 如果没有点赞记录，将点赞数设为0
        if (likeCount.total === 0) {
          await db.collection('posts')
            .doc(post._id)
            .update({
              likeCount: 0
            });
          
          updateResults.push({
            postId: post._id,
            likeCount: 0,
            updated: 1
          });
        }
      }
    }
    
    return {
      code: 0,
      msg: '点赞计数修复完成',
      data: updateResults
    };
    
  } catch (error) {
    console.error('修复点赞计数失败:', error);
    return {
      code: 1,
      msg: '修复失败: ' + error.message
    };
  }
}; 