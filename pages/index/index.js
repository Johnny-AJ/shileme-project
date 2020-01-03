// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 扫码内容
    result: '',
    // 倒计时
    targetTime: 0,
    newtime: 0,
    clearTimer: false,
    timelist: [],
    current: 'homepage',
    buyRollList: [],
    timeoutbuylist: {},
    index1: 0,
    commoditylist: [], //商品列表
    show: true,
    // 轮播图数组:
    width: 144,
    swiperList: [],
    time: 0,
    categoryId: '',
    start: 0,
    productlist: [], //最下面商品的数据
    categoryId: '',
    currPage: 0,
    realistic: [], //热卖榜
    newselling: [], //新卖榜
    hasMore: true, //
    loading: false, // 是否显示loading
    hasNext: true

  },
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    this.group(); // 超值拼团滚动
    this.tiembuy(); // 限时购
    this.selling(); // 商品标签列表
    this.setSwiperData(); // 轮播图
    this.newselling(); //新卖榜
    this.realistic(); //热卖榜


  },

  onShow: function() {
    this.vector() //请求商品数据
  },
  handurl: function(e) {

    var _this = this;

    wx.scanCode({
      success: (res) => {
        var result = res.result.split("=")[1];

        _this.setData({
          result: result,

        })

        if (_this.data.result) {
          wx.navigateTo({
            url: '/pages/scango/scango?waresId=' + _this.data.result
          })
        } else {
          $Toast({
            content: '商品已经不存在！',
            icon: 'prompt',
            duration: 0,
            mask: false
          });
          setTimeout(() => {
            $Toast.hide();
          }, 5000);
        }
      }
    })




  },

  handurl1(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  setSwiperData() { // 轮播图
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/banner/banners',
      success: (res) => {
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  },
  selling() { // 商品头部标列表
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllCategoryName',
      success: (res) => {

        self.setData({
          commoditylist: res.data.data
        })
        self.productlist();
      }
    })

  },
  group() { //// 超值拼团滚动
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findGroupBuyRollList',
      success: (res) => {

        self.setData({
          buyRollList: res.data.data.arrList
        })


      }
    })
  },

  tiembuy() { // 限时购
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095//api/index/timeoutbuy',
      success: (res) => {
        var time = res.data.data.endTime - res.data.data.nowTime;
        if (time) {
          self.setData({
            targetTime: new Date().getTime() + time
          })
        }
        self.setData({
          timeoutbuylist: res.data.data.list
        })
        console.log(res, "res123")
      }
    })
  },

  vector() { //请求数据
    var self = this;
    var categoryId = self.data.categoryId;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllWaresByCate',
      data: {
        pageSize: 4,
        categoryId: self.data.categoryId,
        currPage: self.data.currPage
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        var productlist = self.data.productlist;
        var productlist1 = [];
        productlist1 = res.data.data.list,
          productlist = [...productlist, ...productlist1]
        let aa = self.filterArr(productlist, 'waresId')
        self.setData({
          loading: false,
          productlist: aa,
          hasMore: res.data.data.list.length == 4,
        })
        setTimeout(function() {
          self.setData({
            hasNext: res.data.data.hasNext
          }, 888)
        })
      }
    })
  },
  productlist(e) { // 商品标列表
    var self = this;
    if (e) {
      if (e.currentTarget.dataset.id == 0) {
        self.setData({
          productlist: [],
          categoryId: '',
          currPage: 0,
          hasNext: true,
          index1: e.currentTarget.dataset.index,
        })
      } else {
        self.setData({
          productlist: [],
          currPage: 0,
          hasNext: true,
          categoryId: e.currentTarget.dataset.id,
          index1: e.currentTarget.dataset.index
        })
        self.vector()
      }
    }
  },
  goto(e) { //点击商品跳转详情页
    let waresid = e.currentTarget.dataset.waresid
    wx.navigateTo({
      url: '/pages/details/details?waresid=' + waresid,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function() {
    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.vector()
    })
    console.log(self.data.productlist, 'productlist')
  },
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  realistic() { //热卖榜
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/getSellingList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        categoryId: '',
        currPage: 0,
        pageSize: 2
      },
      success: function(res) {
        self.setData({
          realistic: res.data.data.list
        })
      }
    })
  },

  newselling() { //新卖榜
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/getNewList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        categoryId: '',
        currPage: 0,
        pageSize: 2
      },
      success: function(res) {
        self.setData({
          newselling: res.data.data.list
        })
      }
    })
  },

  jump(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  filterArr: function(arr, attribute) {
    var new_arr = [];
    var json_arr = [];
    for (var i = 0; i < arr.length; i++) {
      if (new_arr.indexOf(arr[i][attribute]) == -1) {
                // -1代表没有找到              
        new_arr.push(arr[i][attribute]);
        //如果没有找到就把这个name放到arr里面，以便下次循环时用
        json_arr.push(arr[i]);
      } else {}
    }
    return json_arr;
  },
  handTime(e) {
    console.log(e)
  }
})