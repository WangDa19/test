'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  console.time('getInteractions-总耗时');
  
  // 获取参数
  const { userId, page = 1, pageSize = 20 } = event;
  
  console.log('getInteractions函数参数:', JSON.stringify(event));
  
  if (!userId) {
    return {
      code: 1,
      msg: '缺少用户ID'
    };
  }
  
  try {
    // 转换参数确保为数字类型
    const pageNum = parseInt(page) || 1;
    const pageSizeNum = parseInt(pageSize) || 20;
    const skipCount = (pageNum - 1) * pageSizeNum;
    
    console.log('分页参数:', { pageNum, pageSizeNum, skipCount });
    
    // 修改查询条件，使用receiver字段而不是targetUser
    const query = db.collection('notifications')
      .where({
        receiver: userId
        // 移除status查询条件
      })
      .field({
        _id: 1,
        type: 1, 
        content: 1,
        sender: 1,
        receiver: 1,
        postId: 1,
        commentId: 1,
        createTime: 1,
        isRead: 1
      })
      .orderBy('createTime', 'desc')
      .skip(skipCount)
      .limit(pageSizeNum);
    
    // 新增查询配置
    const queryOptions = {
      timeout: 10000 // 单个查询超时10秒
    };
    
    // 并行查询以提高效率
    console.time('查询数据');
    const [interactionsResult, totalResult] = await Promise.all([
      query.get(queryOptions).catch(err => {
        console.error('查询互动消息失败:', err);
        return { data: [] };
      }),
      
      db.collection('notifications')
        .where({
          receiver: userId
          // 移除status查询条件
        })
        .count(queryOptions)
        .catch(err => {
          console.error('查询总数失败:', err);
          return { total: 0 };
        })
    ]);
    console.timeEnd('查询数据');
    
    const interactions = interactionsResult.data || [];
    const totalCount = totalResult.total || 0;
    
    console.log('查询到互动消息数量:', interactions.length, '总互动消息数量:', totalCount);
    
    // 如果没有互动消息，直接返回空结果
    if (interactions.length === 0) {
      console.timeEnd('getInteractions-总耗时');
      return {
        code: 0,
        data: {
          list: [],
          hasMore: false,
          total: totalCount
        }
      };
    }
    
    // 获取评论相关的帖子ID和评论ID以及发送者ID
    const postIds = interactions
      .filter(item => item.postId)
      .map(item => item.postId);
    
    const commentIds = interactions
      .filter(item => item.commentId)
      .map(item => item.commentId);
      
    const senderIds = interactions
      .filter(item => item.sender)
      .map(item => item.sender);
    
    console.log('提取的帖子IDs:', postIds.length, '评论IDs:', commentIds.length, '发送者IDs:', senderIds.length);
    
    // 首先查询评论详情，获取更多关联信息
    let commentsData = [];
    let commentMap = {};
    if (commentIds.length > 0) {
      try {
        const commentsResult = await db.collection('comments')
          .where({
            _id: dbCmd.in(commentIds)
          })
          .field({
            _id: true,
            userId: true,
            postId: true,
            createTime: true,
            content: true  // 添加评论内容，帮助调试
          })
          .get({
            timeout: 8000
          });
        
        commentsData = commentsResult.data || [];
        console.log('查询到评论详情数据:', commentsData.length);
        
        // 创建评论ID到评论的映射，方便后续查找
        commentsData.forEach(comment => {
          if (comment._id) {
            commentMap[comment._id] = comment;
          }
        });
      } catch (err) {
        console.error('查询评论详情失败:', err);
      }
    }
    
    // 直接获取所有评论图片数据 - 不预先过滤
    let allCommentImages = [];
    try {
      console.log('查询所有相关评论图片');
      const commentImagesResult = await db.collection('comment_images')
        .where({
          type: 'comment',
          postId: dbCmd.in(postIds),
          userId: dbCmd.in(senderIds)
        })
        .field({
          _id: true,
          fileID: true,
          postId: true,
          userId: true,
          createTime: true
        })
        .get({
          timeout: 10000
        });
      
      allCommentImages = commentImagesResult.data || [];
      console.log('查询到所有评论图片数据:', allCommentImages.length);
    } catch (err) {
      console.error('查询评论图片失败:', err);
    }
    
    // 创建一个映射表，用于存储每个评论ID对应的图片
    let commentImageMap = {};
    
    // 创建一个临时映射，根据 userId + postId 进行组织
    let tempImageMap = {};
    allCommentImages.forEach(img => {
      if (img.userId && img.postId && img.fileID) {
        const key = `${img.userId}_${img.postId}`;
        if (!tempImageMap[key]) {
          tempImageMap[key] = [];
        }
        tempImageMap[key].push(img);
      }
    });
    
    // 输出临时映射的信息，帮助调试
    console.log('临时图片映射条目数:', Object.keys(tempImageMap).length);
    
    // 对于每个互动消息，分配对应的图片
    for (const interaction of interactions) {
      if (!interaction.commentId || !interaction.sender || !interaction.postId) continue;
      
      const commentId = interaction.commentId;
      const comment = commentMap[commentId];
      
      // 跳过没有找到评论详情的互动消息
      if (!comment) continue;
      
      const key = `${interaction.sender}_${interaction.postId}`;
      const userImages = tempImageMap[key] || [];
      
      // 如果该用户在该帖子下只有一张图片，直接分配
      if (userImages.length === 1) {
        if (!commentImageMap[commentId]) {
          commentImageMap[commentId] = [];
        }
        commentImageMap[commentId].push(userImages[0].fileID);
        console.log(`单图分配: 评论${commentId} -> 图片${userImages[0].fileID}`);
      } 
      // 如果有多张图片，使用时间最接近的那张
      else if (userImages.length > 1 && comment.createTime) {
        const commentTime = new Date(comment.createTime).getTime();
        
        // 按时间差排序
        userImages.sort((a, b) => {
          if (!a.createTime) return 1;
          if (!b.createTime) return -1;
          
          const timeA = new Date(a.createTime).getTime();
          const timeB = new Date(b.createTime).getTime();
          
          return Math.abs(timeA - commentTime) - Math.abs(timeB - commentTime);
        });
        
        // 使用时间最接近的图片
        const closestImage = userImages[0];
        if (!commentImageMap[commentId]) {
          commentImageMap[commentId] = [];
        }
        
        // 检查是否已经添加过该图片
        if (closestImage && closestImage.fileID && !commentImageMap[commentId].includes(closestImage.fileID)) {
          commentImageMap[commentId].push(closestImage.fileID);
          console.log(`多图时间匹配: 评论${commentId}(${new Date(commentTime).toISOString()}) -> 图片${closestImage.fileID}(${closestImage.createTime})`);
          
          // 从临时映射中移除已分配的图片，确保不会重复分配
          tempImageMap[key] = userImages.filter(img => img._id !== closestImage._id);
        }
      }
    }
    
    // 输出最终的映射信息
    console.log('最终评论图片映射条目数:', Object.keys(commentImageMap).length);
    
    // 获取需要查询用户信息的用户ID
    const userIds = [...new Set(senderIds)];
    
    // 查询用户信息 - 分批处理以避免查询条件过长
    console.time('查询用户信息');
    const batchSize = 50;
    let userInfoMap = {};
    
    if (userIds.length > 0) {
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batchIds = userIds.slice(i, i + batchSize);
        if (batchIds.length === 0) continue;
        
        try {
          const userResult = await db.collection('user')
            .where({
              _id: dbCmd.in(batchIds)
            })
            .field({
              _id: true,
              nickname: true,
              avatar: true
            })
            .get();
          
          (userResult.data || []).forEach(user => {
            if (user && user._id) {
              userInfoMap[user._id] = {
                nickname: user.nickname,
                avatar: user.avatar
              };
            }
          });
        } catch (err) {
          console.error(`查询用户批次${i}失败:`, err);
        }
      }
    }
    console.timeEnd('查询用户信息');
    
    // 处理结果 - 添加用户信息和评论图片
    const result = interactions.map(item => {
      const userInfo = userInfoMap[item.sender] || {};
      
      // 添加评论图片 - 使用commentId关联
      let fileID = [];
      if (item.commentId && commentImageMap[item.commentId]) {
        fileID = commentImageMap[item.commentId];
      }
      
      return {
        ...item,
        senderNickname: userInfo.nickname || '用户',
        senderAvatar: userInfo.avatar || '/static/images/default-avatar.png',
        fileID // 添加评论图片
      };
    });
    
    // 计算是否有更多消息
    const hasMore = skipCount + result.length < totalCount;
    
    console.timeEnd('getInteractions-总耗时');
    return {
      code: 0,
      data: {
        list: result,
        hasMore,
        total: totalCount
      }
    };
  } catch (error) {
    console.error('获取互动消息失败:', error);
    console.timeEnd('getInteractions-总耗时');
    return {
      code: 1,
      msg: '获取互动消息失败: ' + (error.message || '未知错误')
    };
  }
}; 