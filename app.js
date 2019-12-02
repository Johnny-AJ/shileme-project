//app.js
App({
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
  }
})