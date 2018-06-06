App({
  data: {
    // base: 'http://localhost:8888',
    base: 'https://xiaoqqq.cn',
    imgBase: 'https://www.xiaoqqq.cn/movieserver/images',
    nickName: '游客',
    avatarUrl: 'https://xiaoqqq.cn/images/leaves.png',
    isLogin: false
  },
  onShow () {
    let _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              _this.getUserInfo()
            }
          })
        } else {
          wx.redirectTo({
            url: '../welcome/welcome'
          })
        }
      }
    })
  },
  getUserInfo (failCb) {
    let _this = this

    wx.getUserInfo({
      success (res) {
        _this.data.nickName = res.userInfo.nickName,
        _this.data.avatarUrl = res.userInfo.avatarUrl
      },
      fail() {
        failCb()
      }
    })
  },
})
