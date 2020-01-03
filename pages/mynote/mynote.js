// pages/mynote/mynote.js
Page({

<<<<<<< HEAD
  /**
   * 页面的初始数据
   */
  data: {

  },

  // tab栏
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '我的试用'
    })
  },
=======
    /**
     * 页面的初始数据
     */
    data: {

    },

    // tab栏
    handleChange({
        detail
    }) {
        this.setData({
            current: detail.key
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 头部标题
        wx.setNavigationBarTitle({
            title: '我的试用'
        })
    },
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})