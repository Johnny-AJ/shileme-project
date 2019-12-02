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