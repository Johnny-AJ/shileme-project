// pages/consistent/consistent.js

//免试试用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: [{
      title: '试用申领',
      id: '0'
    }, {
      title: '试用报告',
      id: '1'
    }],
    currentIndex: '0',
    probationList: [], //商品列表
    setList: [], //试用报告
    targetTime: 0, //时间
    myFormat1: ['时', '分', '秒']
  },
  // tab栏
  handTabs(e) {
    // console.log(e)
    let self = this
    let index = e.currentTarget.dataset.aa
    // console.log(index, 123)
    if (index == 0) {
      self.setData({
        currentIndex: 0
      })
    } else {
      self.setData({
        currentIndex: 1
      })
      self.setReportingList()
    }
  },
  //试用商品列表
  setprobationList() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/probation/getProbationList',
      success: (res) => {
        console.log(res, "试用商品列表")
        let probationList = res.data.data.list //接口赋值
        probationList.forEach(e => { //当前时间+接口返回时间*60分钟
          e.minutes = new Date().getTime() + (e.minutes * 60)
        })
        self.setData({
          probationList
        })
      }
    })
  },
  // 试用报告列表
  setReportingList() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/probation/getList',
      header: {
        token: wx.getStorageSync("token")
      },
      success: res => {
        console.log(res, "试用报告列表")
      }
    })
  },
  // 传值probation
  handurl1(e) {
    // console.log(e)
    wx.navigateTo({
      url: '/pages/probation/probation?id=' + e.currentTarget.dataset.id //跳转到试用详情
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let self = this
    self.setprobationList()
    self.setReportingList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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