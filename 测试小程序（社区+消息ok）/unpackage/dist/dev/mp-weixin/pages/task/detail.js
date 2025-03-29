(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/task/detail"],{

/***/ 70:
/*!*********************************************************!*\
  !*** H:/测试小程序/main.js?{"page":"pages%2Ftask%2Fdetail"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/task/detail.vue */ 71));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 71:
/*!**************************************!*\
  !*** H:/测试小程序/pages/task/detail.vue ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=0417eeb2& */ 72);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 74);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&lang=css& */ 76);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/task/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 72:
/*!*********************************************************************!*\
  !*** H:/测试小程序/pages/task/detail.vue?vue&type=template&id=0417eeb2& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=0417eeb2& */ 73);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0417eeb2___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 73:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/task/detail.vue?vue&type=template&id=0417eeb2& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    commentPopup: function () {
      return __webpack_require__.e(/*! import() | components/comment-popup/comment-popup */ "components/comment-popup/comment-popup").then(__webpack_require__.bind(null, /*! @/components/comment-popup/comment-popup.vue */ 297))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 =
    _vm.detail && _vm.detail.userInfo
      ? _vm.formatTime(_vm.detail.createTime)
      : null
  var g0 = _vm.detail ? _vm.detail.images && _vm.detail.images.length > 0 : null
  var g1 = _vm.activeTab === "like" && _vm.likeUsers.length > 0
  var g2 = g1 ? _vm.likeUsers.length : null
  var g3 = _vm.activeTab === "comment" && _vm.comments.length > 0
  var g4 =
    _vm.activeTab === "comment"
      ? _vm.commentsLoading && !_vm.comments.length
      : null
  var g5 = _vm.activeTab === "comment" && !g4 ? _vm.comments.length : null
  var l0 =
    _vm.activeTab === "comment" && !g4 && !!g5
      ? _vm.__map(_vm.comments, function (comment, index) {
          var $orig = _vm.__get_orig(comment)
          var m1 =
            comment.status !== 0 ? _vm.formatTime(comment.createTime) : null
          return {
            $orig: $orig,
            m1: m1,
          }
        })
      : null
  var g6 =
    _vm.activeTab === "like"
      ? _vm.likeUsersLoading && !_vm.likeUsers.length
      : null
  var g7 = _vm.activeTab === "like" && !g6 ? _vm.likeUsers.length : null
  var g8 = _vm.showUserSearchBox
    ? !_vm.userSearchLoading && _vm.userSearchResults.length === 0
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.replyInfo = null
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
        l0: l0,
        g6: g6,
        g7: g7,
        g8: g8,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 74:
/*!***************************************************************!*\
  !*** H:/测试小程序/pages/task/detail.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 75);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 75:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/task/detail.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CommentPopup = function CommentPopup() {
  __webpack_require__.e(/*! require.ensure | components/comment-popup/comment-popup */ "components/comment-popup/comment-popup").then((function () {
    return resolve(__webpack_require__(/*! @/components/comment-popup/comment-popup.vue */ 297));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    CommentPopup: CommentPopup
  },
  data: function data() {
    return {
      userId: uni.getStorageSync('userId') || '',
      postId: '',
      detail: {
        _id: '',
        content: '',
        images: [],
        commentCount: 0,
        likeCount: 0,
        shareCount: 0,
        isLiked: false,
        userInfo: {
          _id: '',
          nickname: '',
          avatar: ''
        }
      },
      comments: [],
      replyInfo: null,
      page: 1,
      pageSize: 10,
      loadingStatus: 'more',
      sortType: 'time',
      // 'time' 或 'hot'
      activeTab: 'comment',
      likeUsers: [],
      commentsPage: 0,
      commentsPageSize: 10,
      commentsLoading: false,
      commentsFinished: false,
      isFollowing: false,
      followLoading: false,
      currentUserId: '',
      targetCommentId: '',
      highlightedCommentId: '',
      pendingHighlightId: '',
      toComment: false,
      showUserSearchBox: false,
      userSearchKeyword: '',
      userSearchResults: [],
      userSearchLoading: false,
      mentionedUsers: [],
      // 存储评论中@的用户
      likeUsersLoading: false,
      isDetailLoading: false,
      hasInitialized: false,
      commentsLoaded: false,
      likeLoading: false,
      // 添加点赞加载状态
      loadingComments: false,
      // 添加评论加载状态
      hasMoreComments: true,
      // 添加更多评论标志
      postData: {},
      onShowLoadingLock: false,
      __DEV__: "development" === 'development'
    };
  },
  onLoad: function onLoad(options) {
    var _this = this;
    console.log('详情页面加载，参数:', options);
    this.userId = uni.getStorageSync('userId') || '';
    this.postId = options.id;
    this.detail._id = options.id;

    // 默认加载评论标签页
    this.activeTab = 'comment';

    // 立即加载详情和评论
    this.loadDetailAndComments().then(function () {
      var _this$detail, _this$detail$userInfo;
      // 加载完详情后立即检查关注状态
      if ((_this$detail = _this.detail) !== null && _this$detail !== void 0 && (_this$detail$userInfo = _this$detail.userInfo) !== null && _this$detail$userInfo !== void 0 && _this$detail$userInfo._id && _this.userId) {
        console.log('帖子详情加载完成，检查关注状态');
        _this.checkFollowStatus();
      }
    });

    // 在加载详情之后，同步本地存储的点赞状态
    this.syncLikeStateFromStorage();
  },
  onShow: function onShow() {
    var _this$detail2, _this$detail2$userInf;
    console.log('详情页显示');

    // 如果已经有帖子ID和用户信息，但还没有触发关注状态检查
    if ((_this$detail2 = this.detail) !== null && _this$detail2 !== void 0 && (_this$detail2$userInf = _this$detail2.userInfo) !== null && _this$detail2$userInf !== void 0 && _this$detail2$userInf._id && this.userId) {
      console.log('详情页显示，执行关注状态检查');

      // 为避免每次显示页面都请求，先检查本地存储
      var followedUsers = uni.getStorageSync('followedUsers') || {};
      var storedFollowState = followedUsers[this.detail.userInfo._id];

      // 如果本地存储的关注状态较新（10分钟内），直接使用
      if (storedFollowState && Date.now() - storedFollowState.timestamp < 10 * 60 * 1000) {
        console.log('使用本地存储的关注状态:', storedFollowState.isFollowing);
        this.isFollowing = storedFollowState.isFollowing;
      } else {
        // 否则请求服务器获取最新状态
        this.checkFollowStatus();
      }
    }

    // 刷新点赞状态和点赞用户列表
    if (this.detail._id) {
      this.refreshLikeState();

      // 如果当前是点赞标签页，重新加载点赞用户列表
      if (this.activeTab === 'like') {
        this.loadLikeUsers(this.detail._id);
      }
    }
  },
  methods: {
    // 获取帖子详情和评论
    loadDetailAndComments: function loadDetailAndComments() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this2.loadDetail();
              case 3:
                _context.next = 5;
                return _this2.loadComments(true);
              case 5:
                // 如果需要自动滚动到评论区
                if (_this2.toComment) {
                  setTimeout(function () {
                    _this2.scrollToComments();
                  }, 500);
                }
                _context.next = 11;
                break;
              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error('加载详情和评论失败:', _context.t0);
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    // 加载帖子详情
    loadDetail: function loadDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userId, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this3.postId) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _this3.isDetailLoading = true;
                _context2.prev = 3;
                userId = uni.getStorageSync('userId');
                console.log('加载帖子详情，ID:', _this3.postId);
                _context2.next = 8;
                return uniCloud.callFunction({
                  name: 'getPostDetail',
                  data: {
                    postId: _this3.postId,
                    userId: userId,
                    timestamp: Date.now() // 添加时间戳防止缓存
                  }
                });
              case 8:
                res = _context2.sent;
                if (!(res.result.code === 0 && res.result.data)) {
                  _context2.next = 19;
                  break;
                }
                _this3.detail = res.result.data;

                // 确保likeCount为数字且不为负数
                _this3.detail.likeCount = Math.max(0, parseInt(_this3.detail.likeCount) || 0);

                // 确保isLiked是布尔值
                _this3.detail.isLiked = !!_this3.detail.isLiked;
                console.log('帖子详情数据:', _this3.detail);

                // 设置标题
                uni.setNavigationBarTitle({
                  title: _this3.detail.userInfo ? _this3.detail.userInfo.nickname + '的帖子' : '帖子详情'
                });

                // 加载点赞用户列表，但不立即更新帖子的点赞数
                if (_this3.activeTab === 'like') {
                  _this3.loadLikeUsersWithoutUpdatingCount(_this3.postId);
                }

                // 在loadDetail方法的成功回调中添加
                console.log('帖子信息:', {
                  '当前用户ID': _this3.userId,
                  '帖子作者ID': res.result.data.userInfo._id,
                  '是否是自己的帖子': _this3.userId === res.result.data.userInfo._id
                });
                _context2.next = 20;
                break;
              case 19:
                throw new Error(res.result.msg || '获取帖子详情失败');
              case 20:
                _context2.next = 26;
                break;
              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](3);
                console.error('加载帖子详情失败:', _context2.t0);
                uni.showToast({
                  title: _context2.t0.message || '加载失败',
                  icon: 'none'
                });
              case 26:
                _context2.prev = 26;
                _this3.isDetailLoading = false;
                return _context2.finish(26);
              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 22, 26, 29]]);
      }))();
    },
    // 新增方法：加载点赞用户列表但不更新点赞数
    loadLikeUsersWithoutUpdatingCount: function loadLikeUsersWithoutUpdatingCount(postId) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var retryCount, maxRetries, loadLikeUsersWithRetry;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (postId) {
                  _context4.next = 3;
                  break;
                }
                console.error('加载点赞用户失败：缺少帖子ID');
                return _context4.abrupt("return");
              case 3:
                if (!_this4.likeUsersLoading) {
                  _context4.next = 6;
                  break;
                }
                console.log('点赞用户加载中，跳过重复请求');
                return _context4.abrupt("return");
              case 6:
                _this4.likeUsersLoading = true;
                console.log('开始静默加载点赞用户列表');

                // 最多重试2次
                retryCount = 0;
                maxRetries = 2;
                loadLikeUsersWithRetry = /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
                    var res, likeUsers, cachedLikeUsers;
                    return _regenerator.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return uniCloud.callFunction({
                              name: 'getLikeUsers',
                              data: {
                                postId: postId,
                                type: 'post',
                                updateCount: false,
                                // 增加一个标志位告诉云函数不要更新点赞数
                                timestamp: Date.now()
                              },
                              timeout: 8000 // 8秒超时，比主加载方法短一些
                            });
                          case 3:
                            res = _context3.sent;
                            if (!(res.result && res.result.code === 0)) {
                              _context3.next = 11;
                              break;
                            }
                            likeUsers = Array.isArray(res.result.data) ? res.result.data : [];
                            _this4.likeUsers = likeUsers;

                            // 只记录数量差异，不强制更新点赞计数
                            if (_this4.likeUsers.length !== _this4.detail.likeCount) {
                              console.log('点赞数量存在差异: UI显示', _this4.detail.likeCount, '实际用户数', _this4.likeUsers.length);
                            }

                            // 缓存点赞用户数据，但不影响显示的点赞计数
                            try {
                              uni.setStorageSync("likeUsers_".concat(postId), {
                                data: _this4.likeUsers,
                                timestamp: Date.now(),
                                count: _this4.likeUsers.length,
                                displayCount: _this4.detail.likeCount // 保存显示的计数，与实际数量分开
                              });
                            } catch (storageError) {
                              console.error('缓存点赞用户数据失败:', storageError);
                            }
                            _context3.next = 12;
                            break;
                          case 11:
                            throw new Error(res.result && res.result.msg || '获取点赞用户失败');
                          case 12:
                            _context3.next = 26;
                            break;
                          case 14:
                            _context3.prev = 14;
                            _context3.t0 = _context3["catch"](0);
                            console.error('静默获取点赞用户出错:', _context3.t0);

                            // 检查是否还有重试机会
                            if (!(retryCount < maxRetries - 1)) {
                              _context3.next = 24;
                              break;
                            }
                            retryCount++;
                            // 延迟重试，避免过快请求
                            _context3.next = 21;
                            return new Promise(function (resolve) {
                              return setTimeout(resolve, 800 * retryCount);
                            });
                          case 21:
                            _context3.next = 23;
                            return loadLikeUsersWithRetry();
                          case 23:
                            return _context3.abrupt("return", _context3.sent);
                          case 24:
                            // 重试耗尽后，尝试从缓存加载，但不显示错误提示
                            cachedLikeUsers = uni.getStorageSync("likeUsers_".concat(postId));
                            if (cachedLikeUsers && cachedLikeUsers.data && Array.isArray(cachedLikeUsers.data) && Date.now() - cachedLikeUsers.timestamp < 10 * 60 * 1000) {
                              console.log('使用缓存的点赞用户数据');
                              _this4.likeUsers = cachedLikeUsers.data;
                            } else {
                              _this4.likeUsers = [];
                            }
                          case 26:
                            _context3.prev = 26;
                            _this4.likeUsersLoading = false;
                            return _context3.finish(26);
                          case 29:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, null, [[0, 14, 26, 29]]);
                  }));
                  return function loadLikeUsersWithRetry() {
                    return _ref.apply(this, arguments);
                  };
                }(); // 开始加载，包含重试逻辑
                _context4.next = 13;
                return loadLikeUsersWithRetry();
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 加载评论列表
    loadComments: function loadComments() {
      var _arguments = arguments,
        _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var refresh, likedComments, res, data, comments, commentIds, likeResult, likedCommentIds;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!_this5.loadingComments) {
                  _context5.next = 3;
                  break;
                }
                return _context5.abrupt("return");
              case 3:
                if (!refresh) {
                  _context5.next = 9;
                  break;
                }
                _this5.commentsPage = 1;
                _this5.comments = [];
                _this5.hasMoreComments = true;
                _context5.next = 11;
                break;
              case 9:
                if (_this5.hasMoreComments) {
                  _context5.next = 11;
                  break;
                }
                return _context5.abrupt("return");
              case 11:
                _this5.loadingComments = true;
                _this5.commentsLoading = true;
                _context5.prev = 13;
                // 获取本地存储的评论点赞状态
                likedComments = uni.getStorageSync('likedComments') || {};
                _context5.next = 17;
                return uniCloud.callFunction({
                  name: 'getComments',
                  data: {
                    postId: _this5.postId,
                    page: _this5.commentsPage,
                    pageSize: 10,
                    userId: _this5.userId
                  }
                });
              case 17:
                res = _context5.sent;
                if (!(res.result.code === 0)) {
                  _context5.next = 41;
                  break;
                }
                data = res.result.data;
                comments = data.list || []; // 获取用户当前的点赞状态
                if (!(_this5.userId && comments.length > 0)) {
                  _context5.next = 34;
                  break;
                }
                _context5.prev = 22;
                // 获取当前用户对这些评论的点赞状态
                commentIds = comments.map(function (comment) {
                  return comment._id;
                });
                _context5.next = 26;
                return uniCloud.callFunction({
                  name: 'getCommentLikes',
                  data: {
                    userId: _this5.userId,
                    commentIds: commentIds
                  }
                });
              case 26:
                likeResult = _context5.sent;
                if (likeResult.result && likeResult.result.code === 0) {
                  likedCommentIds = likeResult.result.data || []; // 更新评论的点赞状态
                  comments.forEach(function (comment) {
                    // 优先使用服务器返回的点赞状态
                    comment.isLiked = likedCommentIds.includes(comment._id);

                    // 如果服务器返回未点赞，但本地存储有较新的点赞记录，则使用本地记录
                    var localLikeInfo = likedComments[comment._id];
                    if (!comment.isLiked && localLikeInfo && localLikeInfo.isLiked) {
                      // 确认本地记录是否在有效期内 (10分钟内)
                      if (Date.now() - localLikeInfo.timestamp < 10 * 60 * 1000) {
                        console.log("\u4F7F\u7528\u672C\u5730\u70B9\u8D5E\u8BB0\u5F55: \u8BC4\u8BBAID=".concat(comment._id));
                        comment.isLiked = true;

                        // 异步更新服务器点赞状态，确保服务器与客户端一致
                        _this5.syncLikeStatus(comment._id, true);
                      }
                    }
                  });
                }
                _context5.next = 34;
                break;
              case 30:
                _context5.prev = 30;
                _context5.t0 = _context5["catch"](22);
                console.error('获取评论点赞状态失败:', _context5.t0);

                // 如果服务器查询失败，仅使用本地存储的点赞状态
                comments.forEach(function (comment) {
                  var localLikeInfo = likedComments[comment._id];
                  if (localLikeInfo && localLikeInfo.isLiked) {
                    // 确认本地记录是否在有效期内 (10分钟内)
                    if (Date.now() - localLikeInfo.timestamp < 10 * 60 * 1000) {
                      comment.isLiked = true;
                    }
                  }
                });
              case 34:
                // 确保每条评论有必要的属性
                comments.forEach(function (comment) {
                  comment.likeCount = Math.max(0, comment.likeCount || 0);
                  comment.isLiked = !!comment.isLiked;
                });
                if (refresh || _this5.commentsPage === 1) {
                  _this5.comments = comments;
                } else {
                  // 合并评论，避免重复
                  _this5.comments = [].concat((0, _toConsumableArray2.default)(_this5.comments), (0, _toConsumableArray2.default)(comments));
                }

                // 按排序方式排序
                _this5.sortComments();

                // 更新是否有更多评论
                _this5.hasMoreComments = data.hasMore;
                if (data.hasMore) {
                  _this5.commentsPage++;
                }
                _context5.next = 42;
                break;
              case 41:
                throw new Error(res.result.msg || '加载评论失败');
              case 42:
                _context5.next = 48;
                break;
              case 44:
                _context5.prev = 44;
                _context5.t1 = _context5["catch"](13);
                console.error('加载评论失败:', _context5.t1);
                uni.showToast({
                  title: '加载评论失败',
                  icon: 'none'
                });
              case 48:
                _context5.prev = 48;
                _this5.loadingComments = false;
                _this5.commentsLoading = false;
                return _context5.finish(48);
              case 52:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[13, 44, 48, 52], [22, 30]]);
      }))();
    },
    // 处理评论提交
    handleCommentSubmit: function handleCommentSubmit(data) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var content, postId, userId, mentionRegex, matches, mentions, mentionedUserIds, userResult, commentData, result;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('开始提交评论，完整数据:', JSON.stringify(data));
                if (!(!data || !data.content && !data.image)) {
                  _context6.next = 4;
                  break;
                }
                uni.showToast({
                  title: '评论内容不能为空',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 4:
                _context6.prev = 4;
                uni.showLoading({
                  title: '提交中...'
                });
                content = data.content ? data.content.trim() : '';
                postId = _this6.postId || _this6.detail._id;
                userId = uni.getStorageSync('userId'); // 验证基础参数
                if (userId) {
                  _context6.next = 12;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 12:
                if (postId) {
                  _context6.next = 15;
                  break;
                }
                uni.showToast({
                  title: '无效的帖子ID',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 15:
                console.log('提交评论参数检查通过');

                // 提取@用户名
                mentionRegex = /@([^\s@]+)/g;
                matches = content.match(mentionRegex) || [];
                mentions = matches.map(function (match) {
                  return match.substring(1);
                });
                console.log('检测到@用户:', mentions);

                // 获取被@用户的ID
                mentionedUserIds = [];
                if (!(mentions.length > 0)) {
                  _context6.next = 33;
                  break;
                }
                _context6.prev = 22;
                _context6.next = 25;
                return uniCloud.callFunction({
                  name: 'getUsersByNickname',
                  data: {
                    nicknames: mentions
                  }
                });
              case 25:
                userResult = _context6.sent;
                console.log('获取@用户ID结果:', userResult.result);
                if (userResult.result.code === 0 && userResult.result.data) {
                  mentionedUserIds = userResult.result.data.map(function (user) {
                    return user._id;
                  });
                }
                _context6.next = 33;
                break;
              case 30:
                _context6.prev = 30;
                _context6.t0 = _context6["catch"](22);
                console.error('@用户ID获取失败:', _context6.t0);
              case 33:
                // 构建评论数据
                commentData = {
                  postId: postId,
                  userId: userId,
                  content: content,
                  parentId: data.parentId || null,
                  replyTo: data.replyTo || (_this6.replyInfo ? _this6.replyInfo.userId : null),
                  mentionedUserIds: mentionedUserIds,
                  status: 1,
                  imageUrl: data.image || '' // 添加图片URL
                }; // 提交评论
                _context6.next = 36;
                return uniCloud.callFunction({
                  name: 'addComment',
                  data: commentData
                });
              case 36:
                result = _context6.sent;
                console.log('评论提交结果:', result.result);
                if (!(result.result.code === 0)) {
                  _context6.next = 48;
                  break;
                }
                uni.showToast({
                  title: '评论成功',
                  icon: 'success'
                });

                // 重置评论页码并重新加载评论（确保按照新的排序获取最新评论）
                _this6.commentsPage = 1;
                _context6.next = 43;
                return _this6.loadComments(true);
              case 43:
                // 滚动到评论区
                _this6.$nextTick(function () {
                  _this6.scrollToComments();
                });

                // 清空评论框并关闭弹窗
                if (_this6.$refs.commentPopup) {
                  if (typeof _this6.$refs.commentPopup.clear === 'function') {
                    _this6.$refs.commentPopup.clear();
                  }
                  _this6.$refs.commentPopup.close();
                }

                // 重置回复信息
                _this6.replyInfo = null;
                _context6.next = 49;
                break;
              case 48:
                throw new Error(result.result.msg || '评论失败');
              case 49:
                _context6.next = 55;
                break;
              case 51:
                _context6.prev = 51;
                _context6.t1 = _context6["catch"](4);
                console.error('评论提交失败:', _context6.t1);
                uni.showToast({
                  title: _context6.t1.message || '评论提交失败',
                  icon: 'none'
                });
              case 55:
                _context6.prev = 55;
                uni.hideLoading();
                return _context6.finish(55);
              case 58:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 51, 55, 58], [22, 30]]);
      }))();
    },
    // 回复评论
    replyComment: function replyComment(comment) {
      if (!comment || !comment.userInfo) {
        return;
      }

      // 设置回复信息
      this.replyInfo = _objectSpread(_objectSpread({}, comment), {}, {
        autoAt: true,
        // 标记为需要自动@
        atNickname: comment.userInfo.nickname || '用户' // 存储要@的用户昵称
      });

      this.showCommentPopup();
    },
    // 显示评论弹窗
    showCommentPopup: function showCommentPopup() {
      var _this7 = this;
      if (this.$refs.commentPopup) {
        this.$refs.commentPopup.open();

        // 如果是回复并且需要自动@，在评论框中插入@用户
        if (this.replyInfo && this.replyInfo.autoAt && this.replyInfo.atNickname) {
          // 延迟一点点执行，确保弹窗已经完全打开
          setTimeout(function () {
            _this7.$refs.commentPopup.setContent("@".concat(_this7.replyInfo.atNickname, " "));
          }, 100);
        }
      } else {
        console.error('commentPopup组件引用不存在');
      }
    },
    // 使用新的云函数检查关注状态
    checkFollowStatus: function checkFollowStatus() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var _this8$detail, _this8$detail$userInf, userId, targetUserId, res, oldFollowState, newFollowState, followedUsers;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                userId = uni.getStorageSync('userId');
                if (userId) {
                  _context7.next = 4;
                  break;
                }
                return _context7.abrupt("return");
              case 4:
                // 获取作者ID
                targetUserId = (_this8$detail = _this8.detail) === null || _this8$detail === void 0 ? void 0 : (_this8$detail$userInf = _this8$detail.userInfo) === null || _this8$detail$userInf === void 0 ? void 0 : _this8$detail$userInf._id;
                if (targetUserId) {
                  _context7.next = 8;
                  break;
                }
                console.log('无需检查关注状态：无目标用户');
                return _context7.abrupt("return");
              case 8:
                if (!(userId === targetUserId)) {
                  _context7.next = 12;
                  break;
                }
                console.log('无需检查关注状态：自己的帖子');
                _this8.isFollowing = false; // 重置关注状态，避免可能的错误状态
                return _context7.abrupt("return");
              case 12:
                console.log('检查关注状态，当前用户:', userId, '目标用户:', targetUserId);

                // 防止重复请求
                if (!_this8.followLoading) {
                  _context7.next = 15;
                  break;
                }
                return _context7.abrupt("return");
              case 15:
                _this8.followLoading = true;

                // 调用云函数 - 添加时间戳防止缓存
                _context7.next = 18;
                return uniCloud.callFunction({
                  name: 'checkFollow',
                  data: {
                    userId: userId,
                    targetUserId: targetUserId,
                    timestamp: Date.now() // 添加时间戳避免缓存
                  }
                });
              case 18:
                res = _context7.sent;
                console.log('获取关注状态结果:', res.result);
                if (res.result.code === 0) {
                  // 设置状态前记录原状态，用于判断是否需要更新UI
                  oldFollowState = _this8.isFollowing;
                  newFollowState = res.result.data.isFollowing; // 更新关注状态
                  _this8.isFollowing = newFollowState;

                  // 记录结果到本地存储
                  followedUsers = uni.getStorageSync('followedUsers') || {};
                  followedUsers[targetUserId] = {
                    isFollowing: newFollowState,
                    timestamp: Date.now()
                  };
                  uni.setStorageSync('followedUsers', followedUsers);
                  console.log('关注状态检查完成，原状态:', oldFollowState, '新状态:', _this8.isFollowing);

                  // 如果关注状态变化，触发UI更新
                  if (oldFollowState !== newFollowState) {
                    _this8.$forceUpdate();
                  }
                } else {
                  console.error('获取关注状态失败:', res.result.msg);
                }
                _context7.next = 26;
                break;
              case 23:
                _context7.prev = 23;
                _context7.t0 = _context7["catch"](0);
                console.error('检查关注状态异常:', _context7.t0);
              case 26:
                _context7.prev = 26;
                _this8.followLoading = false;
                return _context7.finish(26);
              case 29:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 23, 26, 29]]);
      }))();
    },
    // 处理关注/取关操作
    toggleFollow: function toggleFollow() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var userId, targetUserId;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                userId = uni.getStorageSync('userId');
                if (userId) {
                  _context9.next = 5;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context9.abrupt("return");
              case 5:
                targetUserId = _this9.detail.userInfo._id;
                if (!(!targetUserId || targetUserId === userId)) {
                  _context9.next = 8;
                  break;
                }
                return _context9.abrupt("return");
              case 8:
                if (!_this9.followLoading) {
                  _context9.next = 10;
                  break;
                }
                return _context9.abrupt("return");
              case 10:
                _this9.followLoading = true;

                // 根据当前状态决定是否需要确认
                if (!_this9.isFollowing) {
                  _context9.next = 15;
                  break;
                }
                // 已关注状态，弹出确认对话框
                uni.showModal({
                  title: '取消关注',
                  content: '确定取消关注该用户吗？',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(res) {
                      return _regenerator.default.wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              if (!res.confirm) {
                                _context8.next = 3;
                                break;
                              }
                              _context8.next = 3;
                              return _this9.toggleFollowAction(userId, targetUserId);
                            case 3:
                              _this9.followLoading = false;
                            case 4:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      }, _callee8);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }(),
                  fail: function fail() {
                    _this9.followLoading = false;
                  }
                });
                _context9.next = 18;
                break;
              case 15:
                _context9.next = 17;
                return _this9.toggleFollowAction(userId, targetUserId);
              case 17:
                _this9.followLoading = false;
              case 18:
                _context9.next = 25;
                break;
              case 20:
                _context9.prev = 20;
                _context9.t0 = _context9["catch"](0);
                console.error('关注操作失败:', _context9.t0);
                uni.showToast({
                  title: _context9.t0.message || '操作失败',
                  icon: 'none'
                });
                _this9.followLoading = false;
              case 25:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 20]]);
      }))();
    },
    // 执行关注/取关操作
    toggleFollowAction: function toggleFollowAction(userId, targetUserId) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var previousFollowState, result, followedUsers, userInfo, diff, _result$result, _result$result2;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                uni.showLoading({
                  title: '处理中...'
                });
                _context10.prev = 1;
                // 记录操作前状态
                previousFollowState = _this10.isFollowing; // 更新UI状态，提供立即反馈
                _this10.isFollowing = !previousFollowState;

                // 尝试调用云函数执行关注/取关操作
                _context10.next = 6;
                return uniCloud.callFunction({
                  name: 'toggleFollow',
                  data: {
                    userId: userId,
                    targetUserId: targetUserId,
                    timestamp: Date.now() // 添加时间戳避免缓存
                  }
                });
              case 6:
                result = _context10.sent;
                console.log('关注/取关操作结果:', result.result);

                // 处理成功情况
                if (!(result.result && result.result.code === 0)) {
                  _context10.next = 17;
                  break;
                }
                // 使用服务器返回的实际状态更新UI
                if (result.result.data && typeof result.result.data.isFollowing === 'boolean') {
                  _this10.isFollowing = result.result.data.isFollowing;
                }

                // 更新本地存储
                followedUsers = uni.getStorageSync('followedUsers') || {};
                followedUsers[targetUserId] = {
                  isFollowing: _this10.isFollowing,
                  timestamp: Date.now()
                };
                uni.setStorageSync('followedUsers', followedUsers);

                // 更新用户关注计数
                try {
                  userInfo = uni.getStorageSync('userInfo') || {};
                  if (userInfo.followCount === undefined) {
                    userInfo.followCount = 0;
                  }
                  diff = _this10.isFollowing ? 1 : -1;
                  userInfo.followCount = Math.max(0, (parseInt(userInfo.followCount) || 0) + diff);
                  userInfo.followingCount = userInfo.followCount;
                  uni.setStorageSync('userInfo', userInfo);
                  uni.$emit('userInfoUpdated', userInfo);
                  console.log('更新后的关注计数:', userInfo.followCount);
                } catch (countError) {
                  console.error('更新关注计数失败:', countError);
                }
                uni.showToast({
                  title: _this10.isFollowing ? '已关注' : '已取消关注',
                  icon: 'success'
                });
                _context10.next = 20;
                break;
              case 17:
                // 如果API失败，恢复到原来的状态
                _this10.isFollowing = previousFollowState;
                console.error('关注操作API返回错误:', (_result$result = result.result) === null || _result$result === void 0 ? void 0 : _result$result.msg);
                throw new Error(((_result$result2 = result.result) === null || _result$result2 === void 0 ? void 0 : _result$result2.msg) || '操作失败');
              case 20:
                _context10.next = 26;
                break;
              case 22:
                _context10.prev = 22;
                _context10.t0 = _context10["catch"](1);
                console.error('关注/取关操作失败:', _context10.t0);
                uni.showToast({
                  title: _context10.t0.message || '操作失败',
                  icon: 'none'
                });
              case 26:
                _context10.prev = 26;
                uni.hideLoading();
                return _context10.finish(26);
              case 29:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[1, 22, 26, 29]]);
      }))();
    },
    // 显示评论操作菜单
    showCommentActions: function showCommentActions(comment) {
      var _this11 = this;
      // 检查是否为评论作者或帖子作者
      var isCommentAuthor = comment.userId === this.userId;
      var isPostAuthor = this.detail.userId === this.userId;
      if (isCommentAuthor || isPostAuthor) {
        uni.showActionSheet({
          itemList: ['删除评论'],
          success: function success(res) {
            if (res.tapIndex === 0) {
              _this11.deleteComment(comment._id);
            }
          }
        });
      } else {
        // 其他用户只能举报
        uni.showActionSheet({
          itemList: ['举报'],
          success: function success(res) {
            if (res.tapIndex === 0) {
              // 处理举报逻辑
            }
          }
        });
      }
    },
    // 删除评论
    deleteComment: function deleteComment(commentId) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var confirmRes, userId, res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return new Promise(function (resolve) {
                  uni.showModal({
                    title: '确认删除',
                    content: '确定要删除这条评论吗？',
                    success: function success(res) {
                      resolve(res);
                    }
                  });
                });
              case 3:
                confirmRes = _context11.sent;
                if (confirmRes.confirm) {
                  _context11.next = 6;
                  break;
                }
                return _context11.abrupt("return");
              case 6:
                uni.showLoading({
                  title: '删除中...'
                });

                // 获取当前用户ID
                userId = uni.getStorageSync('userId');
                if (userId) {
                  _context11.next = 10;
                  break;
                }
                throw new Error('用户未登录');
              case 10:
                _context11.next = 12;
                return uniCloud.callFunction({
                  name: 'deleteComment',
                  data: {
                    commentId: commentId,
                    userId: userId,
                    postId: _this12.postId // 确保this.postId存在且正确
                  }
                });
              case 12:
                res = _context11.sent;
                console.log('删除评论结果:', res.result);
                if (!(res.result.code === 0)) {
                  _context11.next = 20;
                  break;
                }
                // 删除成功，更新评论列表
                _this12.comments = _this12.comments.filter(function (item) {
                  return item._id !== commentId;
                });

                // 更新评论计数
                if (_this12.detail.commentCount > 0) {
                  _this12.detail.commentCount -= 1;
                }
                uni.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                _context11.next = 21;
                break;
              case 20:
                throw new Error(res.result.msg || '删除失败');
              case 21:
                _context11.next = 27;
                break;
              case 23:
                _context11.prev = 23;
                _context11.t0 = _context11["catch"](0);
                console.error('删除评论失败:', _context11.t0);
                uni.showToast({
                  title: _context11.t0.message || '删除失败',
                  icon: 'none'
                });
              case 27:
                _context11.prev = 27;
                uni.hideLoading();
                return _context11.finish(27);
              case 30:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 23, 27, 30]]);
      }))();
    },
    // 点赞帖子
    handleLike: function handleLike() {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var previousLikeState, previousCount, likedPosts, res, _res$result;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (_this13.userId) {
                  _context12.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context12.abrupt("return");
              case 3:
                if (!_this13.likeLoading) {
                  _context12.next = 5;
                  break;
                }
                return _context12.abrupt("return");
              case 5:
                _this13.likeLoading = true;
                _context12.prev = 6;
                // 记录原始状态
                previousLikeState = _this13.detail.isLiked;
                previousCount = _this13.detail.likeCount || 0; // 立即更新UI
                _this13.detail.isLiked = !previousLikeState;
                _this13.detail.likeCount = Math.max(0, previousCount + (_this13.detail.isLiked ? 1 : -1));

                // 同步更新本地存储
                likedPosts = uni.getStorageSync('likedPosts') || {};
                if (_this13.detail.isLiked) {
                  likedPosts[_this13.detail._id] = {
                    isLiked: true,
                    timestamp: Date.now()
                  };
                } else {
                  if (likedPosts[_this13.detail._id]) {
                    likedPosts[_this13.detail._id].isLiked = false;
                  }
                }
                uni.setStorageSync('likedPosts', likedPosts);

                // 调用API
                _context12.next = 16;
                return uniCloud.callFunction({
                  name: 'toggleLike',
                  data: {
                    userId: _this13.userId,
                    targetId: _this13.detail._id,
                    type: 'post',
                    timestamp: Date.now() // 添加时间戳避免缓存
                  }
                });
              case 16:
                res = _context12.sent;
                if (!(res.result && res.result.code === 0)) {
                  _context12.next = 21;
                  break;
                }
                // 成功，根据服务器返回更新实际点赞数
                if (res.result.data && typeof res.result.data.likeCount === 'number') {
                  _this13.detail.likeCount = res.result.data.likeCount;
                  console.log('服务器返回的点赞数:', _this13.detail.likeCount);

                  // 如果当前是点赞列表页，同时更新列表
                  if (_this13.activeTab === 'like') {
                    _this13.loadLikeUsersWithoutUpdatingCount(_this13.detail._id);
                  }
                }
                _context12.next = 26;
                break;
              case 21:
                // 失败，恢复原始状态
                _this13.detail.isLiked = previousLikeState;
                _this13.detail.likeCount = previousCount;

                // 恢复本地存储
                if (previousLikeState) {
                  likedPosts[_this13.detail._id] = {
                    isLiked: true,
                    timestamp: Date.now()
                  };
                } else {
                  if (likedPosts[_this13.detail._id]) {
                    likedPosts[_this13.detail._id].isLiked = false;
                  }
                }
                uni.setStorageSync('likedPosts', likedPosts);
                throw new Error(((_res$result = res.result) === null || _res$result === void 0 ? void 0 : _res$result.msg) || '操作失败');
              case 26:
                _context12.next = 32;
                break;
              case 28:
                _context12.prev = 28;
                _context12.t0 = _context12["catch"](6);
                console.error('点赞操作失败:', _context12.t0);
                uni.showToast({
                  title: _context12.t0.message || '操作失败',
                  icon: 'none'
                });
              case 32:
                _context12.prev = 32;
                // 延迟一下再设置状态，避免频繁点击
                setTimeout(function () {
                  _this13.likeLoading = false;
                }, 300);
                return _context12.finish(32);
              case 35:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[6, 28, 32, 35]]);
      }))();
    },
    // 点赞评论
    likeComment: function likeComment(comment) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var previousLiked, previousCount, likedComments, newLikeState, res;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (_this14.userId) {
                  _context13.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context13.abrupt("return");
              case 3:
                if (!comment.likeLoading) {
                  _context13.next = 5;
                  break;
                }
                return _context13.abrupt("return");
              case 5:
                // 设置临时状态
                _this14.$set(comment, 'likeLoading', true);
                previousLiked = comment.isLiked;
                previousCount = comment.likeCount || 0;
                _context13.prev = 8;
                // 先更新UI状态，提供即时反馈
                _this14.$set(comment, 'isLiked', !previousLiked);
                _this14.$set(comment, 'likeCount', Math.max(0, previousCount + (!previousLiked ? 1 : -1)));

                // 添加本地存储，记住点赞状态
                likedComments = uni.getStorageSync('likedComments') || {};
                newLikeState = !previousLiked; // 更新本地存储
                likedComments[comment._id] = {
                  isLiked: newLikeState,
                  timestamp: Date.now()
                };
                uni.setStorageSync('likedComments', likedComments);

                // 添加点赞动画效果
                _this14.animateLike(comment._id);

                // 调用后端API
                _context13.next = 18;
                return uniCloud.callFunction({
                  name: 'toggleLike',
                  data: {
                    userId: _this14.userId,
                    targetId: comment._id,
                    type: 'comment',
                    isLiked: newLikeState,
                    // 明确提供当前点赞状态
                    timestamp: Date.now() // 添加时间戳避免缓存
                  }
                });
              case 18:
                res = _context13.sent;
                if (!(res.result.code !== 0)) {
                  _context13.next = 27;
                  break;
                }
                // 恢复原始状态
                _this14.$set(comment, 'isLiked', previousLiked);
                _this14.$set(comment, 'likeCount', previousCount);

                // 恢复本地存储
                likedComments[comment._id] = {
                  isLiked: previousLiked,
                  timestamp: Date.now()
                };
                uni.setStorageSync('likedComments', likedComments);
                throw new Error(res.result.msg || '操作失败');
              case 27:
                if (res.result.data) {
                  // 如果API返回了具体的点赞状态和数量，更新到UI
                  if (typeof res.result.data.isLiked === 'boolean') {
                    _this14.$set(comment, 'isLiked', res.result.data.isLiked);

                    // 同步服务器返回的状态到本地存储
                    likedComments[comment._id] = {
                      isLiked: res.result.data.isLiked,
                      timestamp: Date.now()
                    };
                    uni.setStorageSync('likedComments', likedComments);
                  }
                  if (typeof res.result.data.likeCount === 'number') {
                    _this14.$set(comment, 'likeCount', res.result.data.likeCount);
                  }
                }
              case 28:
                _context13.next = 34;
                break;
              case 30:
                _context13.prev = 30;
                _context13.t0 = _context13["catch"](8);
                console.error('评论点赞失败:', _context13.t0);
                uni.showToast({
                  title: _context13.t0.message || '操作失败',
                  icon: 'none'
                });
              case 34:
                _context13.prev = 34;
                // 延迟取消加载状态，避免UI闪烁
                setTimeout(function () {
                  _this14.$set(comment, 'likeLoading', false);
                }, 300);
                return _context13.finish(34);
              case 37:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[8, 30, 34, 37]]);
      }))();
    },
    // 点赞动画效果
    animateLike: function animateLike(commentId) {
      var _this15 = this;
      // 使用uni-app的查询API代替DOM查询
      var query = uni.createSelectorQuery().in(this);
      query.select(".comment-item[data-comment-id=\"".concat(commentId, "\"] .action-icon-small.liked")).fields({
        node: true,
        size: true
      }, function (res) {
        if (!res) return;
        // 由于无法直接操作节点，我们使用类名切换方式
        // 将对应评论项临时添加动画标记
        var comment = _this15.comments.find(function (c) {
          return c._id === commentId;
        });
        if (comment) {
          _this15.$set(comment, 'animating', true);
          setTimeout(function () {
            _this15.$set(comment, 'animating', false);
          }, 500);
        }
      }).exec();
    },
    // 切换评论排序方式
    setSortType: function setSortType(type) {
      if (this.sortType === type) return;
      this.sortType = type;
      this.sortComments();
      uni.showToast({
        title: type === 'time' ? '按时间排序' : '按热度排序',
        icon: 'none',
        duration: 1500
      });
    },
    // 排序评论列表
    sortComments: function sortComments() {
      if (!this.comments || this.comments.length <= 1) return;
      if (this.sortType === 'time') {
        // 按时间从新到旧排序
        this.comments.sort(function (a, b) {
          return new Date(b.createTime) - new Date(a.createTime);
        });
      } else {
        // 按热度排序，点赞数相同则按时间排序
        this.comments.sort(function (a, b) {
          var likeDiff = (b.likeCount || 0) - (a.likeCount || 0);
          if (likeDiff !== 0) return likeDiff;
          // 点赞数相同，按时间从新到旧排序
          return new Date(b.createTime) - new Date(a.createTime);
        });
      }
    },
    // 预览图片
    previewImage: function previewImage(index) {
      uni.previewImage({
        urls: this.detail.images,
        current: index
      });
    },
    // 预览评论图片
    previewCommentImage: function previewCommentImage(imageUrl) {
      uni.previewImage({
        urls: [imageUrl],
        current: imageUrl
      });
    },
    // 跳转到用户主页 - 使用getUserProfile云函数
    gotoUserPage: function gotoUserPage(userId) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var res;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (userId) {
                  _context14.next = 2;
                  break;
                }
                return _context14.abrupt("return");
              case 2:
                // 显示加载状态
                uni.showLoading({
                  title: '加载中...',
                  mask: true
                });
                _context14.prev = 3;
                _context14.next = 6;
                return uniCloud.callFunction({
                  name: 'getUserProfile',
                  data: {
                    userId: userId,
                    forceUpdate: true
                  },
                  timeout: 5000 // 5秒超时
                });
              case 6:
                res = _context14.sent;
                // 隐藏加载状态
                uni.hideLoading();
                if (!(res.result && res.result.code === 0 && res.result.data)) {
                  _context14.next = 12;
                  break;
                }
                // 跳转到用户页面
                uni.navigateTo({
                  url: "/pages/mine/mine?id=".concat(userId),
                  fail: function fail(err) {
                    console.error('导航到用户页面失败:', err);
                    // 尝试不同的用户页面路径
                    uni.navigateTo({
                      url: "/pages/user/user?id=".concat(userId),
                      fail: function fail(e) {
                        // 如果还是失败，显示提示
                        uni.showToast({
                          title: '用户页面暂不可用',
                          icon: 'none'
                        });
                      }
                    });
                  }
                });
                _context14.next = 13;
                break;
              case 12:
                throw new Error(res.result && res.result.msg || '获取用户信息失败');
              case 13:
                _context14.next = 20;
                break;
              case 15:
                _context14.prev = 15;
                _context14.t0 = _context14["catch"](3);
                console.error('获取用户信息或跳转失败:', _context14.t0);
                uni.hideLoading();
                uni.showToast({
                  title: _context14.t0.message || '无法访问用户页面',
                  icon: 'none'
                });
              case 20:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[3, 15]]);
      }))();
    },
    // 加载更多评论
    loadMoreComments: function loadMoreComments() {
      console.log('触发加载更多评论');

      // 检查是否已全部加载完毕或者正在加载中
      if (this.commentsFinished || this.commentsLoading || !this.hasMoreComments) {
        console.log('跳过加载更多评论:', this.commentsFinished ? '已全部加载' : this.commentsLoading ? '正在加载中' : '没有更多评论');
        return;
      }
      console.log('开始加载更多评论，当前页码:', this.commentsPage);
      // 显式传入 false 表示不是刷新，而是追加
      this.loadComments(false);
    },
    // 格式化时间
    formatTime: function formatTime(timestamp) {
      if (!timestamp) return '刚刚';
      var date = new Date(timestamp);
      var now = new Date();
      var diff = Math.floor((now - date) / 1000);
      if (diff < 60) {
        return '刚刚';
      } else if (diff < 3600) {
        return Math.floor(diff / 60) + '分钟前';
      } else if (diff < 86400) {
        return Math.floor(diff / 3600) + '小时前';
      } else if (diff < 2592000) {
        return Math.floor(diff / 86400) + '天前';
      } else {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        return "".concat(year, "-").concat(month, "-").concat(day);
      }
    },
    // 切换评论/点赞选项卡
    switchTab: function switchTab(tab) {
      if (this.activeTab === tab) return;
      this.activeTab = tab;
      if (tab === 'comment') {
        if (this.comments.length === 0) {
          this.loadComments();
        }
      } else if (tab === 'like') {
        if (this.likeUsers.length === 0) {
          // 使用不更新点赞数的版本
          this.loadLikeUsersWithoutUpdatingCount(this.detail._id);
        }
      }
    },
    // 滚动到评论区
    scrollToComments: function scrollToComments() {
      // 可以根据需要实现滚动逻辑
      // 这里使用简单的选择器查询和scrollTop设置
      var query = uni.createSelectorQuery().in(this);
      query.select('.comment-section').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
          res = _ref3[0],
          scrollRes = _ref3[1];
        if (res) {
          uni.pageScrollTo({
            scrollTop: res.top + scrollRes.scrollTop - 100,
            // 减去一点偏移量
            duration: 300
          });
        }
      });
    },
    // 加载点赞用户列表
    loadLikeUsers: function loadLikeUsers(postId) {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var retryCount, maxRetries, loadLikeUsersWithRetry;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (postId) {
                  _context16.next = 3;
                  break;
                }
                console.error('加载点赞用户失败：缺少帖子ID');
                return _context16.abrupt("return");
              case 3:
                if (!_this16.likeUsersLoading) {
                  _context16.next = 6;
                  break;
                }
                console.log('点赞用户加载中，跳过重复请求');
                return _context16.abrupt("return");
              case 6:
                _this16.likeUsersLoading = true;

                // 最多重试3次
                retryCount = 0;
                maxRetries = 3;
                loadLikeUsersWithRetry = /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
                    var res, likeUsers, incompleteUserCount, cachedLikeUsers;
                    return _regenerator.default.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            _context15.prev = 0;
                            console.log("\u5F00\u59CB\u52A0\u8F7D\u70B9\u8D5E\u7528\u6237\u5217\u8868\uFF0C\u5E16\u5B50ID: ".concat(postId, ", \u7B2C").concat(retryCount + 1, "\u6B21\u5C1D\u8BD5"));
                            if (retryCount === 0) {
                              uni.showLoading({
                                title: '加载中...',
                                mask: true
                              });
                            }
                            _context15.next = 5;
                            return uniCloud.callFunction({
                              name: 'getLikeUsers',
                              data: {
                                postId: postId,
                                type: 'post',
                                timestamp: Date.now() // 添加时间戳避免缓存
                              },

                              timeout: 10000 // 10秒超时
                            });
                          case 5:
                            res = _context15.sent;
                            console.log('获取点赞用户结果:', JSON.stringify(res.result));
                            if (!(res.result && res.result.code === 0)) {
                              _context15.next = 26;
                              break;
                            }
                            // 确保likeUsers是数组并且检查每个用户信息是否完整
                            likeUsers = Array.isArray(res.result.data) ? res.result.data : []; // 检查是否为备用数据
                            if (res.result.isBackupData) {
                              console.log('收到备用数据，用户信息可能不完整');
                            }

                            // 检查并日志记录有问题的用户数据
                            incompleteUserCount = 0;
                            likeUsers.forEach(function (user, index) {
                              if (!user.nickname || user.nickname === '用户' || !user.avatar) {
                                incompleteUserCount++;
                                console.warn("\u70B9\u8D5E\u7528\u6237 ".concat(index + 1, " \u6570\u636E\u4E0D\u5B8C\u6574:"), JSON.stringify(user));
                              }
                            });

                            // 如果发现过多不完整的用户且未到达最大重试次数，则重试
                            if (!(incompleteUserCount > likeUsers.length / 2 && retryCount < maxRetries - 1)) {
                              _context15.next = 20;
                              break;
                            }
                            console.log("\u53D1\u73B0".concat(incompleteUserCount, "\u4E2A\u4E0D\u5B8C\u6574\u7528\u6237\u6570\u636E\uFF0C\u51C6\u5907\u91CD\u8BD5"));
                            retryCount++;

                            // 延迟重试，避免过快请求
                            _context15.next = 17;
                            return new Promise(function (resolve) {
                              return setTimeout(resolve, 1000);
                            });
                          case 17:
                            _context15.next = 19;
                            return loadLikeUsersWithRetry();
                          case 19:
                            return _context15.abrupt("return", _context15.sent);
                          case 20:
                            _this16.likeUsers = likeUsers;
                            console.log('点赞用户列表最终长度:', _this16.likeUsers.length);

                            // 同步点赞计数 (从服务器返回的实际数量)
                            if (typeof res.result.likeCount === 'number') {
                              console.log('从服务器同步点赞数量:', res.result.likeCount);
                              _this16.detail.likeCount = res.result.likeCount;
                            }
                            // 如果没有明确返回点赞计数，则使用列表长度
                            else if (_this16.likeUsers.length !== _this16.detail.likeCount) {
                              console.log('使用列表长度同步点赞数量: 从', _this16.detail.likeCount, '到', _this16.likeUsers.length);
                              _this16.detail.likeCount = _this16.likeUsers.length;
                            }

                            // 缓存点赞用户数据到本地，有效期10分钟
                            try {
                              uni.setStorageSync("likeUsers_".concat(postId), {
                                data: _this16.likeUsers,
                                timestamp: Date.now(),
                                count: _this16.likeUsers.length
                              });
                            } catch (storageError) {
                              console.error('缓存点赞用户数据失败:', storageError);
                            }
                            _context15.next = 27;
                            break;
                          case 26:
                            throw new Error(res.result && res.result.msg || '获取点赞用户失败');
                          case 27:
                            _context15.next = 43;
                            break;
                          case 29:
                            _context15.prev = 29;
                            _context15.t0 = _context15["catch"](0);
                            console.error('获取点赞用户出错:', _context15.t0);

                            // 检查是否还有重试机会
                            if (!(retryCount < maxRetries - 1)) {
                              _context15.next = 40;
                              break;
                            }
                            console.log("\u7B2C".concat(retryCount + 1, "\u6B21\u52A0\u8F7D\u5931\u8D25\uFF0C\u51C6\u5907\u91CD\u8BD5"));
                            retryCount++;

                            // 延迟重试，避免过快请求
                            _context15.next = 37;
                            return new Promise(function (resolve) {
                              return setTimeout(resolve, 1000 * retryCount);
                            });
                          case 37:
                            _context15.next = 39;
                            return loadLikeUsersWithRetry();
                          case 39:
                            return _context15.abrupt("return", _context15.sent);
                          case 40:
                            // 重试耗尽后，尝试从缓存加载
                            console.log('重试次数用尽，尝试从缓存加载');
                            cachedLikeUsers = uni.getStorageSync("likeUsers_".concat(postId));
                            if (cachedLikeUsers && cachedLikeUsers.data && Array.isArray(cachedLikeUsers.data) && Date.now() - cachedLikeUsers.timestamp < 10 * 60 * 1000) {
                              // 10分钟内的缓存
                              console.log('使用缓存的点赞用户数据, 缓存时间:', new Date(cachedLikeUsers.timestamp).toLocaleString());
                              _this16.likeUsers = cachedLikeUsers.data;

                              // 如果缓存的数量与当前显示不同，更新显示
                              if (cachedLikeUsers.count !== _this16.detail.likeCount) {
                                console.log('从缓存更新点赞数:', cachedLikeUsers.count);
                                _this16.detail.likeCount = cachedLikeUsers.count;
                              }
                            } else {
                              // 缓存不可用或过期，显示空列表
                              _this16.likeUsers = [];
                              uni.showToast({
                                title: '获取点赞用户失败',
                                icon: 'none'
                              });
                            }
                          case 43:
                            _context15.prev = 43;
                            uni.hideLoading();
                            _this16.likeUsersLoading = false;
                            return _context15.finish(43);
                          case 47:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15, null, [[0, 29, 43, 47]]);
                  }));
                  return function loadLikeUsersWithRetry() {
                    return _ref4.apply(this, arguments);
                  };
                }(); // 开始加载，包含重试逻辑
                _context16.next = 12;
                return loadLikeUsersWithRetry();
              case 12:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }))();
    },
    // 添加新方法：同步点赞数量到服务器
    syncLikeCount: function syncLikeCount(postId, actualCount) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return uniCloud.callFunction({
                  name: 'syncLikeCount',
                  data: {
                    postId: postId,
                    actualCount: actualCount,
                    timestamp: Date.now()
                  }
                });
              case 3:
                console.log('点赞数量同步成功');
                _context17.next = 9;
                break;
              case 6:
                _context17.prev = 6;
                _context17.t0 = _context17["catch"](0);
                console.error('同步点赞数量失败:', _context17.t0);
              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[0, 6]]);
      }))();
    },
    // 滚动到特定评论
    scrollToComment: function scrollToComment(commentId) {
      var _this17 = this;
      console.log('尝试滚动到评论:', commentId);
      // 创建选择器
      var query = uni.createSelectorQuery().in(this);

      // 查找所有评论项
      query.selectAll('.comment-item').boundingClientRect(function (rects) {
        if (!rects || rects.length === 0) return;

        // 找到目标评论的索引
        var targetIndex = _this17.comments.findIndex(function (comment) {
          return comment._id === commentId;
        });
        if (targetIndex !== -1 && rects[targetIndex]) {
          var commentTop = rects[targetIndex].top;

          // 滚动到评论位置
          uni.pageScrollTo({
            scrollTop: commentTop - 100,
            // 减去一点偏移量，确保评论完全可见
            duration: 300
          });

          // 高亮显示评论
          _this17.highlightComment(commentId);
        }
      }).exec();
    },
    // 高亮特定评论
    highlightComment: function highlightComment(commentId) {
      var _this18 = this;
      this.highlightedCommentId = commentId;

      // 3秒后取消高亮
      setTimeout(function () {
        _this18.highlightedCommentId = '';
      }, 3000);
    },
    // 格式化评论内容，处理@标记
    formatCommentContent: function formatCommentContent(content) {
      if (!content) return '';

      // 替换@用户为高亮样式
      return content.replace(/@([^\s]+)/g, '<text class="mention-text">@$1</text>');
    },
    // 处理评论输入框中的@符号
    handleCommentInput: function handleCommentInput(e) {
      var content = e.detail.value;
      var lastChar = content[content.length - 1];

      // 当用户输入@时，显示用户搜索框
      if (lastChar === '@') {
        this.showUserSearchBox = true;
        this.userSearchKeyword = '';
        this.searchUsers('');
      }
    },
    // 搜索用户
    searchUsers: function searchUsers(keyword) {
      var _this19 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        var res;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _this19.userSearchLoading = true;
                _context18.prev = 1;
                _context18.next = 4;
                return uniCloud.callFunction({
                  name: 'searchUsers',
                  data: {
                    keyword: keyword,
                    limit: 10
                  }
                });
              case 4:
                res = _context18.sent;
                if (res.result.code === 0) {
                  _this19.userSearchResults = res.result.data || [];
                } else {
                  _this19.userSearchResults = [];
                }
                _context18.next = 12;
                break;
              case 8:
                _context18.prev = 8;
                _context18.t0 = _context18["catch"](1);
                console.error('搜索用户失败:', _context18.t0);
                _this19.userSearchResults = [];
              case 12:
                _context18.prev = 12;
                _this19.userSearchLoading = false;
                return _context18.finish(12);
              case 15:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[1, 8, 12, 15]]);
      }))();
    },
    // 处理用户搜索关键词变化
    handleUserSearchInput: function handleUserSearchInput(e) {
      this.userSearchKeyword = e.detail.value;
      this.searchUsers(this.userSearchKeyword);
    },
    // 选择要@的用户
    selectUserToMention: function selectUserToMention(user) {
      // 添加到输入框中，只显示昵称
      if (this.$refs.commentInput) {
        // 获取当前输入框内容
        var currentContent = this.$refs.commentInput.value || '';
        // 找到最后一个@的位置
        var lastAtPos = currentContent.lastIndexOf('@');
        if (lastAtPos !== -1) {
          // 替换@后的内容为选中的用户昵称
          var newContent = currentContent.substring(0, lastAtPos) + '@' + user.nickname + ' ';
          this.$refs.commentInput.value = newContent;

          // 记录已@的用户，包含ID信息
          this.mentionedUsers.push({
            id: user._id,
            nickname: user.nickname,
            position: lastAtPos
          });
        }
      }

      // 关闭搜索框
      this.showUserSearchBox = false;
    },
    // 添加一个辅助方法
    checkRendering: function checkRendering() {
      console.log('渲染检查:');
      console.log('当前标签页:', this.activeTab);
      console.log('评论加载状态:', this.commentsLoading);
      console.log('评论数量:', this.comments.length);
      console.log('点赞用户数量:', this.likeUsers.length);
      if (this.comments.length === 0 && !this.commentsLoading) {
        console.log('评论列表为空，尝试重新加载');
        this.loadComments(this.postId, true);
      }
    },
    // 添加调试辅助方法
    debugComments: function debugComments() {
      console.log('========== 评论调试信息 ==========');
      console.log('活动标签:', this.activeTab);
      console.log('评论数组长度:', this.comments.length);
      console.log('评论加载状态:', this.commentsLoading);
      console.log('评论数据:', JSON.stringify(this.comments));
      console.log('=================================');

      // 检查触发条件
      var showLoading = this.commentsLoading && !this.comments.length;
      var showEmpty = !this.commentsLoading && !this.comments.length;
      var showList = !this.commentsLoading && this.comments.length > 0;
      console.log('显示状态:', {
        显示加载中: showLoading,
        显示空状态: showEmpty,
        显示评论列表: showList
      });
    },
    // 添加到methods中，帮助排查问题
    debugState: function debugState() {
      console.log('========== 当前状态信息 ==========');
      console.log('页面状态:', {
        activeTab: this.activeTab,
        isDetailLoading: this.isDetailLoading,
        hasInitialized: this.hasInitialized,
        commentsLoaded: this.commentsLoaded
      });
      console.log('评论状态:', {
        总数: this.comments.length,
        加载中: this.commentsLoading,
        当前页: this.commentsPage,
        全部加载完毕: this.commentsFinished
      });
      console.log('点赞状态:', {
        总数: this.likeUsers.length,
        加载中: this.likeUsersLoading
      });
      console.log('====================================');
    },
    // 添加调试辅助方法
    debugCommentData: function debugCommentData() {
      if (this.comments.length === 0) {
        uni.showToast({
          title: '没有评论可供调试',
          icon: 'none'
        });
        return;
      }
      var firstComment = this.comments[0];
      var debugInfo = {
        id: firstComment._id,
        content: firstComment.content,
        hasContent: !!firstComment.content,
        contentLength: firstComment.content ? firstComment.content.length : 0,
        userInfo: firstComment.userInfo
      };
      console.log('评论调试信息:', debugInfo);

      // 显示弹窗
      uni.showModal({
        title: '评论调试信息',
        content: JSON.stringify(debugInfo, null, 2),
        showCancel: false
      });
    },
    // 添加图片错误处理方法
    handleImageError: function handleImageError(comment) {
      console.log("\u56FE\u7247\u52A0\u8F7D\u5931\u8D25: ".concat(comment.image));
      comment.imageLoadError = true;
      // 可以在这里添加重试逻辑或错误提示
    },
    // 辅助方法：验证图片URL
    validateImageUrl: function validateImageUrl(url) {
      if (!url) return false;

      // 基本URL格式验证
      var isValidUrl = /^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(url);

      // 检查是否为常见图片格式
      var isImageExtension = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);
      return isValidUrl && isImageExtension;
    },
    // 添加调试辅助方法
    debugCommentImages: function debugCommentImages() {
      console.log('===== 评论图片调试 =====');
      this.comments.forEach(function (comment, index) {
        var _comment$content;
        console.log("\u8BC4\u8BBA ".concat(index + 1, ":"), {
          id: comment._id,
          userId: comment.userId,
          content: (_comment$content = comment.content) === null || _comment$content === void 0 ? void 0 : _comment$content.substring(0, 20),
          hasImage: !!comment.image
        });
      });

      // 向用户展示统计信息
      uni.showModal({
        title: '评论图片统计',
        content: "\u8BC4\u8BBA\u603B\u6570: ".concat(this.comments.length, "\n\u6709\u56FE\u7247\u8BC4\u8BBA: ").concat(this.comments.filter(function (c) {
          return !!c.image;
        }).length),
        showCancel: false
      });
    },
    // 添加到methods中
    logCommentImages: function logCommentImages() {
      // 遍历comments并输出所有带图片属性的评论
      console.log('==== 所有评论图片信息 ====');
      var hasImages = false;
      this.comments.forEach(function (comment, index) {
        if (comment.image) {
          hasImages = true;
          console.log("\u8BC4\u8BBA".concat(index + 1, ":"), {
            id: comment._id,
            图片URL: comment.image,
            正文: comment.content ? comment.content.substring(0, 20) : '无内容'
          });
        }
      });
      if (!hasImages) {
        console.log('没有评论包含图片属性');
      }

      // 获取comment_images表数据
      uniCloud.callFunction({
        name: 'admin',
        data: {
          action: 'getTableData',
          table: 'comment_images',
          limit: 10
        }
      }).then(function (res) {
        console.log('comment_images表数据:', res.result);
      }).catch(function (err) {
        console.error('获取comment_images表数据失败:', err);
      });
    },
    // 在methods中添加调试方法
    debugImageRendering: function debugImageRendering() {
      console.log('===== 评论图片渲染调试 =====');

      // 检查所有评论
      this.comments.forEach(function (comment, index) {
        var _comment$content2;
        console.log("\u8BC4\u8BBA ".concat(index + 1, ":"), {
          id: comment._id,
          content: ((_comment$content2 = comment.content) === null || _comment$content2 === void 0 ? void 0 : _comment$content2.substring(0, 20)) + '...',
          hasImage: !!comment.image,
          imageURL: comment.image
        });
      });

      // 检查有图片属性的评论
      var commentsWithImageProp = this.comments.filter(function (c) {
        return !!c.image;
      });
      console.log("\u6709image\u5C5E\u6027\u7684\u8BC4\u8BBA: ".concat(commentsWithImageProp.length, "/").concat(this.comments.length));

      // 测试图片URL是否可访问
      if (commentsWithImageProp.length > 0) {
        var firstImage = commentsWithImageProp[0].image;
        console.log("\u7B2C\u4E00\u5F20\u56FE\u7247URL: ".concat(firstImage));

        // 创建一个图片对象测试URL有效性
        var img = new Image();
        img.onload = function () {
          return console.log('图片URL有效，可以加载');
        };
        img.onerror = function () {
          return console.log('图片URL无效，无法加载');
        };
        img.src = firstImage;
      }
    },
    // 刷新点赞状态
    refreshLikeState: function refreshLikeState() {
      var _this20 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19() {
        var res, isLiked;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                if (!(!_this20.userId || !_this20.detail || !_this20.detail._id)) {
                  _context19.next = 3;
                  break;
                }
                return _context19.abrupt("return");
              case 3:
                _context19.next = 5;
                return uniCloud.callFunction({
                  name: 'checkLikeStatus',
                  data: {
                    userId: _this20.userId,
                    targetId: _this20.detail._id,
                    type: 'post',
                    timestamp: Date.now()
                  }
                });
              case 5:
                res = _context19.sent;
                if (res.result && res.result.code === 0) {
                  // 只更新点赞状态，不改变点赞数量
                  isLiked = !!res.result.data.isLiked; // 只有当状态不同时才更新
                  if (_this20.detail.isLiked !== isLiked) {
                    console.log('更新点赞状态:', isLiked);
                    _this20.detail.isLiked = isLiked;
                  }
                }
                _context19.next = 12;
                break;
              case 9:
                _context19.prev = 9;
                _context19.t0 = _context19["catch"](0);
                console.error('刷新点赞状态失败:', _context19.t0);
              case 12:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[0, 9]]);
      }))();
    },
    // 新增方法：专门获取帖子的点赞数
    fetchPostLikeCount: function fetchPostLikeCount() {
      var _this21 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20() {
        var res;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (_this21.postId) {
                  _context20.next = 2;
                  break;
                }
                return _context20.abrupt("return");
              case 2:
                _context20.prev = 2;
                _context20.next = 5;
                return uniCloud.callFunction({
                  name: 'getPostDetail',
                  data: {
                    postId: _this21.postId,
                    userId: _this21.userId,
                    fields: ['likeCount'] // 只获取点赞数
                  }
                });
              case 5:
                res = _context20.sent;
                if (res.result && res.result.code === 0 && res.result.data) {
                  // 更新点赞计数
                  if (typeof res.result.data.likeCount === 'number') {
                    console.log('从帖子详情获取到点赞数:', res.result.data.likeCount);
                    _this21.detail.likeCount = res.result.data.likeCount;
                  }
                }
                _context20.next = 12;
                break;
              case 9:
                _context20.prev = 9;
                _context20.t0 = _context20["catch"](2);
                console.error('获取帖子点赞数失败:', _context20.t0);
              case 12:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[2, 9]]);
      }))();
    },
    // 添加同步点赞状态的新方法
    syncLikeStateFromStorage: function syncLikeStateFromStorage() {
      if (!this.detail || !this.detail._id) return;
      try {
        var likedPosts = uni.getStorageSync('likedPosts') || {};
        var storedLikeState = likedPosts[this.detail._id];

        // 如果本地有存储的点赞状态且时间不超过24小时
        if (storedLikeState && Date.now() - storedLikeState.timestamp < 24 * 60 * 60 * 1000) {
          // 使用存储的点赞状态
          this.detail.isLiked = true;
          // 为了确保数据一致性，这里不直接使用存储的点赞数量
        } else if (this.detail._id) {
          // 从服务器刷新点赞状态
          this.refreshLikeState();
        }
      } catch (error) {
        console.error('同步点赞状态失败:', error);
      }
    },
    // 处理用户头像加载错误
    handleUserAvatarError: function handleUserAvatarError(user) {
      if (user) {
        // 只设置默认头像
        user.avatar = '/static/images/default-avatar.png';

        // 记录问题，但不尝试更新
        console.warn("\u7528\u6237 ".concat(user._id, " \u5934\u50CF\u52A0\u8F7D\u5931\u8D25"));
      }
    },
    // 在methods中添加
    debugFollowStatus: function debugFollowStatus() {
      var _this$detail3,
        _this$detail3$userInf,
        _this$detail4,
        _this$detail4$userInf,
        _this22 = this;
      console.log('=== 关注状态调试 ===');
      console.log('当前用户ID:', this.userId);
      console.log('帖子作者ID:', (_this$detail3 = this.detail) === null || _this$detail3 === void 0 ? void 0 : (_this$detail3$userInf = _this$detail3.userInfo) === null || _this$detail3$userInf === void 0 ? void 0 : _this$detail3$userInf._id);
      console.log('当前关注状态:', this.isFollowing);

      // 检查本地存储
      var followedUsers = uni.getStorageSync('followedUsers') || {};
      var storedState = followedUsers[(_this$detail4 = this.detail) === null || _this$detail4 === void 0 ? void 0 : (_this$detail4$userInf = _this$detail4.userInfo) === null || _this$detail4$userInf === void 0 ? void 0 : _this$detail4$userInf._id];
      console.log('本地存储的关注状态:', storedState);

      // 强制刷新关注状态
      this.checkFollowStatus().then(function () {
        console.log('关注状态刷新后:', _this22.isFollowing);
        uni.showToast({
          title: _this22.isFollowing ? '已关注' : '未关注',
          icon: 'none'
        });
      });
    },
    // 同步点赞状态到服务器
    syncLikeStatus: function syncLikeStatus(commentId, isLiked) {
      var _this23 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21() {
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                console.log("\u540C\u6B65\u8BC4\u8BBA\u70B9\u8D5E\u72B6\u6001: \u8BC4\u8BBAID=".concat(commentId, ", \u70B9\u8D5E=").concat(isLiked));
                _context21.next = 4;
                return uniCloud.callFunction({
                  name: 'toggleLike',
                  data: {
                    userId: _this23.userId,
                    targetId: commentId,
                    type: 'comment',
                    isLiked: isLiked,
                    // 明确指定点赞状态
                    timestamp: Date.now()
                  }
                });
              case 4:
                console.log("\u540C\u6B65\u8BC4\u8BBA\u70B9\u8D5E\u72B6\u6001\u6210\u529F: \u8BC4\u8BBAID=".concat(commentId));
                _context21.next = 10;
                break;
              case 7:
                _context21.prev = 7;
                _context21.t0 = _context21["catch"](0);
                console.error('同步评论点赞状态失败:', _context21.t0);
              case 10:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[0, 7]]);
      }))();
    },
    // 在methods对象中添加
    editPost: function editPost() {
      uni.navigateTo({
        url: "/pages/publish/publish?id=".concat(this.detail._id, "&edit=1")
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 76:
/*!***********************************************************************!*\
  !*** H:/测试小程序/pages/task/detail.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&lang=css& */ 77);
/* harmony import */ var _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 77:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/测试小程序/pages/task/detail.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[70,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/task/detail.js.map