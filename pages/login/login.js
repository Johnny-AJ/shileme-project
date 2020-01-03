// pages/login/login.js
Page({

<<<<<<< HEAD
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
    wx.getStorage({
        key: 'token',
        success(res) {
          console.log(res, 'res111')
         
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
            success: function(res) {
             console.log(res,'res')
              if ( res.data.code==0) {
              
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
      }),
      wx.navigateBack({
        delta: 1
      })
  },
  getUserInfo: function (e) {
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
             
              wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)//头像
              wx.setStorageSync('nickName', res.userInfo.nickName)//名字
             
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
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
=======
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
        wx.getStorage({
                key: 'token',
                success(res) {
                    console.log(res, 'res111')

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
                        success: function(res) {
                            console.log(res, 'res')
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
            }),
            wx.navigateBack({
                delta: 1
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

                            wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl) //头像
                            wx.setStorageSync('nickName', res.userInfo.nickName) //名字

                        },
                        fail(res) {
                            console.log("获取用户信息失败", res)
                        }
                    })
                } else {
                    console.log("未授权=====")
                    that.showSettingToast("请授权")
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
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})