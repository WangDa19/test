Component({
  data: {
    list: [
      { pagePath: "/pages/index/index", text: "首页" },
      { pagePath: "/pages/message/message", text: "消息" },
      { pagePath: "/pages/task/task", text: "任务" },
      { pagePath: "/pages/mine/mine", text: "我的" }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path

      if (data.index === '-1') {
        wx.navigateTo({
          url: '/pages/publish/publish'
        })
        return
      }

      wx.switchTab({ url })
    }
  }
}) 