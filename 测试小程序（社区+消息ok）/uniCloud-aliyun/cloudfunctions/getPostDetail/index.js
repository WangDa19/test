'use strict';

const db = uniCloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  console.log('getPostDetail接收到的参数:', event);
  
  const { postId, userId = '', _debug = false } = event;
  
  // 参数校验
  if (!postId) {
    return {
      code: 1,
      msg: '缺少必要参数postId'
    };
  }
  
  try {
    // 记录调试信息
    let debugInfo = {};
    if (_debug) {
      debugInfo.startTime = Date.now();
      debugInfo.postId = postId;
      debugInfo.userId = userId || context.USERID;
      debugInfo.steps = [];
    }
    
    // 首先直接尝试简单查询检查帖子是否存在
    const simpleCheck = await db.collection('posts').doc(postId).get();
    
    if (_debug) {
      debugInfo.steps.push({
        step: 'simpleCheck',
        result: simpleCheck.data.length > 0 ? '帖子存在' : '帖子不存在',
        data: simpleCheck.data
      });
    }
    
    // 如果帖子不存在，早期返回
    if (simpleCheck.data.length === 0) {
      const result = {
        code: 1,
        msg: '帖子不存在或已删除'
      };
      
      if (_debug) {
        result.debug = debugInfo;
      }
      
      return result;
    }
    
    // 查询帖子数据
    let postQuery = db.collection('posts')
      .aggregate()
      .match({
        _id: postId
      });
      
    // 添加用户信息查询
    postQuery = postQuery.lookup({
      from: 'user',
      localField: 'userId',
      foreignField: '_id',
      as: 'userInfo'
    });
    
    // 处理结果
    postQuery = postQuery.project({
      _id: 1,
      userId: 1,
      content: 1,
      images: 1,
      tags: 1,
      status: 1,
      statusText: 1,
      viewCount: 1,
      likeCount: 1,
      collectCount: 1,
      commentCount: 1,
      createTime: 1,
      userInfo: {
        $arrayElemAt: ['$userInfo', 0]
      }
    });
    
    // 执行查询
    const postRes = await postQuery.end();
    
    if (_debug) {
      debugInfo.steps.push({
        step: 'postQuery',
        count: postRes.data.length,
        data: postRes.data
      });
    }
    
    // 如果查询结果为空，返回错误信息
    if (postRes.data.length === 0) {
      const result = {
        code: 1,
        msg: '无法获取帖子详情',
        collectionName: 'posts'
      };
      
      if (_debug) {
        result.debug = debugInfo;
      }
      
      return result;
    }
    
    const post = postRes.data[0];
    
    // 确保userInfo存在
    if (!post.userInfo) {
      // 如果lookup没有成功，尝试手动获取用户信息
      try {
        if (post.userId) {
          const userRes = await db.collection('user').doc(post.userId).get();
          if (userRes.data.length > 0) {
            post.userInfo = userRes.data[0];
          } else {
            post.userInfo = {
              nickname: '未知用户',
              avatar: '/static/images/avatar/default.png'
            };
          }
        }
      } catch (e) {
        console.error('获取用户信息失败:', e);
        post.userInfo = {
          nickname: '未知用户',
          avatar: '/static/images/avatar/default.png'
        };
      }
      
      if (_debug) {
        debugInfo.steps.push({
          step: 'manualUserQuery',
          success: !!post.userInfo,
          userInfo: post.userInfo
        });
      }
    }
    
    // 尝试增加浏览量，但不影响返回结果
    try {
      await db.collection('posts')
        .doc(postId)
        .update({
          viewCount: _.inc(1)
        });
        
      if (_debug) {
        debugInfo.steps.push({
          step: 'updateViewCount',
          success: true
        });
      }
    } catch (e) {
      console.error('增加浏览量失败:', e);
      if (_debug) {
        debugInfo.steps.push({
          step: 'updateViewCount',
          success: false,
          error: e.message
        });
      }
    }
    
    // 获取当前用户信息，处理点赞、收藏、关注状态
    const currentUserId = userId || context.USERID;
    
    if (currentUserId) {
      try {
        // 查询点赞状态
        const likeRes = await db.collection('likes')
          .where({
            userId: currentUserId,
            targetId: postId,
            type: 'post',
            status: 1
          })
          .limit(1)
          .get();
          
        post.isLiked = likeRes.data.length > 0;
        
        // 查询收藏状态
        const collectRes = await db.collection('collects')
          .where({
            userId: currentUserId,
            targetId: postId,
            status: 1
          })
          .limit(1)
          .get();
          
        post.isCollected = collectRes.data.length > 0;
        
        // 如果有作者ID，查询关注状态
        if (post.userId) {
          const followRes = await db.collection('follows')
            .where({
              userId: currentUserId,
              followUserId: post.userId,
              status: 1
            })
            .limit(1)
            .get();
            
          post.isFollowing = followRes.data.length > 0;
        }
        
        if (_debug) {
          debugInfo.steps.push({
            step: 'userInteractions',
            success: true,
            isLiked: post.isLiked,
            isCollected: post.isCollected,
            isFollowing: post.isFollowing
          });
        }
      } catch (e) {
        console.error('获取用户互动状态失败:', e);
        post.isLiked = false;
        post.isCollected = false;
        post.isFollowing = false;
        
        if (_debug) {
          debugInfo.steps.push({
            step: 'userInteractions',
            success: false,
            error: e.message
          });
        }
      }
    }
    
    // 构建最终返回数据
    const result = {
      code: 0,
      msg: '获取成功',
      data: post
    };
    
    if (_debug) {
      debugInfo.endTime = Date.now();
      debugInfo.duration = debugInfo.endTime - debugInfo.startTime;
      result.debug = debugInfo;
    }
    
    return result;
  } catch (error) {
    console.error('getPostDetail发生异常:', error);
    
    const result = {
      code: 1,
      msg: '获取帖子详情失败：' + error.message
    };
    
    if (_debug) {
      result.errorDetail = {
        message: error.message,
        stack: error.stack
      };
    }
    
    return result;
  }
}; 