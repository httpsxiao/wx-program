var app = getApp()

Page({
  data: {
    start: 0,
    mesList: []
  },
  onShow (options) {
    this.setData({ start: 0 })
    this.loadMes(false)
  },
  onReachBottom () {
    this.setData({ start: this.data.start + 5 })
    this.loadMes()
  },
  goWrite () {
    wx.navigateTo({
      url: '../write/write'
    })
  },
  loadMes (isAppend = true) {
    wx.showLoading({ mask: true })
    wx.request({
      url: `${app.data.base}/mes/all?start=${this.data.start}`,
      success: res => {
        wx.hideLoading()
        if (isAppend) {
          this.setData({ mesList: this.data.mesList.concat(res.data) })
        } else {
          this.setData({ mesList: res.data })
        }
      }
    })
  },
  delete (eventDetail) {
    wx.showLoading({ mask: true })
    wx.request({
      url: `${app.data.base}/mes/delete`,
      method: 'POST',
      data: {
        id: eventDetail.detail.id
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        wx.hideLoading()
        if (res.data.errno * 1 === 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
          let newList = this.data.mesList.filter(item => item.id !== eventDetail.detail.id)
          this.setData({
            start: this.data.start - 1,
            mesList: newList
          })
        }
      }
    })
  }
})