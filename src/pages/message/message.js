var app = getApp()

Page({
  data: {
    start: 0,
    mesList: []
  },

  onLoad (options) {
    wx.request({
      url: `${app.data.base}/mes/all?start=${this.start}`,
      success: res => this.setData({ mesList: res.data })
    })
  },
  onReachBottom () {
    this.setData({ start: this.data.start + 5 })
    wx.request({
      url: `${app.data.base}/mes/all?start=${this.data.start}`,
      success: res => this.setData({ mesList: this.data.mesList.concat(res.data) })
    })
  },
  goWrite () {
    wx.navigateTo({
      url: '../write/write'
    })
  }
})