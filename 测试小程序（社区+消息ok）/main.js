import App from './App'
import PublishButton from './components/publish-button/publish-button.vue'
import CommonTabBar from './components/common-tab-bar.vue'
import TabBar from './components/tab-bar/tab-bar.vue'
import UploadImage from './components/upload-image/upload-image.vue'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.component('publish-button', PublishButton)
Vue.component('common-tab-bar', CommonTabBar)
Vue.component('tab-bar', TabBar)
Vue.component('upload-image', UploadImage)

// 添加全局样式控制
Vue.mixin({
	data() {
		return {
			safeAreaBottom: 0
		}
	},
	onLoad() {
		// 获取安全区域信息
		const systemInfo = uni.getSystemInfoSync()
		this.safeAreaBottom = systemInfo.safeArea ? (systemInfo.screenHeight - systemInfo.safeArea.bottom) : 0
	}
})

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif