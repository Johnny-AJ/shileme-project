// pages/Collection/Collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection: [], //收藏列表
    currPage: 1,
    pageSize: 5,
    hasNext:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    this.collection() //收藏列表请求
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
    var self =this;
    if (!self.data.hasMore) return;
  
      self.setData({
        currPage: self.data.currPage + 1
      }, () => {
        self.collection()
      })

   
        
  },
  
  collection() {
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/shop/collect/getList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        currPage: self.data.currPage,
        pageSize: self.data.pageSize
      },
      success: function(res) {
        var collection = self.data.collection;
        var collectio1 = res.data.data.list;
       
        self.setData({
          collection: collection.concat(collectio1),
          hasNext: collectio1.length==5
        })
        console.log(res,'rex')
      }

    })
  },
  handleSlideDelete({ //删除选中的id
    detail: {
      id
    }
  }) { //

  var self =this;



    wx.request({
      url: 'http://192.168.2.98:9095/api/shop/collect/delete',
      header: {
        token: wx.getStorageSync('token')

      },
      data: {
        id: id
      },
      success: function(res) {
        let collection = self.data.collection;
        // let productIndex = collection.findIndex(item => item.id === id);

        for (var i = 0; i < collection.length; i++) {
          collection[i].checked = true;
          if (id == collection[i].id) {

            collection.splice(i, 1);

          }

        }
        self.setData({
          collection

        })
      }
    })

  },
  goto(e){
    console.log(e,'e')
    wx.navigateTo({
      url: '/pages/details/details?waresid=' + e.currentTarget.dataset.waresid,
    })
  }
})