// pages/order/order.js
let http = require("../../utils/http.js");
const app =getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: {},
    
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.s == '0') {
            this.get_data(options.orderId);
        }
        if (options.s == '1') {

            this.get_data1();

        }
        if (options.s == '2') {
            this.get_data2();

        }
      this.carlist(); //获取为你推荐的商品列表
    },

  onReachBottom: function () { //下拉触发


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

                console.log(self.data.data)

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

        wx.navigateTo({
          url: 'pages/null/null',
      
        })

        // wx: wx.request({
        //     url: 'http://192.168.2.98:9095/api/order/updateOrderState',
        //     data: {
        //         orderNo
        //     },
        //     header: {
        //         token: wx.getStorageSync('token')
        //     },

        //     success: function(res) {
        //         wx.requestPayment({
        //             timeStamp: res.data.data.timeStamp,
        //             nonceStr: res.data.data.nonceStr,
        //             package: res.data.data.package,
        //             signType: res.data.data.signType,
        //             paySign: res.data.data.paySign,
        //             success(res) {

        //                 if (res.errMsg.split(":")[1] == "ok") {
        //                     var allprice = self.data.allprice;

        //                     wx.navigateTo({
        //                         url: '/pages/view/view?allprice=' + allprice,
        //                     })
        //                 } else {
        //                 }
        //             }

        //         })
        //     },
        //     fail: function(res) {},

        // })
    },
    goto22(e){
      wx.reLaunch({
        url: e.currentTarget.dataset.url,
      })
      
    }

 
})