// pages/view/view.js

let http = require("../../utils/http.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allprice:'',
    cartlist: [],
    currPage: 0,
    hasNext: true, //
    loading: false, // 是否显示loading
    hasNext: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      allprice: options.allprice
    })

    this.carlist() 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onReachBottom: function () { //下拉触发


    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.carlist()
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goto(){
    console.log(6666)
    wx.navigateTo({
      url: '/pages/order/order?s=2',
    })
  },
  carlist() { //获取商品
    var self = this;

    let prams = {
      categoryId: '',
      currPage: self.data.currPage,
      pageSize: 4
    };
    http.getRequest('/api/index/findAllWaresByCate', prams, function (res) {

      var cartlist = self.data.cartlist;
      var productlist1 = [];
      productlist1 = res.data.data.list,
        cartlist = [...cartlist, ...productlist1]

      let aa = app.filterArr(cartlist, 'waresId')
      self.setData({
        loading: false,
        cartlist: aa,
        hasMore: res.data.data.list.length == 4,
        hasNext: res.data.data.hasNext
      })

    })

    // wx: wx.request({
    //     url: 'http://192.168.2.98:9095/api/index/findAllWaresByCate',
    //     data: {
    //         categoryId: '',
    //         currPage: self.data.currPage,
    //         pageSize: 4
    //     },
    //     header: {
    //         token: wx.getStorageSync('token')
    //     },
    //   success: function (res) {


    //     var cartlist = self.data.cartlist;
    //     var productlist1 = [];
    //     productlist1 = res.data.data.list,
    //       cartlist = [...cartlist, ...productlist1]

    //     let aa = app.filterArr(cartlist, 'waresId')
    //     self.setData({
    //       loading: false,
    //       cartlist: aa,
    //       hasMore: res.data.data.list.length == 4,
    //       hasNext: res.data.data.hasNext
    //     })
    //   },
    //     fail: function(res) {},

    // })
  },
  goto11(e) { //点击商品跳转详情页
    let waresid = e.currentTarget.dataset.waresid
    wx.navigateTo({
      url: '/pages/details/details?waresid=' + waresid,
    })
  },
})