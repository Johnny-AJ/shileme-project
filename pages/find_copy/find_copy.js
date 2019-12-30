// pages/find_copy/find_copy.js
// pages/formats/formats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: []
  },
  onLoad(e) {
    // 轮播图
    this.setSwiperData()
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
  }
})