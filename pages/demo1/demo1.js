Page({
  data: {
    orderInfo: {}
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'orderInfo',
      success: function (res) {
        that.setData({
          orderInfo: res.data
        })
      }
    })
  }
})