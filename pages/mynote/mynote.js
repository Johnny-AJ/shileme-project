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

  },
})