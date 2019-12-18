// pages/view1/view1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waresList: [],
    addressId: '',
    discountId: '',
    remark: '',
    allprice:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);


    this.setData({
      discountId: options.discountId
    })
    this.setData({
      remark: options.remark
    })

    this.setData({
      addressId: options.addressId
    })


    //字符串转json
    var jsonStr = options.waresList;
    jsonStr = jsonStr.replace(" ", "");

    if (typeof jsonStr != 'object') {

      jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点

      var waresList = JSON.parse(jsonStr);
   
      this.setData({
        waresList
      })
    }
    console.log(this.data)
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
  goto() {
    wx.navigateTo({
      url: '/pages/order/order?s=2',
    })
  },
  buys(){
  
    // var self = this;
    // wx.request({
    //   url: 'http://192.168.2.98:9095/api/order/savePlace',
    //   method: 'POST',
    //   data: {
    //     dtos: self.data.waresList
    //   },
    //   header: {
    //     token: wx.getStorageSync('token')
    //   },
    //   success: (res) => {

    //     if (res.data.msg !== "操作成功") {

    //       console.log('操作成功')
    //       wx.request({
    //         // 支付地址
    //         url: 'http://192.168.2.98:9095/api/order/saveOrder',
    //         method: "POST",
    //         header: {
    //           'token': wx.getStorageSync('token'), //请求头携带参数
    //         },
    //         data: {
    //           discountId: self.data.discountId,
    //           remark: self.data.remark,
    //           addressId: self.data.addressId,
    //           waresList: self.data.waresList,

    //         },
    //         success: function (res) {
    //           var timeStamp = res.data.data.timeStamp;

    //           console.log(res, 'view1')

    //           // 微信支付)
    //           wx.requestPayment({
    //             timeStamp: timeStamp,
    //             nonceStr: res.data.data.nonceStr,
    //             package: res.data.data.package,
    //             signType: res.data.data.signType,
    //             paySign: res.data.data.paySign,
    //             success(res) {

    //               console.log(res, 'view1支付成功')
    //               if (res.errMsg.split(":")[1] == "ok") {
    //                 var allprice = self.data.allprice; 1

    //                 wx.navigateTo({
    //                   url: '/pages/view/view?allprice=' + allprice,
    //                 })
    //               } else {



    //               }
    //             },
    //             fail: function (res) {

    //             }

    //           })

    //         }
    //       })


    //     }       

    //   },
    //   fail: (error) => {
    //     // console.log(777,error)
    //   }

    // })
   
  }

})