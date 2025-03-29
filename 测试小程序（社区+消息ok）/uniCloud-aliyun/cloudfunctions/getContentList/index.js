'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database();
  const $ = db.command.aggregate;
  const { collection, page = 1, pageSize = 10 } = event;

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
      status: 'active'
    };

    // 分页参数
    const skip = (page - 1) * pageSize;

    // 聚合查询
    const listRes = await db.collection(collection)
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
        content: 1,
        images: 1,
        price: 1,
        originalPrice: 1,
        userId: 1,
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
        },
        price: {
          $ifNull: ['$price', 0]
        },
        originalPrice: {
          $ifNull: ['$originalPrice', null]
        }
      })
      .sort({ createTime: -1 })
      .skip(skip)
      .limit(pageSize)
      .end();

    // 获取总数
    const countRes = await db.collection(collection)
      .where(query)
      .count();

    // 添加日志以便调试
    console.log('查询结果:', JSON.stringify(listRes.data, null, 2));

    return {
      code: 0,
      data: {
        list: listRes.data,
        pagination: {
          page,
          pageSize,
          total: countRes.total,
          totalPage: Math.ceil(countRes.total / pageSize)
        }
      }
    };
  } catch (e) {
    console.error('获取内容失败:', e);
    return { code: 1, msg: '服务暂时不可用' };
  }
}; 