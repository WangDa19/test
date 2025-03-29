'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, contentId, type, content } = event;
  
  if (!userId || !contentId || !type) {
    return {
      code: 1,
      msg: '参数不完整'
    };
  }
  
  try {
    // 检查是否已收藏
    const checkRes = await db.collection('collections')
      .where({
        userId,
        contentId,
        type
      })
      .get();
    
    if (checkRes.data && checkRes.data.length > 0) {
      // 取消收藏
      await db.collection('collections')
        .where({
          userId,
          contentId,
          type
        })
        .remove();
      
      return {
        code: 0,
        msg: '已移出购物车',
        data: {
          collected: false
        }
      };
    } else {
      // 添加收藏
      const saveData = {
        userId,
        contentId,
        type,
        createTime: Date.now(),
        content: {
          ...content,
          price: Number(content.price) // 确保价格是数字类型
        }
      };
      
      await db.collection('collections').add(saveData);
      
      return {
        code: 0,
        msg: '已加入购物车',
        data: {
          collected: true
        }
      };
    }
  } catch (error) {
    console.error('收藏操作失败:', error);
    return {
      code: 1,
      msg: '操作失败'
    };
  }
}; 