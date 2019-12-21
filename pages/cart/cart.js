// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: 1,
    show: false,
    totalPrice: 0.00,
    chooseGoods: [],
    getListByWaresId: [],//优惠劵列表
    showDialog: false, //领劵开关
    slideProductList: [{

        id: 4,
        checked: false,
        imgs: '',
        name: '保湿急救 网红蓝药丸面膜',
        standard: '5片/盒',
        price: 79.00,
        num: 1,
        gift: [{
            name: 'Dr.jart蓝色药丸面膜（5ml / 片）',
            num: 1

          },
          {
            name: 'Dr.jart蓝色药丸面膜（5ml / 片）',
            num: 1

          }
        ],
        repertory: 55


      },
      {

        id: 5,
        checked: false,
        imgs: '',
        name: '手撕鸡',
        standard: '5片/盒',
        price: 790.00,
        num: 2,
        gift: [{
            name: 'Dr.jart蓝色药丸面膜（5ml / 片）',
            num: 2

          },
          {
            name: 'Dr.jart蓝色药丸面膜（5ml / 片）',
            num: 1

          }
        ],
        repertory: 0,
        gift: []
      },
      {

        id: 6,
        checked: false,
        imgs: '',
        name: '电饭煲',
        standard: '蓝色',
        price: 990.00,
        num: 3,
        gift: [],
        repertory: 1
      }
    ]
  },

  chooseThis:function(e){
    var chooseGoods = [];
    var idlist = e.detail.value;
    var slideProductList = this.data.slideProductList;
    if (idlist.length > 0) {
      for (var i = 0; i < slideProductList.length; i++) {
        for (var j = 0; j < idlist.length; j++) {

          if (slideProductList[i].id == idlist[j]) {
            slideProductList[i].checked = true;
            chooseGoods.push(slideProductList[i]);

            this.setData({
              chooseGoods
            })

          } else {
            slideProductList[i].checked = false;
          }
        }

      }
      this.totalPrice()
    } else {


      this.setData({
        totalPrice: ' 0.00'
      })

    }

  },
  checkboxChange: function(e) {//点击选择

   
    this.chooseThis(e)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.totalPrice();
    this.getListByWaresId();//领劵
  },
  onShow: function() {

  },
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
 
  handleChange1(e) { //改变num的数量

    var slideProductList = this.data.slideProductList;
    var id = e.currentTarget.dataset.id;

    for (var i = 0; i < slideProductList.length; i++) {
      if (slideProductList[i].id == id) {
        slideProductList[i].num = e.detail.value;

        this.setData({
          slideProductList: slideProductList
        })
      }
    }

    this.totalPrice();


  },
  handleSlideDelete({ //删除选中的id
    detail: {
      id
    }
  }) { //
    let slideProductList = this.data.slideProductList;
    let chooseGoods = this.data.chooseGoods;
    let productIndex = slideProductList.findIndex(item => item.id === id);

    for (var i = 0; i < chooseGoods.length;i++){
      chooseGoods[i].checked = true;
      if (id == chooseGoods[i].id){

        chooseGoods.splice(i, 1);
    
      }
      
    }
    slideProductList.splice(productIndex, 1);


    this.setData({
      chooseGoods,
      slideProductList
    })
    this.totalPrice();

  },
  totalPrice: function() { //计算金额
    var totalPrice = 0;
    for (var i = 0; i < this.data.chooseGoods.length; i++) {
      totalPrice += this.data.chooseGoods[i].price * this.data.chooseGoods[i].num - 0;
    }
    this.setData({
      totalPrice: totalPrice.toFixed(2)
    });

  },
  toggleDialog() {//优惠劵选择弹出

    this.setData({
      showDialog: !this.data.showDialog,
    });
  },
  getListByWaresId() { //根据商品查询优惠券列表

    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/discount/data/getListByWaresIds',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
       
      },
      success: function (res) {
        console.log(res,'res66666')
        self.setData({
          getListByWaresId: res.data.data
        })
        var getListByWaresId = self.data.getListByWaresId;
        for (var i = 0; i < getListByWaresId.length; i++) {
          getListByWaresId[i].text = '';
          if (getListByWaresId[i].discountCouponFor == 0) {
            getListByWaresId[i].text = '全平台'
          } else if (getListByWaresId[i].discountCouponFor == 1) {
            getListByWaresId[i].text = '门店'
          } else {
            getListByWaresId[i].text = '指定商品'
          }
          self.setData({
            getListByWaresId
          })
          self.setData({
            getListByWaresId1: getListByWaresId.slice(0, 2)
          })
        }
      }
    })
  },
  getDiscountById(e) {// 领取优惠券

    if (e) {
      var cartid = e.currentTarget.dataset.id;
      var self = this;
      wx.request({
        url: 'http://192.168.2.98:9095/api/discount/data/getDiscountById',
        header: {
          token: wx.getStorageSync('token')
        },
        data: {
          id: cartid
        },
        success: function (res) {
          if (res.data.code == '0') {
            var getListByWaresId = self.data.getListByWaresId;

            for (var i = 0; i < getListByWaresId.length; i++) {

              if (getListByWaresId[i].id == cartid) {

                getListByWaresId[i].isGet = 0;
                self.setData({
                  getListByWaresId: getListByWaresId
                })
              }

            }
          }
        }
      })

    }

  }
})