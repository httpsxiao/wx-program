App({
  data: {
    base: 'http://localhost:9999',
    nickName: '游客',
    avatarUrl: ''
  },
  onLaunch () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              this.getUserInfo()
            }
          })
        } else {
          this.getUserInfo()
        }
      }
    })
  },
  getUserInfo () {
    wx.getUserInfo({
      success (res) {
        this.data.nickName = res.userInfo.nickName
        this.data.avatarUrl = res.userInfo.avatarUrl
      },
      fail () {
      }
    })
   } 
})