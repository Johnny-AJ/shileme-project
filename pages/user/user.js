// pages/user/user.js
Page({

<<<<<<< HEAD
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

    })
  },
=======
    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '',
        nickName: '',
        cartlist: [],
        currPage: 0,
        hasNext: true, //
        loading: false, // 是否显示loading
        hasNext: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 头部标题

        this.login();
        this.carlist(); //获取为你推荐的商品列表
    },
    onReachBottom: function() { //下拉触发


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
        if (e.currentTarget.dataset.index == 0) {
            wx.navigateTo({
                url: '/pages/indent/indent?index=' + e.currentTarget.dataset.index

            })
        } else {
            wx.navigateTo({
                url: '/pages/indent/indent?index=' + e.currentTarget.dataset.index + '&orderState=' + e.currentTarget.dataset.orderstate,
                // url: e.currentTarget.dataset.url,
            })


        }
    },
    handurl1: function(e) {
        // 路由封装

        wx.navigateTo({
            url: '/pages/service/service',
            // url: e.currentTarget.dataset.url,
        })

    },
    handur2: function(e) {
        // 路由封装
        console.log(2222)
        wx.navigateTo({
            // url: '/pages/service/service',
            url: e.currentTarget.dataset.url,
        })

    },
    login() {
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
            success: function(res) {


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
            fail: function(res) {},

        })
    },
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})