// pages/comment/comment.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waresId:'',
    currPage:1,
    getcommentList:[],//评论列表
    hasNext: true, //
    loading: false, // 是否显示loading
    hasNext: true,
   
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.setData({
      waresId: options.waresId
    })
    this.getcommentList()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.getcommentList()
    })
  },
  getcommentList() { //评论列表
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/wares/details/getCommentList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        waresId: self.data.waresId,
        pageSize: 6,
        currPage: self.data.currPage

      },
      success: function (res) {
        var getcommentList = self.data.getcommentList;
         var productlist1 = [];
          productlist1 = res.data.data.list,
          getcommentList = [...getcommentList, ...productlist1]

        let aa = app.filterArr(getcommentList, 'id');
        // aa.forEach(res=>{

        // })
        self.setData({
          loading: false,
          getcommentList: aa,
          hasMore: res.data.data.list.length == 6,
          hasNext: res.data.data.hasNext
 
        })
        console.log(self.data, 'getCommentList')
      }
    })
  },

 
})