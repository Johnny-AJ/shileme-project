//app.js
App({
<<<<<<< HEAD
  // 全局数据
  globaData: {
    token: '',
    userInfo: null,
    code: null
  },
  onLaunch: function() {
    var self = this;
    // 微信登录
    wx.login({
      success: res => {
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
                wx.setStorage({
                  key: 'token',
                  data: token
                })
                // 获取用户信息
                wx.getUserInfo({
                  success: function(res) {
                    // console.log(res, 456)
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
      },
    })

  },
  globalData: {
    // 定义全局请求队列
    requestQueue: [],
    // 是否正在进行登陆
    isLanding: true,
    // 购物车商品数量
    totalCartCount: 0
  },
  returnFloat: function(value) { 
    var value = Math.round(parseFloat(value) * 100) / 100; 
    var xsd = value.toString().split("."); 
    if (xsd.length == 1) { 
      value = value.toString() + ".00"; 
      return value; 
    } 
    if (xsd.length > 1) { 
      if (xsd[1].length < 2) { 
        value = value.toString() + "0"; 
      } 
      return value; 
    }
  }

=======
    // 全局数据
    globaData: {
        token: '',
        userInfo: null,
        code: null
    },
    onLaunch: function() {
        var self = this;
        // 微信登录
        wx.login({
            success: res => {
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
                                wx.setStorage({
                                        key: 'token',
                                        data: token
                                    })
                                    // 获取用户信息
                                wx.getUserInfo({
                                    success: function(res) {
                                        // console.log(res, 456)
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
            },
        })

    },
    globalData: {
        // 定义全局请求队列
        requestQueue: [],
        // 是否正在进行登陆
        isLanding: true,
        // 购物车商品数量
        totalCartCount: 0
    },
    returnFloat: function(value) { 
        var value = Math.round(parseFloat(value) * 100) / 100; 
        var xsd = value.toString().split("."); 
        if (xsd.length == 1) { 
            value = value.toString() + ".00"; 
            return value; 
        } 
        if (xsd.length > 1) { 
            if (xsd[1].length < 2) { 
                value = value.toString() + "0"; 
            } 
            return value; 
        }
    }

>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})