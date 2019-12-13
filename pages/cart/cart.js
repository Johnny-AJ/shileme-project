// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: 1,
    show: false,
    totalPrice: 0,
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
  checkboxChange: function (e) {

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.totalPrice()
  },
  onShow: function () {

  },
  // 路径封装
  handurl: function (e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  // handleChange1({ detail }) {//计算器
  handleChange1(e) { //改变num的数量

    var slideProductList = this.data.slideProductList;
    var id = e.currentTarget.dataset.id;

    for (var i = 0; i < slideProductList.length; i++) {
      if (slideProductList[i].id == id) {
        slideProductList[i].num = e.detail.value
        this.setData({
          slideProductList: slideProductList
        })
      }
    }
    this.totalPrice()

    // this.setData({
    //   value1: detail.value
    // })
  },
  handleSlideDelete({//删除选中的id
    detail: {
      id
    }
  }) { //
    let slideProductList = this.data.slideProductList
    let productIndex = slideProductList.findIndex(item => item.id === id)
    slideProductList.splice(productIndex, 1)
    this.setData({
      slideProductList
    })
    this.totalPrice()
  },
  totalPrice: function () {//计算金额
    var totalPrice = 0;
    for (var i = 0; i < this.data.slideProductList.length; i++) {
      totalPrice += this.data.slideProductList[i].price * this.data.slideProductList[i].num - 0;
    }
    this.setData({ totalPrice: totalPrice.toFixed(2) });
    console.log(this.data.totalPrice)
  },

})