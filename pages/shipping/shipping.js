// pages/shipping/shipping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 删除
    delArray: [],
    // 新增地址
    addAddressList: [],
    token: '',
    address: [],
    dtos: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      dtos: options.dtos
    })
    console.log(options, 'options')

    var self = this;

    
    const token = wx.getStorageSync('token')
    // console.log(token, 11)
    self.setData({
      token
    })
    self.list();
    // console.log(this.data.token, 11)
    // 头部标题
    wx.setNavigationBarTitle({
      title: '收货地址'
    })

    // 用户名
    // let address = wx.getStorageSync("address")
    // // console.log(address)
    // this.setData({
    //   address
    // })

    wx.request({
      url: 'http://192.168.2.98:9095/api/address/save',
      method: 'POST',
      data: {
        
      },
      header: {
        'token': self.data.token, //请求头携带参数
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
      }
    })
  },

  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: '/pages/inetAddress/inetAddress?dto='+this.data.dtos,
    })
  },
  // 删除
  handdel(e) {
    wx.showModal({
      title: '警告',
      content: '是否确认删除你的当前收货地址',
      success: (res) => {
        if (res.confirm) {
          this.data.delArray.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            delArray: this.data.delArray
          })
        } else if (res.cancel) {}
      }
    })
  },
  list(){
    var self=this;
    console.log(self.data.token,'token')
    wx.request({
      url: 'http://192.168.2.98:9095/api/address/list',
      method: 'GET',
      data: {

      },
      header: {
        'token': self.data.token, //请求头携带参数
        'content-type': 'application/json'
      },
      success: res => {
        console.log('666',res)
      }
    })
  }
})