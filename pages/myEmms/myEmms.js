// pages/myEmms/myEmms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD

=======
    current: 'tab1',
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '我的拼团'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
<<<<<<< HEAD

=======
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

<<<<<<< HEAD
  }
=======
  },
  handurl: function (e) {
  // 路由封装
  wx.navigateTo({
    url: e.currentTarget.dataset.url,
  })
},
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
})