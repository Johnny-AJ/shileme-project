Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    waresId: '',
    propertyId: '',
    num: '',
    token: '',
    dtos: [],
    address: {},
    addressok: true,
    orderWaresVos: {},
    quota: {},
    allprice: 0,
    inputValue: '',
    doto: {},
    options:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {


    var self = this;
    self.setData({
      doto: options.dtos
    })


    const token = wx.getStorageSync('token')
    self.setData({
      token
    })
    self.setData({
      options: options
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
    this.oders(); // 获取扫码购的参数

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
  goto(e) { //提交订单
    // console.log(66666)
    var self = this;

    wx.request({
      // 支付地址
      url: 'http://192.168.2.98:9095/api/order/saveOrder',
      method: "POST",
      header: {
        'token': this.data.token, //请求头携带参数
      },
      data: {
        discountId: '',
        remark: this.data.inputValue,
        addressId: this.data.address.id,
        waresList: this.data.dtos,

      },
      success: function(res) {
        // console.log(78888, res)


        // 微信支付
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) {
            // console.log(res, '支付')

            if (res.errMsg.split(":")[1] == "ok") {
              wx.navigateTo({
                url: e.currentTarget.dataset.url,
              })
            } else {
              // console.log(66666666)
            }
          }

        })

      }
    })
    // let url=e.
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
  oders() { //获取下单详细信息


  
    var self = this;
    console.log(self.data.options, 'options')
    var list = JSON.parse(self.data.options.dtos)

    let dd = [];
    var dtos = dd.concat(list)
    console.log(dtos, 'dtos')
    self.setData({
      dtos: dtos
    })


    wx.request({
      url: 'http://192.168.2.98:9095/api/order/savePlace',
      method: 'POST',
      data: {
        dtos: dtos
      },
      header: {
        token: self.data.token
      },
      success: (res) => {
        console.log(6666, res.data)

        console.log(res.data.msg)
        if (res.data.msg !== "操作成功") {
          wx.showToast({
            title: '规格不存在！',
            icon: 'loading',
            duration: 2000
          }, () => {
            wx.navigateBack({
              delta: 1,
            })
          })


        } else {
          
          self.setData({
            allprice: res.data.data.allprice
          })

          self.setData({
            address: res.data.data.address
          })

          console.log(self.data.address)
          self.setData({
            orderWaresVos: res.data.data.orderWaresVos
          })
          var address = self.data.address;
         
          if (address ==null) { //判断地址是否存在默认

            self.setData({
              addressok: false
            })
          } else {
            self.setData({
              addressok: true
            })
          }

        }











      },
      fail: (error) => {
        // console.log(777,error)
      }

    })



  },

  handurl: function(e) { //路由跳转到填写地址
    // console.log(this.data.doto)
    // 路由封装
    wx.navigateTo({
      url: '/pages/shipping/shipping?dtos=' + this.data.doto,
    })
  },
  toggleDialog() { //弹出页关闭
    this.setData({
      showDialog: !this.data.showDialog,

    });
  },

  bindKeyInput: function(e) { //卖家留言
    this.setData({
      inputValue: e.detail.value
    })

    // console.log(this.data.inputValue)
  },
})