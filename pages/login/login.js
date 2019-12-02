// pages/login/login.js
Page({

  /**
  * 页面的初始数据
  */
  data: {
    token: '',
    userIno: {}
  },
  handgetuserInfo(e) {
    console.log(e)
    var self = this;
    wx.getStorage({
      key: 'token',
      success(res) {
        let token = res.data;
        self.setData({
          token
        })
        wx.request({
          url: 'http://192.168.2.98:9095//api/wechat/updateUserInfo',
          data: {
            userIno: e.detail.userInfo
          },
          header: {
            token: self.data.token
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      }
    })

    wx.navigateBack({
      delta: 1
    })

  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

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