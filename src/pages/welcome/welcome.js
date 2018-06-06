var app = getApp()

Page({
  onLoad () {
    
  },
  userInfoHandler () {
    wx.getUserInfo({
      success (res) {
        app.data.nickName = res.userInfo.nickName
        app.data.avatarUrl = res.userInfo.avatarUrl
        wx.switchTab({
          url: '../movies/movies'
        })
      },
      fail() {
        failCb()
      }
    })
  }
})