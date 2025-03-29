<template>
  <view class="chat-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <uni-icons type="arrow-left" size="30" color="#333" @tap="goBack"/>
      <text class="nav-title">{{targetUserName}}</text>
    </view>
    
    <!-- 聊天消息列表 -->
    <scroll-view 
      scroll-y 
      class="message-list"
      :scroll-top="scrollTop"
      @scrolltolower="loadMore"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view v-if="messages.length === 0" class="empty-state">
        <text>暂无消息，开始聊天吧</text>
      </view>
      
      <view v-else class="message-container">
        <!-- 添加消息分组和时间显示 -->
        <block v-for="(group, groupIndex) in groupedMessages" :key="groupIndex">
          <!-- 消息时间显示在中间 -->
          <view class="time-divider">
            <text>{{group.date}}</text>
          </view>
          
          <!-- 该组的消息列表 -->
          <view 
            v-for="(item, index) in group.messages" 
            :key="item._id"
            :class="['message-item', item.isSelf ? 'self' : 'other']"
            @longpress="showMessageActions(item)"
          >
            <image 
              class="avatar" 
              :src="item.userInfo.avatar || '/static/images/avatar/default.png'" 
              mode="aspectFill"
              @error="handleAvatarError(e, item)"
            />
            <view class="message-content">
              <text class="message-text">{{item.content}}</text>
            </view>
          </view>
        </block>
      </view>
    </scroll-view>
    
    <!-- 输入框区域 -->
    <view class="input-area">
      <input 
        type="text" 
        v-model="inputContent"
        placeholder="请输入消息"
        @confirm="sendMessage"
      />
      <button 
        class="send-btn" 
        :disabled="!inputContent.trim()"
        @tap="sendMessage"
      >发送</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      targetUserId: '',
      targetUserName: '',
      messages: [],
      inputContent: '',
      scrollTop: 0,
      refreshing: false,
      page: 1,
      pageSize: 20,
      hasMore: true,
      loading: false
    }
  },
  computed: {
    groupedMessages() {
      return this.groupMessagesByTime();
    }
  },
  onLoad(options) {
    this.targetUserId = options.targetUserId;
    this.targetUserName = decodeURIComponent(options.targetUserName || '用户');
    this.loadMessages(true);
  },
  onShow() {
    console.log('聊天页面显示，刷新消息');
    this.loadMessages(true);
  },
  methods: {
    async loadMessages(reset = false) {
      if (this.loading && !reset) return;
      
      this.loading = true;
      
      if (reset) {
        this.page = 1;
        this.messages = [];
        this.hasMore = true;
      }
      
      if (!this.hasMore && !reset) {
        this.loading = false;
        return;
      }
      
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        
        console.log('开始加载聊天消息，参数：', {
          userId,
          targetUserId: this.targetUserId,
          page: this.page,
          pageSize: this.pageSize
        });
        
        const res = await uniCloud.callFunction({
          name: 'getChatMessages',
          data: {
            userId: userId,
            targetUserId: this.targetUserId,
            page: this.page,
            pageSize: this.pageSize
          }
        });
        
        console.log('获取聊天消息结果：', JSON.stringify(res.result));
        
        if (res.result && res.result.code === 0) {
          const data = res.result.data || {};
          const list = data.list || [];
          const hasMore = !!data.hasMore;
          
          console.log('获取到的聊天消息列表：', list.length, '条消息');
          
          if (list && list.length > 0) {
            this.$nextTick(() => {
              if (reset) {
                this.messages = list;
              } else {
                // 确保消息顺序正确（旧消息在上，新消息在下）
                this.messages = [...list, ...this.messages];
              }
              console.log('更新后的聊天消息列表：', this.messages.length, '条消息');
              
              // 强制刷新视图
              this.$forceUpdate();
              
              // 重置滚动位置
              if (reset) {
                setTimeout(() => {
                  this.scrollToBottom();
                }, 300);
              }
            });
          } else if (reset) {
            // 如果是重置且没有消息，确保消息列表为空
            this.messages = [];
          }
          
          this.hasMore = hasMore;
          
          if (hasMore && list.length > 0) {
            this.page++;
          }
        } else {
          throw new Error((res.result && res.result.msg) || '获取消息失败');
        }
      } catch (error) {
        console.error('获取消息失败:', error);
        uni.showToast({
          title: error.message || '获取消息失败',
          icon: 'none'
        });
      } finally {
        setTimeout(() => {
          this.loading = false;
          this.refreshing = false;
        }, 300);
      }
    },
    
    async sendMessage() {
      if (!this.inputContent.trim()) return;
      
      const content = this.inputContent.trim();
      this.inputContent = '';
      
      try {
        // 1. 内容审核
        const auditRes = await uniCloud.callFunction({
          name: 'contentAudit',
          data: {
            content: content,
            type: 'message'
          }
        });
        
        if (!auditRes.result.data.pass) {
          throw new Error('内容审核未通过：' + auditRes.result.data.reasons.join('、'));
        }
        
        // 2. 发送消息
        const userId = uni.getStorageSync('userId');
        const res = await uniCloud.callFunction({
          name: 'sendMessage',
          data: {
            userId: userId,
            targetUserId: this.targetUserId,
            content: content,
            sendTime: Date.now()
          }
        });
        
        if (res.result.code === 0) {
          // 发送成功后刷新消息列表
          this.loadMessages(true);
        } else {
          throw new Error(res.result.msg);
        }
      } catch (error) {
        uni.showToast({
          title: error.message || '发送失败',
          icon: 'none'
        });
      }
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return hours + ':' + minutes;
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        // 简化滚动方法，避免使用复杂的查询
        try {
          const query = uni.createSelectorQuery().in(this);
          query.select('.message-container').boundingClientRect(data => {
            if (data && data.height) {
              console.log('滚动容器高度:', data.height);
              this.scrollTop = data.height + 1000; // 添加足够大的值确保滚动到底部
            }
          }).exec();
        } catch (e) {
          console.error('滚动计算错误:', e);
          // 如果查询失败，使用一个较大的值直接滚动
          this.scrollTop = 10000;
        }
      });
    },
    
    loadMore() {
      if (this.hasMore) {
        this.page++;
        this.loadMessages();
      }
    },
    
    async onRefresh() {
      this.refreshing = true;
      await this.loadMessages(true);
    },
    
    goBack() {
      uni.navigateBack();
    },
    
    // 处理头像加载错误
    handleAvatarError(e, item) {
      // 直接给消息对象修改头像属性
      if (item && item.userInfo) {
        item.userInfo.avatar = '/static/images/avatar/default.png';
      }
    },
    
    // 显示消息操作菜单
    showMessageActions(message) {
      const userId = uni.getStorageSync('userId');
      if (!userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      const actions = [];
      
      // 如果是自己的消息，显示删除选项
      if (message.isSelf) {
        actions.push('删除');
      } else {
        // 如果是他人的消息，显示举报选项
        actions.push('举报');
      }
      
      if (actions.length === 0) return;
      
      uni.showActionSheet({
        itemList: actions,
        success: async (res) => {
          if (message.isSelf && res.tapIndex === 0) {
            // 删除消息
            await this.deleteMessage(message._id);
          } else if (!message.isSelf && res.tapIndex === 0) {
            // 举报消息
            this.handleReport(message);
          }
        }
      });
    },
    
    // 删除消息
    async deleteMessage(messageId) {
      try {
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          throw new Error('请先登录');
        }
        
        const res = await uniCloud.callFunction({
          name: 'deleteMessage',
          data: {
            messageId,
            userId
          }
        });
        
        if (res.result.code === 0) {
          // 删除成功后从本地消息列表中移除
          this.messages = this.messages.filter(msg => msg._id !== messageId);
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          });
        } else {
          throw new Error(res.result.msg);
        }
      } catch (error) {
        uni.showToast({
          title: error.message || '删除失败',
          icon: 'none'
        });
      }
    },
    
    // 处理举报
    async handleReport(message) {
      if (!this.checkAuth()) return;
      
      uni.showActionSheet({
        itemList: ['垃圾广告', '不当内容', '欺诈信息', '违规内容', '违法信息'],
        success: async (res) => {
          const reportTypes = ['SPAM', 'INAPPROPRIATE', 'FRAUD', 'VIOLATION', 'ILLEGAL'];
          try {
            const result = await uniCloud.callFunction({
              name: 'reportHandler',
              data: {
                action: 'submit',
                targetId: message._id,
                type: reportTypes[res.tapIndex],
                reason: '',
                reporterId: uni.getStorageSync('userId'),
                contentType: 'message'
              }
            });
            
            if (result.result.code === 0) {
              uni.showToast({
                title: '举报成功',
                icon: 'success'
              });
            } else {
              throw new Error(result.result.msg);
            }
          } catch (error) {
            uni.showToast({
              title: error.message || '举报失败',
              icon: 'none'
            });
          }
        }
      });
    },
    
    checkAuth() {
      // 实现检查用户权限的逻辑
      return true; // 临时返回，实际实现需要根据实际情况判断
    },
    
    // 格式化日期，返回更详细的时间信息
    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const now = new Date();
      const isToday = now.toDateString() === date.toDateString();
      
      if (isToday) {
        return '今天 ' + this.formatTime(timestamp);
      }
      
      // 昨天
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      if (yesterday.toDateString() === date.toDateString()) {
        return '昨天 ' + this.formatTime(timestamp);
      }
      
      // 一周内
      const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      if (now - date < 7 * 24 * 60 * 60 * 1000) {
        return weekDays[date.getDay()] + ' ' + this.formatTime(timestamp);
      }
      
      // 其他日期
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${this.formatTime(timestamp)}`;
    },
    
    // 将消息按时间分组
    groupMessagesByTime() {
      const grouped = [];
      let currentDate = '';
      let currentGroup = null;
      
      this.messages.forEach(message => {
        const messageDate = this.getMessageDateHeader(message.sendTime);
        
        if (messageDate !== currentDate) {
          currentDate = messageDate;
          currentGroup = {
            date: messageDate,
            messages: []
          };
          grouped.push(currentGroup);
        }
        
        currentGroup.messages.push(message);
      });
      
      return grouped;
    },
    
    // 获取消息日期头部
    getMessageDateHeader(timestamp) {
      if (!timestamp) return '未知时间';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (24 * 60 * 60 * 1000));
      
      if (diffDays === 0) {
        return '今天 ' + this.formatTime(timestamp);
      } else if (diffDays === 1) {
        return '昨天 ' + this.formatTime(timestamp);
      } else if (diffDays < 7) {
        const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return weekDays[date.getDay()] + ' ' + this.formatTime(timestamp);
      } else {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${this.formatTime(timestamp)}`;
      }
    }
  }
}
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  position: relative;
  height: 88rpx;
  box-sizing: border-box;
}

