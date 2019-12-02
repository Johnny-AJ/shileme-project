// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存储用户信息
    login: function() {
      if (wx.setStorageSync('key', 'token')) return;
      var that = this
      wx.login({
        sunccess: function(res) {
          if (res.code) {
            wx.request({
              url: 'http://192.168.2.119:9095/api/wechat/auth',
              data: {
                code: res.code
              },
              method: 'GET',
              success: function(res) {
                if (res.status == 'success' && res.detail.userInfo) {
                  wx.setStorageSync("token", res.detail.userInfo);
                  wx.redirectTo({
                    url: "pages/index/index",
                  })
                }
              }
            })
          }
        },
        fail: function(res) {
          console.log("网络错误");
        },
        complete: function(res) {

        }
      })
    }

  },
  // 用户信息
  handgetuserInfo(e) {
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})