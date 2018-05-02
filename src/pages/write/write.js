var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    allowBtn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
  },
  addMes () {
    wx.showLoading({ mask: true })
    wx.request({
      url: `${app.data.base}/mes/add`,
      method: 'POST',
      data: {
        name: app.data.nickName,
        content: this.data.text
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        wx.hideLoading()
        if (res.data.errno * 1 === 0) {
          this.setData({
            text: '',
            allowBtn: false
          })
          wx.showToast({
            title: '留言成功',
            icon: 'success'
          })
        }
      }
    })
  },
  changeText (e) {
    this.setData({
      text: e.detail.value,
      allowBtn: this.data.text.length > 0
    })
  }
})