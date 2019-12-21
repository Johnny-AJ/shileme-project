
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
    newtime:0,
    clearTimer: false,
    timelist: [],
    current: 'homepage',
    buyRollList: [],
    timeoutbuylist: {},
    index1:0,
    commoditylist: [], //商品列表
    show: true,
    // 轮播图数组:
    width: 144,
    swiperList: [],
    time: 0,
    categoryId:'',
    start:0,
    productlist:[],
    categoryId:'',
    realistic:[],//热卖榜
    newselling: [],//新卖榜



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
    this.group();    // 超值拼团滚动
    this.tiembuy();    // 限时购
    this.selling();    // 商品标签列表
    this.setSwiperData();    // 轮播图
    this.newselling();//新卖榜
    this.realistic(); //热卖榜
  
  },

  onShow: function() {
    // console.log(this.data.clearTimer)
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
        }else{
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



    // 路由封装
    // wx.navigateTo({
    //   url: e.currentTarget.dataset.url,
    // })
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
  selling() {// 商品标列表
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllCategoryName',
      success: (res) => {

        self.setData({
          commoditylist: res.data.data
        })
        self.productlist();
      // console.log(this.data.commoditylist, 66666)
      }
    })

  },
  group() { //// 超值拼团滚动
  var self=this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findGroupBuyRollList',
      success: (res) => {
        // console.log('超值拼团', res.data.data.arrList)
        self.setData({
          buyRollList: res.data.data.arrList
        })

        
      }
    })
  },

  tiembuy() {  // 限时购
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095//api/index/timeoutbuy',
      success: (res) => {
        var time = res.data.data.endTime - res.data.data.nowTime;

        if(time){
      
          self.setData({
            targetTime: new Date().getTime() + time
          })
        }
      
        self.setData({
          timeoutbuylist: res.data.data.list
        })




      }
    })
  },

  vector(){
    var self =this;
    var categoryId= self.data.categoryId;
    var productlist = self.data.productlist;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findAllWaresByCate',
      data: {
        limit: 4,
        categoryId: self.data.categoryId,
        start: self.data.start
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        productlist[categoryId] = res.data.data.list;
        self.setData({
          productlist
        })
        console.log(self.data.productlist)
      }
    })

  },
  productlist(e) { // 商品标列表
   
   var self =this;
    
    if(e){
      this.setData({
        categoryId: e.currentTarget.dataset.id
      });
      var categoryId = self.data.categoryId;
      this.setData({
        index1: e.currentTarget.dataset.index
      })
    }
    !self.data.productlist[categoryId]&&self.vector()
   
    
   
    
  },
  goto(e){
    console.log(e,'e')
    let waresid = e.currentTarget.dataset.waresid
   wx.navigateTo({
     url: '/pages/details/details?waresid=' + waresid,
  
   })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    console.log(55555)
  },
  search(){
    wx.navigateTo({
      url: '/pages/search/search', 
    })
  },
  newselling(){//新卖榜

  },
  realistic() {//热卖榜
  var self =this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/getSellingList',
      header:{
       token: wx.getStorageSync('token')
      },
      data:{
        categoryId: '',
        currPage:0,
        pageSize:2
      },
      success:function(res){

        self.setData({
          realistic: res.data.data.list
        })

       
       
      }
    })
  },
  newselling() {//热卖榜
  var self=this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/getNewList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        categoryId:'',
        currPage: 0,
        pageSize: 2
      },
      success: function (res) {
      
        self.setData({
          newselling: res.data.data.list
        })
        
       
      }
    })
  },
  jump(e){
    console.log(e,'eeee')

    wx.navigateTo({
      url: e.currentTarget.dataset.url,
     
    })

  }
  
  
})