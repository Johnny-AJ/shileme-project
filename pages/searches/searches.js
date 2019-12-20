
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    seachnum: '',
    inputValue:'',
    pageSize:10,
    currPage:1,
    seach:[]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self =this;
    self.setData({
      seachnum: options.seach,
      inputValue: options.inputValue,
    })
    self.search()
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

  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  search() { //搜索结果
    var self = this;
 

    wx.request({
      url: 'http://192.168.2.98:9095/api/search/wares/search',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        pageSize: self.data.pageSize,
        currPage: self.data.currPage,
        'search': self.data.inputValue
      },
      success: function (res) {
       
        self.setData({
          seach: res.data.data
        })

        console.log(self.data.seach,'self.data.seach')


      }
    })
  },
})