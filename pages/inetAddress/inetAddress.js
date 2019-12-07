// pages/inetAddress/inetAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [], //地图
    customItem: '全部',
    // 存储数据
    arrayList: [],
    inputValue: '', //用户名
    inputNumber: '', //手机号
    inputAddress: '' //地址
  },
  alll(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '新增地址'
    })

  },
  // 级联效果
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})