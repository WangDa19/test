<template>
  <view class="container">
    <scroll-view class="content-scroll" scroll-y @scrolltolower="loadMoreComments" scroll-with-animation>
      <!-- 用户信息 -->
      <view class="user-info" v-if="detail && detail.userInfo">
        <view class="user-left">
          <image class="avatar" :src="detail.userInfo.avatar || '/static/images/default-avatar.png'" @tap="gotoUserPage(detail.userInfo._id)"></image>
        <view class="user-meta">
            <text class="nickname">{{detail.userInfo.nickname || '用户'}}</text>
            <text class="time">{{formatTime(detail.createTime)}}</text>
        </view>
        </view>
        <view class="user-right">
          <!-- 只有当访问者不是帖子作者时才显示关注按钮 -->
          <button 
            class="follow-btn"
            :class="{'following': isFollowing}"
            @tap="toggleFollow"
            v-if="userId && detail.userInfo && userId !== detail.userInfo._id"
          >
            <text class="follow-icon-text" v-if="!isFollowing">+</text>
            <text class="follow-icon-text" v-else>✓</text>
            <text>{{isFollowing ? '已关注' : '关注'}}</text>
          </button>
        </view>
      </view>

      <!-- 内容区 -->
      <view class="content" v-if="detail">
        <view class="content-text" v-if="detail.content">{{detail.content}}</view>
        <view class="image-grid" v-if="detail.images && detail.images.length > 0">
          <image 
            v-for="(image, index) in detail.images" 
            :key="index"
            :src="image" 
            mode="aspectFill"
            @tap="previewImage(index)"></image>
        </view>
          </view>

      <!-- 互动栏 -->
      <view class="action-bar">
        <view class="action-item comment">
          <image src="/static/images/icons/pinglun.png" mode="aspectFit" class="action-icon"/>
          <text>{{detail.commentCount || 0}}</text>
          <text>评论</text>
        </view>
        <view class="action-item like" @tap="handleLike">
          <image 
            :src="detail.isLiked ? '/static/images/heart-filled.png' : '/static/images/heart.png'"
            mode="aspectFit"
            class="action-icon"
            :class="{'liked': detail.isLiked}"
          />
          <text :class="{'liked': detail.isLiked}">
            {{activeTab === 'like' && likeUsers.length > 0 ? likeUsers.length : (detail.likeCount > 0 ? detail.likeCount : '点赞')}}
          </text>
        </view>
      </view>

    <!-- 评论区 -->
    <view class="comment-section">
      <view class="comment-header">
        <view class="header-tabs">
          <view 
            class="tab-item" 
            :class="{'active': activeTab === 'comment'}" 
            @tap="switchTab('comment')"
          >
            <text>评论 {{detail.commentCount || 0}}</text>
        </view>
          <view 
            class="tab-item" 
            :class="{'active': activeTab === 'like'}" 
            @tap="switchTab('like')"
          >
            <text>点赞 {{detail.likeCount || 0}}</text>
        </view>
        </view>
        <view class="comment-filter" v-if="activeTab === 'comment' && comments.length > 0">
          <view class="comment-sort-options">
            <view 
              class="sort-option" 
              :class="{'active': sortType === 'time'}" 
              @tap="setSortType('time')"
            >
              <text>按时间</text>
            </view>
            <view 
              class="sort-option" 
              :class="{'active': sortType === 'hot'}" 
              @tap="setSortType('hot')"
            >
              <text>按热度</text>
            </view>
          </view>
      </view>
    </view>

      <!-- 评论列表 -->
      <view class="comment-list" v-if="activeTab === 'comment'">
        <!-- 加载状态 -->
        <view class="loading-state" v-if="commentsLoading && !comments.length">
          <uni-icons type="spinner-cycle" size="24" color="#999"></uni-icons>
          <text>加载评论中...</text>
      </view>
      
        <!-- 空状态 -->
        <view class="empty-state" v-else-if="!comments.length">
          <text class="empty-text">暂无评论，快来发表第一条评论吧</text>
        </view>
        
        <!-- 评论列表 -->
        <view class="comment-items" v-else>
        <view 
          class="comment-item" 
            v-for="(comment, index) in comments" 
          :key="comment._id"
            :class="{'highlighted': comment._id === highlightedCommentId}"
            @longpress="showCommentActions(comment)"
            v-if="comment.status !== 0"
            :data-comment-id="comment._id"
          >
              <image 
              class="comment-avatar" 
              :src="comment.userInfo ? (comment.userInfo.avatar || '/static/images/default-avatar.png') : '/static/images/default-avatar.png'" 
                mode="aspectFill"
              @tap="gotoUserPage(comment.userId)"
            ></image>
            <view class="comment-right">
              <view class="comment-user">
                <text class="comment-nickname">{{comment.userInfo ? (comment.userInfo.nickname || '用户') : '用户'}}</text>
            </view>
              <view class="reply-info" v-if="comment.replyTo">
                <text class="reply-text">回复</text>
                <text class="reply-nickname">{{comment.replyUserInfo ? (comment.replyUserInfo.nickname || '用户') : '用户'}}</text>
              </view>
              <view class="comment-content">
                <text class="comment-text">{{comment.content}}</text>
                
                <!-- 评论图片容器 -->
                <view v-if="comment.image" class="comment-image-container">
                  <image 
                    :src="comment.image" 
                    mode="widthFix" 
                class="comment-image"
                    @tap="previewCommentImage(comment.image)"
                    @error="handleImageError(comment)"
                  ></image>
            </view>
              </view>
              <view class="comment-footer">
                <text class="comment-time">{{formatTime(comment.createTime)}}</text>
            <view class="comment-actions">
              <view class="action-item" @tap="replyComment(comment)">
                    <image class="action-icon-small" src="/static/images/icons/pinglun.png" mode="aspectFit"></image>
                <text>回复</text>
                  </view>
                  <view class="action-item" @tap="likeComment(comment)">
                    <image 
                      class="action-icon-small" 
                      :src="comment.isLiked ? '/static/images/heart-filled.png' : '/static/images/heart.png'" 
                      :class="{
                        'liked': comment.isLiked, 
                        'like-loading': comment.likeLoading,
                        'like-animate': comment.animating
                      }" 
                      mode="aspectFit"
                    ></image>
                    <text :class="{'liked': comment.isLiked}">{{comment.likeCount > 0 ? comment.likeCount : '点赞'}}</text>
                  </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

      <!-- 点赞用户列表 -->
      <view class="like-users-list" v-if="activeTab === 'like'">
        <view class="loading-state" v-if="likeUsersLoading && !likeUsers.length">
          <uni-icons type="spinner-cycle" size="24" color="#999"></uni-icons>
          <text>加载点赞用户中...</text>
      </view>
        
        <view class="empty-state" v-else-if="!likeUsers.length">
          <text class="empty-text">暂无点赞</text>
        </view>
        
        <view class="like-user-item" v-else v-for="(user, index) in likeUsers" :key="index" @tap="gotoUserPage(user._id)">
          <image 
            class="like-user-avatar" 
            :src="user.avatar || '/static/images/default-avatar.png'" 
            mode="aspectFill"
            @error="handleUserAvatarError(user)"
          ></image>
          <view class="like-user-info">
            <text class="like-user-nickname">{{user.nickname || '用户'}}</text>
            <text class="like-user-time">{{user.likeTimeText || '刚刚'}}</text>
        </view>
      </view>
    </view>
    </view>
    </scroll-view>

    <!-- 底部评论栏 -->
    <view class="bottom-bar">
      <view class="input-box" @tap="showCommentPopup">说点什么...</view>
      <view class="bottom-actions">
        <view class="action-btn" @tap="showCommentPopup">
          <image src="/static/images/icons/aite.png" class="action-btn-icon"></image>
          </view>
        <view class="action-btn" @tap="showCommentPopup">
          <image src="/static/images/icons/tupian.png" class="action-btn-icon"></image>
        </view>
            </view>
          </view>

    <!-- 评论弹出框 -->
    <comment-popup 
      ref="commentPopup"
      :detail="detail"
      :replyInfo="replyInfo"
      :postId="detail._id"
      @submit="handleCommentSubmit"
      @cancel="replyInfo = null"></comment-popup>

    <!-- 加载中 -->
    <uni-load-more :status="loadingStatus"></uni-load-more>

    <!-- 用户搜索下拉框 -->
    <view class="user-search-box" v-if="showUserSearchBox">
      <view class="search-input-wrap">
        <input 
          type="text"
          v-model="userSearchKeyword"
          placeholder="搜索用户"
          focus
          @input="handleUserSearchInput"
        />
          </view>
      <view class="user-search-loading" v-if="userSearchLoading">
        <uni-icons type="spinner-cycle" size="18" color="#999"></uni-icons>
        <text>搜索中...</text>
        </view>
      <scroll-view class="user-search-results" scroll-y>
        <view 
          class="user-search-item" 
          v-for="user in userSearchResults" 
          :key="user._id"
          @tap="selectUserToMention(user)"
        >
          <image class="user-avatar" :src="user.avatar || '/static/images/default-avatar.png'" mode="aspectFill"/>
          <view class="user-info">
            <text class="user-nickname">{{user.nickname || '用户'}}</text>
            <text class="user-signature">{{user.signature || '这个人很懒，什么都没写'}}</text>
      </view>
    </view>
        <view class="no-results" v-if="!userSearchLoading && userSearchResults.length === 0">
          <text>未找到匹配的用户</text>
        </view>
      </scroll-view>
    </view>

    <!-- 仅在开发环境显示的调试按钮，添加在页面底部 -->
    <button v-if="__DEV__" class="debug-btn" @tap="debugFollowStatus">检查关注状态</button>
  </view>
