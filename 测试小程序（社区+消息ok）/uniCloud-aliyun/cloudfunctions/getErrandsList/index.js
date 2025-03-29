'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database();
  const $ = db.command.aggregate;
  const { page = 1, pageSize = 10, keyword, category } = event;
  const userId = event.userId;

  try {
    // 获取用户认证学校
    const userRes = await db.collection('user').doc(event.userId).get();
    const user = userRes.data[0];
    
    if (!user?.educationInfo?.verified) {
      return { code: 1, msg: '请先完成学校认证' };
    }

    // 构建查询条件
    const query = {
      school: user.educationInfo.schoolName,
      status: 'active'  // 只显示待接单的任务
    };

    // 添加分类筛选
    if (category) {
      query.category = category;
    }

    // 添加关键词搜索
    if (keyword) {
      const keywordReg = new RegExp(keyword, 'i');
      query.$or = [
        { title: keywordReg },
        { details: keywordReg }
      ];
    }

    // 分页参数
    const skip = (page - 1) * pageSize;

    // 聚合查询
    const listRes = await db.collection('errands')
      .aggregate()
      .match(query)
      .lookup({
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'userInfo'
      })
      .project({
        _id: 1,
        title: 1,
        details: 1,
        price: '$price',
        category: 1,
        urgent: 1,
        endAddress: 1,
        endLocation: 1,
        images: 1,
        createTime: 1,
        userId: 1,
        status: 1,
        acceptUserId: 1,
        userInfo: {
          $arrayElemAt: ['$userInfo', 0]
        }
      })
      .addFields({
        userInfo: {
          nickname: {
            $ifNull: ['$userInfo.nickname', '未知用户']
          },
          avatar: {
            $ifNull: ['$userInfo.avatar', '/static/images/avatar/default.png']
          }
        }
      })
      .sort({ createTime: -1 })
      .skip(skip)
      .limit(pageSize)
      .end();

    // 获取总数
    const countRes = await db.collection('errands')
      .where(query)
      .count();

    return {
      code: 0,
      data: {
        list: listRes.data.map(item => ({
          id: item._id,
          title: item.title,
          details: item.details || '',
          price: item.price || 0,
          images: item.images || [],
          category: item.category || '其他帮助',
          urgent: item.urgent || false,
          endAddress: item.endAddress || '',
          endLocation: item.endLocation || {},
          time: formatTime(item.createTime),
          userId: item.userId,
          userName: item.userInfo.nickname,
          userAvatar: item.userInfo.avatar,
          status: item.status,
          acceptUserId: item.acceptUserId
        })),
        pagination: {
          page,
          pageSize,
          total: countRes.total,
          totalPage: Math.ceil(countRes.total / pageSize)
        }
      }
    };
  } catch (e) {
    console.error('获取跑腿任务列表失败:', e);
    return { code: 1, msg: '服务暂时不可用' };
  }
};

// 格式化时间函数
function formatTime(timestamp) {
  if (!timestamp) return '';
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) { // 1分钟内
    return '刚刚';
  } else if (diff < 3600000) { // 1小时内
    return Math.floor(diff / 60000) + '分钟前';
  } else if (diff < 86400000) { // 1天内
    return Math.floor(diff / 3600000) + '小时前';
  } else {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
} 