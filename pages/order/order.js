// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.s == 1) {
      this.get_data1();
      console.log(77777)
    } else if (options.s == 2) {
      this.get_data2()

    } else {
      this.get_data(options.orderId);
    }

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

  },
  get_data(orderId) {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findByOrderId',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        orderId: orderId
      },
      success: function(res) {
        console.log(res);
        let data = res.data.data;
        switch (data.orderState) {
          case 0:

            break;
          case 1:
            data.text = '待付款';

            break;
          case 2:
            data.text = '待发货';

            break;
          case 3:

            data.text = '待收货';
            break;
          case 4:

            data.text = '待评论';
            break;
        }
        self.setData({
          data: data
        });
        console.log(self.data.data)
      }
    })
  },
  get_data1() {

    console.log(9999999);
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findNewWaitPayOrder  ',
      header: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        console.log(res);
        let data = res.data.data;
        switch (data.orderState) {
          case 0:

            break;
          case 1:
            data.text = '待付款';

            break;
          case 2:
            data.text = '待发货';

            break;
          case 3:

            data.text = '待收货';
            break;
          case 4:

            data.text = '待评论';
            break;
        }
        self.setData({
          data: data
        });

      }
    })
  },
  get_data2() {

    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findNewWaitPayOrder',
      header: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        let data = res.data.data;
        switch (data.orderState) {
          case 0:

            break;
          case 1:
            data.text = '待付款';

            break;
          case 2:
            data.text = '待发货';

            break;
          case 3:

            data.text = '待收货';
            break;
          case 4:

            data.text = '待评论';
            break;
        }
        self.setData({
          data: data
        });

      }
    })
  },
  remind() {
    wx.showToast({
      title: '提醒成功',
      icon: 'success',
      duration: 2000
    })
  }
})