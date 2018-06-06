var utils = require("../../utils/utils.js")
var app = getApp()

Page({
  data: {
    movie: {},
    isCollect: false,
    movieId: '',
  },
  onLoad (options) {
    this.setData({
      movieId: options.id
    })
    var url = app.data.base + '/movie/detail?id=' + options.id
    var _this = this
    utils.http(url, this.adjust)
    wx.getStorage({
      key: 'collect',
      success(res) {
        let data = JSON.parse(res.data)
        if (data.indexOf(options.id) > -1) {
          _this.setData({
            isCollect: true
          })
        }
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
    // 如果没有数据返回则直接return
    if (!data) {
      return
    }

    // 有数据传回，进行处理
    var item = data[0]

    var movie = {
      movieImg: app.data.imgBase + '/movies/' + item.id + '.jpg',
      country: item.country,
      title: item.title,
      wishCount: item.wish_count,
      commentCount: item.comments_count,
      year: item.year,
      genres: item.genres,
      stars: utils.convertToStarsArray(item.stars),
      average: item.average,
      date: `${item.date.slice(0,4)}-${item.date.slice(4,6)}-${item.date.slice(6)}`,
      director: item.director,
      directorImg: app.data.imgBase + '/director/' + item.id + '.jpg',
      casts: item.casts,
      summary: item.summary
    };
    this.setData({
      movie: movie
    })
  },
  collect () {
    var _this = this
    if (this.data.isCollect) {
      let data = []
      wx.getStorage({
        key: 'collect',
        success(res) {
          data = JSON.parse(res.data)
          let idx = data.indexOf(_this.data.movieId)
          data.splice(idx, 1)
          wx.setStorage({
            key: 'collect',
            data: JSON.stringify(data),
            success() {
              _this.setData({
                isCollect: false
              })
            }
          })
        }
      })
    } else {
      let data = []
      wx.getStorage({
        key: 'collect',
        success(res) {
          data = JSON.parse(res.data)
          data.push(_this.data.movieId)
          wx.setStorage({
            key: 'collect',
            data: JSON.stringify(data),
            success() {
              _this.setData({
                isCollect: true
              })
            }
          })
        }
      })
    }
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