const app = getApp();
let http =require('../../utils/http.js')
    // pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value1: 1,
        show: false,
        totalPrice: app.returnFloat(0),
        chooseGoods: [], //购物车的列表
        getListByWaresId: [], //优惠劵列表
        showDialog: false, //领劵开关
        slideProductList: [], //购物车详细信息
        selectAllStatus: false,//是否全选
        cartlist: [],
        currPage: 0,
        hasNext: true, //
        loading: false, // 是否显示loading
        hasNext: true,
        dtos: []
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      
     

    },
    onShow: function() {
        this.carlist(); //获取为你推荐的商品列表
        this.getList(); //获取购物车列表
        this.getListByWaresId(); //获取优惠劵列表
      this.setData({
        totalPrice: app.returnFloat(0),
        selectAllStatus: false
      })

       console.log(this.data.selectAllStatus, 'selectAllStatus')
    },
    onReachBottom: function() {


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
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        })
    },
    chooseThis: function(e) { //选择购物的
        var self = this;
        var id = e.currentTarget.dataset.id;
        var chooseGoods = self.data.chooseGoods;
        var selectAllStatus = self.data.selectAllStatus;
        for (var i = 0; i < chooseGoods.length; i++) {
            if (chooseGoods[i].id == id) {
                chooseGoods[i].flag = !chooseGoods[i].flag
            }

        }


        self.setData({
            chooseGoods

        })
        let len = [];
        chooseGoods.forEach(e => {
            if (e.flag) {
                len.push(e)
            }
        })
        if (self.data.chooseGoods.length == len.length) {
            selectAllStatus = true;
        } else {
            selectAllStatus = false;
        }
        self.setData({
            chooseGoods,
            selectAllStatus
        })


        self.totalPrice()

    },
    selectAllStatus: function() { //全选
        var chooseGoods = this.data.chooseGoods;
        var selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = !selectAllStatus

        if (selectAllStatus) {

            chooseGoods.forEach(i => {
                i.flag = true
            })

        } else {
            chooseGoods.forEach(i => {
                i.flag = false
            })
        }
        this.setData({
            chooseGoods,
            selectAllStatus
        })
        this.totalPrice()
    },
    goto(e) { //点击商品跳转详情页
        let waresid = e.currentTarget.dataset.waresid
        wx.navigateTo({
            url: '/pages/details/details?waresid=' + waresid,

        })
    },
    handleChange1(e) { //改变num的数量
        var self = this;
        var chooseGoods = self.data.chooseGoods;
        var id = e.currentTarget.dataset.id;
      let prams={
        amount: e.detail.value,
        id: id
      }
      http.getRequest('/api/shop/cart/updateAmount',prams,function(res){
        if (res.data.code == 0) {

          for (var i = 0; i < chooseGoods.length; i++) {
            if (chooseGoods[i].id == id) {
              chooseGoods[i].amount = e.detail.value;
            }
            self.setData({

              chooseGoods
            })
          }

          self.totalPrice();
        }
      })

        // wx.request({
        //     url: 'http://192.168.2.98:9095//api/shop/cart/updateAmount',
        //     method: 'GET',
        //     header: {
        //         token: wx.getStorageSync('token')
        //     },
        //     data: {
        //         amount: e.detail.value,
        //         id: id
        //     },
        //     success: function(res) {

        //         if (res.data.code == 0) {

        //             for (var i = 0; i < chooseGoods.length; i++) {
        //                 if (chooseGoods[i].id == id) {
        //                     chooseGoods[i].amount = e.detail.value;
        //                 }
        //                 self.setData({

        //                     chooseGoods
        //                 })
        //             }

        //             self.totalPrice();
        //         }
        //     }
        // })



    },
    handleSlideDelete({ //删除选中的id
        detail: {
            id
        }
    }) { //


      http.getRequest('/api/shop/cart/delete', { id: id},function(res){

      })
        // wx.request({
        //     url: 'http://192.168.2.98:9095//api/shop/cart/delete',
        //     header: {
        //         token: wx.getStorageSync('token')

        //     },
        //     data: {
        //         id: id
        //     },
        //     success: function(res) {

        //     }
        // })

        let chooseGoods = this.data.chooseGoods;
        let productIndex = chooseGoods.findIndex(item => item.id === id);


        for (var i = 0; i < chooseGoods.length; i++) {
            chooseGoods[i].checked = true;
            if (id == chooseGoods[i].id) {

                chooseGoods.splice(i, 1);

            }

        }



        this.setData({
            chooseGoods

        })
        this.totalPrice();

    },


    totalPrice() { // 合计金额方法
        var self = this;
        var totalPrice = 0;
        for (var i = 0; i < self.data.chooseGoods.length; i++) {
            if (self.data.chooseGoods[i].flag) {
                totalPrice += self.data.chooseGoods[i].allPrice * self.data.chooseGoods[i].amount - 0;
            }
        }
        this.setData({
            totalPrice: totalPrice.toFixed(2)
        });

    },

    getListByWaresId() { //根据商品查询优惠券列表

        var self = this;
        var getListByWaresId = [];

      http.getRequest('/api/discount/data/getListByWaresIds',{},function(res){
        self.setData({
          getListByWaresId: res.data.data
        })
        var getListByWaresId = self.data.getListByWaresId;

        self.setData({
          getListByWaresId
        })
        self.setData({
          getListByWaresId1: getListByWaresId.slice(0, 2)
        })
      })
        // wx.request({
        //     url: 'http://192.168.2.98:9095/api/discount/data/getListByWaresIds',
        //     header: {
        //         token: wx.getStorageSync('token')
        //     },
        //     data: {

        //     },
        //     success: function(res) {

        //         self.setData({
        //             getListByWaresId: res.data.data
        //         })
        //         var getListByWaresId = self.data.getListByWaresId;

        //         self.setData({
        //             getListByWaresId
        //         })
        //         self.setData({
        //             getListByWaresId1: getListByWaresId.slice(0, 2)
        //         })

        //         // }
        //     }
        // })
    },

    getList() { //购物车列表
        var self = this;

      http.getRequest('/api/shop/cart/getList',{},function(res){
        let slideProductList = res.data.data.list
        for (var i = 0; i < slideProductList.length; i++) {
          slideProductList[i].flag = false;
        }
        self.setData({
          slideProductList: slideProductList,
          chooseGoods: slideProductList
        })
      })
        // wx: wx.request({
        //     url: 'http://192.168.2.98:9095/api/shop/cart/getList',
        //     data: {

        //     },
        //     header: {
        //         token: wx.getStorageSync('token')
        //     },
        //     method: 'GET',
        //     success: function(res) {
        //         console.log(res,'cartlist')
        //         let slideProductList = res.data.data.list
        //         for (var i = 0; i < slideProductList.length; i++) {
        //             slideProductList[i].flag = false;
        //         }
        //         self.setData({
        //             slideProductList: slideProductList,
        //             chooseGoods: slideProductList
        //         })

        //     },
        //     fail: function(res) {

        //     }

        // })

    },
    carlist() { //获取商品
        var self = this;

        let prams={
          categoryId: '',
          currPage: self.data.currPage,
          pageSize: 4
        }
      http.getRequest('/api/index/findAllWaresByCate',prams,function(res){

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
        //     success: function(res) {


        //         var cartlist = self.data.cartlist;
        //         var productlist1 = [];
        //         productlist1 = res.data.data.list,
        //           cartlist = [...cartlist, ...productlist1]
              
        //       let aa = app.filterArr(cartlist, 'waresId')
        //             self.setData({
        //                 loading: false,
        //                 cartlist: aa,
        //                 hasMore: res.data.data.list.length == 4,
        //                 hasNext: res.data.data.hasNext
        //             })
        //     },
        //     fail: function(res) {},

        // })
    },
    buys() {
        var self = this;
        var chooseGoods = self.data.chooseGoods;
        var dtos = self.data.dtos;

      console.log(chooseGoods,'chooseGoods');

      if (dtos.length==0){
        wx.showToast({
          title: '请勾选商品',
          icon: 'loading',
          duration: 2000
        })
      }
      console.log(dtos, 'dtos');
        var a = {}
  
        chooseGoods.forEach(item => {

            if (item.flag) {
             
              a = { 'waresid': item.waresId, 'amount': item.amount, 'cartId': item.id ,'propertyid': item.specificationId }
                dtos.push(a)
            }
        })

        if(dtos.length>0){

        
         

          wx.navigateTo({
            url: '/pages/Spell_group_order/Spell_group_order?cartdots=' + JSON.stringify(dtos),
            success: function (res) {
            
              self.setData({
                dtos:[],
                selectAllStatus:false,
                totalPrice: app.returnFloat(0)
              })
              self.carlist()
            }
          })
          wx.navigateTo({
            url: '/pages/Spell_group_order/Spell_group_order?cartdots=' + JSON.stringify(dtos),
           
          })

          
        }
     

    }
})