</template>

<script>
import CommentPopup from '@/components/comment-popup/comment-popup.vue'

export default {
  components: {
    CommentPopup
  },
  data() {
    return {
      userId: uni.getStorageSync('userId') || '',
      postId: '',
      detail: {
        _id: '',
        content: '',
        images: [],
        commentCount: 0,
        likeCount: 0,
        shareCount: 0,
        isLiked: false,
        userInfo: {
          _id: '',
          nickname: '',
          avatar: ''
        }
      },
      comments: [],
      replyInfo: null,
      page: 1,
      pageSize: 10,
      loadingStatus: 'more',
      sortType: 'time', // 'time' 或 'hot'
      activeTab: 'comment',
      likeUsers: [],
      commentsPage: 0,
      commentsPageSize: 10,
      commentsLoading: false,
      commentsFinished: false,
      isFollowing: false,
      followLoading: false,
      currentUserId: '',
      targetCommentId: '',
      highlightedCommentId: '',
      pendingHighlightId: '',
      toComment: false,
      showUserSearchBox: false,
      userSearchKeyword: '',
      userSearchResults: [],
      userSearchLoading: false,
      mentionedUsers: [], // 存储评论中@的用户
      likeUsersLoading: false,
      isDetailLoading: false,
      hasInitialized: false,
      commentsLoaded: false,
      likeLoading: false, // 添加点赞加载状态
      loadingComments: false, // 添加评论加载状态
      hasMoreComments: true, // 添加更多评论标志
      postData: {},
      onShowLoadingLock: false,
      __DEV__: process.env.NODE_ENV === 'development'
    }
  },
  
  onLoad(options) {
    console.log('详情页面加载，参数:', options);
    
    this.userId = uni.getStorageSync('userId') || '';
    this.postId = options.id;
    this.detail._id = options.id;
    
    // 默认加载评论标签页
    this.activeTab = 'comment';
    
    // 立即加载详情和评论
    this.loadDetailAndComments().then(() => {
      // 加载完详情后立即检查关注状态
      if (this.detail?.userInfo?._id && this.userId) {
        console.log('帖子详情加载完成，检查关注状态');
        this.checkFollowStatus();
      }
    });
    
    // 在加载详情之后，同步本地存储的点赞状态
    this.syncLikeStateFromStorage();
  },
  
  onShow() {
    console.log('详情页显示');
    
    // 如果已经有帖子ID和用户信息，但还没有触发关注状态检查
    if (this.detail?.userInfo?._id && this.userId) {
      console.log('详情页显示，执行关注状态检查');
      
      // 为避免每次显示页面都请求，先检查本地存储
      const followedUsers = uni.getStorageSync('followedUsers') || {};
      const storedFollowState = followedUsers[this.detail.userInfo._id];
      
      // 如果本地存储的关注状态较新（10分钟内），直接使用
      if (storedFollowState && Date.now() - storedFollowState.timestamp < 10 * 60 * 1000) {
        console.log('使用本地存储的关注状态:', storedFollowState.isFollowing);
        this.isFollowing = storedFollowState.isFollowing;
      } else {
        // 否则请求服务器获取最新状态
        this.checkFollowStatus();
      }
    }
    
    // 刷新点赞状态和点赞用户列表
    if (this.detail._id) {
      this.refreshLikeState();
      
      // 如果当前是点赞标签页，重新加载点赞用户列表
      if (this.activeTab === 'like') {
        this.loadLikeUsers(this.detail._id);
      }
    }
  },
  
  methods: {
    // 获取帖子详情和评论
    async loadDetailAndComments() {
      try {
        // 首先加载帖子详情
        await this.loadDetail();
        
        // 然后加载评论
        await this.loadComments(true);
        
        // 如果需要自动滚动到评论区
        if (this.toComment) {
        setTimeout(() => {
            this.scrollToComments();
        }, 500);
      }
      } catch (err) {
        console.error('加载详情和评论失败:', err);
      }
    },
    
    // 加载帖子详情
    async loadDetail() {
      if (!this.postId) {
        return;
      }
      
      this.isDetailLoading = true;
      
      try {
        const userId = uni.getStorageSync('userId');
        console.log('加载帖子详情，ID:', this.postId);
        
        const res = await uniCloud.callFunction({
          name: 'getPostDetail',
          data: {
            postId: this.postId,
            userId,
            timestamp: Date.now() // 添加时间戳防止缓存
          }
        });
        
        if (res.result.code === 0 && res.result.data) {
          this.detail = res.result.data;
          
          // 确保likeCount为数字且不为负数
          this.detail.likeCount = Math.max(0, parseInt(this.detail.likeCount) || 0);
          
          // 确保isLiked是布尔值
          this.detail.isLiked = !!this.detail.isLiked;
          
          console.log('帖子详情数据:', this.detail);
          
          // 设置标题
          uni.setNavigationBarTitle({
            title: this.detail.userInfo ? (this.detail.userInfo.nickname + '的帖子') : '帖子详情'
          });
          
          // 加载点赞用户列表，但不立即更新帖子的点赞数
          if (this.activeTab === 'like') {
            this.loadLikeUsersWithoutUpdatingCount(this.postId);
          }
          
          // 在loadDetail方法的成功回调中添加
          console.log('帖子信息:', {
            '当前用户ID': this.userId,
            '帖子作者ID': res.result.data.userInfo._id,
            '是否是自己的帖子': this.userId === res.result.data.userInfo._id
          });
        } else {
          throw new Error(res.result.msg || '获取帖子详情失败');
        }
      } catch (error) {
        console.error('加载帖子详情失败:', error);
        uni.showToast({
          title: error.message || '加载失败',
          icon: 'none'
        });
      } finally {
        this.isDetailLoading = false;
      }
    },
    
    // 新增方法：加载点赞用户列表但不更新点赞数
    async loadLikeUsersWithoutUpdatingCount(postId) {
      if (!postId) {
        console.error('加载点赞用户失败：缺少帖子ID');
        return;
      }
      
      // 防止重复加载
      if (this.likeUsersLoading) {
        console.log('点赞用户加载中，跳过重复请求');
        return;
      }
      
      this.likeUsersLoading = true;
      console.log('开始静默加载点赞用户列表');
      
      // 最多重试2次
      let retryCount = 0;
      const maxRetries = 2;
      
      const loadLikeUsersWithRetry = async () => {
        try {
          const res = await uniCloud.callFunction({
            name: 'getLikeUsers',
            data: {
              postId: postId,
              type: 'post',
              updateCount: false, // 增加一个标志位告诉云函数不要更新点赞数
              timestamp: Date.now()
            },
            timeout: 8000 // 8秒超时，比主加载方法短一些
          });
          
          if (res.result && res.result.code === 0) {
            const likeUsers = Array.isArray(res.result.data) ? res.result.data : [];
            this.likeUsers = likeUsers;
            
            // 只记录数量差异，不强制更新点赞计数
            if (this.likeUsers.length !== this.detail.likeCount) {
              console.log('点赞数量存在差异: UI显示', this.detail.likeCount, '实际用户数', this.likeUsers.length);
            }
            
            // 缓存点赞用户数据，但不影响显示的点赞计数
            try {
              uni.setStorageSync(`likeUsers_${postId}`, {
                data: this.likeUsers,
                timestamp: Date.now(),
                count: this.likeUsers.length,
                displayCount: this.detail.likeCount // 保存显示的计数，与实际数量分开
              });
            } catch (storageError) {
              console.error('缓存点赞用户数据失败:', storageError);
            }
          } else {
            throw new Error((res.result && res.result.msg) || '获取点赞用户失败');
          }
        } catch (error) {
          console.error('静默获取点赞用户出错:', error);
          
          // 检查是否还有重试机会
          if (retryCount < maxRetries - 1) {
            retryCount++;
            // 延迟重试，避免过快请求
            await new Promise(resolve => setTimeout(resolve, 800 * retryCount));
            return await loadLikeUsersWithRetry();
          }
          
          // 重试耗尽后，尝试从缓存加载，但不显示错误提示
          const cachedLikeUsers = uni.getStorageSync(`likeUsers_${postId}`);
          if (cachedLikeUsers && cachedLikeUsers.data && 
              Array.isArray(cachedLikeUsers.data) &&
              Date.now() - cachedLikeUsers.timestamp < 10 * 60 * 1000) {
            console.log('使用缓存的点赞用户数据');
            this.likeUsers = cachedLikeUsers.data;
          } else {
            this.likeUsers = [];
          }
        } finally {
          this.likeUsersLoading = false;
        }
      };
      
      // 开始加载，包含重试逻辑
      await loadLikeUsersWithRetry();
    },
    
    // 加载评论列表
    async loadComments(refresh = false) {
      // 避免重复加载
      if (this.loadingComments) return;
      
      if (refresh) {
        this.commentsPage = 1;
        this.comments = [];
        this.hasMoreComments = true;
      } else if (!this.hasMoreComments) {
        return;
      }
      
      this.loadingComments = true;
      this.commentsLoading = true;

      try {
        // 获取本地存储的评论点赞状态
        const likedComments = uni.getStorageSync('likedComments') || {};
        
        const res = await uniCloud.callFunction({
          name: 'getComments',
          data: {
            postId: this.postId,
            page: this.commentsPage,
            pageSize: 10,
            userId: this.userId
          }
        });
        
        if (res.result.code === 0) {
          const data = res.result.data;
          const comments = data.list || [];
          
          // 获取用户当前的点赞状态
          if (this.userId && comments.length > 0) {
            try {
              // 获取当前用户对这些评论的点赞状态
              const commentIds = comments.map(comment => comment._id);
              const likeResult = await uniCloud.callFunction({
                name: 'getCommentLikes',
                data: {
                  userId: this.userId,
                  commentIds: commentIds
                }
              });
              
              if (likeResult.result && likeResult.result.code === 0) {
                const likedCommentIds = likeResult.result.data || [];
                
                // 更新评论的点赞状态
                comments.forEach(comment => {
                  // 优先使用服务器返回的点赞状态
                  comment.isLiked = likedCommentIds.includes(comment._id);
                  
                  // 如果服务器返回未点赞，但本地存储有较新的点赞记录，则使用本地记录
                  const localLikeInfo = likedComments[comment._id];
                  if (!comment.isLiked && localLikeInfo && localLikeInfo.isLiked) {
                    // 确认本地记录是否在有效期内 (10分钟内)
                    if (Date.now() - localLikeInfo.timestamp < 10 * 60 * 1000) {
                      console.log(`使用本地点赞记录: 评论ID=${comment._id}`);
                      comment.isLiked = true;
                      
                      // 异步更新服务器点赞状态，确保服务器与客户端一致
                      this.syncLikeStatus(comment._id, true);
                    }
                  }
                });
              }
            } catch (likeError) {
              console.error('获取评论点赞状态失败:', likeError);
              
              // 如果服务器查询失败，仅使用本地存储的点赞状态
              comments.forEach(comment => {
                const localLikeInfo = likedComments[comment._id];
                if (localLikeInfo && localLikeInfo.isLiked) {
                  // 确认本地记录是否在有效期内 (10分钟内)
                  if (Date.now() - localLikeInfo.timestamp < 10 * 60 * 1000) {
                    comment.isLiked = true;
                  }
                }
              });
            }
          }
          
          // 确保每条评论有必要的属性
          comments.forEach(comment => {
            comment.likeCount = Math.max(0, comment.likeCount || 0);
            comment.isLiked = !!comment.isLiked;
          });
          
          if (refresh || this.commentsPage === 1) {
            this.comments = comments;
          } else {
            // 合并评论，避免重复
            this.comments = [...this.comments, ...comments];
          }
          
          // 按排序方式排序
          this.sortComments();
          
          // 更新是否有更多评论
          this.hasMoreComments = data.hasMore;
          if (data.hasMore) {
            this.commentsPage++;
          }
        } else {
          throw new Error(res.result.msg || '加载评论失败');
        }
      } catch (error) {
        console.error('加载评论失败:', error);
        uni.showToast({
          title: '加载评论失败',
          icon: 'none'
        });
      } finally {
        this.loadingComments = false;
        this.commentsLoading = false;
      }
    },
    
    // 处理评论提交
    async handleCommentSubmit(data) {
      console.log('开始提交评论，完整数据:', JSON.stringify(data));
      
      if (!data || (!data.content && !data.image)) {
        uni.showToast({
          title: '评论内容不能为空',
          icon: 'none'
        });
        return;
      }
      
      try {
        uni.showLoading({ title: '提交中...' });
        
        const content = data.content ? data.content.trim() : '';
        const postId = this.postId || this.detail._id;
        const userId = uni.getStorageSync('userId');
        
        // 验证基础参数
        if (!userId) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }
        
        if (!postId) {
          uni.showToast({ title: '无效的帖子ID', icon: 'none' });
          return;
        }
        
        console.log('提交评论参数检查通过');
        
        // 提取@用户名
        const mentionRegex = /@([^\s@]+)/g;
        const matches = content.match(mentionRegex) || [];
        const mentions = matches.map(match => match.substring(1));
        
        console.log('检测到@用户:', mentions);
        
        // 获取被@用户的ID
        let mentionedUserIds = [];
        if (mentions.length > 0) {
          try {
            const userResult = await uniCloud.callFunction({
              name: 'getUsersByNickname',
              data: { nicknames: mentions }
            });
            
            console.log('获取@用户ID结果:', userResult.result);
            
            if (userResult.result.code === 0 && userResult.result.data) {
              mentionedUserIds = userResult.result.data.map(user => user._id);
            }
          } catch (e) {
            console.error('@用户ID获取失败:', e);
          }
        }
        
        // 构建评论数据
        const commentData = {
          postId,
          userId,
          content,
          parentId: data.parentId || null,
          replyTo: data.replyTo || (this.replyInfo ? this.replyInfo.userId : null),
          mentionedUserIds,
          status: 1,
          imageUrl: data.image || '' // 添加图片URL
        };
        
        // 提交评论
        const result = await uniCloud.callFunction({
          name: 'addComment',
          data: commentData
        });
        
        console.log('评论提交结果:', result.result);
        
        if (result.result.code === 0) {
        uni.showToast({
            title: '评论成功',
            icon: 'success'
          });
          
          // 重置评论页码并重新加载评论（确保按照新的排序获取最新评论）
          this.commentsPage = 1;
          await this.loadComments(true);
          
          // 滚动到评论区
          this.$nextTick(() => {
            this.scrollToComments();
          });
          
          // 清空评论框并关闭弹窗
          if (this.$refs.commentPopup) {
            if (typeof this.$refs.commentPopup.clear === 'function') {
              this.$refs.commentPopup.clear();
            }
      this.$refs.commentPopup.close();
          }
          
          // 重置回复信息
          this.replyInfo = null;
        } else {
          throw new Error(result.result.msg || '评论失败');
        }
      } catch (error) {
        console.error('评论提交失败:', error);
        uni.showToast({
          title: error.message || '评论提交失败',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 回复评论
    replyComment(comment) {
      if (!comment || !comment.userInfo) {
        return;
      }
      
      // 设置回复信息
      this.replyInfo = {
        ...comment,
        autoAt: true, // 标记为需要自动@
        atNickname: comment.userInfo.nickname || '用户' // 存储要@的用户昵称
      };
      
      this.showCommentPopup();
    },
    
    // 显示评论弹窗
    showCommentPopup() {
      if (this.$refs.commentPopup) {
        this.$refs.commentPopup.open();
        
        // 如果是回复并且需要自动@，在评论框中插入@用户
        if (this.replyInfo && this.replyInfo.autoAt && this.replyInfo.atNickname) {
          // 延迟一点点执行，确保弹窗已经完全打开
          setTimeout(() => {
            this.$refs.commentPopup.setContent(`@${this.replyInfo.atNickname} `);
          }, 100);
        }
      } else {
        console.error('commentPopup组件引用不存在');
      }
    },
    
    // 使用新的云函数检查关注状态
    async checkFollowStatus() {
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) return;
        
        // 获取作者ID
        const targetUserId = this.detail?.userInfo?._id;
        if (!targetUserId) {
          console.log('无需检查关注状态：无目标用户');
          return;
        }
        
        // 如果是自己的帖子，直接返回
        if (userId === targetUserId) {
          console.log('无需检查关注状态：自己的帖子');
          this.isFollowing = false; // 重置关注状态，避免可能的错误状态
          return;
        }
        
        console.log('检查关注状态，当前用户:', userId, '目标用户:', targetUserId);
        
        // 防止重复请求
        if (this.followLoading) return;
        this.followLoading = true;
        
        // 调用云函数 - 添加时间戳防止缓存
        const res = await uniCloud.callFunction({
          name: 'checkFollow',
          data: {
            userId,
            targetUserId,
            timestamp: Date.now() // 添加时间戳避免缓存
          }
        });
        
        console.log('获取关注状态结果:', res.result);
        
        if (res.result.code === 0) {
          // 设置状态前记录原状态，用于判断是否需要更新UI
          const oldFollowState = this.isFollowing;
          const newFollowState = res.result.data.isFollowing;
          
          // 更新关注状态
          this.isFollowing = newFollowState;
          
          // 记录结果到本地存储
          const followedUsers = uni.getStorageSync('followedUsers') || {};
          followedUsers[targetUserId] = {
            isFollowing: newFollowState,
            timestamp: Date.now()
          };
          uni.setStorageSync('followedUsers', followedUsers);
          
          console.log('关注状态检查完成，原状态:', oldFollowState, '新状态:', this.isFollowing);
          
          // 如果关注状态变化，触发UI更新
          if (oldFollowState !== newFollowState) {
            this.$forceUpdate();
          }
        } else {
          console.error('获取关注状态失败:', res.result.msg);
        }
      } catch (error) {
        console.error('检查关注状态异常:', error);
      } finally {
        this.followLoading = false;
      }
    },
    
    // 处理关注/取关操作
    async toggleFollow() {
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }

        const targetUserId = this.detail.userInfo._id;
        if (!targetUserId || targetUserId === userId) return;
        
        // 防止重复点击
        if (this.followLoading) return;
        this.followLoading = true;
        
        // 根据当前状态决定是否需要确认
        if (this.isFollowing) {
          // 已关注状态，弹出确认对话框
          uni.showModal({
            title: '取消关注',
            content: '确定取消关注该用户吗？',
            success: async (res) => {
              if (res.confirm) {
                await this.toggleFollowAction(userId, targetUserId);
              }
              this.followLoading = false;
            },
            fail: () => {
              this.followLoading = false;
            }
          });
        } else {
          // 未关注状态，直接执行
          await this.toggleFollowAction(userId, targetUserId);
          this.followLoading = false;
        }
      } catch (error) {
        console.error('关注操作失败:', error);
        uni.showToast({
          title: error.message || '操作失败',
          icon: 'none'
        });
        this.followLoading = false;
      }
    },
    
    // 执行关注/取关操作
    async toggleFollowAction(userId, targetUserId) {
      uni.showLoading({ title: '处理中...' });
      
      try {
        // 记录操作前状态
        const previousFollowState = this.isFollowing;
        
        // 更新UI状态，提供立即反馈
        this.isFollowing = !previousFollowState;
        
        // 尝试调用云函数执行关注/取关操作
        const result = await uniCloud.callFunction({
          name: 'toggleFollow',
          data: {
            userId,
            targetUserId,
            timestamp: Date.now() // 添加时间戳避免缓存
          }
        });
        
        console.log('关注/取关操作结果:', result.result);
        
        // 处理成功情况
        if (result.result && result.result.code === 0) {
          // 使用服务器返回的实际状态更新UI
          if (result.result.data && typeof result.result.data.isFollowing === 'boolean') {
            this.isFollowing = result.result.data.isFollowing;
          }
          
          // 更新本地存储
          const followedUsers = uni.getStorageSync('followedUsers') || {};
          followedUsers[targetUserId] = {
            isFollowing: this.isFollowing,
            timestamp: Date.now()
          };
          uni.setStorageSync('followedUsers', followedUsers);
          
          // 更新用户关注计数
          try {
            const userInfo = uni.getStorageSync('userInfo') || {};
            if (userInfo.followCount === undefined) {
              userInfo.followCount = 0;
            }
            
            const diff = this.isFollowing ? 1 : -1;
            userInfo.followCount = Math.max(0, (parseInt(userInfo.followCount) || 0) + diff);
            userInfo.followingCount = userInfo.followCount;
            
            uni.setStorageSync('userInfo', userInfo);
            uni.$emit('userInfoUpdated', userInfo);
            
            console.log('更新后的关注计数:', userInfo.followCount);
          } catch (countError) {
            console.error('更新关注计数失败:', countError);
          }
          
          uni.showToast({
            title: this.isFollowing ? '已关注' : '已取消关注',
            icon: 'success'
          });
        } else {
          // 如果API失败，恢复到原来的状态
          this.isFollowing = previousFollowState;
          console.error('关注操作API返回错误:', result.result?.msg);
          throw new Error(result.result?.msg || '操作失败');
        }
      } catch (error) {
        console.error('关注/取关操作失败:', error);
        uni.showToast({
          title: error.message || '操作失败',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 显示评论操作菜单
    showCommentActions(comment) {
      // 检查是否为评论作者或帖子作者
      const isCommentAuthor = comment.userId === this.userId;
      const isPostAuthor = this.detail.userId === this.userId;
      
      if (isCommentAuthor || isPostAuthor) {
        uni.showActionSheet({
          itemList: ['删除评论'],
          success: res => {
            if (res.tapIndex === 0) {
              this.deleteComment(comment._id);
            }
          }
        });
      } else {
        // 其他用户只能举报
        uni.showActionSheet({
          itemList: ['举报'],
          success: res => {
            if (res.tapIndex === 0) {
              // 处理举报逻辑
            }
          }
        });
      }
    },
    
    // 删除评论
    async deleteComment(commentId) {
      try {
        // 确认是否删除
        const confirmRes = await new Promise((resolve) => {
          uni.showModal({
            title: '确认删除',
            content: '确定要删除这条评论吗？',
            success: (res) => {
              resolve(res);
            }
          });
        });
        
        if (!confirmRes.confirm) return;
        
        uni.showLoading({ title: '删除中...' });
        
        // 获取当前用户ID
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          throw new Error('用户未登录');
        }
        
        // 调用云函数删除评论，添加所有必需参数
        const res = await uniCloud.callFunction({
          name: 'deleteComment',
          data: {
            commentId,
            userId,
            postId: this.postId // 确保this.postId存在且正确
          }
        });
        
        console.log('删除评论结果:', res.result);

        if (res.result.code === 0) {
          // 删除成功，更新评论列表
          this.comments = this.comments.filter(item => item._id !== commentId);
          
          // 更新评论计数
          if (this.detail.commentCount > 0) {
            this.detail.commentCount -= 1;
          }
          
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          });
        } else {
          throw new Error(res.result.msg || '删除失败');
        }
      } catch (error) {
        console.error('删除评论失败:', error);
        uni.showToast({
          title: error.message || '删除失败',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 点赞帖子
    async handleLike() {
      if (!this.userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      // 防止重复点击
      if (this.likeLoading) return;
      this.likeLoading = true;
      
      try {
        // 记录原始状态
        const previousLikeState = this.detail.isLiked;
        const previousCount = this.detail.likeCount || 0;
        
        // 立即更新UI
        this.detail.isLiked = !previousLikeState;
        this.detail.likeCount = Math.max(0, previousCount + (this.detail.isLiked ? 1 : -1));
        
        // 同步更新本地存储
        const likedPosts = uni.getStorageSync('likedPosts') || {};
        if (this.detail.isLiked) {
          likedPosts[this.detail._id] = {
            isLiked: true,
            timestamp: Date.now()
          };
        } else {
          if (likedPosts[this.detail._id]) {
            likedPosts[this.detail._id].isLiked = false;
          }
        }
        uni.setStorageSync('likedPosts', likedPosts);
        
        // 调用API
        const res = await uniCloud.callFunction({
          name: 'toggleLike',
          data: {
            userId: this.userId,
            targetId: this.detail._id,
            type: 'post',
            timestamp: Date.now() // 添加时间戳避免缓存
          }
        });
        
        // 处理API响应
        if (res.result && res.result.code === 0) {
          // 成功，根据服务器返回更新实际点赞数
          if (res.result.data && typeof res.result.data.likeCount === 'number') {
            this.detail.likeCount = res.result.data.likeCount;
            console.log('服务器返回的点赞数:', this.detail.likeCount);
            
            // 如果当前是点赞列表页，同时更新列表
            if (this.activeTab === 'like') {
              this.loadLikeUsersWithoutUpdatingCount(this.detail._id);
            }
          }
        } else {
          // 失败，恢复原始状态
          this.detail.isLiked = previousLikeState;
          this.detail.likeCount = previousCount;
          
          // 恢复本地存储
          if (previousLikeState) {
            likedPosts[this.detail._id] = { isLiked: true, timestamp: Date.now() };
          } else {
            if (likedPosts[this.detail._id]) {
              likedPosts[this.detail._id].isLiked = false;
            }
          }
          uni.setStorageSync('likedPosts', likedPosts);
          
          throw new Error(res.result?.msg || '操作失败');
        }
      } catch (error) {
        console.error('点赞操作失败:', error);
        uni.showToast({
          title: error.message || '操作失败',
          icon: 'none'
        });
      } finally {
        // 延迟一下再设置状态，避免频繁点击
        setTimeout(() => {
          this.likeLoading = false;
        }, 300);
      }
    },
    
    // 点赞评论
    async likeComment(comment) {
      if (!this.userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
      
      // 防止重复操作
      if (comment.likeLoading) return;
      
      // 设置临时状态
      this.$set(comment, 'likeLoading', true);
      const previousLiked = comment.isLiked;
      const previousCount = comment.likeCount || 0;
      
      try {
        // 先更新UI状态，提供即时反馈
        this.$set(comment, 'isLiked', !previousLiked);
        this.$set(comment, 'likeCount', Math.max(0, previousCount + (!previousLiked ? 1 : -1)));
        
        // 添加本地存储，记住点赞状态
        const likedComments = uni.getStorageSync('likedComments') || {};
        const newLikeState = !previousLiked;
        
        // 更新本地存储
        likedComments[comment._id] = {
          isLiked: newLikeState,
          timestamp: Date.now()
        };
        uni.setStorageSync('likedComments', likedComments);
        
        // 添加点赞动画效果
        this.animateLike(comment._id);
        
        // 调用后端API
        const res = await uniCloud.callFunction({
          name: 'toggleLike',
          data: {
            userId: this.userId,
            targetId: comment._id,
            type: 'comment',
            isLiked: newLikeState, // 明确提供当前点赞状态
            timestamp: Date.now() // 添加时间戳避免缓存
          }
        });
        
        if (res.result.code !== 0) {
          // 恢复原始状态
          this.$set(comment, 'isLiked', previousLiked);
          this.$set(comment, 'likeCount', previousCount);
          
          // 恢复本地存储
          likedComments[comment._id] = {
            isLiked: previousLiked,
            timestamp: Date.now()
          };
          uni.setStorageSync('likedComments', likedComments);
          
          throw new Error(res.result.msg || '操作失败');
        } else if (res.result.data) {
          // 如果API返回了具体的点赞状态和数量，更新到UI
          if (typeof res.result.data.isLiked === 'boolean') {
            this.$set(comment, 'isLiked', res.result.data.isLiked);
            
            // 同步服务器返回的状态到本地存储
            likedComments[comment._id] = {
              isLiked: res.result.data.isLiked,
              timestamp: Date.now()
            };
            uni.setStorageSync('likedComments', likedComments);
          }
          if (typeof res.result.data.likeCount === 'number') {
            this.$set(comment, 'likeCount', res.result.data.likeCount);
          }
        }
        
      } catch (error) {
        console.error('评论点赞失败:', error);
        uni.showToast({
          title: error.message || '操作失败',
          icon: 'none'
        });
      } finally {
        // 延迟取消加载状态，避免UI闪烁
        setTimeout(() => {
          this.$set(comment, 'likeLoading', false);
        }, 300);
      }
    },
    
    // 点赞动画效果
    animateLike(commentId) {
      // 使用uni-app的查询API代替DOM查询
      const query = uni.createSelectorQuery().in(this);
      query.select(`.comment-item[data-comment-id="${commentId}"] .action-icon-small.liked`)
        .fields({ node: true, size: true }, (res) => {
          if (!res) return;
          // 由于无法直接操作节点，我们使用类名切换方式
          // 将对应评论项临时添加动画标记
          const comment = this.comments.find(c => c._id === commentId);
          if (comment) {
            this.$set(comment, 'animating', true);
            setTimeout(() => {
              this.$set(comment, 'animating', false);
            }, 500);
          }
        }).exec();
    },
    
    // 切换评论排序方式
    setSortType(type) {
      if (this.sortType === type) return;
      
      this.sortType = type;
      this.sortComments();
      
      uni.showToast({
        title: type === 'time' ? '按时间排序' : '按热度排序',
        icon: 'none',
        duration: 1500
      });
    },
    
    // 排序评论列表
    sortComments() {
      if (!this.comments || this.comments.length <= 1) return;
      
      if (this.sortType === 'time') {
        // 按时间从新到旧排序
        this.comments.sort((a, b) => {
          return new Date(b.createTime) - new Date(a.createTime);
        });
      } else {
        // 按热度排序，点赞数相同则按时间排序
        this.comments.sort((a, b) => {
          const likeDiff = (b.likeCount || 0) - (a.likeCount || 0);
          if (likeDiff !== 0) return likeDiff;
          // 点赞数相同，按时间从新到旧排序
          return new Date(b.createTime) - new Date(a.createTime);
        });
      }
    },
    
    // 预览图片
    previewImage(index) {
      uni.previewImage({
        urls: this.detail.images,
        current: index
      });
    },
    
    // 预览评论图片
    previewCommentImage(imageUrl) {
      uni.previewImage({
        urls: [imageUrl],
        current: imageUrl
      });
    },
    
    // 跳转到用户主页 - 使用getUserProfile云函数
    async gotoUserPage(userId) {
      if (!userId) return;
      
      // 显示加载状态
      uni.showLoading({
        title: '加载中...',
        mask: true
      });
      
      try {
        // 获取用户信息
        const res = await uniCloud.callFunction({
          name: 'getUserProfile',
          data: { 
            userId,
            forceUpdate: true
          },
          timeout: 5000 // 5秒超时
        });
        
        // 隐藏加载状态
        uni.hideLoading();
        
        if (res.result && res.result.code === 0 && res.result.data) {
          // 跳转到用户页面
          uni.navigateTo({
            url: `/pages/mine/mine?id=${userId}`,
            fail: (err) => {
              console.error('导航到用户页面失败:', err);
              // 尝试不同的用户页面路径
              uni.navigateTo({
                url: `/pages/user/user?id=${userId}`,
                fail: (e) => {
                  // 如果还是失败，显示提示
                  uni.showToast({
                    title: '用户页面暂不可用',
                    icon: 'none'
                  });
                }
              });
            }
          });
        } else {
          throw new Error((res.result && res.result.msg) || '获取用户信息失败');
        }
      } catch (error) {
        console.error('获取用户信息或跳转失败:', error);
        uni.hideLoading();
        
        uni.showToast({
          title: error.message || '无法访问用户页面',
          icon: 'none'
        });
      }
    },
    
    // 加载更多评论
    loadMoreComments() {
      console.log('触发加载更多评论');
      
      // 检查是否已全部加载完毕或者正在加载中
      if (this.commentsFinished || this.commentsLoading || !this.hasMoreComments) {
        console.log('跳过加载更多评论:', 
          this.commentsFinished ? '已全部加载' : (this.commentsLoading ? '正在加载中' : '没有更多评论'));
        return;
      }
      
      console.log('开始加载更多评论，当前页码:', this.commentsPage);
      // 显式传入 false 表示不是刷新，而是追加
      this.loadComments(false);
    },
    
    // 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return '刚刚';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      
      if (diff < 60) {
        return '刚刚';
      } else if (diff < 3600) {
        return Math.floor(diff / 60) + '分钟前';
      } else if (diff < 86400) {
        return Math.floor(diff / 3600) + '小时前';
      } else if (diff < 2592000) {
        return Math.floor(diff / 86400) + '天前';
      } else {
      const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    },
    
    // 切换评论/点赞选项卡
    switchTab(tab) {
      if (this.activeTab === tab) return;
      this.activeTab = tab;
      
      if (tab === 'comment') {
        if (this.comments.length === 0) {
          this.loadComments();
        }
      } else if (tab === 'like') {
        if (this.likeUsers.length === 0) {
          // 使用不更新点赞数的版本
          this.loadLikeUsersWithoutUpdatingCount(this.detail._id);
        }
      }
    },
    
    // 滚动到评论区
    scrollToComments() {
      // 可以根据需要实现滚动逻辑
      // 这里使用简单的选择器查询和scrollTop设置
      const query = uni.createSelectorQuery().in(this);
      query.select('.comment-section').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(([res, scrollRes]) => {
        if (res) {
          uni.pageScrollTo({
            scrollTop: res.top + scrollRes.scrollTop - 100, // 减去一点偏移量
            duration: 300
          });
        }
      });
    },
    
    // 加载点赞用户列表
    async loadLikeUsers(postId) {
      if (!postId) {
        console.error('加载点赞用户失败：缺少帖子ID');
        return;
      }
      
      // 防止重复加载
      if (this.likeUsersLoading) {
        console.log('点赞用户加载中，跳过重复请求');
        return;
      }
      
      this.likeUsersLoading = true;
      
      // 最多重试3次
      let retryCount = 0;
      const maxRetries = 3;
      
      const loadLikeUsersWithRetry = async () => {
        try {
          console.log(`开始加载点赞用户列表，帖子ID: ${postId}, 第${retryCount + 1}次尝试`);
          
          if (retryCount === 0) {
        uni.showLoading({
              title: '加载中...',
              mask: true
            });
          }
          
          const res = await uniCloud.callFunction({
            name: 'getLikeUsers',
            data: {
              postId: postId,
              type: 'post',
              timestamp: Date.now() // 添加时间戳避免缓存
            },
            timeout: 10000 // 10秒超时
          });
          
          console.log('获取点赞用户结果:', JSON.stringify(res.result));
          
          if (res.result && res.result.code === 0) {
            // 确保likeUsers是数组并且检查每个用户信息是否完整
            let likeUsers = Array.isArray(res.result.data) ? res.result.data : [];
            
            // 检查是否为备用数据
            if (res.result.isBackupData) {
              console.log('收到备用数据，用户信息可能不完整');
            }
            
            // 检查并日志记录有问题的用户数据
            let incompleteUserCount = 0;
            likeUsers.forEach((user, index) => {
              if (!user.nickname || user.nickname === '用户' || !user.avatar) {
                incompleteUserCount++;
                console.warn(`点赞用户 ${index + 1} 数据不完整:`, JSON.stringify(user));
              }
            });
            
            // 如果发现过多不完整的用户且未到达最大重试次数，则重试
            if (incompleteUserCount > likeUsers.length / 2 && retryCount < maxRetries - 1) {
              console.log(`发现${incompleteUserCount}个不完整用户数据，准备重试`);
              retryCount++;
              
              // 延迟重试，避免过快请求
              await new Promise(resolve => setTimeout(resolve, 1000));
              return await loadLikeUsersWithRetry();
            }
            
            this.likeUsers = likeUsers;
            console.log('点赞用户列表最终长度:', this.likeUsers.length);
            
            // 同步点赞计数 (从服务器返回的实际数量)
            if (typeof res.result.likeCount === 'number') {
              console.log('从服务器同步点赞数量:', res.result.likeCount);
              this.detail.likeCount = res.result.likeCount;
            } 
            // 如果没有明确返回点赞计数，则使用列表长度
            else if (this.likeUsers.length !== this.detail.likeCount) {
              console.log('使用列表长度同步点赞数量: 从', this.detail.likeCount, '到', this.likeUsers.length);
              this.detail.likeCount = this.likeUsers.length;
            }
            
            // 缓存点赞用户数据到本地，有效期10分钟
            try {
              uni.setStorageSync(`likeUsers_${postId}`, {
                data: this.likeUsers,
                timestamp: Date.now(),
                count: this.likeUsers.length
              });
            } catch (storageError) {
              console.error('缓存点赞用户数据失败:', storageError);
            }
          } else {
            throw new Error((res.result && res.result.msg) || '获取点赞用户失败');
          }
        } catch (error) {
          console.error('获取点赞用户出错:', error);
          
          // 检查是否还有重试机会
          if (retryCount < maxRetries - 1) {
            console.log(`第${retryCount + 1}次加载失败，准备重试`);
            retryCount++;
            
            // 延迟重试，避免过快请求
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // 逐次增加延迟
            return await loadLikeUsersWithRetry();
          }
          
          // 重试耗尽后，尝试从缓存加载
          console.log('重试次数用尽，尝试从缓存加载');
          const cachedLikeUsers = uni.getStorageSync(`likeUsers_${postId}`);
          
          if (cachedLikeUsers && cachedLikeUsers.data && 
              Array.isArray(cachedLikeUsers.data) &&
              Date.now() - cachedLikeUsers.timestamp < 10 * 60 * 1000) { // 10分钟内的缓存
            console.log('使用缓存的点赞用户数据, 缓存时间:', new Date(cachedLikeUsers.timestamp).toLocaleString());
            this.likeUsers = cachedLikeUsers.data;
            
            // 如果缓存的数量与当前显示不同，更新显示
            if (cachedLikeUsers.count !== this.detail.likeCount) {
              console.log('从缓存更新点赞数:', cachedLikeUsers.count);
              this.detail.likeCount = cachedLikeUsers.count;
            }
          } else {
            // 缓存不可用或过期，显示空列表
            this.likeUsers = [];
            uni.showToast({
              title: '获取点赞用户失败',
              icon: 'none'
            });
          }
        } finally {
        uni.hideLoading();
          this.likeUsersLoading = false;
        }
      };
      
      // 开始加载，包含重试逻辑
      await loadLikeUsersWithRetry();
    },
    
    // 添加新方法：同步点赞数量到服务器
    async syncLikeCount(postId, actualCount) {
      try {
        await uniCloud.callFunction({
          name: 'syncLikeCount',
          data: {
            postId,
            actualCount,
            timestamp: Date.now()
          }
        });
        console.log('点赞数量同步成功');
      } catch (error) {
        console.error('同步点赞数量失败:', error);
      }
    },
    
    // 滚动到特定评论
    scrollToComment(commentId) {
      console.log('尝试滚动到评论:', commentId);
      // 创建选择器
      const query = uni.createSelectorQuery().in(this);
      
      // 查找所有评论项
      query.selectAll('.comment-item').boundingClientRect(rects => {
        if (!rects || rects.length === 0) return;
        
        // 找到目标评论的索引
        const targetIndex = this.comments.findIndex(comment => comment._id === commentId);
        
        if (targetIndex !== -1 && rects[targetIndex]) {
          const commentTop = rects[targetIndex].top;
          
          // 滚动到评论位置
          uni.pageScrollTo({
            scrollTop: commentTop - 100, // 减去一点偏移量，确保评论完全可见
            duration: 300
          });
          
          // 高亮显示评论
          this.highlightComment(commentId);
        }
      }).exec();
    },
    
    // 高亮特定评论
    highlightComment(commentId) {
      this.highlightedCommentId = commentId;
      
      // 3秒后取消高亮
      setTimeout(() => {
        this.highlightedCommentId = '';
      }, 3000);
    },
    
    // 格式化评论内容，处理@标记
    formatCommentContent(content) {
      if (!content) return '';
      
      // 替换@用户为高亮样式
      return content.replace(/@([^\s]+)/g, '<text class="mention-text">@$1</text>');
    },
    
    // 处理评论输入框中的@符号
    handleCommentInput(e) {
      const content = e.detail.value;
      const lastChar = content[content.length - 1];
      
      // 当用户输入@时，显示用户搜索框
      if (lastChar === '@') {
        this.showUserSearchBox = true;
        this.userSearchKeyword = '';
        this.searchUsers('');
      }
    },
    
    // 搜索用户
    async searchUsers(keyword) {
      this.userSearchLoading = true;
      
      try {
        const res = await uniCloud.callFunction({
          name: 'searchUsers',
          data: {
            keyword,
            limit: 10
          }
        });
        
        if (res.result.code === 0) {
          this.userSearchResults = res.result.data || [];
        } else {
          this.userSearchResults = [];
        }
      } catch (error) {
        console.error('搜索用户失败:', error);
        this.userSearchResults = [];
      } finally {
        this.userSearchLoading = false;
      }
    },
    
    // 处理用户搜索关键词变化
    handleUserSearchInput(e) {
      this.userSearchKeyword = e.detail.value;
      this.searchUsers(this.userSearchKeyword);
    },
    
    // 选择要@的用户
    selectUserToMention(user) {
      // 添加到输入框中，只显示昵称
      if (this.$refs.commentInput) {
        // 获取当前输入框内容
        const currentContent = this.$refs.commentInput.value || '';
        // 找到最后一个@的位置
        const lastAtPos = currentContent.lastIndexOf('@');
        
        if (lastAtPos !== -1) {
          // 替换@后的内容为选中的用户昵称
          const newContent = currentContent.substring(0, lastAtPos) + '@' + user.nickname + ' ';
          this.$refs.commentInput.value = newContent;
          
          // 记录已@的用户，包含ID信息
          this.mentionedUsers.push({
            id: user._id,
            nickname: user.nickname,
            position: lastAtPos
          });
        }
      }
      
      // 关闭搜索框
      this.showUserSearchBox = false;
    },
    
    // 添加一个辅助方法
    checkRendering() {
      console.log('渲染检查:');
      console.log('当前标签页:', this.activeTab);
      console.log('评论加载状态:', this.commentsLoading);
      console.log('评论数量:', this.comments.length);
      console.log('点赞用户数量:', this.likeUsers.length);

      if (this.comments.length === 0 && !this.commentsLoading) {
        console.log('评论列表为空，尝试重新加载');
        this.loadComments(this.postId, true);
      }
    },
    
    // 添加调试辅助方法
    debugComments() {
      console.log('========== 评论调试信息 ==========');
      console.log('活动标签:', this.activeTab);
      console.log('评论数组长度:', this.comments.length);
      console.log('评论加载状态:', this.commentsLoading);
      console.log('评论数据:', JSON.stringify(this.comments));
      console.log('=================================');
      
      // 检查触发条件
      const showLoading = this.commentsLoading && !this.comments.length;
      const showEmpty = !this.commentsLoading && !this.comments.length;
      const showList = !this.commentsLoading && this.comments.length > 0;
      
      console.log('显示状态:', {
        显示加载中: showLoading,
        显示空状态: showEmpty,
        显示评论列表: showList
      });
    },
    
    // 添加到methods中，帮助排查问题
    debugState() {
      console.log('========== 当前状态信息 ==========');
      console.log('页面状态:', {
        activeTab: this.activeTab,
        isDetailLoading: this.isDetailLoading,
        hasInitialized: this.hasInitialized,
        commentsLoaded: this.commentsLoaded
      });
      
      console.log('评论状态:', {
        总数: this.comments.length,
        加载中: this.commentsLoading,
        当前页: this.commentsPage,
        全部加载完毕: this.commentsFinished
      });

      console.log('点赞状态:', {
        总数: this.likeUsers.length,
        加载中: this.likeUsersLoading
      });
      console.log('====================================');
    },
    
    // 添加调试辅助方法
    debugCommentData() {
      if (this.comments.length === 0) {
        uni.showToast({
          title: '没有评论可供调试',
          icon: 'none'
        });
        return;
      }
      
      const firstComment = this.comments[0];
      const debugInfo = {
        id: firstComment._id,
        content: firstComment.content,
        hasContent: !!firstComment.content,
        contentLength: firstComment.content ? firstComment.content.length : 0,
        userInfo: firstComment.userInfo
      };
      
      console.log('评论调试信息:', debugInfo);
      
      // 显示弹窗
      uni.showModal({
        title: '评论调试信息',
        content: JSON.stringify(debugInfo, null, 2),
        showCancel: false
      });
    },
    
    // 添加图片错误处理方法
    handleImageError(comment) {
      console.log(`图片加载失败: ${comment.image}`);
      comment.imageLoadError = true;
      // 可以在这里添加重试逻辑或错误提示
    },
    
    // 辅助方法：验证图片URL
    validateImageUrl(url) {
      if (!url) return false;
      
      // 基本URL格式验证
      const isValidUrl = /^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(url);
      
      // 检查是否为常见图片格式
      const isImageExtension = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);
      
      return isValidUrl && isImageExtension;
    },
    
    // 添加调试辅助方法
    debugCommentImages() {
      console.log('===== 评论图片调试 =====');
      this.comments.forEach((comment, index) => {
        console.log(`评论 ${index + 1}:`, {
          id: comment._id,
          userId: comment.userId,
          content: comment.content?.substring(0, 20),
          hasImage: !!comment.image
        });
      });
      
      // 向用户展示统计信息
      uni.showModal({
        title: '评论图片统计',
        content: `评论总数: ${this.comments.length}\n有图片评论: ${this.comments.filter(c => !!c.image).length}`,
        showCancel: false
      });
    },
    
    // 添加到methods中
    logCommentImages() {
      // 遍历comments并输出所有带图片属性的评论
      console.log('==== 所有评论图片信息 ====');
      let hasImages = false;
      
      this.comments.forEach((comment, index) => {
        if (comment.image) {
          hasImages = true;
          console.log(`评论${index+1}:`, {
            id: comment._id,
            图片URL: comment.image,
            正文: comment.content ? comment.content.substring(0, 20) : '无内容'
          });
        }
      });
      
      if (!hasImages) {
        console.log('没有评论包含图片属性');
      }
      
      // 获取comment_images表数据
      uniCloud.callFunction({
        name: 'admin',
        data: {
          action: 'getTableData',
          table: 'comment_images',
          limit: 10
        }
      }).then(res => {
        console.log('comment_images表数据:', res.result);
      }).catch(err => {
        console.error('获取comment_images表数据失败:', err);
      });
    },
    
    // 在methods中添加调试方法
    debugImageRendering() {
      console.log('===== 评论图片渲染调试 =====');
      
      // 检查所有评论
      this.comments.forEach((comment, index) => {
        console.log(`评论 ${index+1}:`, {
          id: comment._id,
          content: comment.content?.substring(0, 20) + '...',
          hasImage: !!comment.image,
          imageURL: comment.image
        });
      });
      
      // 检查有图片属性的评论
      const commentsWithImageProp = this.comments.filter(c => !!c.image);
      console.log(`有image属性的评论: ${commentsWithImageProp.length}/${this.comments.length}`);
      
      // 测试图片URL是否可访问
      if (commentsWithImageProp.length > 0) {
        const firstImage = commentsWithImageProp[0].image;
        console.log(`第一张图片URL: ${firstImage}`);
        
        // 创建一个图片对象测试URL有效性
        const img = new Image();
        img.onload = () => console.log('图片URL有效，可以加载');
        img.onerror = () => console.log('图片URL无效，无法加载');
        img.src = firstImage;
      }
    },
    
    // 刷新点赞状态
    async refreshLikeState() {
      try {
        if (!this.userId || !this.detail || !this.detail._id) return;
        
        // 这里只检查点赞状态，不更新点赞数量
        const res = await uniCloud.callFunction({
          name: 'checkLikeStatus',
          data: {
            userId: this.userId,
            targetId: this.detail._id,
            type: 'post',
            timestamp: Date.now()
          }
        });
        
        if (res.result && res.result.code === 0) {
          // 只更新点赞状态，不改变点赞数量
          const isLiked = !!res.result.data.isLiked;
          
          // 只有当状态不同时才更新
          if (this.detail.isLiked !== isLiked) {
            console.log('更新点赞状态:', isLiked);
            this.detail.isLiked = isLiked;
          }
        }
      } catch (error) {
        console.error('刷新点赞状态失败:', error);
      }
    },
    
    // 新增方法：专门获取帖子的点赞数
    async fetchPostLikeCount() {
      if (!this.postId) return;
      
      try {
        const res = await uniCloud.callFunction({
          name: 'getPostDetail',
          data: { 
            postId: this.postId,
            userId: this.userId,
            fields: ['likeCount'] // 只获取点赞数
          }
        });
        
        if (res.result && res.result.code === 0 && res.result.data) {
          // 更新点赞计数
          if (typeof res.result.data.likeCount === 'number') {
            console.log('从帖子详情获取到点赞数:', res.result.data.likeCount);
            this.detail.likeCount = res.result.data.likeCount;
          }
        }
      } catch (error) {
        console.error('获取帖子点赞数失败:', error);
      }
    },
    
    // 添加同步点赞状态的新方法
    syncLikeStateFromStorage() {
      if (!this.detail || !this.detail._id) return;
      
      try {
        const likedPosts = uni.getStorageSync('likedPosts') || {};
        const storedLikeState = likedPosts[this.detail._id];
        
        // 如果本地有存储的点赞状态且时间不超过24小时
        if (storedLikeState && Date.now() - storedLikeState.timestamp < 24 * 60 * 60 * 1000) {
          // 使用存储的点赞状态
          this.detail.isLiked = true;
          // 为了确保数据一致性，这里不直接使用存储的点赞数量
        } else if (this.detail._id) {
          // 从服务器刷新点赞状态
          this.refreshLikeState();
        }
      } catch (error) {
        console.error('同步点赞状态失败:', error);
      }
    },
    
    // 处理用户头像加载错误
    handleUserAvatarError(user) {
      if (user) {
        // 只设置默认头像
        user.avatar = '/static/images/default-avatar.png';
        
        // 记录问题，但不尝试更新
        console.warn(`用户 ${user._id} 头像加载失败`);
      }
    },
    
    // 在methods中添加
    debugFollowStatus() {
      console.log('=== 关注状态调试 ===');
      console.log('当前用户ID:', this.userId);
      console.log('帖子作者ID:', this.detail?.userInfo?._id);
      console.log('当前关注状态:', this.isFollowing);
      
      // 检查本地存储
      const followedUsers = uni.getStorageSync('followedUsers') || {};
      const storedState = followedUsers[this.detail?.userInfo?._id];
      console.log('本地存储的关注状态:', storedState);
      
      // 强制刷新关注状态
      this.checkFollowStatus().then(() => {
        console.log('关注状态刷新后:', this.isFollowing);
        uni.showToast({
          title: this.isFollowing ? '已关注' : '未关注',
          icon: 'none'
        });
      });
    },
    
    // 同步点赞状态到服务器
    async syncLikeStatus(commentId, isLiked) {
      try {
        console.log(`同步评论点赞状态: 评论ID=${commentId}, 点赞=${isLiked}`);
        await uniCloud.callFunction({
          name: 'toggleLike',
          data: {
            userId: this.userId,
            targetId: commentId,
            type: 'comment',
            isLiked: isLiked, // 明确指定点赞状态
            timestamp: Date.now()
          }
        });
        console.log(`同步评论点赞状态成功: 评论ID=${commentId}`);
      } catch (error) {
        console.error('同步评论点赞状态失败:', error);
      }
    },
    
    // 在methods对象中添加
    editPost() {
      uni.navigateTo({
        url: `/pages/publish/publish?id=${this.detail._id}&edit=1`
      });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
  position: relative;
  padding: 0;
}

.content-scroll {
  flex: 1;
  height: calc(100vh - 120rpx);
  padding-bottom: 120rpx;
  box-sizing: border-box;
}

/* 用户信息样式 */
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 30rpx 20rpx;
  background-color: #fff;
  position: relative;
}

.user-left {
  display: flex;
  align-items: center;
  max-width: 65%; /* 减小左侧内容宽度，确保右侧按钮有更多空间 */
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 2rpx solid #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.user-meta {
  margin-left: 16rpx;
}

.nickname {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.time {
  font-size: 24rpx;
  color: #999;
  display: block;
  margin-top: 4rpx;
}

.follow-btn {
  padding: 12rpx 30rpx;
  background: linear-gradient(135deg, #FF8200, #FF5500);
  color: white;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: normal;
  line-height: 1.5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 10rpx rgba(255, 130, 0, 0.3);
  margin-left: auto;
  min-width: 160rpx; /* 增加最小宽度 */
  position: absolute; /* 使用绝对定位 */
  right: 30rpx; /* 固定在右侧 */
  top: 50%; /* 居中 */
  transform: translateY(-50%); /* 垂直居中 */
  transition: all 0.3s ease;
}

.follow-btn.following {
  background: #f5f5f5;
  color: #666;
  box-shadow: none;
  border: 1rpx solid #e0e0e0;
}

.follow-icon-text {
  font-size: 28rpx;
  margin-right: 10rpx;
  font-weight: bold;
}

.user-right {
  display: flex;
  align-items: center;
}

/* 内容样式 */
.content {
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.content-text {
  font-size: 30rpx;
  line-height: 1.6;
  color: #333;
  margin-bottom: 16rpx;
  word-break: break-all;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5rpx;
}

.image-grid image {
  width: calc(33.33% - 10rpx);
  height: 200rpx;
  margin: 5rpx;
  border-radius: 8rpx;
  background-color: #f0f0f0;
}

/* 互动栏样式 */
.action-bar {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-top: 1rpx solid #f0f0f0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-icon {
  width: 44rpx;
  height: 44rpx;
  margin-bottom: 6rpx;
  transition: all 0.2s ease;
}

.action-icon.liked {
  transform: scale(1.1);
  filter: none; /* 确保没有任何滤镜效果 */
}

.action-item text.liked {
  color: #ff5757;
  font-weight: 500;
}

/* 添加点赞按钮激活效果 */
.action-item:active {
  opacity: 0.8;
}

/* 评论区样式 */
.comment-section {
  background-color: #fff;
  padding: 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.header-tabs {
  display: flex;
  align-items: center;
}

.tab-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #666;
  margin-right: 30rpx;
  padding-bottom: 6rpx;
  position: relative;
}

.tab-item.active {
  color: #333;
  font-weight: 500;
}

.tab-item.active:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rpx;
  background-color: #ff8200;
  border-radius: 2rpx;
}

.comment-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  background-color: #fff;
}

.comment-sort-options {
  display: flex;
  background: #f5f5f5;
  border-radius: 40rpx;
  padding: 4rpx;
  width: 300rpx;
  box-sizing: border-box;
}

.sort-option {
  flex: 1;
  text-align: center;
  padding: 12rpx 0;
  font-size: 26rpx;
  color: #666;
  border-radius: 36rpx;
  transition: all 0.3s;
}

.sort-option.active {
  background: #ffffff;
  color: #ff8200;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

/* 评论列表样式 */
.comment-list {
  padding: 0 30rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.comment-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  position: relative;
}

.comment-item.highlighted {
  background-color: rgba(255, 230, 82, 0.2);
  transition: background-color 0.5s ease;
}

.comment-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: #f0f0f0;
  flex-shrink: 0;
}

.comment-right {
  margin-left: 16rpx;
  flex: 1;
  overflow: hidden;
}

.comment-user {
  margin-bottom: 4rpx;
}

.comment-nickname {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.reply-info {
  margin-bottom: 4rpx;
  font-size: 26rpx;
}

.reply-text {
  color: #999;
}

.reply-nickname {
  color: #3366cc;
}

.comment-content {
  margin: 8rpx 0;
  width: 100%;
}

.comment-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
  word-break: break-all;
  display: block;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12rpx;
  padding-top: 8rpx;
}

.comment-time {
  font-size: 24rpx;
  color: #999;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.action-item {
  display: flex;
  align-items: center;
  margin-left: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.action-icon-small {
  width: 32rpx;
  height: 32rpx;
  margin-right: 6rpx;
}

.action-item text {
  font-size: 24rpx;
  color: #666;
}

.action-item text.liked {
  color: #ff5757;
  font-weight: 500;
}

.action-icon-small.liked {
  transform: scale(1.1);
}

.action-icon-small.like-loading {
  opacity: 0.7;
}

/* 评论图片的样式 */
.comment-image-container {
  margin-top: 10px;
  width: 100%;
}

.comment-image {
  max-width: 300rpx;
  border-radius: 8rpx;
  background-color: #f5f5f5;
}

.comment-image:active {
  opacity: 0.8;
}

.image-error {
  font-size: 24rpx;
  color: #999;
  margin-top: 4rpx;
}

/* 确保评论内容正确显示 */
.comment-content {
  padding: 10rpx 0;
  word-break: break-all;
}

/* 底部评论栏 */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding: 16rpx 30rpx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  border-top: 1rpx solid #f0f0f0;
  z-index: 100;
}

.input-box {
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 36rpx;
  padding: 16rpx 30rpx;
  color: #999;
  font-size: 28rpx;
}

.bottom-actions {
  display: flex;
  margin-left: 20rpx;
}

.action-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10rpx;
}

.action-btn-icon {
  width: 44rpx;
  height: 44rpx;
}

/* 空状态样式优化 */
.empty-state {
  padding: 30rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
  display: block;
}

/* 点赞用户列表样式 */
.like-users-list {
  padding: 0 30rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.like-user-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  position: relative;
}

.like-user-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: #f0f0f0;
  flex-shrink: 0;
}

.like-user-info {
  margin-left: 16rpx;
  flex: 1;
  overflow: hidden;
}

.like-user-nickname {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.like-user-time {
  font-size: 24rpx;
  color: #999;
}

/* 用户搜索框样式 */
.user-search-box {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 12rpx 12rpx 0 0;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  max-height: 600rpx;
  z-index: 10;
}

.search-input-wrap {
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.search-input-wrap input {
  height: 70rpx;
  background-color: #f5f5f5;
  border-radius: 35rpx;
  padding: 0 30rpx;
}

.mention-text {
  color: #007AFF;
  font-weight: bold;
}

/* 更新样式，确保点赞数字与图标颜色一致 */
.action-item.like .action-icon.liked {
  transform: scale(1.1);
  filter: none; /* 确保图标显示正常 */
}

.action-item text.liked {
  color: #ff5757;
  font-weight: 500;
}

/* 确保点赞标签页显示正确数量 */
.tab-item text {
  font-size: 28rpx;
  white-space: nowrap;
}

/* 仅在开发环境显示的调试按钮，添加在页面底部 */
.debug-btn {
  position: fixed;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 12rpx 12rpx 0 0;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  max-height: 600rpx;
  z-index: 10;
  padding: 16rpx 30rpx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1rpx solid #f0f0f0;
}

.debug-btn text {
  font-size: 28rpx;
  color: #999;
}

/* 评论点赞样式 */
.comment-actions .action-icon-small {
  width: 32rpx;
  height: 32rpx;
  margin-right: 6rpx;
  transition: all 0.2s ease;
}

.comment-actions .action-icon-small.liked {
  color: #ff5757;
  transform: scale(1.1);
}

.comment-actions .action-item text.liked {
  color: #ff5757;
  font-weight: 500;
}

/* 点赞动画效果 */
.like-animate {
  animation: like-pulse 0.5s ease;
}

@keyframes like-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.1); }
}

/* 点赞加载动画 */
.like-loading {
  opacity: 0.7;
}

/* 确保评论操作区域有足够空间 */
.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
}

.comment-actions {
  display: flex;
  gap: 20rpx;
}

.comment-actions .action-item {
  display: flex;
  align-items: center;
  padding: 6rpx 10rpx;
  border-radius: 20rpx;
  transition: all 0.2s;
}

.comment-actions .action-item:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.edit-btn {
  padding: 12rpx 30rpx;
  background: linear-gradient(135deg, #FF8200, #FF5500);
  color: white;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: normal;
  line-height: 1.5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 10rpx rgba(255, 130, 0, 0.3);
  margin-left: 10rpx;
  min-width: 160rpx; /* 增加最小宽度 */
  position: absolute; /* 使用绝对定位 */
  right: 30rpx; /* 固定在右侧 */
  top: 50%; /* 居中 */
  transform: translateY(-50%); /* 垂直居中 */
  transition: all 0.3s ease;
}

.edit-btn.following {
  background: #f5f5f5;
  color: #666;
  box-shadow: none;
  border: 1rpx solid #e0e0e0;
}

.edit-icon-text {
  font-size: 28rpx;
  margin-right: 10rpx;
  font-weight: bold;
}
</style> 