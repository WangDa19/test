'use strict';

// 一个非常简单的获取学校名称的云函数
exports.main = async (event, context) => {
  const { name } = event;
  
  // 如果直接提供了学校名称
  if (name) {
    return {
      code: 0,
      message: '获取成功',
      data: {
        schoolName: name
      }
    };
  }
  
  // 如果没有提供，返回错误
  return {
    code: 400,
    message: '请提供学校名称'
  };
}; 