// pages/scango/scango.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    currentSwiper: 0,
    autoplay: true,
    showDialog: false,
    showDialog1: false,
    boolean: true
  },
  toggleDialog() {

    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  toggleDialog1() {

    this.setData({
      showDialog1: !this.data.showDialog1
    });
  },
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.setNavigationBarTitle({
      title: '商品详情'
    })
  },
})