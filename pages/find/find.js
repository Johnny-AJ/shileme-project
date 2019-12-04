// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图组件
    swiperList: [],
    // tab栏
    current: 'tab1',
  },
  // tab栏
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '分类'
    })
    // 轮播图
    this.setSwiperData()
  },
  // 轮播图
  setSwiperData() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/banner/banners',
      success: (res) => {
        // console.log(res)
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  }
})