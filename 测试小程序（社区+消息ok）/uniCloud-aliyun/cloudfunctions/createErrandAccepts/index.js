'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database();
  
  try {
    // 检查集合是否存在
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    
    if (!collectionNames.includes('errand_accepts')) {
      // 创建集合
      await db.createCollection('errand_accepts');
      console.log('成功创建 errand_accepts 集合');
    }
    
    return {
      code: 0,
      msg: '集合检查/创建成功'
    };
  } catch (error) {
    console.error('创建集合失败:', error);
    return {
      code: 1,
      msg: '创建集合失败: ' + error.message
    };
  }
}; 