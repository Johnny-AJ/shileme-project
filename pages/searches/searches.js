Page({

  /**
   * 页面的初始数据
   */
  data: {
    seachtext: '', //传过来的数据
    pageSize: 4,
    currPage: 1,
    seach: [],
    type: '',
    subscript: 0,
    tittle: [{
        text: '推荐',
        type: ''

      },
      {
        text: '价格从低到高',
        type: 2

      },
      {
        text: '价格从高到低',
        type: 1

      }
    ]



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    self.setData({
      seachtext: options.seach,
    })
    self.search()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  search() { //搜索结果
    var self = this

    wx.request({
      url: 'http://192.168.2.98:9095/api/search/wares/searchWares',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        type: self.data.type,
        pageSize: self.data.pageSize,
        currPage: self.data.currPage,
        search: self.data.seachtext
      },
      success: function(res) {
        if (res.data.data.list.length == 0) {
          self.setData({
            seach: []
          })
        } else {
          self.setData({
            seach: res.data.data.list
          })
        }
      }
    })
  },
  change(e) { //改变tab页
    console.log(e)
    var self = this;

    switch (e.currentTarget.dataset.index) {
      case 0:
        this.setData({
          type: '',
          seach: [],
          subscript: e.currentTarget.dataset.index
        }, () => {
          self.search()
        })
        break;
      case 1:
        this.setData({
          type: 2,
          seach: [],
          subscript: e.currentTarget.dataset.index
        }, () => {
          self.search()
        })
        break;
      case 2:
        this.setData({
          type: 1,
          seach: [],
          subscript: e.currentTarget.dataset.index
        }, () => {
          self.search()
        })
        break;



    }


  }
})