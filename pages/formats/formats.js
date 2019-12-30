// pages/formats/formats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
=======
    targetTime: 0,
    clearTimer: false,
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
    // 轮播图
    swiperList: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575541027970&di=ecf2c0391eb72e50a428c14e99c39bf3&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fdiybbs%2F5812%2Fa5811338_s.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556772324&di=da3d003085891be4d696ed4fed3b6727&imgtype=0&src=http%3A%2F%2Fpic31.nipic.com%2F20130708%2F3347542_143402189000_2.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575542168801&di=457f23a469df75e92b17f5204a71a8f3&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft01034ed8722375e889.jpg",
<<<<<<< HEAD
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556846323&di=b5b36223aac6373857f0418adef3c410&imgtype=0&src=http%3A%2F%2Fpic1.16pic.com%2F00%2F01%2F39%2F16pic_139059_b.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556851149&di=021fb9719762984ed0191087b8cbc2a7&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140328%2F6608733_084513055000_2.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556890196&di=534195e404a30d70df59d8630c1c877d&imgtype=0&src=http%3A%2F%2Fpic35.nipic.com%2F20131114%2F3347542_141746002353_2.jpg"
    ],
  },

=======
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556890196&di=534195e404a30d70df59d8630c1c877d&imgtype=0&src=http%3A%2F%2Fpic35.nipic.com%2F20131114%2F3347542_141746002353_2.jpg"
    ],

    // 测试
    swiperArrat: [{
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576231348885&di=36b17adf6cfb8d734a5e6f51deedd9b6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F08%2F20181208123535_joilh.thumb.700_0.jpg',
        name: '三吉彩花',
        address: '广州',


      },
      {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576231348885&di=36b17adf6cfb8d734a5e6f51deedd9b6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F08%2F20181208123535_joilh.thumb.700_0.jpg',
        name: '三吉彩花',
        address: '广州'
      }
    ]
  },
  handurl: function(e) {
    // 路由封装
    wx.reLaunch({
      url: e.currentTarget.dataset.url,
    })
  },
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
<<<<<<< HEAD
    // 头部标题
    wx.setNavigationBarTitle({
      title: '详情页'
    })
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

=======
    this.setData({
      targetTime: new Date().getTime() + 6430000,
    
    });
    // 头部标题
    console.log(options,'options')
  },
  onUnload:function(){
    this.setData({
      clearTimer: true
    });
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  }
})