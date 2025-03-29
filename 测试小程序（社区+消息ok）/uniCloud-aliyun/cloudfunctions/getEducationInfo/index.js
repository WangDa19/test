'use strict';

exports.main = async (event, context) => {
  const { token } = event;
  
  // 检查token是否存在
  if (!token) {
    return {
      code: 400,
      message: '缺少验证令牌'
    };
  }
  
  try {
    // 这里应该是您的实际业务逻辑
    // 1. 用token从学信网接口获取数据
    // 2. 解析数据并返回
    
    // 由于无法直接从学信网获取数据，这里使用模拟数据演示
    // 在实际项目中，您需要根据自己的业务情况实现接口调用
    
    // 模拟等待网络请求
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟从学信网获取的数据
    const mockEducationInfo = {
      schoolName: '沈阳航空航天大学',
      major: '计算机科学与技术',
      degree: '本科',
      studentId: '2018XXXXXXXX',
      verified: true
    };
    
    return {
      code: 0,
      message: '获取学籍信息成功',
      data: mockEducationInfo
    };
  } catch (error) {
    console.error('获取学籍信息出错', error);
    return {
      code: 500,
      message: '服务器错误：' + error.message
    };
  }
}; 