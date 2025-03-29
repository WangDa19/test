(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/mine/mine"],{

/***/ 78:
/*!*******************************************************!*\
  !*** H:/测试小程序/main.js?{"page":"pages%2Fmine%2Fmine"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _mine = _interopRequireDefault(__webpack_require__(/*! ./pages/mine/mine.vue */ 79));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_mine.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 79:
/*!************************************!*\
  !*** H:/测试小程序/pages/mine/mine.vue ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mine.vue?vue&type=template&id=dcbcfe34& */ 80);
/* harmony import */ var _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mine.vue?vue&type=script&lang=js& */ 82);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mine.vue?vue&type=style&index=0&lang=css& */ 84);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/mine/mine.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 80:
/*!*******************************************************************!*\
  !*** H:/测试小程序/pages/mine/mine.vue?vue&type=template&id=dcbcfe34& ***!
  \*******************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine.vue?vue&type=template&id=dcbcfe34& */ 81);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_template_id_dcbcfe34___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 81:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/mine/mine.vue?vue&type=template&id=dcbcfe34& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = !(
    !_vm.userInfo.educationInfo || !_vm.userInfo.educationInfo.verified
  )
    ? _vm.formatDate(_vm.userInfo.educationInfo.verifyTime)
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.isLogin ? _vm.editUserInfo() : _vm.handleLogin()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 82:
/*!*************************************************************!*\
  !*** H:/测试小程序/pages/mine/mine.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine.vue?vue&type=script&lang=js& */ 83);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 83:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/mine/mine.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 28));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      userId: '',
      isLogin: false,
      userInfo: {
        _id: '',
        nickname: '',
        avatar: '',
        signature: '',
        followCount: 0,
        fansCount: 0,
        likeCount: 0
      },
      serviceMenu: [{
        name: '我的技能',
        icon: 'star',
        color: '#ff9900',
        path: '/pages/mine/skills'
      }, {
        name: '我的闲置',
        icon: 'shop',
        color: '#ff5757',
        path: '/pages/mine/idle'
      }, {
        name: '我的收藏',
        icon: 'heart',
        color: '#ff69b4',
        path: '/pages/mine/collections'
      }, {
        name: '历史记录',
        icon: 'time',
        color: '#1890ff',
        path: '/pages/mine/history'
      }],
      taskMenu: [{
        name: '发布的任务',
        icon: 'upload',
        color: '#ff5757',
        path: '/pages/mine/tasks/published',
        count: 3
      }, {
        name: '接受的任务',
        icon: 'download',
        color: '#1890ff',
        path: '/pages/mine/tasks/accepted',
        count: 2
      }, {
        name: '完成的任务',
        icon: 'checkbox',
        color: '#52c41a',
        path: '/pages/mine/tasks/completed'
      }],
      otherMenu: [{
        name: '意见反馈',
        icon: 'help',
        color: '#722ed1',
        path: '/pages/mine/feedback'
      }, {
        name: '设置',
        icon: 'gear',
        color: '#666666',
        path: '/pages/mine/settings'
      }],
      schools: ['沈阳航空航天大学', '大连理工大学', '东北大学', '辽宁大学', '大连海事大学', '东北财经大学', '沈阳药科大学', '沈阳建筑大学', '沈阳农业大学', '辽宁中医药大学', '大连工业大学', '沈阳工业大学', '辽宁师范大学', '沈阳化工大学', '大连海洋大学', '中国医科大学'],
      selectedSchool: '沈阳航空航天大学',
      isVerifying: false,
      verificationStatus: null,
      schoolLocations: {
        '沈阳航空航天大学': {
          latitude: 41.926806,
          longitude: 123.404631,
          radius: 800
        },
        '大连理工大学': {
          latitude: 38.879989,
          longitude: 121.526847,
          radius: 800
        },
        '东北大学': {
          latitude: 41.766544,
          longitude: 123.427179,
          radius: 800
        },
        '辽宁大学': {
          latitude: 41.938839,
          longitude: 123.428849,
          radius: 800
        },
        '大连海事大学': {
          latitude: 38.865799,
          longitude: 121.526897,
          radius: 800
        },
        '东北财经大学': {
          latitude: 38.866969,
          longitude: 121.527075,
          radius: 800
        },
        '沈阳药科大学': {
          latitude: 41.836879,
          longitude: 123.400139,
          radius: 800
        },
        '沈阳建筑大学': {
          latitude: 41.781649,
          longitude: 123.420929,
          radius: 800
        },
        '沈阳农业大学': {
          latitude: 41.827099,
          longitude: 123.566589,
          radius: 800
        },
        '辽宁中医药大学': {
          latitude: 41.772739,
          longitude: 123.420729,
          radius: 800
        },
        '大连工业大学': {
          latitude: 38.878199,
          longitude: 121.525697,
          radius: 800
        },
        '沈阳工业大学': {
          latitude: 41.943839,
          longitude: 123.452849,
          radius: 800
        },
        '辽宁师范大学': {
          latitude: 38.869969,
          longitude: 121.550075,
          radius: 800
        },
        '沈阳化工大学': {
          latitude: 41.677839,
          longitude: 123.428849,
          radius: 800
        },
        '大连海洋大学': {
          latitude: 38.865799,
          longitude: 121.526897,
          radius: 800
        },
        '中国医科大学': {
          latitude: 41.801839,
          longitude: 123.417849,
          radius: 800
        }
      },
      pageLoaded: false,
      checkingLoginStatus: true // 添加一个状态表示正在检查登录状态
    };
  },
  onLoad: function onLoad() {
    this.pageLoaded = true;
    // 监听用户信息更新事件
    uni.$on('userInfoUpdated', this.handleUserInfoUpdate);
    this.checkLoginStatus(true);
    this.initPage();
  },
  onShow: function onShow() {
    // 每次显示页面时都强制刷新用户信息
    if (this.pageLoaded) {
      console.log('mine页面显示，刷新用户信息');

      // 从用户ID重新获取最新数据而不是依赖本地存储
      this.forceSyncUserInfo();
    }
    this.checkLoginStatus();

    // 如果已登录，刷新用户数据
    if (this.isLogin) {
      this.refreshUserData(true);
    }
  },
  onUnload: function onUnload() {
    uni.$off('userInfoUpdated', this.handleUserInfoUpdate);
    this.pageLoaded = false;
  },
  onReady: function onReady() {
    // 页面渲染完成后执行
    this.pageLoaded = true;
  },
  created: function created() {
    // 监听登录事件
    uni.$on('loginSuccess', this.handleLoginSuccess);
    // 监听退出登录事件
    uni.$on('logoutSuccess', this.handleLogout);
  },
  beforeDestroy: function beforeDestroy() {
    // 记得在组件销毁时移除事件监听
    uni.$off('loginSuccess', this.handleLoginSuccess);
    uni.$off('logoutSuccess', this.handleLogout);
  },
  methods: {
    handleAvatar: function handleAvatar() {
      if (!this.isLogin) {
        this.goToLogin();
      }
    },
    handleEditProfile: function handleEditProfile() {
      if (this.isLogin) {
        uni.navigateTo({
          url: '/pages/mine/profile'
        });
      } else {
        this.goToLogin();
      }
    },
    goToLogin: function goToLogin() {
      var _this = this;
      uni.navigateTo({
        url: '/pages/login/index',
        events: {
          loginSuccess: function loginSuccess() {
            _this.checkLoginStatus(true);
          }
        }
      });
    },
    handleLogout: function handleLogout() {
      console.log('退出登录，清除用户数据');
      this.isLogin = false;
      this.userInfo = {};
      this.clearLoginInfo();

      // 强制刷新整个页面
      this.$forceUpdate();
    },
    checkLoginStatus: function checkLoginStatus() {
      var showLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      console.log('检查登录状态');
      this.checkingLoginStatus = true;
      if (showLoading) {
        uni.showLoading({
          title: '加载中...'
        });
      }
      try {
        var userId = uni.getStorageSync('userId');
        this.userId = userId;
        this.isLogin = !!userId;
        if (this.isLogin) {
          // 获取本地存储的用户信息
          var userInfo = uni.getStorageSync('userInfo') || {};
          // 确保数据一致性
          this.userInfo = {
            _id: userId,
            nickname: userInfo.nickname || '',
            avatar: userInfo.avatar || '',
            signature: userInfo.signature || '',
            followCount: userInfo.followCount || 0,
            fansCount: userInfo.fansCount || 0,
            likeCount: userInfo.likeCount || 0,
            educationInfo: userInfo.educationInfo || {}
          };
          console.log('当前用户信息:', JSON.stringify(this.userInfo));
        } else {
          // 未登录时重置用户信息
          this.resetUserInfo();
        }
      } catch (error) {
        console.error('检查登录状态出错:', error);
      } finally {
        this.checkingLoginStatus = false;
        if (showLoading) {
          uni.hideLoading();
        }
      }
    },
    handleLoginSuccess: function handleLoginSuccess(userInfo) {
      console.log('登录成功，更新用户信息:', userInfo);
      this.isLogin = true;
      this.userInfo = userInfo || {};

      // 强制刷新整个页面
      this.$forceUpdate();

      // 获取最新用户数据
      this.refreshUserData(true);
    },
    clearLoginInfo: function clearLoginInfo() {
      try {
        uni.removeStorageSync('userId');
        uni.removeStorageSync('userInfo');
        uni.removeStorageSync('token');
        // 可能还需要清除其他与登录相关的存储项
      } catch (error) {
        console.error('清除登录信息出错:', error);
      }
    },
    navigateTo: function navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    },
    bindSchoolChange: function bindSchoolChange(e) {
      console.log('选择的院校索引:', e.detail.value);
      var index = e.detail.value;
      this.selectedSchool = this.schools[index];
      uni.showToast({
        title: '已选择: ' + this.selectedSchool,
        icon: 'none'
      });
    },
    verifyLocation: function verifyLocation() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var location, schoolLocation, distance, verified, educationInfo, res, userInfo;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this2.isLogin) {
                  _context.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context.abrupt("return");
              case 3:
                _this2.isVerifying = true;
                _context.prev = 4;
                _context.next = 7;
                return new Promise(function (resolve, reject) {
                  uni.getLocation({
                    type: 'gcj02',
                    isHighAccuracy: true,
                    success: function success(res) {
                      console.log('定位成功:', res);
                      resolve(res);
                    },
                    fail: function fail(err) {
                      console.error('定位失败:', err);
                      reject(new Error('获取位置信息失败，请允许位置权限'));
                    }
                  });
                });
              case 7:
                location = _context.sent;
                schoolLocation = _this2.schoolLocations[_this2.selectedSchool];
                if (!(!location || !schoolLocation)) {
                  _context.next = 11;
                  break;
                }
                throw new Error('获取位置信息失败');
              case 11:
                distance = _this2.calculateDistance(location.latitude, location.longitude, schoolLocation.latitude, schoolLocation.longitude);
                verified = distance <= schoolLocation.radius;
                if (!verified) {
                  _context.next = 31;
                  break;
                }
                educationInfo = {
                  verified: true,
                  schoolName: _this2.selectedSchool,
                  verifyTime: Date.now()
                };
                _context.next = 17;
                return uniCloud.callFunction({
                  name: 'updateProfile',
                  data: {
                    userId: uni.getStorageSync('userId'),
                    educationInfo: educationInfo
                  }
                });
              case 17:
                res = _context.sent;
                if (!(res.result.code === 0)) {
                  _context.next = 28;
                  break;
                }
                if (!_this2.userInfo) _this2.userInfo = {};
                _this2.userInfo.educationInfo = educationInfo;
                userInfo = uni.getStorageSync('userInfo') || {};
                userInfo.educationInfo = educationInfo;
                uni.setStorageSync('userInfo', userInfo);
                uni.$emit('userInfoUpdated', userInfo);
                uni.showToast({
                  title: '验证成功',
                  icon: 'success'
                });
                _context.next = 29;
                break;
              case 28:
                throw new Error(res.result.msg || '数据保存失败');
              case 29:
                _context.next = 32;
                break;
              case 31:
                throw new Error('不在学校范围内');
              case 32:
                _context.next = 38;
                break;
              case 34:
                _context.prev = 34;
                _context.t0 = _context["catch"](4);
                console.error('验证失败:', _context.t0);
                uni.showToast({
                  title: _context.t0.message || '验证失败',
                  icon: 'none'
                });
              case 38:
                _context.prev = 38;
                _this2.isVerifying = false;
                return _context.finish(38);
              case 41:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 34, 38, 41]]);
      }))();
    },
    getCurrentLocation: function getCurrentLocation() {
      return new Promise(function (resolve, reject) {
        uni.getLocation({
          type: 'gcj02',
          isHighAccuracy: true,
          success: function success(res) {
            console.log('定位成功:', res);
            resolve(res);
          },
          fail: function fail(err) {
            console.error('定位失败:', err);
            reject(new Error('获取位置信息失败'));
          }
        });
      });
    },
    calculateTencentMapDistance: function calculateTencentMapDistance(lat1, lng1, lat2, lng2) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        var key = 'GJHBZ-J56CQ-IBQ5D-2YUOS-TF23V-MNFA3'; // 替换为您的腾讯地图key
        uni.request({
          url: "https://apis.map.qq.com/ws/distance/v1/matrix",
          data: {
            key: key,
            from: "".concat(lat1, ",").concat(lng1),
            to: "".concat(lat2, ",").concat(lng2),
            mode: 'walking' // 步行距离
          },

          success: function success(res) {
            var _res$data$result$rows, _res$data$result$rows2, _res$data$result$rows3, _res$data$result$rows4;
            if (res.data.status === 0 && (_res$data$result$rows = res.data.result.rows) !== null && _res$data$result$rows !== void 0 && (_res$data$result$rows2 = _res$data$result$rows[0]) !== null && _res$data$result$rows2 !== void 0 && (_res$data$result$rows3 = _res$data$result$rows2.elements) !== null && _res$data$result$rows3 !== void 0 && (_res$data$result$rows4 = _res$data$result$rows3[0]) !== null && _res$data$result$rows4 !== void 0 && _res$data$result$rows4.distance) {
              resolve(res.data.result.rows[0].elements[0].distance);
            } else {
              resolve(_this3.calculateDistance(lat1, lng1, lat2, lng2));
            }
          },
          fail: function fail() {
            // 如果腾讯地图API调用失败，使用直线距离计算
            resolve(_this3.calculateDistance(lat1, lng1, lat2, lng2));
          }
        });
      });
    },
    calculateDistance: function calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371000; // 地球半径（米）
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    toRad: function toRad(deg) {
      return deg * Math.PI / 180;
    },
    handleUserInfoUpdate: function handleUserInfoUpdate(userInfo) {
      this.userInfo = userInfo;
      this.isLogin = true;
      // 更新本地存储
      uni.setStorageSync('userInfo', userInfo);
    },
    showMessage: function showMessage(message) {
      var _this4 = this;
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      // 确保页面已加载
      if (!this.pageLoaded) {
        setTimeout(function () {
          _this4.showMessage(message, type);
        }, 100);
        return;
      }
      this.$nextTick(function () {
        if (_this4.$refs.messagePopup) {
          _this4.verificationStatus = {
            success: type === 'success',
            message: message
          };
          _this4.$refs.messagePopup.open();
        } else {
          // 降级处理：如果popup组件未加载，使用uni.showToast
          uni.showToast({
            title: message,
            icon: type === 'success' ? 'success' : 'none'
          });
        }
      });
    },
    // 判断点是否在多边形内（射线法）
    isPointInPolygon: function isPointInPolygon(lat, lng, bounds) {
      var inside = false;
      for (var i = 0, j = bounds.length - 1; i < bounds.length; j = i++) {
        var xi = bounds[i].longitude;
        var yi = bounds[i].latitude;
        var xj = bounds[j].longitude;
        var yj = bounds[j].latitude;
        var intersect = yi > lat !== yj > lat && lng < (xj - xi) * (lat - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    },
    // 可选：添加获取最近边界点的方法
    getNearestBoundaryPoint: function getNearestBoundaryPoint(lat, lng, bounds) {
      var minDistance = Infinity;
      var nearestPoint = null;
      for (var i = 0; i < bounds.length; i++) {
        var point = bounds[i];
        var distance = this.calculateDistance(lat, lng, point.latitude, point.longitude);
        if (distance < minDistance) {
          minDistance = distance;
          nearestPoint = point;
        }
      }
      return {
        point: nearestPoint,
        distance: minDistance
      };
    },
    // 初始化用户信息
    initUserInfo: function initUserInfo() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userId, token, localUserInfo, res, serverUserInfo;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = uni.getStorageSync('userId');
                token = uni.getStorageSync('token');
                if (!(userId && token)) {
                  _context2.next = 18;
                  break;
                }
                _this5.isLogin = true;
                // 从本地存储获取最新用户信息
                localUserInfo = uni.getStorageSync('userInfo');
                if (localUserInfo) {
                  _this5.userInfo = localUserInfo;
                }

                // 从服务器获取最新数据
                _context2.prev = 6;
                _context2.next = 9;
                return uniCloud.callFunction({
                  name: 'getUserProfile',
                  data: {
                    userId: userId,
                    forceUpdate: true
                  }
                });
              case 9:
                res = _context2.sent;
                if (res.result.code === 0) {
                  serverUserInfo = res.result.data; // 更新本地状态和存储
                  _this5.userInfo = serverUserInfo;
                  uni.setStorageSync('userInfo', serverUserInfo);
                }
                _context2.next = 16;
                break;
              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](6);
                console.error('获取用户信息失败:', _context2.t0);
              case 16:
                _context2.next = 20;
                break;
              case 18:
                _this5.isLogin = false;
                _this5.userInfo = {
                  avatar: '',
                  nickname: '未登录用户',
                  signature: '登录后体验更多功能'
                };
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 13]]);
      }))();
    },
    // 格式化日期
    formatDate: function formatDate(timestamp) {
      if (!timestamp) return '';
      var date = new Date(timestamp);
      var now = new Date();
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      var hours = String(date.getHours()).padStart(2, '0');
      var minutes = String(date.getMinutes()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes);
    },
    // 清除位置认证
    clearLocationVerify: function clearLocationVerify() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                try {
                  uni.showModal({
                    title: '确认退出验证',
                    content: '退出当前位置认证后，需要重新进行位置验证才能使用相关功能，确定要退出吗？',
                    confirmColor: '#FF5757',
                    success: function () {
                      var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
                        var userId, result, userInfo;
                        return _regenerator.default.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                if (!res.confirm) {
                                  _context3.next = 20;
                                  break;
                                }
                                uni.showLoading({
                                  title: '处理中...'
                                });
                                userId = uni.getStorageSync('userId');
                                if (userId) {
                                  _context3.next = 5;
                                  break;
                                }
                                throw new Error('未登录状态');
                              case 5:
                                _context3.next = 7;
                                return uniCloud.callFunction({
                                  name: 'updateProfile',
                                  data: {
                                    userId: userId,
                                    educationInfo: {
                                      verified: false,
                                      schoolName: '',
                                      verifyTime: null
                                    }
                                  }
                                });
                              case 7:
                                result = _context3.sent;
                                if (!(result.result.code === 0)) {
                                  _context3.next = 19;
                                  break;
                                }
                                // 更新本地状态
                                if (!_this6.userInfo) _this6.userInfo = {};
                                _this6.userInfo.educationInfo = {
                                  verified: false,
                                  schoolName: '',
                                  verifyTime: null
                                };

                                // 重置选择的学校
                                _this6.selectedSchool = '';

                                // 更新本地存储
                                userInfo = uni.getStorageSync('userInfo') || {};
                                userInfo.educationInfo = _this6.userInfo.educationInfo;
                                uni.setStorageSync('userInfo', userInfo);

                                // 触发全局事件
                                uni.$emit('userInfoUpdated', userInfo);
                                uni.showToast({
                                  title: '已退出位置认证',
                                  icon: 'success'
                                });
                                _context3.next = 20;
                                break;
                              case 19:
                                throw new Error(result.result.msg || '操作失败');
                              case 20:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));
                      function success(_x) {
                        return _success.apply(this, arguments);
                      }
                      return success;
                    }()
                  });
                } catch (error) {
                  console.error('退出位置认证失败:', error);
                  uni.showToast({
                    title: error.message || '操作失败',
                    icon: 'none'
                  });
                } finally {
                  uni.hideLoading();
                }
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 跳转到关注页面
    navigateToFollows: function navigateToFollows() {
      if (!this.isLogin) {
        this.goToLogin();
        return;
      }
      console.log('正在跳转到关注页面');

      // 确保路径正确
      try {
        uni.navigateTo({
          url: '/pages/mine/follows'
        });
      } catch (error) {
        console.error('导航到关注页面失败:', error);
        uni.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    },
    // 跳转到粉丝页面
    navigateToFans: function navigateToFans() {
      if (!this.isLogin) {
        this.goToLogin();
        return;
      }
      console.log('正在跳转到粉丝页面');

      // 确保路径正确
      try {
        uni.navigateTo({
          url: '/pages/mine/fans'
        });
      } catch (error) {
        console.error('导航到粉丝页面失败:', error);
        uni.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    },
    // 跳转到获赞页面
    navigateToLikes: function navigateToLikes() {
      if (!this.isLogin) {
        this.goToLogin();
        return;
      }
      uni.navigateTo({
        url: '/pages/mine/likes'
      });
    },
    // 刷新用户数据
    refreshUserData: function refreshUserData() {
      var _arguments = arguments,
        _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var showLoading, userId, userRes, userInfo;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                showLoading = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                _context5.prev = 1;
                userId = uni.getStorageSync('userId');
                if (userId) {
                  _context5.next = 6;
                  break;
                }
                _this7.isLogin = false;
                return _context5.abrupt("return");
              case 6:
                if (showLoading) {
                  uni.showLoading({
                    title: '刷新中...',
                    mask: true
                  });
                }

                // 获取用户资料
                _context5.next = 9;
                return uniCloud.callFunction({
                  name: 'getUserProfile',
                  data: {
                    userId: userId,
                    forceUpdate: true
                  }
                });
              case 9:
                userRes = _context5.sent;
                if (userRes.result.code === 0) {
                  userInfo = userRes.result.data; // 确保数值为非负整数
                  userInfo.followCount = Math.max(0, parseInt(userInfo.followCount) || 0);
                  userInfo.followingCount = Math.max(0, parseInt(userInfo.followingCount) || 0);
                  userInfo.fansCount = Math.max(0, parseInt(userInfo.fansCount) || 0);
                  userInfo.followerCount = Math.max(0, parseInt(userInfo.followerCount) || 0);

                  // 更新本地状态和存储
                  _this7.userInfo = userInfo;
                  uni.setStorageSync('userInfo', userInfo);

                  // 确保登录状态为true
                  _this7.isLogin = true;
                  console.log('更新后的用户数据:', userInfo);

                  // 强制刷新
                  _this7.$forceUpdate();
                }
                _context5.next = 16;
                break;
              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](1);
                console.error('刷新用户数据失败:', _context5.t0);
              case 16:
                _context5.prev = 16;
                if (showLoading) {
                  uni.hideLoading();
                }
                return _context5.finish(16);
              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 13, 16, 19]]);
      }))();
    },
    // 添加一个强制从服务器同步用户信息的方法
    forceSyncUserInfo: function forceSyncUserInfo() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var userId, followRes, res, userInfo, followCount;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = uni.getStorageSync('userId');
                if (userId) {
                  _context6.next = 3;
                  break;
                }
                return _context6.abrupt("return");
              case 3:
                console.log('正在强制同步用户信息...');
                _context6.prev = 4;
                uni.showLoading({
                  title: '刷新中...',
                  mask: true // 添加遮罩，防止用户在加载时操作UI
                });

                // 1. 首先获取用户的follows统计数据
                _context6.next = 8;
                return uniCloud.callFunction({
                  name: 'getUserFollowing',
                  data: {
                    userId: userId,
                    page: 1,
                    pageSize: 1
                  }
                });
              case 8:
                followRes = _context6.sent;
                _context6.next = 11;
                return uniCloud.callFunction({
                  name: 'getUserProfile',
                  data: {
                    userId: userId,
                    forceUpdate: true
                  }
                });
              case 11:
                res = _context6.sent;
                if (res.result.code === 0) {
                  // 3. 更新本地数据前，先确保关注计数正确
                  userInfo = res.result.data; // 确保关注计数至少与从getUserFollowing获取的结果一致
                  if (followRes.result && followRes.result.code === 0 && followRes.result.data.totalCount !== undefined) {
                    followCount = followRes.result.data.totalCount;
                    userInfo.followCount = followCount;
                    userInfo.followingCount = followCount;
                  }

                  // 确保关注计数不会为负
                  userInfo.followCount = Math.max(0, userInfo.followCount || 0);
                  userInfo.followingCount = Math.max(0, userInfo.followingCount || 0);

                  // 4. 更新本地数据
                  _this8.userInfo = userInfo;
                  // 更新本地存储
                  uni.setStorageSync('userInfo', _this8.userInfo);
                  console.log('同步后的用户数据:', {
                    followCount: _this8.userInfo.followCount,
                    followingCount: _this8.userInfo.followingCount
                  });
                }
                _context6.next = 18;
                break;
              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](4);
                console.error('强制同步用户信息失败:', _context6.t0);
              case 18:
                _context6.prev = 18;
                uni.hideLoading();
                return _context6.finish(18);
              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 15, 18, 21]]);
      }))();
    },
    // 在页面初始化或显示时调用
    initPage: function initPage() {
      var _this9 = this;
      this.checkLoginStatus(true);

      // 监听全局事件，以便在其他页面登录后能够更新
      uni.$on('loginStateChanged', function () {
        _this9.checkLoginStatus();
      });
    },
    // 重置用户信息
    resetUserInfo: function resetUserInfo() {
      this.userInfo = {
        _id: '',
        nickname: '',
        avatar: '',
        signature: '',
        followCount: 0,
        fansCount: 0,
        likeCount: 0
      };
    }
  },
  computed: {
    getUserAvatar: function getUserAvatar() {
      // 优化头像处理逻辑
      if (!this.isLogin) {
        return '/static/images/avatar/default.png';
      }
      return this.userInfo.avatar || '/static/images/avatar/default.png';
    },
    getMessageType: function getMessageType() {
      return this.verificationStatus && this.verificationStatus.success ? 'success' : 'error';
    },
    getMessageContent: function getMessageContent() {
      return this.verificationStatus ? this.verificationStatus.message : '';
    },
    getFollowCount: function getFollowCount() {
      // 记录日志以便调试
      console.log('计算关注数，当前用户信息:', JSON.stringify({
        followCount: this.userInfo.followCount,
        followingCount: this.userInfo.followingCount
      }));

      // 获取关注数，优先使用followCount，然后是followingCount
      var count = 0;
      if (typeof this.userInfo.followCount === 'number') {
        count = this.userInfo.followCount;
      } else if (typeof this.userInfo.followingCount === 'number') {
        count = this.userInfo.followingCount;
      }

      // 确保值为非负整数
      return Math.max(0, parseInt(count) || 0);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 84:
/*!*********************************************************************!*\
  !*** H:/测试小程序/pages/mine/mine.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine.vue?vue&type=style&index=0&lang=css& */ 85);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 85:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/mine/mine.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[78,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map