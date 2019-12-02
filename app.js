//app.js
App({
  // 全局数据
  globaData: {
    userInfo: null,
  },
  onLaunch: function() {
    // 微信登录
    wx.login({
      success: res => {
        // console.log(res)
        if (res.code) {
          // 发送请求
          wx.request({
            url: 'http://192.168.2.119:9095/api/wechat/auth',
            method: 'get',
            data: {
              code: res.code
            }
          })
        }
      }
    })
  }
})