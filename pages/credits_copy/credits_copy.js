// pages/credits_copy/credits_copy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    conskList: [], //积分商品列表
    token: ''
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
=======

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
<<<<<<< HEAD
  onReady: function() {
=======
  onReady: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
  onShow: function() {
=======
  onShow: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
<<<<<<< HEAD
  onHide: function() {
=======
  onHide: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 生命周期函数--监听页面卸载
   */
<<<<<<< HEAD
  onUnload: function() {
=======
  onUnload: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
<<<<<<< HEAD
  onPullDownRefresh: function() {
=======
  onPullDownRefresh: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 页面上拉触底事件的处理函数
   */
<<<<<<< HEAD
  onReachBottom: function() {
=======
  onReachBottom: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 用户点击右上角分享
   */
<<<<<<< HEAD
  onShareAppMessage: function() {
=======
  onShareAppMessage: function () {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  }
})