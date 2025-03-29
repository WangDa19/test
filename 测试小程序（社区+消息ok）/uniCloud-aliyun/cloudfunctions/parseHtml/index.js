'use strict';
const cheerio = require('cheerio');

exports.main = async (event, context) => {
  const { html } = event;
  
  if (!html) {
    return {
      code: 400,
      message: '缺少HTML内容'
    };
  }
  
  try {
    const $ = cheerio.load(html);
    let schoolName = null;
    
    // 方法1：查找包含特定文本的元素
    $('*').each((i, el) => {
      const text = $(el).text();
      if (text.includes('沈阳航空航天大学')) {
        schoolName = '沈阳航空航天大学';
        return false; // 终止循环
      }
    });
    
    if (schoolName) {
      return {
        code: 0,
        message: '解析成功',
        data: {
          schoolName: schoolName
        }
      };
    }
    
    // 方法2：查找院校名称相关文本
    $('*').each((i, el) => {
      const text = $(el).text();
      if (text.includes('院校名称') || text.includes('学校名称')) {
        const matches = text.match(/(院校名称|学校名称)[：:]*\s*([^\r\n]+)/);
        if (matches && matches[2]) {
          schoolName = matches[2].trim();
          return false; // 终止循环
        }
      }
    });
    
    if (schoolName) {
      return {
        code: 0,
        message: '解析成功',
        data: {
          schoolName: schoolName
        }
      };
    }
    
    // 方法3：查找任何包含"大学"或"学院"的文本
    $('*').each((i, el) => {
      const text = $(el).text();
      const uniMatch = text.match(/([^\s]+大学)/);
      if (uniMatch) {
        schoolName = uniMatch[1];
        return false;
      }
      
      const collegeMatch = text.match(/([^\s]+学院)/);
      if (collegeMatch) {
        schoolName = collegeMatch[1];
        return false;
      }
    });
    
    if (schoolName) {
      return {
        code: 0,
        message: '解析成功',
        data: {
          schoolName: schoolName
        }
      };
    }
    
    return {
      code: 404,
      message: '未找到学校信息'
    };
  } catch (error) {
    console.error('HTML解析错误:', error);
    return {
      code: 500,
      message: '解析失败: ' + error.message
    };
  }
}; 