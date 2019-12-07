// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishow:true,
    show2:true,
    isok:false,
    ischecked:false,
    string1:'ddddddd'
  },
  open(){
    this.setData({
      ishow: (!this.data.ishow)
    })
  },
  ischecked(){
    this.setData({
      ischecked: (!this.data.ischecked)
    })
  },
  spread(){
    console.log(this.data.string1.length),
    this.setData({
      isok:true
    })
  }
  /**
   * 生命周期函数--监听页面加载
   */
  ,
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '评价'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {



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

  }
})