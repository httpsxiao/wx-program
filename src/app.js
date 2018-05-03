App({
  data: {
    // base: 'http://localhost:9999',
    base: 'https://fuchyou.com/xiao',
    nickName: '游客',
    avatarUrl: 'https://fuchyou.com/xiao/images/leaves',
    isLogin: false
  },
  onShow () {
    let _this = this

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          _this.getUserInfo()
        } else {
          wx.showModal({
            title: '授权',
            content: '您还没有授权当前小程序，是否前往授权？',
            cancelText: '再等等',
            confirmText: '当然去',
            success (res) {
              if (res.confirm) {
                let _this = this

                wx.openSetting({
                  success(res) {
                    _this.getUserInfo()
                  }
                })
              }
              if (res.cancel) {
                wx.redirectTo({
                  url: '../welcome/welcome'
                })
              }
            }
          })
        }
      }
    })
  },
  getUserInfo () {
    let _this = this

    wx.getUserInfo({
      success (res) {
        _this.data.nickName = res.userInfo.nickName,
        wx.setStorage({
          key: 'nickName',
          data: res.userInfo.nickName
        })
        _this.data.avatarUrl = res.userInfo.avatarUrl
        wx.switchTab({
          url: '../movies/movies'
        })
      }
    })
  },
})