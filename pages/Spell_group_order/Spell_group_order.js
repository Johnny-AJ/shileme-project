Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    waresId: '28',
    propertyId: '344',
    num: '2',
    token: '',
    dtos: [],
    address: {},
    addressok: false,
    orderWaresVos: {},
    quota:{},
    allprice:0,
    inputValue:''

  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {
   
   
    this.oders(options); // 获取扫码购的参数
    var self = this;
    if (self.data.address) {

    } else {
      self.setData({
        addressok: true
      })
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
  goto(e) { //提交订单
    console.log(this.data.dtos)


    wx.request({
      // 支付地址
      url: 'http://192.168.2.95:9095/api/order/saveOrder',
      method: "POST",
      header: {
        'token': this.data.token, //请求头携带参数
      },
      data: {
        discountId:'',
        remark: this.data.inputValue,
        addressId: 1,
        waresList: this.data.dtos,

      },
      success: function(res) {
        // console.log(78888,res)


        // 微信支付
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) {

            wx.navigateTo({
              url: e.currentTarget.dataset.url,
            })
          },
          fail(res) {
            wx.navigateTo({
              url: e.currentTarget.dataset.url,
            })
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
  oders(options) {//获取下单详细信息

    var self = this;
    var list = JSON.parse(options.dtos)

    let dd = [];
    var dtos = dd.concat(list)
    self.setData({
      dtos: dtos
    })
    const token = wx.getStorageSync('token')
    self.setData({
      token
    })
    // console.log(88888, dtos)
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

        self.setData({
          allprice: res.data.data.allprice
        })

        self.setData({
          address: res.data.data.address
        })
        
        self.setData({
          orderWaresVos: res.data.data.orderWaresVos
        })





      },
      fail: (error) => {
        // console.log(777,error)
      }

    })



  },

  handurl: function(e) {//路由跳转到填写地址
    console.log(e)
    // 路由封装
    wx.navigateTo({
      url: '/pages/shipping/shipping',
    })
  },
  toggleDialog() {//弹出页关闭
    this.setData({
      showDialog: !this.data.showDialog,

    });
  },

  bindKeyInput: function (e) {//卖家留言
    this.setData({
      inputValue: e.detail.value
    })

    console.log(this.data.inputValue)
  },
})