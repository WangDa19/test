(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/task/task"],{

/***/ 62:
/*!*******************************************************!*\
  !*** H:/测试小程序/main.js?{"page":"pages%2Ftask%2Ftask"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _task = _interopRequireDefault(__webpack_require__(/*! ./pages/task/task.vue */ 63));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_task.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 63:
/*!************************************!*\
  !*** H:/测试小程序/pages/task/task.vue ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.vue?vue&type=template&id=96a65fb4& */ 64);
/* harmony import */ var _task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.vue?vue&type=script&lang=js& */ 66);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task.vue?vue&type=style&index=0&lang=css& */ 68);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/task/task.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 64:
/*!*******************************************************************!*\
  !*** H:/测试小程序/pages/task/task.vue?vue&type=template&id=96a65fb4& ***!
  \*******************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./task.vue?vue&type=template&id=96a65fb4& */ 65);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_template_id_96a65fb4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 65:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/task/task.vue?vue&type=template&id=96a65fb4& ***!
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
  var l1 =
    !!_vm.isLoggedIn && !!_vm.isVerified
      ? _vm.__map(_vm.contentList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g0 = item.images && item.images.length
          var l0 = g0
            ? _vm.__map(item.images.slice(0, 9), function (img, imgIndex) {
                var $orig = _vm.__get_orig(img)
                var g1 = item.images.length
                var g2 = g1 <= 4 ? item.images.length : null
                return {
                  $orig: $orig,
                  g1: g1,
                  g2: g2,
                }
              })
            : null
          return {
            $orig: $orig,
            g0: g0,
            l0: l0,
          }
        })
      : null
  var g3 =
    !!_vm.isLoggedIn && !!_vm.isVerified
      ? !_vm.isLoading && _vm.contentList.length === 0
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l1: l1,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 66:
/*!*************************************************************!*\
  !*** H:/测试小程序/pages/task/task.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./task.vue?vue&type=script&lang=js& */ 67);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 67:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/task/task.vue?vue&type=script&lang=js& ***!
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
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
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
var _default = {
  data: function data() {
    return {
      isLoggedIn: false,
      isVerified: false,
      contentList: [],
      isLoading: false,
      isRefreshing: false,
      page: 1,
      pageSize: 10,
      hasMore: true
    };
  },
  onShow: function onShow() {
    console.log('任务列表页面显示');
    this.checkAuth();
    console.log('认证检查后状态:', {
      isLoggedIn: this.isLoggedIn,
      isVerified: this.isVerified
    });
    if (this.isLoggedIn && this.isVerified) {
      console.log('用户已登录且已认证，开始加载内容');
      // 重置页码和内容列表，确保每次显示页面都能获取最新数据
      this.page = 1;
      this.contentList = [];
      this.loadContentList(true);
    } else {
      console.log('用户未登录或未认证，不加载内容');
    }

    // 临时调试：打印所有帖子的点赞状态
    if (this.contentList && this.contentList.length > 0) {
      console.log('当前列表中的帖子点赞状态:');
      this.contentList.forEach(function (item) {
        console.log("\u5E16\u5B50 ".concat(item._id, ": isLiked=").concat(item.isLiked, ", likeCount=").concat(item.likeCount));
      });
    }
  },
  methods: {
    checkAuth: function checkAuth() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _userInfo$educationIn;
        var userId, userInfo, previousLoggedIn, previousVerified;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = uni.getStorageSync('userId');
                userInfo = uni.getStorageSync('userInfo');
                previousLoggedIn = _this.isLoggedIn;
                previousVerified = _this.isVerified;
                _this.isLoggedIn = !!userId;
                _this.isVerified = (userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$educationIn = userInfo.educationInfo) === null || _userInfo$educationIn === void 0 ? void 0 : _userInfo$educationIn.verified) || false;
                console.log('认证状态:', {
                  userId: userId,
                  isLoggedIn: _this.isLoggedIn,
                  isVerified: _this.isVerified,
                  userInfo: JSON.stringify(userInfo)
                });

                // 仅在首次加载或登录状态改变时才自动加载数据
                if (_this.isLoggedIn && _this.isVerified && (!previousLoggedIn || !previousVerified || _this.contentList.length === 0)) {
                  _this.loadContentList(true);
                }
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    loadContentList: function loadContentList() {
      var _arguments = arguments,
        _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var showLoading, userId, res, _res$result$data, list, hasMore, _error$message, errorMsg;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                showLoading = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!_this2.isLoading) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                _this2.isLoading = true;
                if (showLoading) {
                  uni.showLoading({
                    title: '加载中...',
                    mask: true
                  });
                }
                _context2.prev = 5;
                userId = uni.getStorageSync('userId');
                console.log('开始获取帖子列表，当前用户ID:', userId);
                _context2.next = 10;
                return uniCloud.callFunction({
                  name: 'getPosts',
                  data: {
                    page: _this2.page,
                    pageSize: 10,
                    currentUserId: userId,
                    sortBy: 'createTime',
                    sortOrder: 'desc'
                  },
                  timeout: 30000 // 30秒超时
                });
              case 10:
                res = _context2.sent;
                console.log('getPosts返回结果:', JSON.stringify(res.result));
                if (!(res.result.code === 0)) {
                  _context2.next = 26;
                  break;
                }
                _res$result$data = res.result.data, list = _res$result$data.list, hasMore = _res$result$data.hasMore;
                console.log('获取到帖子列表:', list ? list.length : 0, '条数据');
                if (!(!list || list.length === 0)) {
                  _context2.next = 20;
                  break;
                }
                console.log('返回列表为空');
                if (_this2.page === 1) {
                  _this2.contentList = [];
                }
                _this2.hasMore = false;
                return _context2.abrupt("return");
              case 20:
                // 处理时间显示
                list.forEach(function (item) {
                  var date = new Date(item.createTime);
                  var now = new Date();
                  var diff = now - date;
                  if (diff < 60000) {
                    // 小于1分钟
                    item.timeText = '刚刚';
                  } else if (diff < 3600000) {
                    // 小于1小时
                    item.timeText = Math.floor(diff / 60000) + '分钟前';
                  } else if (diff < 86400000) {
                    // 小于24小时
                    item.timeText = Math.floor(diff / 3600000) + '小时前';
                  } else if (diff < 2592000000) {
                    // 小于30天
                    item.timeText = Math.floor(diff / 86400000) + '天前';
                  } else {
                    item.timeText = "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, '0'), "-").concat(String(date.getDate()).padStart(2, '0'));
                  }

                  // 确保isLiked是布尔值（服务器返回的值）
                  item.isLiked = !!item.isLiked;

                  // 只在特定条件下使用本地存储
                  if (item.isLiked === false) {
                    // 只有服务器明确返回false时才检查本地存储
                    var likedPosts = uni.getStorageSync('likedPosts') || {};
                    if (likedPosts[item._id] && likedPosts[item._id].isLiked === true && Date.now() - likedPosts[item._id].timestamp < 10 * 60 * 1000) {
                      // 10分钟内的本地记录
                      console.log('使用本地点赞状态:', item._id);
                      item.isLiked = true;
                    }
                  }

                  // 确保点赞数不为负数
                  item.likeCount = Math.max(0, item.likeCount || 0);
                  console.log("\u5E16\u5B50 ".concat(item._id, " \u70B9\u8D5E\u72B6\u6001:"), item.isLiked, '点赞数:', item.likeCount);
                });
                if (_this2.page === 1) {
                  _this2.contentList = list;
                } else {
                  _this2.contentList = [].concat((0, _toConsumableArray2.default)(_this2.contentList), (0, _toConsumableArray2.default)(list));
                }
                _this2.hasMore = hasMore;
                console.log('处理后内容列表长度:', _this2.contentList.length);
                _context2.next = 27;
                break;
              case 26:
                throw new Error(res.result.msg);
              case 27:
                _context2.next = 36;
                break;
              case 29:
                _context2.prev = 29;
                _context2.t0 = _context2["catch"](5);
                console.error('加载失败:', _context2.t0);
                errorMsg = '加载失败'; // 更友好的错误提示
                if (_context2.t0.message && _context2.t0.message.includes('time limit')) {
                  errorMsg = '加载超时，请稍后重试';
                } else if (_context2.t0.message && _context2.t0.message.includes('fail:time out')) {
                  errorMsg = '网络请求超时，请检查网络';
                } else if (_context2.t0.message) {
                  errorMsg = _context2.t0.message;
                }
                uni.showToast({
                  title: errorMsg,
                  icon: 'none',
                  duration: 3000
                });

                // 如果是首次加载失败且不是网络问题，可以重试一次
                if (_this2.page === 1 && _this2.contentList.length === 0 && !((_error$message = _context2.t0.message) !== null && _error$message !== void 0 && _error$message.includes('time out'))) {
                  setTimeout(function () {
                    console.log('首次加载失败，自动重试...');
                    _this2.loadContentList(false);
                  }, 2000);
                }
              case 36:
                _context2.prev = 36;
                _this2.isLoading = false;
                if (showLoading) {
                  uni.hideLoading();
                }
                return _context2.finish(36);
              case 40:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 29, 36, 40]]);
      }))();
    },
    loadMore: function loadMore() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this3.isLoading || !_this3.hasMore)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _this3.page += 1;
                _context3.next = 5;
                return _this3.loadContentList();
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    onRefresh: function onRefresh() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.isRefreshing = true;
                _this4.page = 1;
                _context4.next = 4;
                return _this4.loadContentList(true);
              case 4:
                _this4.isRefreshing = false;
              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    previewImage: function previewImage(urls, current) {
      uni.previewImage({
        urls: urls,
        current: urls[current]
      });
    },
    handleLike: function handleLike(id, index) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var previousLikeState, previousCount, newLikeState, likedPosts, timestamp, res, _res$result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (_this5.isLoggedIn) {
                  _context5.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context5.abrupt("return");
              case 3:
                if (_this5.isVerified) {
                  _context5.next = 6;
                  break;
                }
                uni.showToast({
                  title: '请先认证',
                  icon: 'none'
                });
                return _context5.abrupt("return");
              case 6:
                if (!_this5.contentList[index].likeLoading) {
                  _context5.next = 8;
                  break;
                }
                return _context5.abrupt("return");
              case 8:
                // 设置点赞加载状态
                _this5.$set(_this5.contentList[index], 'likeLoading', true);

                // 记录原始状态，用于恢复
                previousLikeState = _this5.contentList[index].isLiked || false;
                previousCount = _this5.contentList[index].likeCount || 0;
                _context5.prev = 11;
                // 立即更新UI状态，提供即时反馈
                newLikeState = !previousLikeState;
                _this5.$set(_this5.contentList[index], 'isLiked', newLikeState);
                _this5.$set(_this5.contentList[index], 'likeCount', Math.max(0, previousCount + (newLikeState ? 1 : -1)));

                // 同步更新本地存储
                likedPosts = uni.getStorageSync('likedPosts') || {};
                if (newLikeState) {
                  likedPosts[id] = {
                    isLiked: true,
                    timestamp: Date.now()
                  };
                } else if (likedPosts[id]) {
                  likedPosts[id].isLiked = false;
                  likedPosts[id].timestamp = Date.now();
                }
                uni.setStorageSync('likedPosts', likedPosts);

                // 调用点赞API并添加时间戳避免缓存
                timestamp = Date.now();
                _context5.next = 21;
                return uniCloud.callFunction({
                  name: 'toggleLike',
                  data: {
                    userId: uni.getStorageSync('userId'),
                    targetId: id,
                    type: 'post',
                    timestamp: timestamp
                  }
                });
              case 21:
                res = _context5.sent;
                if (!(res.result && res.result.code === 0)) {
                  _context5.next = 26;
                  break;
                }
                // API成功，使用返回的实际数据更新UI
                if (res.result.data) {
                  // 明确更新isLiked状态
                  if (typeof res.result.data.isLiked === 'boolean') {
                    _this5.$set(_this5.contentList[index], 'isLiked', res.result.data.isLiked);
                  }

                  // 更新点赞数
                  if (typeof res.result.data.likeCount === 'number') {
                    _this5.$set(_this5.contentList[index], 'likeCount', res.result.data.likeCount);
                  }

                  // 同步服务器返回的状态到本地存储
                  if (typeof res.result.data.isLiked === 'boolean') {
                    likedPosts[id] = {
                      isLiked: res.result.data.isLiked,
                      timestamp: Date.now()
                    };
                    uni.setStorageSync('likedPosts', likedPosts);
                  }
                }
                _context5.next = 31;
                break;
              case 26:
                // API失败，恢复之前的状态
                _this5.$set(_this5.contentList[index], 'isLiked', previousLikeState);
                _this5.$set(_this5.contentList[index], 'likeCount', previousCount);

                // 恢复本地存储
                if (previousLikeState) {
                  likedPosts[id] = {
                    isLiked: true,
                    timestamp: Date.now()
                  };
                } else if (likedPosts[id]) {
                  likedPosts[id].isLiked = false;
                }
                uni.setStorageSync('likedPosts', likedPosts);
                throw new Error(((_res$result = res.result) === null || _res$result === void 0 ? void 0 : _res$result.msg) || '操作失败');
              case 31:
                _context5.next = 37;
                break;
              case 33:
                _context5.prev = 33;
                _context5.t0 = _context5["catch"](11);
                console.error('点赞操作失败:', _context5.t0);
                uni.showToast({
                  title: _context5.t0.message || '操作失败',
                  icon: 'none'
                });
              case 37:
                _context5.prev = 37;
                // 延迟解除加载状态，防止快速点击
                setTimeout(function () {
                  _this5.$set(_this5.contentList[index], 'likeLoading', false);
                }, 300);
                return _context5.finish(37);
              case 40:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[11, 33, 37, 40]]);
      }))();
    },
    handleComment: function handleComment(id) {
      uni.navigateTo({
        url: "/pages/task/detail?id=".concat(id, "&toComment=1")
      });
    },
    navigateToDetail: function navigateToDetail(id) {
      var toComment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      uni.navigateTo({
        url: "/pages/task/detail?id=".concat(id).concat(toComment ? '&toComment=1' : '')
      });
    },
    navigateToUser: function navigateToUser(userId) {
      uni.navigateTo({
        url: "/pages/user/profile?id=".concat(userId)
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 68:
/*!*********************************************************************!*\
  !*** H:/测试小程序/pages/task/task.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./task.vue?vue&type=style&index=0&lang=css& */ 69);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_task_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 69:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/task/task.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[62,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/task/task.js.map