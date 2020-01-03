Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    userIno: {}
  },
  handgetuserInfo(e) {
    // console.log(e)
    var self = this;


    wx.login({
      success: function(res) {

        wx.request({
          url: 'http://192.168.2.98:9095/api/wechat/auth',
          data: {
            code: res.code
          },
          success: function(res) {
            // console.log(res, '882555');
            console.log(res.data.msg, '5556666')

            let token = res.data.msg;
            if (token) {
              wx.setStorageSync('token', res.data.msg);
              self.setData({
                token: res.data.msg
              })

              wx.request({
                url: 'http://192.168.2.98:9095//api/wechat/updateUserInfo',
                data: {
                  userIno: e.detail.userInfo
                },
                header: {
                  token: res.data.msg
                },
                method: 'POST',
                success: function(res) {
                  console.log(res, 'res99999')
                  if (res.data.code == 0) {

                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                  } else {
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  }
                },
              })
            }





          }
        })

      }
    })
    wx.getStorage({
      key: 'token',
      success(res) {




      }
    })

  },
  getUserInfo: function(e) {
    let that = this;
    // console.log(e)s
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res, '2202222')
              wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl) //头像
              wx.setStorageSync('nickName', res.userInfo.nickName) //名字

            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          // that.showSettingToast("请授权")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})