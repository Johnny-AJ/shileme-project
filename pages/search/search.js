// pages/search/search.js

let timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    getHotSearch: [], //热门搜索数据
    deletelist: [], //删除数据
    searchHistory: [], //历史搜索数据
    seach: [],
    currPage: 1,
    pageSize: 8,
    params: [],
    inputValue: '',
    isok: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotSearch() //热门搜索数据
  },
  // 路径封装
  handurl: function(e) {
    // 路由封装
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  verification: function(e) {

    var name = e.currentTarget.dataset.name;

    　　
    this.setData({

      [inputValue]: e.detail.value.replace(/\s+/g, '')

    })

  },
  bindKeyInput: function(e) {


    var inputValue = e.currentTarget.dataset.name;
    this.setData({
      [inputValue]: e.detail.value.replace(/\s+/g, '')
    })


    if (this.data.inputValue) {
      clearTimeout(timer);
      if (this.data.inputValue) {
        timer = setTimeout(() => {
          this.search()
        }, 800);

      }
    }
 



  },

  search() { //搜索结果
    var self = this;
    var token = wx.getStorageSync('token')

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
      success: function(res) {
        // console.log(res, 'res')
        self.setData({
          seach: res.data.data
        })


        wx.navigateTo({
          url: '/pages/searches/searches?seach=' + res.data.data.length + '&inputValue=' + self.data.inputValue,
        })

      }
    })
  },
  clear() {
    this.setData({
      inputValue: ''
    })
    this.setData({
      seach: []
    })

  },
  getHotSearch() { //热门搜索
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/search/wares/getHotSearch',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        pageSize: self.data.pageSize,
        currPage: self.data.currPage
      },
      success: function(res) {
        // console.log(res)
        self.setData({
          getHotSearch: res.data.data.data.list
        })


      }
    })
  },
  searchHistory() {
    wx.request({
      url: 'http://192.168.2.98:9095/api/search/wares/searchHistory',
      data: {
        pageSize: this.data.pageSize,
        currPage: this.data.currPage,
        params: this.data.params
      },
      success: function(res) {
        // console.log(res)
      }
    })
  }
})