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
    current: 'homepage',
    show: true,
    // 轮播图数组:
    width: 144,
    swiperList: []
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
    this.selling();
    this.group();
    // 轮播图
    this.setSwiperData()
    // 头部标题
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },
  clik() {
    this.setData({
      show: !this.data.show
    })
  },
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
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
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllCategoryName',
      success: (res) => {
        // console.log(res)
        this.setData({})
      }
    })
  },
  group() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findGroupBuyRollList',
      success: (res) => {
        // console.log(res, 3)
        this.setData({})
      }
    })
  },
})