.nav-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  pointer-events: none; /* 防止标题文本干扰返回按钮的点击 */
}

.message-list {
  flex: 1;
  padding: 20rpx;
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 170rpx); /* 添加明确的高度 */
}

.message-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.message-item {
  display: flex;
  margin-bottom: 20rpx;
  align-items: flex-start;
  position: relative;
}

.message-item.self {
  flex-direction: row-reverse;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin: 0 20rpx;
}

.message-content {
  max-width: 60%;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 10rpx;
  position: relative;
}

.self .message-content {
  background-color: #007AFF;
}

.message-text {
  font-size: 28rpx;
  line-height: 1.4;
  word-break: break-all;
}

.self .message-text {
  color: #fff;
}

.send-time {
  display: none;
}

.self .send-time {
  color: rgba(255, 255, 255, 0.8);
}

.input-area {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.input-area input {
  flex: 1;
  height: 72rpx;
  background-color: #f5f5f5;
  border-radius: 36rpx;
  padding: 0 30rpx;
  margin-right: 20rpx;
  font-size: 28rpx;
}

.send-btn {
  width: 120rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  background-color: #007AFF;
  color: #fff;
  border-radius: 36rpx;
  font-size: 28rpx;
}

.send-btn[disabled] {
  background-color: #ccc;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh; /* 增加空状态高度 */
  padding: 40rpx;
  color: #999;
  font-size: 28rpx;
}

.empty-state text {
  background-color: rgba(0, 0, 0, 0.03);
  padding: 20rpx 40rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.nickname {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 4rpx;
}

.message-item.self .nickname {
  display: none;
}

.message-item.self .message-content {
  padding-right: 40rpx;
}

.message-item .report-btn,
.report-icon {
  display: none;
}

/* 添加或修改时间分隔符样式 */
.time-divider {
  text-align: center;
  margin: 20rpx 0;
  position: relative;
}

.time-divider text {
  display: inline-block;
  padding: 6rpx 16rpx;
  font-size: 24rpx;
  color: #999;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10rpx;
}
</style> 