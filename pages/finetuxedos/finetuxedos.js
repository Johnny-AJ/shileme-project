// pages/finetuxedos/finetuxedos.js
Page({

<<<<<<< HEAD
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '参团详情页'
    })
  },
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
=======
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 头部标题
        wx.setNavigationBarTitle({
            title: '参团详情页'
        })
    },
    handurl: function(e) {
        // 路由封装
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        })
    },
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})