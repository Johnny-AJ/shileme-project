// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

<<<<<<< HEAD
  },

=======
    spelllist: [{
      imgurl: '',
      name: '保湿急救 网红蓝药丸面膜',
      numbers: 22,
      number: 2,
      price: '79.00',
      id: 11
    }, {
      imgurl: '',
      name: '爆款口红',
      numbers: 50,
      number: 3,
      price: '299.00',
      id: 12
    }, {
      imgurl: '',
      name: '驱蚊神器-驱蚊灯',
      numbers: 82,
      number: 2,
      price: '29.00',
      id: 13
    }, {
      imgurl: '',
      name: '急速保湿霜，美丽女人专爱品',
      numbers: 22233,
      number: 3,
      price: '69.00',
      id: 14
    }]

  },
  handurl: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(66666)
    // 路由封装
      wx.navigateTo({
        url: '/pages/formats/formats?id=' + id
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
      title: '拼团专题'
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

  }
=======
 
  },
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
})