// pages/inetAddress/inetAddress.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animal: 1,
    checked: false,
    customItem: '全部',
    // 存储数据
    arrayList: [],
    // 姓名
    inputuserName: '',
    // 手机号码
    inputNumber: '',
    // 收货地址
    inputAddress: '',
    // 地区
    token: '',

    name: '',
    phone: '',
    province: '', //省
    city: '', //市
    region: "", //区
    address: '',
    dtos: {},
    isDefault:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options, 'options1111')
    // console.log(options)
    // this.setData({
    //   dtos: options.dto
    // })

    var self = this;
    const token = wx.getStorageSync('token')
    // console.log(token, 11)
    self.setData({
      token
    })
    // console.log(this.data.token)
    // 头部标题
    wx.setNavigationBarTitle({
      title: '新增地址'
    })

  },

  // 提交
  handtap: function(e) {
    // console.log(e, 11)
    var self = this
    // const {
    //   inputuserName
    // } = this.data
    // wx.setStorageSync("address", inputuserName)
    wx.request({
      url: 'http://192.168.2.98:9095/api/address/save',
      method: 'POST',
      data: {
        name: self.data.name,
        phone: self.data.phone,
        province: self.data.province[0],
        city: self.data.city[1],
        region: self.data.region[2],
        address: self.data.address,
        isDefault: self.data.isDefault
      },
      header: {
        'token': self.data.token, //请求头携带参数
      },
      success: res => {
        // console.log(res, "新增成功")
        if (0 == res.data.code) {
          wx.navigateBack({
            delta:1
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      }
    })
    // console.log(self.data.name, 11)
    // console.log(self.data.phone, 22)
    // console.log(self.data.province, 33)
    // console.log(self.data.city, 44)
    // console.log(self.data.region, 55)
    // console.log(self.data.address, 66)
  },
  // 选框
  handleAnimalChange(e) {
   
    this.setData({
      checked: e.detail.current
    });
    if (e.detail.current){
      this.setData({
        isDefault:0
      })
    }else{
      this.setData({
        isDefault: 1
      })
    }
    console.log(this.data.isDefault)
  },
  // 姓名
  handuserName: function(e) {
    // console.log(e)
    this.setData({
      inputuserName: e.detail.value,
      name: e.detail.value
    })
  },
  // 手机号
  handNumber: function(e) {
    // console.log(e)
    this.setData({
      inputNumber: e.detail.value,
      phone: e.detail.value
    })
  },
  // 省/市/区
  bindRegionChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var self = this;
    self.setData({
      province: e.detail.value, //省
      city: e.detail.value, //市
      region: e.detail.value //区  
    })
  },
  // 收货地址
  handAddress: function(e) {
    // console.log(e)
    this.setData({
      inputAddress: e.detail.value,
      address: e.detail.value
    })
  }
})