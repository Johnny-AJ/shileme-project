// pages/Collection/Collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD

=======
    collection:[],//收藏列表
    currPage: 1,
    pageSize: 10
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 头部标题
<<<<<<< HEAD
    wx.setNavigationBarTitle({
      title: '我的收藏'
    })
=======
    this.Collection()//收藏列表请求
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
<<<<<<< HEAD

=======
   
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  },

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
=======
  },
  Collection(){
    var self =this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/shop/collect/getList',
      header:{
        token:wx.getStorageSync('token')
      },
      data:{
        currPage: self.data.currPage,
        pageSize: self.data.pageSize
      },
      success:function(res){
        console.log(res)
      }

    })
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  }
})