// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: 1,
      show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 头部标题
    wx.setNavigationBarTitle({
      title: '购物车'
    })
  },
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
<<<<<<< HEAD
=======
  },
  handleChange1({ detail }) {
    this.setData({
      value1: detail.value
    })
>>>>>>> llc
  },
})