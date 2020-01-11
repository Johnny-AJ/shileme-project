let http = require('../../utils/http.js');
let config = require('../../utils/config.js')
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
        wx: wx.request({
          url: config.domain + '/api/wechat/auth',
          data: {
            code: res.code
          },
          success: function(res) {
            let token = res.data.msg;
            if (token) {
              wx.setStorageSync('token', res.data.msg);
              self.setData({
                token: res.data.msg
              })
              wx.getSetting({
                success(res) {
                  // console.log("res", res)
                  if (res.authSetting['scope.userInfo']) {

                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success(res) {
                        wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl) //头像
                        wx.setStorageSync('nickName', res.userInfo.nickName) //名字
                        let prams2 = {
                          avatarUrl: res.userInfo.avatarUrl,
                          gender: res.userInfo.gender,
                          nickName: res.userInfo.nickName
                        }
                        http.postRequest('/api/wechat/updateUserInfo', prams2, function (res) {
                          if (res.data.code == 0) {
                            wx.navigateBack({
                              delta: 1
                            })
                          } else {
                            wx.reLaunch({
                              url: '/pages/login/login',
                            })
                          }
                        })
                      },
                      fail(res) {
                        console.log("获取用户信息失败", res)
                      }
                    })
                  } else {
                    console.log("未授权=====")

                  }
                }
              })

            }
          }

        })
    
        

      }
    })

  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})