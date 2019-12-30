// pages/formats/formats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
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
=======
    // 轮播图
    swiperList: []
  },
  onLoad(e) {
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
    // 轮播图
    this.setSwiperData()
  },
  // 轮播图
  setSwiperData() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/banner/banners',
      success: (res) => {
<<<<<<< HEAD
        // console.log(res)
=======
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  }
})