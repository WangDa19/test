'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const $ = db.command.aggregate;

exports.main = async (event, context) => {
  const { userId, page = 1, pageSize = 20 } = event;
  
  if (!userId) {
    return {
      code: 1,
      msg: '用户ID不能为空'
    };
  }
  
  const skipCount = (page - 1) * pageSize;
  
  try {
    // 获取所有与当前用户相关的聊天
    const messagesResult = await db.collection('chat_messages')
      .aggregate()
      .match({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      })
      .sort({ sendTime: -1 }) // 按发送时间倒序排列
      .group({
        // 分组规则：如果是发送的消息，对方是接收者；如果是接收的消息，对方是发送者
        _id: {
          $cond: {
            if: { $eq: ['$senderId', userId] },
            then: '$receiverId',
            else: '$senderId'
          }
        },
        lastMessage: { $first: '$content' },
        lastMessageTime: { $first: '$sendTime' },
        messages: { $push: '$$ROOT' }
      })
      .skip(skipCount)
      .limit(pageSize)
      .end();
    
    const chatList = messagesResult.data || [];
    
    // 如果没有聊天记录，直接返回空列表
    if (chatList.length === 0) {
      return {
        code: 0,
        data: {
          list: [],
          hasMore: false
        }
      };
    }
    
    // 获取所有对话用户的ID
    const targetUserIds = chatList.map(item => item._id);
    
    // 查询这些用户的基本信息
    const usersResult = await db.collection('user')
      .where({
        _id: dbCmd.in(targetUserIds)
      })
      .field({
        _id: 1,
        nickname: 1,
        avatar: 1
      })
      .get();
    
    const users = usersResult.data || [];
    const userMap = {};
    users.forEach(user => {
      userMap[user._id] = user;
    });
    
    // 查询每个对话的未读消息数
    const unreadMessages = await db.collection('chat_messages')
      .where({
        receiverId: userId,
        read: false
      })
      .field({
        senderId: 1
      })
      .get();
    
    // 计算每个发送者的未读消息数
    const unreadCounts = {};
    (unreadMessages.data || []).forEach(msg => {
      if (!unreadCounts[msg.senderId]) {
        unreadCounts[msg.senderId] = 0;
      }
      unreadCounts[msg.senderId]++;
    });
    
    // 组装返回数据
    const formattedList = chatList.map(chat => {
      const targetUser = userMap[chat._id] || {};
      
      return {
        _id: chat._id, // 实际上是对方的用户ID
        targetUserId: chat._id,
        targetUserNickname: targetUser.nickname || '用户',
        targetUserAvatar: targetUser.avatar || '',
        lastMessage: chat.lastMessage || '',
        lastMessageTime: chat.lastMessageTime || 0,
        unreadCount: unreadCounts[chat._id] || 0
      };
    });
    
    // 按最后消息时间排序
    formattedList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    
    return {
      code: 0,
      data: {
        list: formattedList,
        hasMore: formattedList.length === pageSize
      }
    };
  } catch (error) {
    console.error('获取聊天列表失败:', error);
    return {
      code: 1,
      msg: '获取聊天列表失败',
      error: error.message
    };
  }
}; 