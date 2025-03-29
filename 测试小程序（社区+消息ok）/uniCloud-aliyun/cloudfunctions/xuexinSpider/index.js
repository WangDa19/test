'use strict';
const axios = require('axios');

// 云函数入口函数
exports.main = async (event, context) => {
  const { cookies } = event;
  
  if (!cookies) {
    return {
      code: 400,
      message: '缺少cookies参数'
    };
  }
  
  try {
    // 获取学籍信息页面
    const response = await axios({
      method: 'get',
      url: 'https://my.chsi.com.cn/archive/gdjy/xj/show.action',
      headers: {
        'Cookie': cookies,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      }
    });
    
    // 将响应保存下来，用于调试
    console.log('学信网响应内容长度:', response.data.length);
    
    // 使用正则表达式提取学校名称
    const htmlData = response.data;
    let schoolName = null;
    
    // 尝试多种正则模式匹配学校名称
    const patterns = [
      /院校名称[：:]\s*([^<>\r\n]+)/i,
      /院校[：:]\s*([^<>\r\n]+)/i,
      /<th[^>]*>院校名称.*?<\/th>\s*<td[^>]*>(.*?)<\/td>/is,
      /<th[^>]*>院校.*?<\/th>\s*<td[^>]*>(.*?)<\/td>/is,
      /学校[：:]\s*([^<>\r\n]+)/i,
      /大学[：:]\s*([^<>\r\n]+)/i
    ];
    
    for (const pattern of patterns) {
      const matches = htmlData.match(pattern);
      if (matches && matches[1]) {
        schoolName = matches[1].trim();
        break;
      }
    }
    
    // 如果还是没找到，尝试提取页面标题
    if (!schoolName) {
      const titleMatch = htmlData.match(/<title>(.*?)<\/title>/i);
      if (titleMatch && titleMatch[1] && titleMatch[1].includes('学信网')) {
        // 如果标题中包含用户名和学校名，尝试提取
        const parts = titleMatch[1].split('-');
        if (parts.length > 1) {
          schoolName = parts[0].trim();
        }
      }
    }
    
    // 如果所有方法都失败，尝试在整个HTML中查找已知的学校名称列表
    if (!schoolName) {
      const knownSchools = [
        '沈阳航空航天大学', '清华大学', '北京大学', '复旦大学', '上海交通大学',
        '浙江大学', '南京大学', '武汉大学', '中山大学', '哈尔滨工业大学'
      ];
      
      for (const school of knownSchools) {
        if (htmlData.includes(school)) {
          schoolName = school;
          break;
        }
      }
    }
    
    if (!schoolName) {
      // 返回页面前1000个字符，以便调试
      const previewContent = htmlData.substring(0, 1000);
      return {
        code: 404,
        message: '未找到学校信息，请确保已登录学信网',
        debug: { preview: previewContent }
      };
    }
    
    return {
      code: 0,
      message: '获取成功',
      data: {
        schoolName: schoolName
      }
    };
  } catch (error) {
    console.error('学信网爬取失败:', error);
    return {
      code: 500,
      message: '学信网信息获取失败: ' + error.message
    };
  }
}; 