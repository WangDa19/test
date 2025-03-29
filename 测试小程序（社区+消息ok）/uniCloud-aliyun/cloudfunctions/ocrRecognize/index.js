'use strict';
// 直接引用本地SDK
const AipOcrClient = require('./baidu-aip/ocr');

// 百度OCR API 配置
const BAIDU_OCR_CONFIG = {
  appId: '117821417',
  apiKey: 'JFkqdJGfewUVjuLJSivoh1xH',
  secretKey: 'TFlsjEaLCulnmcgNfCpFoU5H4kVOFdLq'
};

// 获取百度OCR token
async function getAccessToken() {
  try {
    console.log('开始获取百度OCR access_token...');
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token`;
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'client_credentials',
        client_id: BAIDU_OCR_CONFIG.apiKey,
        client_secret: BAIDU_OCR_CONFIG.secretKey
      }
    });
    
    console.log('百度API响应:', JSON.stringify(response.data));
    
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    }
    throw new Error('获取百度OCR token失败');
  } catch (error) {
    console.error('获取token错误:', error.message);
    throw error;
  }
}

exports.main = async (event, context) => {
  console.log('OCR云函数开始执行...');
  const { imageBase64 } = event;
  
  if (!imageBase64) {
    return {
      code: 400,
      message: '缺少图片数据'
    };
  }
  
  try {
    // 获取access_token
    const accessToken = await getAccessToken();
    
    // 调用通用文字识别接口
    const ocrUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic`;
    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    
    // 使用URLSearchParams格式化表单数据
    const params = new URLSearchParams();
    params.append('image', imageData);
    
    const response = await axios.post(`${ocrUrl}?access_token=${accessToken}`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('OCR识别结果:', JSON.stringify(response.data));
    
    // 处理识别结果
    if (response.data && response.data.words_result) {
      const textContent = response.data.words_result.map(item => item.words).join('\n');
      console.log('OCR识别内容:', textContent);
      
      // 检查是否包含"沈阳航空航天大学"
      if (textContent.includes('沈阳航空航天大学')) {
        return {
          code: 0,
          message: '识别成功',
          data: {
            schoolName: '沈阳航空航天大学',
            fullText: textContent
          }
        };
      }
      
      // 返回结果
      return {
        code: 404,
        message: '未识别到学校信息',
        data: {
          fullText: textContent
        }
      };
    }
    
    return {
      code: 500,
      message: '识别失败',
      data: response.data
    };
  } catch (error) {
    console.error('OCR识别失败:', error);
    return {
      code: 500,
      message: '识别服务异常: ' + error.message
    };
  }
}; 