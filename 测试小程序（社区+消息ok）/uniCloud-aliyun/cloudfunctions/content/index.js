'use strict';

exports.main = async (event, context) => {
  const { action, data } = event;
  
  switch (action) {
    case 'publishContent':
      return await publishContent(data, context);
    default:
      return {
        code: 404,
        message: '未找到对应的操作'
      };
  }
};

// 发布内容
async function publishContent(data, context) {
  const { title, content, images, price, category } = data;
  
  // 获取当前用户ID
  const currentUser = context.PLATFORM === 'mp-weixin' ? 
    context.OPENID : context.CLIENTIP;
    
  if (!currentUser) {
    return {
      code: 401,
      message: '请先登录'
    };
  }
  
  // 表单验证
  if (!title || !content || !category) {
    return {
      code: 400,
      message: '请填写完整信息'
    };
  }
  
  try {
    const db = uniCloud.database();
    
    // 查询用户信息
    const userInfo = await db.collection('users')
      .where({
        openid: currentUser
      })
      .limit(1)
      .get();
    
    if (!userInfo.data || !userInfo.data.length) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }
    
    const userId = userInfo.data[0]._id;
    
    // 创建内容
    const contentData = {
      userId,
      title,
      content,
      images: images || [],
      price: price ? parseFloat(price) : 0,
      category,
      status: 'pending', // 待审核
      view_count: 0,
      like_count: 0,
      comment_count: 0,
      create_time: new Date(),
      update_time: new Date()
    };
    
    const result = await db.collection('posts').add(contentData);
    
    return {
      code: 0,
      message: '发布成功，等待审核',
      data: {
        id: result.id
      }
    };
  } catch (error) {
    console.error('发布内容失败:', error);
    return {
      code: 500,
      message: '发布失败，请稍后再试'
    };
  }
} 