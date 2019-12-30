// pages/Coupons/Coupons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    current: 'tab1',
  },
  // tab栏
  handleChange({detail}) {
    this.setData({
      current: detail.key
    });
=======
    current: 0,
    title:[{text:'未使用'},{text:'已使用'},{text:'已过期'}],
    getListByWaresId: [],//优惠劵列表

  },
  // tab栏
  changetbs(e){

    console.log(e)
    this.setData({
      current: e.currentTarget.dataset.index
    })
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
<<<<<<< HEAD
    // 头部标题
    wx.setNavigationBarTitle({
      title: '优惠券'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

=======
   
    this.getListByWaresId()
  },
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
<<<<<<< HEAD

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
=======
  getListByWaresId(){
    wx.request({
      // url: 'http://192.168.2.98:9095/',
    })
  }

>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
})