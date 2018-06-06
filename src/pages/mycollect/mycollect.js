var utils = require("../../utils/utils.js")
var app = getApp()

Page({
  data: {
    movies: [],
    requestUrl: '',
    totalCount: 0
  },

  onLoad () {
    var _this = this
    var dataUrl = app.data.base + '/movie/collect'
    _this.setData({
      requestUrl: dataUrl
    })
    wx.getStorage({
      key: 'collect',
      success(res) {
        wx.request({
            url: dataUrl,
            method: 'POST',
            data: {
              collects: res.data,
              start: 0,
              count: 10
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function (ref) {
              // success
              _this.adjust(ref.data)
            },
            fail: function () {
                console.log("request fail")
            }
        })
      },
      fail(err){
        wx.setStorage({
          key: 'collect',
          data: JSON.stringify([])
        })
      }
    })
  },

  adjust (data) {
    var result = []
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
      result.push(perMovie)
    })
  // 绑定新加载的数据，先判断原来的数据是否为空
    var totalMovies = this.data.movies.concat(result)
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 10;
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  // 跳转到电影详情
  goDetail (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../detail/detail?id=' + movieId
    })
  }

})