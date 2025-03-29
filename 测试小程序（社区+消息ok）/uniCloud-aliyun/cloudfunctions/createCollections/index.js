'use strict';
exports.main = async (event, context) => {
  const { collections = [] } = event;
  const db = uniCloud.database();
  
  const results = {};
  
  try {
    // 获取所有集合
    const existingCollections = await db.listCollections().toArray();
    const collectionNames = existingCollections.map(col => col.name);
    
    // 确保每个请求的集合都存在
    for (const collection of collections) {
      try {
        if (!collectionNames.includes(collection)) {
          await db.createCollection(collection);
          results[collection] = '创建成功';
        } else {
          results[collection] = '已存在';
        }
      } catch (error) {
        results[collection] = `创建失败: ${error.message}`;
      }
    }
    
    return {
      code: 0,
      msg: '初始化集合完成',
      data: results
    };
  } catch (error) {
    console.error('初始化集合操作失败:', error);
    return {
      code: 1,
      msg: '初始化集合操作失败: ' + error.message
    };
  }
}; 