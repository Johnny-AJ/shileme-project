// pages/shipping/shipping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户地址
    footprint: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 头部标题
    wx.setNavigationBarTitle({
      title: '收货地址'
    })
  },

  // 点击删除
  handdelete(e) {
    // 弹框提示
    wx.showModal({
      title: '提示',
      content: '确定删除此地址嘛？',
      success: (res) => {
        if (res.confirm) {
          // console.log("删除成功")
          this.data.footprint.splice(e.currentTarget.dataset.index, 1) //根据数组数据，删除一个并返回新数组
          this.setData({
            footprint: this.data.footprint
          })
        } else if (res.cancel) {
          console.log("取消删除")
        }
      }
    })
  },

  // 路劲封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  // 默认地址按钮
  radioChange(e) {
    console.log(e)
  }
})