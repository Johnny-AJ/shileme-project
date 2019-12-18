// pages/indent/indent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
    cartlist: [],
    cartlist1: [],
    cartlist2: [],
    cartlist3: [],
    cartlist4: [],
    orderState: '',//订单状态。不传 全部, 1 待付款，2 待发货，3 待收货，4 待评论，5 已完成
    currPage:1, //页码
    pageSize:5  //最多输入条数

  },
  handleChange({ //点击上面tabs
    detail
  }) {
    this.setData({
      current: detail.key
    }, () => {
      this.click()
    });
  },
  goto(e) {

    wx.reLaunch({

      url: '/pages/scango/scango'

    })
  },
  click() { //点击切换tabs
   var self=this;
    switch (self.data.current) {
      case '1':
        self.setData({
          orderState: ''

        });
        console.log(1)
        break;
        case '2':

        self.setData({
          orderState: 1
        })
        console.log(2)
        break;
      case '3':

        self.setData({
          orderState: 2
        })
        console.log(3)
        break;
      case '4':
        self.setData({
          orderState: 3
        })
        console.log(4)
        break;
      case '5':
        self.setData({
          orderState: 4
        })
        console.log(5)
        break;
    }
    this.software()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.software1(); //获取列表页


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
    this.software1()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  software() {
    var self = this;
    const token = wx.getStorageSync('token')
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/getUserOrderList',
      header: {
        token: token
      },
      data: {
        pageSize: self.data.pageSize,
        orderState: self.data.orderState,
        currPage: self.data.currPage
      },
      success(res) {
        const list =res.data.data.list;
        console.log(self.data,'self.data')
        switch (self.data.current) {
          case '1':
            self.setData({
              cartlist: list
            })
            break;
          case '2':
          
            self.setData({
              cartlist1: list
            })
            break;
          case '3':
      
            self.setData({
              cartlist2:list
            })
            break;
          case '4':
            self.setData({
              cartlist3: list
            })
          
            break;
          case '5':
            self.setData({
              cartlist4: list
            })
            break;
        }

     
 
        for (var i = 0; i < list.length; i++) {
          switch (list[i].orderState) {
            case 0:
              
              break;
            case 1:
              list[i].text = '待付款';
             
              break;
            case 2:
              list[i].text = '待发货';
             
              break;
            case 3:
              
              list[i].text = '待收货';
              break;
            case 4:
             
              list[i].text = '待评论';
              break;
          }
        }
        


        self.setData({
          cartlist: res.data.data.list
        })

      }

    })
  },
  software1() {
    var self = this;
    const token = wx.getStorageSync('token')
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/getUserOrderList',
      header: {
        token: token
      },
      data: {
        pageSize: self.data.pageSize,
        orderState: self.data.orderState,
        currPage: self.data.currPage
      },
      success(res) {
       
        var list = res.data.data.list;
        for (var i = 0; i < list.length; i++) {
          switch (list[i].orderState) {
            case 0:

              break;
            case 1:
              list[i].text = '待付款';

              break;
            case 2:
              list[i].text = '待发货';

              break;
            case 3:

              list[i].text = '待收货';
              break;
            case 4:

              list[i].text = '待评论';
              break;
          }
        }




        self.setData({
          cartlist: res.data.data.list
        })

      }

    })
  },
  goto(e){//跳转到订单详情
    let orderId = e.currentTarget.dataset.orderid;
      wx.navigateTo({
        url: '/pages/order/order?orderId=' + orderId 
      })
  },
  buys(e){
    console.log()
  },
  remind(){//提示发货
    wx.showToast({
      title: '提醒成功',
      icon: 'success',
      duration: 2000
    })
  }
  
})