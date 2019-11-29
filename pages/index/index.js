
// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('../../server/http');

import {
  auth_API,
  updateUserInfo_API
} from '../../server/login/index'


// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组:
    SwiperList: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'

    ],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动播放
    interval: 3000, //停留时间间隔
    duration: 1000, //播放时长
    previousMargin: '150px', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: '150px', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引

 

  },
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 微信登录
    wx.login({
      success: function (res) {
        console.log(appconfig.apiUrl, 123)
        if (res.code) {
          // 发送请求
          wx.request({
            url: appconfig.apiUrl + '/api/wechat/auth',
            
            // 微信登录
            data: {
              code: res.code
            },
            method: "get",
            success: function (res) {
              if (res.data.code == 0) {
                var token = res.data.msg;
                // 获取用户信息
                wx.getUserInfo({
                  success: function (res) {
                    // console.log(res, 456)
                    var userInfo = res.userInfo //用户信息
                    wx.request({
                      // 用户信息
                      url: 'http://192.168.2.119:9095/api/wechat/updateUserInfo',
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
                    url: 'http://192.168.2.119:9095/api/wx/pay/weixinPay',
                    method: "get",
                    header: {
                      'token': token, //请求头携带参数
                    },
                    success: function (res) {
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
  },
  // 测试按钮
  handlegetuserinfo(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})