// pages/credits/credits.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["当前积分0", "兑换记录"],
    currentIndex: '0',
    conskList: [], //积分商品列表
    token: ''
  },
  // tab栏
  handTab(e) {
    // console.log(e)
    this.setData({
      currentIndex: e.currentTarget.dataset.aa
    })
  },
  handurl1(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  waresList() { //积分商品列表
    wx.request({
      url: 'http://192.168.2.98:9095/api/integral/data/findIntegralWaresList',
      success: (res) => {
        console.log(res, "res")
        this.setData({
          conskList: res.data.data.data.list
        })
      },
      header: {
        token: wx.getStorageSync("token") //token
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.waresList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})