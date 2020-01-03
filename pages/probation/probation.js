// pages/probation/probation.js
<<<<<<< HEAD

// 试用详情列表
=======
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    swiperList: [], // 轮播图
    priceList: {}, //商品详情
    id: '',
    targetTime: 0, //时间
    myFormat1: ['时', '分', '秒'],
    status: ''
  },
  //申请
  handSuccess() {
    let self = this
    wx.request({
      url: 'http://192.168.2.98:9095/api/probation/apply',
      data: {
        id: self.data.id //probation传入的商品ID
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res, 789)
        if (res.data.code == 0) {
          self.setData({
            status: 0
          })
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      }
    })
  },
  // 轮播图
  setSwiperData() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/banner/banners', //首页轮播图
      success: (res) => {
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  },
  //试用商品详情
  setByUserId(e) {
    let self = this
    wx.request({
      url: 'http://192.168.2.98:9095/api/probation/getByUserId',
      data: {
        id: e.id //probation传入的商品ID
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res, 123)
        self.setData({
          priceList: res.data.data,
          status: res.data.data.status
        })
        let priceList = res.data.data;
        self.setData({
          targetTime: new Date().getTime() + priceList.minutes
        })
        // console.log(priceList.id, '456')
      },
    })
  },
  // 传waresId到商品详情
  handDetails(e) {
    // console.log(e, "e")
    wx.navigateTo({
      url: '/pages/details/details?waresid=' + e.currentTarget.dataset.waresid //跳到detail商品详情
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let self = this
    self.setSwiperData()
    self.setByUserId(e)
    console.log(e, 11)
    let id = e.id
    self.setData({
      id: e.id
    })
=======
    // 轮播图
    swiperList: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575541027970&di=ecf2c0391eb72e50a428c14e99c39bf3&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fdiybbs%2F5812%2Fa5811338_s.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575542168801&di=457f23a469df75e92b17f5204a71a8f3&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft01034ed8722375e889.jpg",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
  onShow: function(e) {
    let self = this
=======
  onShow: function() {

>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})