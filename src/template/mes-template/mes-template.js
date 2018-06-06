var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mesData: {
      type: Object,
      value: {}
    },
    type: {
      type: String,
      value: 'message'
    },
    num: {
      type: String,
      value: ''
    }
  },
  data: {
    curName: ''
  },
  ready () {
    console.log(this.properties.type)
    this.setData({
      curName: app.data.nickName
    })
  },
  methods: {
    tapDelete (e) {
      this.triggerEvent('click_delete', { id: e.currentTarget.dataset.mesId })
    }
  }
})
