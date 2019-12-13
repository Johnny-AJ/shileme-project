// pages/shipping/shipping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    delArray: [], // 删除
    addAddressList: [], // 新增地址
    token: '',
    address: [],
    dtos: {},
    dto: {},
    delid: '', //删除
    id: '',
    isDefault: '' //默认
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    // self.setData({
    //   dtos: options.dtos
    // })
    const token = wx.getStorageSync('token')
    self.setData({
      token
    })
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

    // 地址列表
    wx.request({
      url: 'http://192.168.2.98:9095/api/address/list',
      method: 'GET',
      header: {
        'token': self.data.token, //请求头携带参数
      },
      success: res => {
        // console.log(res, "地址")
        self.setData({
          addAddressList: res.data.data
        })
      }
    })
  },

  // 编辑
  handeditor(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    // let id = e.currentTarget.dataset.oder
    // this.setData({
    //   id: id
    // })
    const addAddressList = this.data.addAddressList
    let bb = addAddressList[index]
    let cc = JSON.stringify(bb)
    wx.navigateTo({
      url: '/pages/inetAddress_copy/inetAddress_copy?bjid=' + cc //跳转到编辑页面
      // url: '/pages/inetAddress_copy/inetAddress_copy'
    })
  },
  // 删除
  handdel(e) {
    console.log(e)
    var delid = e.currentTarget.dataset.id
    var self = this
    // console.log(self.data.addAddressList)
    wx.showModal({
      title: '警告',
      content: '是否确认删除你的当前收货地址',
      success: (res) => {
        // var addAddressList = this.data.addAddressList
        // if (res.confirm) {
        //   addAddressList.splice(e.currentTarget.dataset.index, 1)
        //   this.setData({
        //     addAddressList: addAddressList
        //   })
        // } else if (res.cancel) {}
        wx.request({
          url: 'http://192.168.2.98:9095/api/address/delete?id=' + self.data.id,
          // url: 'http://192.168.2.98:9095/api/address/delete?id=' + 40,
          method: 'GET',
          data: {
            id: delid
          },
          header: {
            'token': self.data.token, //请求头携带参数
          },
          success: (res) => {
            console.log("删除成功", res)
          }
        })
      }
    })
  },
  // 新增地址
  handNewvoid(e) {
    wx.navigateTo({
      url: '/pages/inetAddress/inetAddress'
    })
  },
  // 默认勾选地址
  radioChange(e) {
    this.setData({
      isDefault: e.detail.value
    })
    wx.request({
      url: 'http://192.168.2.119:9095/api/address/updateDefault',
      method: 'GET',
      data: {
        isDefault: this.data.isDefault
      },
      header: {
        'token': this.data.token, //请求头携带参数
      },
      success: res => {
        console.log(res, 31312321)
      }
    })
  }
})