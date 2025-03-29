// 修改loadDetailAndComments方法，增加超时设置和错误处理
async loadDetailAndComments() {
  try {
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
    
    // 并行加载详情和评论，提高效率
    await Promise.all([
      this.loadDetail(),
      this.loadComments(true)
    ]);
    
    uni.hideLoading();
  } catch (error) {
    uni.hideLoading();
    console.error('加载详情和评论失败:', error);
    
    uni.showToast({
      title: '加载失败，请下拉刷新重试',
      icon: 'none',
      duration: 2000
    });
  }
},

// 修改loadDetail方法，优化云函数调用和错误处理
async loadDetail() {
  try {
    console.log('加载帖子详情, ID:', this.postId);
    
    const res = await uniCloud.callFunction({
      name: 'getPostDetail',
      data: {
        postId: this.postId
      },
      // 设置更长的超时时间
      timeout: 30000 // 30秒
    });
    
    console.log('获取帖子详情结果:', res);
    
    if (res.result && res.result.code === 0) {
      const postData = res.result.data;
      
      // 设置页面数据
      this.post = postData;
      this.isOwner = postData.userId === this.userId;
      this.isLiked = postData.isLiked || false;
      
      // 更新页面标题
      uni.setNavigationBarTitle({
        title: postData.title || '帖子详情'
      });
      
      return postData;
    } else {
      throw new Error((res.result && res.result.msg) || '获取帖子详情失败');
    }
  } catch (error) {
    console.error('获取帖子详情失败:', error);
    
    // 检查是否是网络错误
    if (error.message && (
        error.message.includes('timeout') || 
        error.message.includes('fail') ||
        error.message.includes('网络')
      )) {
      uni.showToast({
        title: '网络异常，请检查网络后重试',
        icon: 'none',
        duration: 3000
      });
    } else {
      uni.showToast({
        title: error.message || '获取帖子详情失败',
        icon: 'none'
      });
    }
    
    throw error;
  }
},

// 修改loadComments方法，增加超时设置和批量加载
async loadComments(reset = false) {
  try {
    if (this.loadingComments && !reset) return;
    
    this.loadingComments = true;
    
    if (reset) {
      this.commentsPage = 1;
      this.comments = [];
    }
    
    const res = await uniCloud.callFunction({
      name: 'getComments',
      data: {
        postId: this.postId,
        page: this.commentsPage,
        pageSize: 10,
        sortType: this.commentSortType
      },
      // 设置更长的超时时间
      timeout: 30000 // 30秒
    });
    
    console.log('获取评论结果:', res);
    
    if (res.result && res.result.code === 0) {
      const data = res.result.data || {};
      const list = data.list || [];
      const hasMore = data.hasMore || false;
      
      // 更新评论列表
      if (reset) {
        this.comments = list;
      } else {
        this.comments = [...this.comments, ...list];
      }
      
      this.hasMoreComments = hasMore;
      
      if (list.length > 0) {
        this.commentsPage++;
      }
      
      // 如果有评论需要高亮（从消息页面跳转），找到对应评论
      if (this.highlightCommentId) {
        this.$nextTick(() => {
          this.scrollToComment(this.highlightCommentId);
        });
      }
    } else {
      throw new Error(res.result ? res.result.msg : '加载评论失败');
    }
  } catch (error) {
    console.error('加载评论异常:', error);
    
    // 处理网络错误和超时
    const errorMsg = error.message || '加载评论失败';
    
    if (errorMsg.includes('timeout') || errorMsg.includes('fail') || errorMsg.includes('网络')) {
      uni.showToast({
        title: '网络异常，请稍后重试',
        icon: 'none',
        duration: 3000
      });
    } else {
      uni.showToast({
        title: '加载评论失败，请下拉刷新',
        icon: 'none'
      });
    }
  } finally {
    this.loadingComments = false;
  }
} 