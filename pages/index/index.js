// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('../../server/http.js');
// 引入封装请求
import {
  auth_API,
  updateUserInfo_API
} from '../../server/login/index.js'


// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组:
    swiperList: [],
 
    result:'',
  
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3', 'demo-text-4'],
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动播放
    interval: 3000, //停留时间间隔
    duration: 1000, //播放时长
  },
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 轮播图
    this.setSwiperData()

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

  },
  // 路劲封装
  handurl: function(e) {

    var _this = this;

    // wx.scanCode({
    //   success: (res) => {
    //     var result = res.result;

    //     _this.setData({
    //       result: result,

    //     }),
    //       console.log(result)
    //   }
    // })
    // 路由封装
    // wx.navigateTo({
    //   url: e.currentTarget.dataset.url

    // })

  },
  // 轮播图
  setSwiperData() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/banner/banners',
      success: (res) => {
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  },
  //按钮测试
  

})