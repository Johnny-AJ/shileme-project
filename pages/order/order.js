// pages/order/order.js
let http = require("../../utils/http.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    targetTime1: 0,
     clearTimer: false,
     myFormat1: ['天', '时', '分', '秒'],
     orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.s == '0') {
      this.setData({
        orderId: options.orderId
      })
      this.get_data();
    }
    if (options.s == '1') {

      this.get_data1();

    }
    if (options.s == '2') {
      this.get_data2();

    }


  },
  onUnload() {
    this.setData({
      clearTimer: true
    });
  },
  onReachBottom: function() { //下拉触发


    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.carlist()
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  get_data() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findByOrderId?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        orderId: self.data.orderId
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
          case 5:

            data.text = '交易成功';
            break;
          case 7:

            data.text = '交易失败';
            break;
        }
        self.setData({
          data: data
        });

        self.setData({
          targetTime1: new Date().getTime() + data.autoReceiveTime,
        })
        console.log(self.data.data,'findByOrderId')

      }
    })
  },
  get_data1() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findNewWaitPayOrder?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
  
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
          case 7:
            data.text = '交易失败';
            break;
        }
        self.setData({
          data: data,
          orderId:data.id
        });
        console.log(self.data.data, 'findNewWaitPayOrder')

      }
    })
  },
  get_data2() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findNewSucceedOrder?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        time: Date.parse(new Date())
      },
      method: 'GET',
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
          case 7:

            data.text = '交易失败';
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
  },
  busy() {
      var self =this;
    console.log(self.data.data,'data')


    http.getRequest('/api/order/updateOrderState', { orderNo: self.data.data.orderNo},function(res){
      wx.requestPayment({
        timeStamp: res.data.data.timeStamp,
        nonceStr: res.data.data.nonceStr,
        package: res.data.data.package,
        signType: res.data.data.signType,
        paySign: res.data.data.paySign,
        success(res) {

          if (res.errMsg.split(":")[1] == "ok") {
            
            
             self.get_data()

            // wx.navigateBack({
            //   delta: 1,
            // })
            // var allprice = self.data.allprice;

            // wx.navigateTo({
            //   url: '/pages/view/view?allprice=' + allprice,
            // })
          } else {



          }
        },
        fail: function (res) {
          // var waresList = JSON.stringify(self.data.dtos);
          // wx.navigateTo({
          //   url: '/pages/view1/view1?discountId=' + self.data.discountId + '&remark=' + self.data.inputValue + '&addressId=' + self.data.address.id + '&waresList=' + waresList + '&allprice=' + self.data.allprice,
          // })
        }

      })
    })
 
  },
  goto22(e) {
    wx.reLaunch({
      url: e.currentTarget.dataset.url,
    })

  }


})