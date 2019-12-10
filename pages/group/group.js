// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '拼团专题'
    })
  },
})