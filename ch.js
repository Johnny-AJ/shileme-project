// 微信登录
wx.login({
  success: function(res) {
    if (res.code) {
      // 发送请求
      wx.request({
        url: appconfig.apiUrl + '/api/wechat/auth',

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
              }),
              wx.request({
                // 支付地址
                // url: 'http://192.168.2.119:9095/api/wx/pay/weixinPay',
                method: "get",
                header: {
                  'token': token, //请求头携带参数
                },
                success: function(res) {
                  // console.log(res)
                  // 微信支付
                  wx.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                  })
                }
              })
          }
        }
      })
    }
  }
})





// 用户当前设置
wx.getSetting({
  success: (res) => {
    // 授权结果
    if (res.authSetting["scope.userInfo"]) {
      // 获取用户信息
      wx.getUserInfo({
        success: (res) => {
          // console.log(res)
          this.globaData.userInfo = res.userInfo;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        },
        // 失败回调
        fail: (res) => {
          // 重定向到登录页
          wx.redirectTo({
            url: '"pages/login/login"',
          })
        }
      })
    }
  }
})