// 引入测试
// const appconfig = require('../../app.config.js')
// 路由封装
// const http = require('../../server/http.js');
// 引入封装请求
// import {
//   auth_API,
//   updateUserInfo_API
// } from '../../server/login/index.js'


// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 扫码内容
    result: '',
    // 倒计时
    targetTime: 0,
    clearTimer: false,
    timelist: [],
    current: 'homepage',
    buyRollList: [],
    timeoutbuylist: {},
    index1:0,
    commoditylist: [], //商品列表
    show: true,
    // 轮播图数组:
    width: 144,
    swiperList: [],
    time: 0
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
    var self = this;

    // 超值拼团滚动
    this.group();
    // 限时购
    this.tiembuy();


    // 商品标签列表
    this.selling();
    // 轮播图
    this.setSwiperData()
    // 头部标题

    self.setData({
      targetTime: new Date().getTime() +   11169000
    })

  },
  clik(e) {
    console.log(e)
    this.setData({
      index1: e.currentTarget.dataset.index
    })
    
  },
  onShow: function() {
    console.log(this.data.clearTimer)
  },
  handurl: function(e) {

    var _this = this;

    wx.scanCode({
      success: (res) => {

        var result = res.result.split("=")[1];
       
        _this.setData({
          result: result,

        })

        if (_this.data.result) {
          wx.navigateTo({
            url: '/pages/scango/scango?waresId=' + _this.data.result
          })
        }else{
          $Toast({
            content: '商品已经不存在！',
            icon: 'prompt',
            duration: 0,
            mask: false
          });
          setTimeout(() => {
            $Toast.hide();
          }, 5000);
        }
      }
    })



    // 路由封装
    // wx.navigateTo({
    //   url: e.currentTarget.dataset.url,
    // })
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
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
  selling() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllCategoryName',
      success: (res) => {
        console.log('商品详情列表', res.data.data)
        self.setData({
          commoditylist: res.data.data
        })


        console.log(this.data.commoditylist, 66666)
      }
    })

  },
  group() { //超值拼团
  var self=this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findGroupBuyRollList',
      success: (res) => {
        console.log('超值拼团', res.data.data.arrList)
        self.setData({
          buyRollList: res.data.data.arrList
        })

        
      }
    })
  },

  tiembuy() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095//api/index/timeoutbuy',
      success: (res) => {
        var time = res.data.data.endTime - res.data.data.nowTime;
        self.setData({
          time: time

        }, () => {
          console.log(res.data.data)
          var time = this.data.time
          // self.setData({
          //   targetTime: new Date().getTime() +69000
          // })
        })
        self.setData({
          timeoutbuylist: res.data.data.list
        })




      }
    })
  },
  listtime() {

  }
})