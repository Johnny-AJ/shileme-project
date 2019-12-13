// pages/inetAddress_copy/inetAddress_copy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressID: '', // 传值ID
    token: '',
    addressList: '',
    delID: '',
    editorID: '',

    name: '', //用户名
    phone: '', //手机号
    province: '', //省
    city: '', //市
    region: "", //区
    address: '' //地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    // console.log(e, 11)
    var self = this
    const token = wx.getStorageSync("token")
    self.setData({
      token
    })
    // console.log(token, 123)

    // 传的参数
    let addressID = JSON.parse(e.bjid)
    this.setData({
      addressID
    })
    // 赋值
    let delID = JSON.parse(e.bjid)
    this.setData({
      delID
    })
    // 编辑ID
    this.setData({
      editorID: this.data.delID.id
    })

    // 头部标题
    wx.setNavigationBarTitle({
      title: '编辑地址'
    })
  },
  // 省/市/区
  bindRegionChange(e) {
    // console.log(e)
    let addressList = this.data.addressList
    this.setData({
      province: e.detail.value, //省
      city: e.detail.value, //市
      region: e.detail.value, //区  
      addressList: e.detail.value + e.detail.value + e.detail.value
    })
  },
  // 用户名
  handuserName(e) {
    // console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  // 手机号
  handNumber(e) {
    // console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  // 地址
  handAddress(e) {
    // console.log(e)
    this.setData({
      address: e.detail.value
    })
  },
  // 按钮
  handtap(e) {
    var self = this
    // 编辑
    wx.request({
      url: 'http://192.168.2.98:9095/api/address/update',
      method: 'POST',
      data: {
        name: self.data.name,
        phone: self.data.phone,
        province: self.data.province[0],
        city: self.data.city[1],
        region: self.data.region[2],
        address: self.data.address,
        isDefault: 0,
        id: self.data.editorID
      },
      header: {
        'token': self.data.token, //请求头携带参数
      },
      success: (res) => {
        // console.log(res, "修改成功")
        if (0 == res.code) {
          wx.navigateBack({
            url: 'pages/shipping/shipping'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: 'res.data.msg',
          })
        }
      }
    })
  },
  handradio(e) {
    // console.log(e)
  }
})