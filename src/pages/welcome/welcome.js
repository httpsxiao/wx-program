Page({
  btnTap: function() {
    wx.switchTab({
      url:"../movies/movies"
    })
    // wx.navigateTo({
    //   url: "../movies/movies"
    // });
  }
})