var app = getApp()

Page({
  goMyCollect () {
    wx.navigateTo({
      url: '../mycollect/mycollect'
    })
  },
  goMymes () {
    wx.navigateTo({
      url: '../mymes/mymes'
    })
  },
  contact () {
    wx.showActionSheet({
      itemList: [
        '微信',
        '邮箱'
      ],
      success (res) {
        switch (res.tapIndex) {
          case 0: 
            wx.previewImage({
              urls: [`${app.data.imgBase}/me.jpg`]
            })
            break
          case 1:
            wx.showModal({
              title: '邮箱联系',
              content: '可以发邮件至 xiao9971@126.com 与我联系~',
              showCancel: false
            })
            break
          default:
            break
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage (options) {
    if (options.from === 'button') {
      return {
        title: '七小影',
        path: '/pages/movies/movies',
        success (res) {
          wx.showShareMenu({
            withShareTicket: true
          })
        },
        fail () {
          console.log('share fail')
        }
      }
    }
  }
})