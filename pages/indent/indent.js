// pages/indent/indent.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    tbslist: [{
        titie: '全部',
        indes: 0,
        orderState: '',
        currPage: 1
      },
      {
        titie: '待付款',
        indes: 1,
        orderState: 1,
        currPage: 1
      },
      {
        titie: '待发货',
        indes: 2,
        orderState: 2,

      },
      {
        titie: '待收货',
        indes: 3,
        orderState: 3,

      },
      {
        titie: '待评价',
        indes: 4,
        orderState: 4,

      },
    ],
    cartlist: [], //全部数据
    cartlist1: [], //拿到最新的数据
    orderState: '', //订单状态。不传 全部, 1 待付款，2 待发货，3 待收货，4 待评论，5 已完成
    currPage: 1, //页码
    pageSize: 5, //最多输入条数
    hasNext: true,
    loading: false, // 是否显示loading
  },
  goto(e) {

    wx.reLaunch({

      url: '/pages/scango/scango'

    })
  },
  click(e) { //点击切换tabs
    if (e) {
      if (e.currentTarget.dataset.orderstate) {

        this.setData({
          cartlist: [],
          currPage: 1,
          current: e.currentTarget.dataset.index,
          orderState: e.currentTarget.dataset.orderstate
        })


      } else {
        this.setData({
          cartlist: [],
          current: 0,
          currPage: 1,
          orderState: ''
        })

      }
      this.software()
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (options.index == 0) {
      this.setData({
        current: options.index,
        orderState: ''
      })
    } else {

      this.setData({
        current: options.index,
        orderState: options.orderState
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.software();

  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.software()
    })

    console.log(self.data, 'currPage')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  software() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/getUserOrderList?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        pageSize: self.data.pageSize,
        orderState: self.data.orderState,
        currPage: self.data.currPage
      },
      success(res) {

        var cartlist = self.data.cartlist;
        var cartlist1 = [];
        cartlist1 = res.data.data.list;
        cartlist1.forEach(cartlist1 => {
          switch (cartlist1.orderState) {

            case 0:
              break;
            case 1:

              cartlist1.text = '待付款';

              break;
            case 2:
              cartlist1.text = '待发货';

              break;
            case 3:

              cartlist1.text = '待收货';
              break;
            case 4:

              cartlist1.text = '待评论';
              break;
            case 5:

              cartlist1.text = '交易成功';
              break;
            case 7:

              cartlist1.text = '交易失败';
              break;
          }

        })

       
        cartlist = [...cartlist, ...cartlist1];

        self.setData({
          loading: false,
          cartlist: app.filterArr(cartlist, 'orderId'),
          hasMore: cartlist1.length == 5
        })
        console.log(self.data.cartlist,'cartlist')
      }

    })


  },
  confirm(e) {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/updateOrderStateIsSucceed?time=' + new Date().getTime(),
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        orderId: e.currentTarget.dataset.orderid
      },
      success: function(res) {
        var cartlist = self.data.cartlist;

        if (res.data.code == 0) {
          wx.showToast({
            title: '已经确认收货',
            icon: 'success',
            duration: 1500,
            success() {

  
              cartlist.forEach(i => {
                if (i.orderId == e.currentTarget.dataset.orderid) {

                  cartlist.splice(i, 1)
                }
              })
              self.setData({
                cartlist
              })
            }
          })
        }
        console.log(res, 'updateOrderStateIsSucceed')
      }

    })
  },
  goto(e) { //跳转到订单详情
    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/order/order?orderId=' + orderId + '&s=0'
    })
  },
  buys(e) {
    console.log(e,'e')
    http.getRequest('/api/order/updateOrderState', { orderNo: e.currentTarget.dataset.orderno }, function (res) {
      wx.requestPayment({
        timeStamp: res.data.data.timeStamp,
        nonceStr: res.data.data.nonceStr,
        package: res.data.data.package,
        signType: res.data.data.signType,
        paySign: res.data.data.paySign,
        success(res) {

          if (res.errMsg.split(":")[1] == "ok") {


            self.get_data()

            // wx.navigateBack({
            //   delta: 1,
            // })
            // var allprice = self.data.allprice;

            // wx.navigateTo({
            //   url: '/pages/view/view?allprice=' + allprice,
            // })
          } else {



          }
        },
        fail: function (res) {
          // var waresList = JSON.stringify(self.data.dtos);
          // wx.navigateTo({
          //   url: '/pages/view1/view1?discountId=' + self.data.discountId + '&remark=' + self.data.inputValue + '&addressId=' + self.data.address.id + '&waresList=' + waresList + '&allprice=' + self.data.allprice,
          // })
        }

      })
    })
  },
  remind() { //提示发货
    wx.showToast({
      title: '提醒成功',
      icon: 'success',
      duration: 2000
    })
  },
  comments(e) { //跳转到评论
    var self =this;
    wx.navigateTo({
      url: '/pages/general/general?waresId=' + e.currentTarget.dataset.waresid + '&orderId=' + e.currentTarget.dataset.orderid,
      success(res){
        self.software() ;
        var cartlist = self.data.cartlist;
        self.setData({
          cartlist
        })
      }
    })
    // wx.navigateTo({
    //   url: '/pages/general /general' 
     
    // })

  },
  

})