var utils = require("../../utils/utils.js");
var app = getApp()

Page({
  data: {
    searchPanelShow: false,
    userValue: '',
    movies: []
  },
  onInput: function (event) {
    var text = event.detail.value;
    this.setData({
      userValue: text
    })
  },
  onConfirm: function (event) {
    var text = this.data.userValue;
    var searchUrl = app.data.base + "/movie/search?q=" + text;
    utils.http(searchUrl, this.adjust);
  },
  onCancel: function (event) {
    this.setData({
      searchPanelShow: false,
      userValue: '',
      movies: []
    })
  },
  adjust: function (data) {
    if (data.length === 0) { return }
    var result = [];
    data.forEach(function(item) {
      var title = item.title;
      // 格式化title
      if (title.length >= 6) {
        title = title.slice(0, 6) + '...';
      }
      var perMovie = {
        title: title,
        average: item.average,
        coverageUrl: '../../images/movies/' + item.image + '.jpg',
        movieId: item.id,
        stars: utils.convertToStarsArray(item.stars)
      } 
      result.push(perMovie);
    })
    // 绑定新加载的数据，先判断原来的数据是否为空
    this.setData({
      searchPanelShow: true,
      movies: result
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  // 跳转到电影详情
  goDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../detail/detail?id=' + movieId
    })
  }
})