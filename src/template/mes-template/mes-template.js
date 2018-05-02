var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mesData: {
      type: Object,
      value: {}
    }
  },
  data: {
    name: app.data.nickName
  },
  methods: {
    tapDelete (e) {
      this.triggerEvent('click_delete', { id: e.currentTarget.dataset.mesId })
    },
    onclick () {
      console.log(11111)
    }
  }
})
