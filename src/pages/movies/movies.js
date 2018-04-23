var utils = require("../../utils/utils.js");
var app = getApp();

Page({
  data:{
    hot:{},
    soon:{},
    top:{}
  },
  onLoad: function (event) {
    var queryStr = '?start=0&count=3';
    var hotUrl = app.data.base + '/movie/type/hot' + queryStr;
    var soonUrl = app.data.base + '/movie/type/soon' + queryStr;
    var topUrl = app.data.base + '/movie/type/top' + queryStr;

    this.getMovie(hotUrl, 'hot', '热映中');
    // this.getMovie(soonUrl, 'soon', '将上映');
    // this.getMovie(topUrl, 'top', '排名榜');
  },

  getMovie: function (url, type, desc) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.adjust(res.data, type, desc)
      },
      fail: function () {
        console.log("request fail");
      }
    })
  },

  adjust: function (data, type, desc) {
    var movies = [];
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
      movies.push(perMovie);
    })

    var list = {};
    list[type] = {
      desc: desc,
      movies: movies
    };
    this.setData(list);
  },

// 点击更多
  goMore: function (event) {
    var type = event.currentTarget.dataset.desc;
    wx.navigateTo({
      url: "../more/more?type="+ type
    })
  },

// 点击搜索框时
  // onBindFocus:function(event){
  //   this.setData({
  //     containerShow:false,
  //     searchPanelShow:true
  //   })
  // },

// 点击x取消搜索
  // onCancelImgTap:function(event){
  //   this.setData({
  //     containerShow:true,
  //     searchPanelShow:false,
  //     searchResult:{}
  //   })
  // },

// 搜索输入确定
  // onBindConfirm:function(event){
  //   var text=event.detail.value;
  //   var searchUrl=app.globalData.doubanBase + "/v2/movie/search?q="+text;
  //   this.getMovieListData(searchUrl,"searchResult","")
  // },

// 跳转到电影详情
  goDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../detail/detail?id=' + movieId
    })
  }
})