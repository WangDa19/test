<template>
  <view class="webview-container">
    <web-view 
      :src="url" 
      @message="handleMessage"
      @onPostMessage="handlePostMessage"
      @load="handlePageLoad"
      @error="handlePageError">
    </web-view>
    <canvas canvas-id="screenCanvas" class="hidden-canvas"></canvas>
    
    <!-- 修改原有的fixed-controls -->
    <view class="fixed-controls">
      <button class="capture-btn" @tap="captureAndRecognize">截图识别</button>
      <button class="manual-btn" @tap="getSchoolInfoManually">手动输入</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      title: '网页',
      captureTimer: null,
      processCount: 0,
      maxCaptures: 5,
      captureInterval: 8000,
      lastCaptureTime: 0,
      hasRecognized: false,
      manualInputShown: false,
      loading: true
    }
  },
  onLoad(options) {
    if (options.url) {
      this.url = decodeURIComponent(options.url);
      uni.showLoading({
        title: '正在加载...'
      });
    }
    if (options.title) {
      this.title = decodeURIComponent(options.title);
      uni.setNavigationBarTitle({
        title: this.title
      });
    }
    
    // 添加自动识别（3秒后执行）
    setTimeout(() => {
      this.captureAndRecognizeDOM();
    }, 3000);
  },
  onUnload() {
    if (this.captureTimer) {
      clearTimeout(this.captureTimer);
      this.captureTimer = null;
    }
  },
  onShow() {
    this.$nextTick(() => {
      const controls = document.querySelector('.fixed-controls');
      if (controls) {
        controls.style.display = 'flex';
      }
    });
  },
  methods: {
    handleMessage(event) {
      console.log('收到页面消息:', event.detail);
      
      const message = event.detail.data;
      if (message && message.type === 'school_detected' && message.schoolName) {
        this.stopAutoCapture();
        
        uni.showModal({
          title: '检测到学校信息',
          content: `您的学校是：${message.schoolName}，确认保存？`,
          confirmText: '确认',
          cancelText: '手动输入',
          success: (res) => {
            if (res.confirm) {
              this.saveEducationInfo({
                schoolName: message.schoolName
              });
            } else {
              this.getSchoolInfoManually();
            }
          }
        });
      }
    },
    captureAndRecognize() {
      if (this.hasRecognized) return;
      
      uni.showLoading({
        title: '正在识别...'
      });
      
      const quickScript = `
        (function() {
          if (document.body.innerText.includes('沈阳航空航天大学')) {
            return '沈阳航空航天大学';
          }
          return '';
        })();
      `;
      
      const detailedScript = `
        (function() {
          if (document.body.innerText.includes('沈阳航空航天大学')) {
            return '沈阳航空航天大学';
          }
          
          const schoolTexts = [];
          
          const tables = document.querySelectorAll('table');
          for (const table of tables) {
            const rows = table.querySelectorAll('tr');
            for (const row of rows) {
              const text = row.innerText || '';
              if (text.includes('院校名称') || text.includes('学校名称')) {
                schoolTexts.push(text);
              }
            }
          }
          
          const elements = document.querySelectorAll('.info-item, .cell, .item-row, div, p');
          for (const el of elements) {
            const text = el.innerText || '';
            if (text.includes('院校名称') || text.includes('学校名称') || 
                text.includes('院校') || text.includes('大学') || 
                text.includes('学院')) {
              schoolTexts.push(text);
            }
          }
          
          for (const text of schoolTexts) {
            const match1 = text.match(/(院校名称|学校名称)[：:]+\\s*([^\\s][^\\r\\n]+)/);
            if (match1 && match1[2]) {
              return match1[2].trim();
            }
            
            const match2 = text.match(/([\\u4e00-\\u9fa5]{2,}(大学|学院))/);
            if (match2 && match2[1]) {
              return match2[1].trim();
            }
          }
          
          return '';
        })();
      `;
      
      if (typeof plus !== 'undefined' && plus.webview) {
        const currentWebview = plus.webview.currentWebview();
        if (currentWebview && currentWebview.children && currentWebview.children().length > 0) {
          currentWebview.children()[0].evalJS(quickScript, (quickResult) => {
            if (quickResult) {
              uni.hideLoading();
              this.confirmSchool(quickResult);
              this.hasRecognized = true;
            } else {
              currentWebview.children()[0].evalJS(detailedScript, (result) => {
                uni.hideLoading();
                
                if (result) {
                  console.log('识别到学校:', result);
                  this.confirmSchool(result);
                  this.hasRecognized = true;
                } else {
                  console.log('未识别到学校信息');
                  this.getSchoolInfoManually();
                }
              });
            }
          });
        } else {
          uni.hideLoading();
          this.getSchoolInfoManually();
        }
      } else {
        uni.hideLoading();
        this.getSchoolInfoManually();
      }
    },
    confirmSchool(schoolName) {
      this.saveEducationInfo({
        schoolName: schoolName
      });
      
      uni.showToast({
        title: `已识别到${schoolName}`,
        icon: 'success'
      });
      
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    },
    getSchoolInfoManually() {
      if (this.manualInputShown) return;
      
      this.manualInputShown = true;
      uni.showModal({
        title: '请输入学校信息',
        editable: true,
        placeholderText: '例如: 沈阳航空航天大学',
        success: (res) => {
          this.manualInputShown = false;
          if (res.confirm && res.content) {
            this.saveEducationInfo({
              schoolName: res.content.trim()
            });
          }
        }
      });
    },
    saveEducationInfo(educationInfo) {
      try {
        const selectedSchool = uni.getStorageSync('selectedSchool') || {};
        const mergedInfo = {
          ...selectedSchool,
          ...educationInfo,
          verified: true
        };
        
        const userId = uni.getStorageSync('userId');
        if (!userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        
        uniCloud.callFunction({
          name: 'user',
          data: {
            action: 'updateUserInfo',
            data: {
              userId,
              educationInfo: mergedInfo
            }
          }
        }).then(res => {
          if (res.result.code === 0) {
            uni.showToast({
              title: '学籍验证成功',
              icon: 'success'
            });
            
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          } else {
            uni.showToast({
              title: res.result.message,
              icon: 'none'
            });
          }
        }).catch(err => {
          console.error('保存失败', err);
          uni.showToast({
            title: '验证失败，请重试',
            icon: 'none'
          });
        });
      } catch (e) {
        console.error('保存教育信息错误', e);
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        });
      }
    },
    stopAutoCapture() {
      if (this.captureTimer) {
        clearInterval(this.captureTimer);
        this.captureTimer = null;
      }
    },
    getCurrentWebview() {
      let currentWebview = null;
      
      if (typeof plus !== 'undefined' && plus.webview) {
        currentWebview = plus.webview.currentWebview();
      }
      
      return currentWebview;
    },
    captureScreen() {
      return new Promise((resolve, reject) => {
        if (typeof plus !== 'undefined' && plus.webview) {
          const currentWebview = plus.webview.currentWebview();
          if (currentWebview && currentWebview.children && currentWebview.children().length > 0) {
            currentWebview.children()[0].evalJS(`
              (function() {
                const bitmap = new plus.nativeObj.Bitmap('screen');
                bitmap.loadBase64Data((data) => {
                  resolve(data);
                  bitmap.clear();
                }, (error) => {
                  reject(error);
                  bitmap.clear();
                });
              })();
            `);
          }
        }
      });
    },
    getSchoolInfoFromWebview() {
      const script = `
        (function() {
          const textElements = Array.from(document.querySelectorAll('*')).filter(el => 
            el.innerText && 
            el.innerText.trim() && 
            !['SCRIPT', 'STYLE'].includes(el.tagName)
          );
          
          const syauElements = textElements.filter(el => 
            el.innerText.includes('沈阳航空航天大学')
          );
          
          if (syauElements.length > 0) {
            return '沈阳航空航天大学';
          }
          
          for (const el of textElements) {
            if (el.innerText.includes('院校名称') || el.innerText.includes('学校名称')) {
              const text = el.innerText;
              const matches = text.match(/(院校名称|学校名称)[：:]*\\s*([^\\r\\n]+)/);
              if (matches && matches[2]) {
                return matches[2].trim();
              }
            }
          }
          
          for (const el of textElements) {
            const matches = el.innerText.match(/([\\u4e00-\\u9fa5]+大学)/);
            if (matches && matches[1]) {
              return matches[1];
            }
          }
          
          return null;
        })();
      `;
      
      if (typeof plus !== 'undefined' && plus.webview) {
        const currentWebview = plus.webview.currentWebview();
        if (currentWebview && currentWebview.children && currentWebview.children().length > 0) {
          currentWebview.children()[0].evalJS(script, result => {
            if (result) {
              this.confirmSchool(result);
            } else {
              this.getSchoolInfoManually();
            }
          });
        }
      }
    },
    debugHtml() {
      if (typeof plus !== 'undefined' && plus.webview) {
        const currentWebview = plus.webview.currentWebview();
        if (currentWebview && currentWebview.children && currentWebview.children().length > 0) {
          currentWebview.children()[0].evalJS(`
            (function() {
              return document.documentElement.outerHTML;
            })();
          `, (html) => {
            console.log('页面HTML前1000个字符:', html.substring(0, 1000));
          });
        }
      }
    },
    captureAndRecognizeDOM() {
      uni.showLoading({
        title: '正在识别学校...'
      });
      
      try {
        const script = `
          (function() {
            if (document.documentElement.innerHTML.includes('沈阳航空航天大学')) {
              return '沈阳航空航天大学';
            }
            
            let schoolName = null;
            
            const tableRows = document.querySelectorAll('tr, .info-row, .item-row');
            for (const row of tableRows) {
              const text = row.innerText || '';
              if (text.includes('院校名称') || text.includes('学校名称') || text.includes('院校')) {
                const schoolMatch = text.match(/(院校名称|学校名称|院校)[：:\\s]*([^\\r\\n\\t]+)/);
                if (schoolMatch && schoolMatch[2]) {
                  return schoolMatch[2].trim();
                }
              }
            }
            
            const infoItems = document.querySelectorAll('.info-item, .cell');
            for (const item of infoItems) {
              const text = item.innerText || '';
              if (text.includes('院校名称') || text.includes('学校名称')) {
                const schoolMatch = text.match(/(院校名称|学校名称)[：:\\s]*([^\\r\\n\\t]+)/);
                if (schoolMatch && schoolMatch[2]) {
                  return schoolMatch[2].trim();
                }
              }
            }
            
            const allElements = document.querySelectorAll('*');
            for (let i = 0; i < allElements.length; i++) {
              const text = allElements[i].innerText || '';
              if (text) {
                const uniMatch = text.match(/([\\u4e00-\\u9fa5]{2,}(大学|学院))/);
                if (uniMatch && uniMatch[1]) {
                  return uniMatch[1];
                }
              }
            }
            
            return null;
          })();
        `;
        
        if (typeof plus !== 'undefined' && plus.webview) {
          const currentWebview = plus.webview.currentWebview();
          if (currentWebview && currentWebview.children && currentWebview.children().length > 0) {
            currentWebview.children()[0].evalJS(script, result => {
              uni.hideLoading();
              
              if (result) {
                console.log('DOM识别到学校:', result);
                this.confirmSchool(result);
              } else {
                console.log('DOM未识别到学校信息');
                this.getSchoolInfoManually();
              }
            });
          } else {
            uni.hideLoading();
            this.getSchoolInfoManually();
          }
        } else {
          uni.hideLoading();
          this.getSchoolInfoManually();
        }
      } catch (error) {
        uni.hideLoading();
        console.error('DOM识别错误:', error);
        this.getSchoolInfoManually();
      }
    },
    handlePageLoad() {
      this.loading = false;
      uni.hideLoading();
    },
    handlePageError() {
      uni.showToast({
        title: '页面加载失败',
        icon: 'none'
      });
      this.loading = false;
    },
    // 新增截图识别方法
    async captureAndRecognize() {
      try {
        uni.showLoading({ title: '正在识别...' });
        
        // 1. 调用截屏API
        const captureRes = await new Promise((resolve, reject) => {
          uni.createScreenCapture({
            success: resolve,
            fail: reject
          });
        });

        // 2. 将截图转为base64
        const base64 = await new Promise((resolve, reject) => {
          uni.getFileSystemManager().readFile({
            filePath: captureRes.tempFilePath,
            encoding: 'base64',
            success: (res) => resolve(res.data),
            fail: reject
          });
        });

        // 3. 调用百度OCR API
        const ocrResult = await uniCloud.callFunction({
          name: 'baiduOCR',
          data: {
            image: base64,
            type: 'general_basic' // 使用通用文字识别
          }
        });

        // 4. 解析OCR结果
        const schoolInfo = this.parseOCRResult(ocrResult.result);
        
        if (schoolInfo) {
          // 显示识别结果确认框
          uni.showModal({
            title: '识别结果',
            content: `识别到的学校：${schoolInfo.schoolName}\n专业：${schoolInfo.major || '未识别'}\n学历层次：${schoolInfo.degree || '未识别'}`,
            confirmText: '确认',
            cancelText: '重新识别',
            success: (res) => {
              if (res.confirm) {
                this.saveEducationInfo(schoolInfo);
              }
            }
          });
        } else {
          uni.showToast({
            title: '未识别到学校信息',
            icon: 'none'
          });
        }

      } catch (error) {
        console.error('识别失败:', error);
        uni.showToast({
          title: '识别失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 解析OCR结果
    parseOCRResult(result) {
      try {
        const words = result.words_result || [];
        let schoolInfo = {
          schoolName: '',
          major: '',
          degree: ''
        };

        for (const item of words) {
          const text = item.words;
          
          // 匹配学校名称
          if (text.includes('学校名称') || text.includes('院校名称')) {
            const match = text.match(/[：:]\s*(.+)/);
            if (match) {
              schoolInfo.schoolName = match[1].trim();
            }
          }
          // 匹配专业
          else if (text.includes('专业')) {
            const match = text.match(/专业[：:]\s*(.+)/);
            if (match) {
              schoolInfo.major = match[1].trim();
            }
          }
          // 匹配学历层次
          else if (text.includes('学历层次') || text.includes('学历')) {
            const match = text.match(/[：:]\s*(.+)/);
            if (match) {
              schoolInfo.degree = match[1].trim();
            }
          }
          // 直接匹配大学名称
          else if (text.includes('大学') || text.includes('学院')) {
            schoolInfo.schoolName = text.trim();
          }
        }

        return schoolInfo.schoolName ? schoolInfo : null;
      } catch (error) {
        console.error('解析OCR结果失败:', error);
        return null;
      }
    }
  }
}
</script>

<style>
.webview-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.hidden-canvas {
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 100px;
  height: 100px;
}

.fixed-controls {
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.capture-btn {
  background: #007AFF;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  min-width: 120px;
  text-align: center;
}

.manual-btn {
  background: #f0f0f0;
  color: #333;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  min-width: 120px;
  text-align: center;
}
</style> 