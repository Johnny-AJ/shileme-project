Page({
  data: {
    list: [],
    result: [{
        name: 't1',
        num: 2
      },
      {
        name: 't2',
        num: 2
      },
      {
        name: 't3',
        num: 2
      },
      {
        name: 't4',
        num: 2
      },
      {
        name: 't5',
        num: 2
      },
      {
        name: 't6',
        num: 2
      },
      {
        name: 't6',
        num: 2
      },
      {
        name: 't7',
        num: 2
      },
      {
        name: 't8',
        num: 2
      },
      {
        name: 't9',
        num: 2
      }

    ],
    release: '',
    page: 0, //从第二页开始加载 
    page_size: 5, //每页加载十个 
    isShowLoadmore: false, //正在加载 
    isShowNoDatasTips: false, //暂无数据
    endloading: false
  }, //判断是否还有数据

  onLoad: function() {
    this.getrecom()
  },
  // reviewpage: function(e) {
  //   var that = this;
  //   var id = this.data.id;
  //   var page = this.data.page;
  //   wx.request({
  //     url: 'http://192.168.2.98:9095/api/index/findAllWaresByCate',
  //     data: {
  //       limit: 4,
  //       categoryId: 2,
  //       start: 0
  //     },
  //     header: {
  //       token: wx.getStorageSync('token')
  //     },
  //     success: function(res) {
  //       console.log(res)
  //       console.log('→')
  //       if (res.data.code == 1) { //判断当code == 1 的时候得到数据

  //         var datas = res.data.result.comments; // 下面有得到的数据可以参考
  //         if (res.data.result.more_data == 0) { //如果more_data == 0 表示没有可加载的数据了
  //           that.setData({
  //             isShowLoadmore: true, //隐藏正在加载
  //             isShowNoDatasTips: true, //显示暂无平路
  //             endloading: true, //上拉不在加载
  //           })

  //         } else {
  //           console.log('走到这了')
  //           that.setData({
  //             release: that.data.release.concat(datas) //将得到的评论添加到release 中 更新
  //           })
  //           if (datas.length < that.data.page_size) { //如果剩下评论数 小于10表示数据加载完了
  //             console.log('已经加载完了')
  //             that.setData({
  //               isShowLoadmore: false, //隐藏正在加载
  //               isShowNoDatasTips: false, //显示暂无数据
  //             })
  //           }
  //         }
  //         that.setData({
  //           page: page + 1 //更新page 请求下一页数据
  //         })
  //       } else {
  //         console.log('code等于0啊！')
  //       }
  //     }
  //   })
  // },
  onReachBottom: function() {

    // console.log(66666)
    // var that = this;
    // var endloading = that.data.endloading
    // if (!endloading) {
    //   that.reviewpage() //页面上拉调用这个方法
    // }
    if (this.data.list.length < this.data.result.length) {
      this.getrecom();
      var page = this.data.page;
      this.setData({
        page: page + 5
      })
    }
  },

  getrecom() {
    var list = [];
    list.push(this.data.result.slice(this.data.page, 5));
    this.setData({
      list: list
    })
    console.log(this.data.list,'999999')
  },







})