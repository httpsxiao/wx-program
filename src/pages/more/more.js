var utils = require("../../utils/utils.js")
var app = getApp()

Page({
  data: {
    movies: [],
    navTitle: '',
    requestUrl: '',
    totalCount: 0
  },

  onLoad (options) {
    var type = options.type
    var _this = this
    var dataUrl = ''
    var subUrl = '?start=0&count=10'

    switch (type) {
      case "hot":
        dataUrl = app.data.base + '/movie/type/hot'
        _this.setData({navTitle: '正在热映'})
        break
      case "soon":
        dataUrl = app.data.base + '/movie/type/soon'
        _this.setData({navTitle: '即将上映'})
        break
      case "top":
        dataUrl = app.data.base + '/movie/type/top'
        _this.setData({navTitle: '排名靠前'})
        break
      default:
        break
    }
    _this.setData({
      requestUrl: dataUrl
    })
    utils.http(dataUrl + subUrl, this.adjust)
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

  // 修改标题
  onReady (event) {
    wx.setNavigationBarTitle({
      title: this.data.navTitle
    })
  },

  // 上滑加载更多
  onReachBottom (event) {
    var loadmoreUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=10'
    utils.http(loadmoreUrl, this.adjust)
    wx.showNavigationBarLoading()
  },

  // 下拉刷新
  onPullDownRefresh (event) {
    var refreshUrl = this.data.requestUrl + '?start=0&count=10'
    this.setData({
      movies: []
    });
    this.data.totalCount = 0
    utils.http(refreshUrl, this.adjust)
    wx.showNavigationBarLoading()
  },

  // 跳转到电影详情
  goDetail (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../detail/detail?id=' + movieId
    })
  }

})