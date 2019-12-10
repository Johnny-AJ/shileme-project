var app = getApp()
Page({
  data: {


  },
  //事件处理函数
  submitdate: function(e) {
    console.log(e, 111)
    var orderInfo = e.detail.value;
    wx.setStorage({
      key: 'orderInfo',
      data: orderInfo,
      success: function(res) {
        wx.navigateTo({
          url: '../demo1/demo1'
        })
      }
    })
  }
})