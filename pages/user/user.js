// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.login({
      success: function(res) {
        console.log(res, 123)
        if (res.code) {
          // 发送请求
          wx.request({
            // 微信登录
            url: 'http://192.168.2.98:9095//api/wechat/auth',
            data: {
              code: res.code
            },
            method: "get",
            success: function(res) {
              if (res.data.code == 0) {
                var token = res.data.msg;
                // 获取用户信息
                wx.getUserInfo({
                  success: function(res) {
                    console.log(res, 456)
                    var userInfo = res.userInfo //用户信息
                    wx.request({
                      // 用户信息
                      url: 'http://192.168.2.98:9095/api/wechat/updateUserInfo',
                      method: "post",
                      data: res.userInfo,
                      header: {
                        'token': token, //请求头携带参数
                        'content-type': 'application/json',
                      },
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  // 用户信息
  handlegetuserinfo(e) {
    // console.log(e, 123)
  },
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
})