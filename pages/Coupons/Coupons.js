// pages/Coupons/Coupons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    title: [{
      text: '未使用'
    }, {
      text: '已使用'
    }, {
      text: '已过期'
    }],
    unusedList:[],
    unusedList:[],
    unusedList:[],
    currPage: 0,



  },
  // tab栏
  changetbs(e) {


    this.setData({
      current: e.currentTarget.dataset.index
    })

    switch (e.currentTarget.dataset.index) {
      case 0:
        this.setData({
          usedList:[],
          timeOutList:[],
          currPage:0
        })
        this.unusedList();
      case 1:
        this.setData({
          unusedList: [],
          timeOutList: [],
          currPage: 0
        })
        this.usedList();

        break;
      case 2:
        this.setData({
          usedList: [],
          unusedList: [],
          currPage: 0
        })
        this.timeOutList();
        break;

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.unusedList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  unusedList() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/personal/discount/unusedList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        currPage: self.data.currPage,
        pageSize: 5
      },
      success: function(res) {

        self.setData({
          unusedList:res.data.data.list
        })
       
      }
    })
  },
  usedList() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/personal/discount/usedList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        currPage: self.data.currPage,
        pageSize: 5
      },
      success: function(res) {

        self.setData({
          usedList: res.data.data.list
        })
        console.log(res, 'res')
      }
    })
  },
  timeOutList() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/personal/discount/timeOutList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        currPage: self.data.currPage,
        pageSize: 5
      },
      success: function (res) {

        self.setData({
          timeOutList: res.data.data.list
        })

      }
    })
  },
  goto(){
  
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }

})