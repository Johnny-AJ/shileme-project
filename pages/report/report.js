// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    currentIndex: '0', //tab选中
    statusList: 0, // 申请状态 0:申请中， 1:成功, 2:失败
    currPage: 1, //页码
    pageSize: 5, //最大输出条数
    setapplyList: [], //申请
    status: 0,
    myReportList: [], //试用报告
    applyId: '', // 申请ID
    probationId: '', //试用ID
    titleList: [{
      title: '申请中'
    }, {
      title: '申请成功'
    }, {
      title: '申请失败'
    }, {
      title: '我的试用报告'
    }],
  },
  // tab栏
  handTabs(e) {
    let self = this
    let index = e.currentTarget.dataset.index
    if (index == 3) {
      self.setData({
        currentIndex: index,
      })
      self.setmyReportList()

    } else {
      // console.log(index, 22222)
      self.setData({
        setapplyList: [],
        currentIndex: index,
        status: index
      }, () => {
        self.applyList()
      })
    }
  },
  // 申请列表
  applyList(e) {
    let self = this
    wx.request({
      url: 'http://192.168.2.98:9095/api/personal/probation/applyList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        status: self.data.status, //请求状态
        pageSize: 5,
        currPage: self.data.currPage
      },
      success: res => {
        console.log(res, 'res999')
        self.setData({
          setapplyList: res.data.data.list
        })
      }
    })
    // console.log(self.data.applyId, "applyId")
  },
  // 我的试用报告
  setmyReportList() {
    let self = this
    wx.request({
      url: 'http://192.168.2.98:9095/api/personal/probation/myReportList',
      header: {
        token: wx.getStorageSync("token")
      },
      success: res => {
        console.log(res, "我的试用报告1")
      }
    })
  },
  // 申请成功提交报告
  handleStatus(e) {
    // console.log(e, "e123")
    wx.navigateTo({
      url: '/pages/fill/fill?probationId=' + e.currentTarget.dataset.id
    })
=======

  },
  // tab栏
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  },
  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: function() {
    this.applyList()
    // this.setmyReportList()
=======
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