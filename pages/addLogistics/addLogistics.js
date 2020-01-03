// pages/addLogistics/addLogistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 列表数据
    list: [{
        // 状态
        id: 0,
        // title
        name: "客户签收人:花礼晴 已签收 感谢使用圆通快递",
        // 时间
        dates: "2016-08-30"
      }, {
        id: 1,
        name: "【上海市华能工业】已出仓 ",
        dates: "2016-08-22"
      }, {
        id: 2,
        name: "【北京市通州区梨园公司】已收入",
        dates: "2016-08-24"
      }

      , {
        id: 3,
        name: "【北京朝阳区十里堡公司】派送人：花礼晴 正在派送中",
        dates: "2016-08-26"
      }

      , {
        id: 4,
        name: "【北京朝阳区生物分析技术产业园】取件人：花礼晴 已收件",
        dates: "2016-08-26"
      }


    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '物流'
    })
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