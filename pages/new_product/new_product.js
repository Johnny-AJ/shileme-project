// pages/selling_list/selling_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0, //tabs的下标
    pageSize: 10,
    currPage: 0,
    getSellingList: [], //存储所有的数据
    findHotCategoryName: [], //遍历tabs
    categoryId: '', //顶部tbas的ID

  },
  // tab栏

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSellingList()
    this.findHotCategoryName()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  findHotCategoryName() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/findNewCategoryName',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {},
      success: function (res) {
        console.log(res.data.data)
        self.setData({
          findHotCategoryName: res.data.data
        })

      }
    })
  },
  getSellingList() { //请求数据
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/index/getNewList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        categoryId: self.data.categoryId,
        currPage: self.data.currPage,
        pageSize: self.data.pageSize,
      },
      success: function (res) {
        var index1 = self.data.index1;
        var getSellingList = self.data.getSellingList;
        getSellingList[index1] = res.data.data.list
        self.setData({
          getSellingList
        })
        console.log(self.data.getSellingList, 'getSellingList')
      }

    })
  },
  click(e) { //点击tabs栏，切样式
    console.log(e)


    if (e) {
      if (e.currentTarget.dataset.categoryid) {
        this.setData({
          index1: e.currentTarget.dataset.index
        })
        this.setData({
          categoryId: e.currentTarget.dataset.categoryid
        })
      } else {
        this.setData({
          index1: 0
        })
        this.setData({
          categoryId: ''
        })
      }
    }
    console.log(this.data.categoryId, 'categoryId')

    !this.data.getSellingList[this.data.index1] && this.getSellingList()

  },
  goto(e) {
    let waresid = e.currentTarget.dataset.waresid
    wx.navigateTo({
      url: '/pages/details/details?waresid=' + waresid,

    })
  }
})