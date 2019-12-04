// pages/shipping/shipping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 删除
    delArray: []
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
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  // 删除
  handdel(e) {
    console.log(1)
    wx.showModal({
      title: '劝你别搞事情',
      content: '是否确认删除你的当前收货地址',
      success: (res) => {
        if (res.confirm) {
          console.log(2)
          this.data.delArray.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            delArray: this.data.delArray
          })
        } else if (res.cancel) {
          console.log(3)
        }
      }
    })
  }
})