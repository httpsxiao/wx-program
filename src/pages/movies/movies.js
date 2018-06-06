var utils = require("../../utils/utils.js");
var app = getApp();
Page({
  data:{
    hot: [],
    soon: [],
    top: []
  },
  onLoad: function (event) {
    var queryStr = '?start=0&count=3'
    var hotUrl = app.data.base + '/movie/type/hot' + queryStr
    var soonUrl = app.data.base + '/movie/type/soon' + queryStr
    var topUrl = app.data.base + '/movie/type/top' + queryStr

    this.getMovie(hotUrl, 'hot')
    this.getMovie(soonUrl, 'soon')
    this.getMovie(topUrl, 'top')
  },

  getMovie: function (url, type) {
    var _this = this
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        _this.adjust(res.data, type)
      },
      fail: function () {
        console.log("request fail")
      }
    })
  },

  adjust: function (data, type) {
    var movies = []
    data.forEach(function(item) {
      var title = item.title
      // 格式化title
      if (title.length >= 6) {
        title = title.slice(0, 6) + '...'
      }
      var perMovie = {
        title: title,
        average: item.average,
        coverageUrl: app.data.imgBase + '/movies/' + item.id + '.jpg',
        movieId: item.id,
        stars: utils.convertToStarsArray(item.stars)
      } 
      movies.push(perMovie)
    })

    this.setData({
      [type]: movies
    })
  },

// 点击更多
  goMore: function (event) {
    var type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: "../more/more?type="+ type
    })
  },

// 跳转到电影详情
  goDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../detail/detail?id=' + movieId
    })
  }
})