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
    if(options.s=='0'){
      this.get_data(options.orderId);
    }
    if (options.s == '1') {
  
      this.get_data1();

    }
    if (options.s == '2') {
      this.get_data2();
   
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

  get_data(orderId) {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findByOrderId?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        orderId: orderId
      },
      success: function(res) {
        console.log(res, '8888888');
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
  get_data1() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findNewSucceedOrder?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        time: Date.parse(new Date())
      },
      success: function (res) {
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
          data: res.data.data
        });
      }
    })
  },
  get_data2() {
    var self =this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/findNewWaitPayOrder?time=' + new Date().getTime(),
      header:{
       token: wx.getStorageSync('token')
      },
      data:{
        time: Date.parse(new Date())
      },
      method:'GET',
      success:function(res){
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
          data: res.data.data
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
  busy(){
    wx:wx.request({
      url: 'http://192.168.2.98:9095/api/order/updateOrderState',
      data: {
        orderNo
      },
      header: {
        token:wx.getStorageSync('token')
      },
     
      success: function(res) {
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) {

            if (res.errMsg.split(":")[1] == "ok") {
              var allprice = self.data.allprice;

              wx.navigateTo({
                url: '/pages/view/view?allprice=' + allprice,
              })
            } else {



            }
          },
          fail: function (res) {

          }

        })
      },
      fail: function(res) {},
      
    })
  }
})