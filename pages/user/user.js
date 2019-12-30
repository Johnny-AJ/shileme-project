// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    cartlist: [],
    currPage: 0,
    hasNext: true, //
    loading: false, // 是否显示loading
    hasNext: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    wx.login({
      success: function(res) {
        // console.log(res, 123)
        if (res.code) {
          // 发送请求
          wx.request({
            // 微信登录
            url: 'http://192.168.2.98:9095/api/wechat/auth',
            data: {
              code: res.code
            },
            method: "get",
            success: function(res) {
              if (res.data.code == 0) {
                var token = res.data.msg;
                // 获取用户信息
                wx.getUserInfo({
                  success: function(res) {
                    console.log(res, 456)
                    var userInfo = res.userInfo //用户信息
                    wx.request({
                      // 用户信息
                      url: 'http://192.168.2.98:9095/api/wechat/updateUserInfo',
                      method: "post",
                      data: res.userInfo,
                      header: {
                        'token': token, //请求头携带参数
                        'content-type': 'application/json',
                      },
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  // 用户信息
  handlegetuserinfo(e) {
    // console.log(e, 123)
  },
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
=======
  onLoad(options) {
    // 头部标题
   
    this.login();
    this.carlist(); //获取为你推荐的商品列表
  },
  onReachBottom: function () {//下拉触发


    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.carlist()
    })

  },

  // 路径封装
  handurl: function(e) {
    // 路由封装
    if (e.currentTarget.dataset.index==0){
      wx.navigateTo({
        url: '/pages/indent/indent?index=' + e.currentTarget.dataset.index 
       
      })
    }else{
      wx.navigateTo({
        url: '/pages/indent/indent?index=' + e.currentTarget.dataset.index + '&orderState=' + e.currentTarget.dataset.orderstate,
        // url: e.currentTarget.dataset.url,
      })

      
    }
  },
  handurl1: function (e) {
    // 路由封装
   
      wx.navigateTo({
        url: '/pages/service/service',
        // url: e.currentTarget.dataset.url,
      })
  
  },
  handur2: function (e) {
    // 路由封装
    console.log(2222)
    wx.navigateTo({
      // url: '/pages/service/service',
      url: e.currentTarget.dataset.url,
    })

  },
  login(){
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl')
    })
    this.setData({
      nickName: wx.getStorageSync('nickName')
    })
    
  },
  carlist() { //获取商品
    var self = this;
    wx: wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllWaresByCate',
      data: {
        categoryId: '',
        currPage: self.data.currPage,
        pageSize: 4
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {


        var cartlist = self.data.cartlist;
        var productlist1 = [];
        productlist1 = res.data.data.list,
          self.setData({
            loading: false,
            cartlist: cartlist.concat(productlist1),
            hasMore: res.data.data.list.length == 4,
            hasNext: res.data.data.hasNext
          })
      },
      fail: function (res) { },

>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
    })
  },
})