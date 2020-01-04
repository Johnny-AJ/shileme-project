// pages/general/general.js

let http = require('../../utils/http.js');
let confing = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    describeVal: '', //描述评级 1,2,3,4,5
    logisticsVal: '', //物流评级  1,2,3,4,5
    storeVal: '', //门店评级  1,2,3,4,5
    anonymity: 1, //是否匿名 0: 是 1: 否
    commentInfo: '', // 评论内容 最大长度200
    pics: [], //本地存储路径
    images: [], //图片列表
    orderId: null, //订单Id
    waresId: null, //商品id
    remakeStore: '', //对门店评价
    storeIsOk: 0, //是否满意 0满意  1不满意
    findStore: '',
    btnkey: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, 'options');
    wx.setNavigationBarTitle({
      title: '评论管理'
    })
    if (options) {
      this.setData({
        orderId: options.orderId,
        waresId: options.waresId,
      })
    }
    this.findStore() //是否存在门店
  },


  onChange1(e) { //描述评级 1,2,3,4,5
    const index = e.detail.index;
    this.setData({
      'describeVal': index
    })
  },
  onChange2(e) { //物流评级 1,2,3,4,5
    const index = e.detail.index;
    this.setData({
      'logisticsVal': index
    })
  },
  onChange3(e) { //门店评级 1,2,3,4,5
    const index = e.detail.index;
    this.setData({
      'storeVal': index
    })
  },
  message(e) { //商品评论
    this.setData({
      commentInfo: e.detail.value
    })
  },
  message1(e) { //门店评论
    this.setData({
      remakeStore: e.detail.value
    })
  },
  chooseImg: function(e) { //上传图片
    var that = this,
      pics = this.data.pics;

    if (pics.length < 9) {
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {

          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }

          that.setData({
            pics: pics
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none',
        duration: 3000
      });

    }
  },
  // 删除图片
  deleteImg: function(e) {
    var that = this;
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    console.log(pics)
    this.setData({
      pics: pics,
    })
  },
  anonymous() { //是否匿名

    if (this.data.anonymity == 0) {

      this.setData({
        anonymity: 1
      })
    } else {
      this.setData({
        anonymity: 0
      })
    }
  },
  storeIsOk(e) { //是否满意
    this.setData({
      storeIsOk: e.target.dataset.storeisok,
    })
  },
  btn() { //提交
    var self = this;


    let describeVal = self.data.describeVal;
    let logisticsVal = self.data.logisticsVal;
    let storeVal = self.data.storeVal;


    if (Object.keys(self.data.findStore).length === 0) { //判断是否存在门店

      if (describeVal > 0 && logisticsVal > 0) {

      } else {
        wx.showToast({
          title: '请点亮完成小星星',
          icon: 'loading',
          duration: 2000
        })
      }
    } else {

      if (describeVal > 0 && logisticsVal > 0 && storeVal > 0) {

      } else {
        wx.showToast({
          title: '请点亮完成小星星',
          icon: 'loading',
          duration: 2000
        })
      }


    }
    var pics = self.data.pics; //本地图片


    if (pics.length > 0) {
      var imgs = [];
      pics.forEach(i => {
        wx.uploadFile({
          url: confing.domain + '/api/file/save', //上传图片
          filePath: i,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            imgs.push(JSON.parse(res.data).msg)
            self.setData({
              images: imgs
            }, () => {
              self.save()
            })
          }
        })
      })
    } else {
      self.save1()
    }



  },

  save() {
    let self=this;
    let prams = {
      anonymity: self.data.anonymity,
      commentInfo: self.data.commentInfo,
      describeVal: self.data.describeVal,
      images: self.data.images,
      logisticsVal: self.data.logisticsVal,
      orderId: self.data.orderId,
      remakeStore: self.data.remakeStore,
      storeIsOk: self.data.storeIsOk,
      storeVal: self.data.storeVal,
      waresId: self.data.waresId
    };
    http.postRequest('/api/user/comment/save', prams, function(res) {

      if (res.data.code == 0) {
        wx.showToast({
          title: '评论成功', //标题
          icon: 'success', //图标，支持"success"、"loading"
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500

          success: function() {
            wx.navigateBack({
              delta: 1,
            })
          }, //接口调用成功的回调函数

        })

      }
      console.log(res, '3333333')

    })

  },
  save1() {
    let self = this;
    
    let prams = {
      anonymity: self.data.anonymity,
      commentInfo: self.data.commentInfo,
      describeVal: self.data.describeVal,
      images: self.data.images,
      logisticsVal: self.data.logisticsVal,
      orderId: self.data.orderId,
      remakeStore: self.data.remakeStore,
      storeIsOk: self.data.storeIsOk,
      storeVal: self.data.storeVal,
      waresId: self.data.waresId
    };
    console.log(prams,'prams')
    http.postRequest('/api/user/comment/save', prams, function(res) {

      if (res.data.code == 0) {
        wx.showToast({
          title: '评论成功', //标题
          icon: 'success', //图标，支持"success"、"loading"
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500

          success: function() {
            wx.navigateBack({
              delta: 1,
            })
          }, //接口调用成功的回调函数

        })





      }


    })

  },
  findStore() {
    let self = this;
    let prams = {
      orderId: self.data.orderId
    };
    http.getRequest('/api/user/comment/findStore', prams, function(res) {

      self.setData({
        findStore: res.data.data
      })

    })

  }




})