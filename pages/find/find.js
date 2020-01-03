// pages/formats/formats.js
Page({

<<<<<<< HEAD
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
=======
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
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})