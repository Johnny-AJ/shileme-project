<<<<<<< HEAD

=======
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    current: 'tab1',
    seachtext: '',
    pageSize:10,
    currPage:1,
    seach:[],
    type:'',
    subscript:0,
    tittle:[{
      text:'推荐',
      type:''

    },
=======
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
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
      {
        text: '价格从低到高',
        type: 2

      },
      {
        text: '价格从高到低',
<<<<<<< HEAD
        type:1
=======
        type: 1
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

      }
    ]



  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: function (options) {
    var self =this;
=======
  onLoad: function(options) {
    var self = this;
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
    self.setData({
      seachtext: options.seach,
    })
    self.search()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
<<<<<<< HEAD
  onReady: function () {
=======
  onReady: function() {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
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
=======
  onShow: function() {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 页面上拉触底事件的处理函数
   */
<<<<<<< HEAD
  onReachBottom: function () {
=======
  onReachBottom: function() {
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267

  },

  /**
   * 用户点击右上角分享
   */
<<<<<<< HEAD
  onShareAppMessage: function () {

  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
=======
  onShareAppMessage: function() {

  },
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  search() { //搜索结果
    var self = this

    wx.request({
      url: 'http://192.168.2.98:9095/api/search/wares/searchWares',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
<<<<<<< HEAD
=======
        type: self.data.type,
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
        pageSize: self.data.pageSize,
        currPage: self.data.currPage,
        search: self.data.seachtext
      },
<<<<<<< HEAD
      success: function (res) {
     
        console.log(res,'55555')
        if (JSON.stringify(res.data.data) == "{}"){
          console.log(9999)
          self.setData({
            seach: []
          }) 
        }else{
          self.setData({
            seach: res.data.data
          }) 
          
        }
           
        console.log(self.data.seach,'self.data.seach')

      }
    })
  },
  change(e){
    console.log(e)
    // this.setData({
    //   subscript:e.currPage.d
    // })
=======
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


>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  }
})