let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seachtext: '', //传过来的数据
   
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
    ],
    hasMore:false,
    loading: false, // 是否显示loading
    hasNext: true,



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


  onReachBottom: function() {


    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.search()
    })

  },
  search() { //搜索结果
    var self = this
    let prams = {
      type: self.data.type,
      pageSize: 4,
      currPage: self.data.currPage,
      search: self.data.seachtext
    }
   
    http.getRequest('/api/search/wares/searchWares', prams, function(res) {
    
        var seach = self.data.seach;
        var productlist1 = [];
        productlist1 = res.data.data.list,
          seach = [...seach, ...productlist1]
        self.setData({
          seach: seach,
          loading: false,
          hasMore: res.data.data.list.length == 4,
          hasNext: res.data.data.hasNext
        })


      
    })

    console.log(self.data.seach,'seach')
    // wx.request({
    //   url: 'http://192.168.2.98:9095/api/search/wares/searchWares',
    //   header: {
    //     token: wx.getStorageSync('token')
    //   },
    //   data: {
    //     type: self.data.type,
    //     pageSize: self.data.pageSize,
    //     currPage: self.data.currPage,
    //     search: self.data.seachtext
    //   },
    //   success: function(res) {
    //     if (res.data.data.list.length == 0) {
    //       self.setData({
    //         seach: []
    //       })
    //     } else {
    //       self.setData({
    //         seach: res.data.data.list
    //       })
    //     }
    //   }
    // })
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


  },
  bindconfirm: function(e) {
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value;
    console.log(discountName, 'discountName')
    if (discountName.trim()) {
      that.setData({
        type: '',
        currPage: 1,
        seachtext: discountName.trim()
      }, () => {
        that.search()
      })

    }
  },
})