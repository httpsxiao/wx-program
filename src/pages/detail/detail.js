var utils = require("../../utils/utils.js")
var app = getApp()

Page({
  data: {
    movie: {}
  },
  onLoad (options) {
    var movieId = options.id
    var url = app.data.base + '/movie/detail?id=' + movieId
    utils.http(url, this.adjust)
  },

  adjust (data) {
    // 如果没有数据返回则直接return
    if (!data) {
      return
    }

    // 有数据传回，进行处理
    var item = data[0]

    var movie = {
      movieImg: '../../images/movies/' + item.image + '.jpg',
      country: item.country,
      title: item.title,
      wishCount: item.wish_count,
      commentCount: item.comments_count,
      year: item.year,
      genres: item.genres,
      stars: utils.convertToStarsArray(item.stars),
      average: item.average,
      director: item.director,
      casts: item.casts,
      summary: item.summary
    };
    this.setData({
      movie: movie
    })
  },

// 图片预览
  viewMoviePostImg (event) {
    var src = event.currentTarget.dataset.src
    wx.previewImage({
      current: src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src] // 预览图片的链接列表
    })
  }
})