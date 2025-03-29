'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 查找所有缺少userId字段的帖子
    const invalidPosts = await db.collection('posts')
      .where({
        userId: db.command.exists(false)
      })
      .field({
        _id: 1,
        content: 1
      })
      .get();
    
    console.log('找到缺少userId字段的帖子:', invalidPosts.data.length, '个');
    
    // 如果需要，可以为这些帖子设置一个默认用户ID
    if (invalidPosts.data && invalidPosts.data.length > 0) {
      const defaultUserId = event.defaultUserId || '系统默认用户ID';
      
      for (const post of invalidPosts.data) {
        await db.collection('posts')
          .doc(post._id)
          .update({
            userId: defaultUserId
          });
      }
    }
    
    return {
      code: 0,
      msg: '检查完成',
      data: {
        invalidCount: invalidPosts.data.length,
        invalidPosts: invalidPosts.data
      }
    };
  } catch (error) {
    console.error('检查帖子失败:', error);
    return {
      code: 1,
      msg: '检查失败: ' + error.message
    };
  }
}; 