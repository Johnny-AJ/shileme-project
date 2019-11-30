//app.js
App({
  // 全局数据
  globaData: {
    userInfo: null,
  },
  onLaunch: function() {
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
              wx.showModal({
                title: '获取用户失败'
                // content: 'pages/login/login',
              })
            }
          })
        }
      }
    })
  }
})