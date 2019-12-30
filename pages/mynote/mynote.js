// pages/mynote/mynote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // tab栏
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
<<<<<<< HEAD

=======
    // 头部标题
    wx.setNavigationBarTitle({
      title: '我的试用'
    })
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  },
})