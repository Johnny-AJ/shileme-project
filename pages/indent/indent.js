// pages/indent/indent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 't1',
    list:[],
    cartlist:[{
      time: '2019 - 08 - 07',
      states:'t2',
      state:'代付款',
      imgurl:'',
      name:'保湿急救 网红蓝药丸面膜',
      num:1,
      price:79,
      norms:'5片/盒',
      logistics:'55555555'
    },
      {
        time: '2019 - 09 - 08',
        state: '代发货',//状态
        imgurl: '',//图片路径
        states: 't3',
        name: '保湿急救 网红蓝药丸面膜',//名称
        num: 1,//数量
        price: 99,//价格
        norms: '5片/盒',//规格
        gifts: [{ zp: 'Dr.jart蓝色药丸面膜（5ml/片）', num: 1 }, { zp: 'Dr.jart蓝色药丸面膜（6ml/片）', num: 2 }],
        logistics: '6666666',//物流信息
        

      },
      {
        time: '2019 - 08 - 07',
        state: '交易失败',
        imgurl: '',
        states: 't2',
        name: '保湿急救 网红蓝药丸面膜',
        num: 1,
        price: 79,
        norms: '5片/盒',
        logistics: '88888888'//物流信息
      },
      {
        time: '2019 - 08 - 07',
        state: '待收货',
        imgurl: '',
        states: 't4',
        name: '保湿急救 网红蓝药丸面膜',
        num: 1,
        price: 79,
        norms: '5片/盒',

        logistics: '88888888'//物流信息
      },
      {
        time: '2019 - 08 - 07',
        state: '待评价',
        imgurl: '',
        states: 't5',
        name: '保湿急救 网红蓝药丸面膜',
        num: 1,
        price: 79,
        norms: '5片/盒',
        logistics: ''//物流信息
      },]

  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    },()=>{
       this.click() 
    });
  },
  goto(e){
    console.log(e)
    wx.reLaunch({

      url: '/pages/scango/scango'

    })
  },
  click(){
  var list=[];
    var cartlist = this.data.cartlist;
    var current = this.data.current;
  for(var i=0;i<cartlist.length;i++){
    if (cartlist[i].states == current){
      list.push(cartlist[i])
  
    }
    this.setData({
      list: list
    })
  }
    if (current=='t1'){
      this.setData({
        list: cartlist
      })
    }

  console.log(this.data.list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [];
    var cartlist = this.data.cartlist;
    this.setData({
      list: cartlist
    })

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})