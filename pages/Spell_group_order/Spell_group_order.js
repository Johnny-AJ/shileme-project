// pages/Spell_group_order/Spell_group_order.js
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
    dtos:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取扫码购的参数
    var list = JSON.parse(options.dtos)
  console.log(5656,list)
    let dd=[];
    var dtos = dd.concat(list)
    this.setData({
      dtos: dtos
    })
    var self = this;

    const token = wx.getStorageSync('token')
    self.setData({
      token
    })
    console.log(88888, dtos)
    wx.request({
      url: 'http://192.168.2.119:9095/api/order/savePlace',
      method: 'POST',
      data: {
        dtos: dtos
      },
      header: {
        token: self.data.token
      },
      success: (res) => {
        console.log(6666,res)
      },
      fail: (error) => {
        console.log(777,error)
      }

    })

    wx.setNavigationBarTitle({
      title: '下单',
    })

  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog,

    });
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
  goto(e) {  //提交订单
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })

    wx.request({
      // 支付地址
      url: 'http://192.168.2.119:9095/api/order/saveOrder',
      method: "POST",
      header: {
        'token': this.data.token, //请求头携带参数
      },
      data:{
        addressId:1,
        waresList: this.data.dtos
      },
      success: function(res) {
        console.log(78888,res)

    
        // 微信支付
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
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

  }
})