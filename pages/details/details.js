let http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: 1,
    list: {}, //初始化数据
    imgUrls: [], //轮播图片
    currentSwiper: 0, //滑块下标
    showDialog: false, //领劵开关
    showDialog1: false, //商品规格弹出开关
    boolean: true, //关闭弹出层开关
    commodityAttr: [],
    attrValueList: [],
    imgsurl: [],
    waresId: '',
    defaultSku: undefined,
    price: 0,
    skuList: [],
    selectedProp: [],
    selectedPropObj: {},
    propKeys: [],
    allProperties: [],
    pic: '',
    token: '',
    getcommentList: [], //评论数组
    getListByWaresId: [],
    getListByWaresId1: [],
    totalCount: 0,
    contentTitle: '',
    isCollect: 1, //是否已收藏;0:Y,1:N
    astrictNum:0  //限购件数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, "options")
    var self = this;
    this.setData({
      waresId: options.waresid
    })

    // this.setData({
    //   waresId: 9
    // })

    this.get_data(options.waresid); // 获取商品数据
    var self = this;
    //获取商品规格
    http.getRequest('/api/wares/details/getPropertyList', {
      waresId: self.data.waresId
    }, function(res) {
      self.setData({
        imgsurl: res.data.data.imgUrl,
        skuList: res.data.data.skuList
      })
      self.groupSkuProp();

    })

    self.getcommentList(); //评论列表
    self.getListByWaresId() //根据商品查询优惠券列表
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getDiscountById();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },




  // 获取商品数据
  get_data(waresId) {
    var self = this;

    console.log(waresId)
    let prams = {
      waresId: waresId
    }
    http.getRequest('/api/wares/details/getWaresInfo', prams, function(res) {

      console.log(res,'getWaresInfo')
      self.setData({
        list: res.data.data,
        price: self.data.mallPrice,
        pic: res.data.data.images[0],
        isCollect: res.data.data.isCollect,
        contentTitle: res.data.data.contentTitle,
        astrictNum: res.data.data.astrictNum
      })

    })
   
  },
  // 弹出领劵层方法
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog,
    });
  },
  // 弹出规格层方法
  toggleDialog1() {
   
    this.setData({
      showDialog1: !this.data.showDialog1
    });
  },
  // 轮播图
  swiperChange: function(e) {

    if (e.detail.source == 'touch') {
      this.setData({
        currentSwiper: e.detail.current
      })
    }
  },
  // input输入框
  handleChange1({
    detail
  }) {

    if (detail.value > this.data.astrictNum){
      wx.showToast({
        title: '最多只能买' + this.data.astrictNum+'件',
        icon: 'loading',
        duration: 500
      })
    }else{
      this.setData({
        value1: detail.value
      })
    }
    

   
  },
  //规格选择
  groupSkuProp: function() {
    var self = this;
    var skuList = self.data.skuList;
    //当后台返回只有一个SKU时，且SKU属性值为空时，即该商品没有规格选项，该SKU直接作为默认选中SKU
    if (skuList.length == 1 && skuList[0].properties == "") {
      this.setData({
        defaultSku: skuList[0]
      });
      return;
    }

    var skuGroup = {}; //所有的规格名(包含规格名下的规格值集合）对象，如 {"颜色"：["金色","银色"],"内存"：["64G","256G"]}
    var allProperties = []; //所有SKU的属性值集合，如 ["颜色:金色;内存:64GB","颜色:银色;内存:64GB"]
    var propKeys = []; //所有的规格名集合，如 ["颜色","内存"]
    for (var i = 0; i < skuList.length; i++) {
      //找到和商品价格一样的那个SKU，作为默认选中的SKU
      var defaultSku = this.data.defaultSku;
      var isDefault = false;
      var properties = skuList[i].properties; //如：版本:公开版;颜色:金色;内存:64GB
      allProperties.push(properties);

      var propList = properties.split(";"); // 如：["版本:公开版","颜色:金色","内存:64GB"]

      var selectedPropObj = this.data.selectedPropObj;
      for (var j = 0; j < propList.length; j++) {

        var propval = propList[j].split(":"); //如 ["版本","公开版"]
        var props = skuGroup[propval[0]]; //先取出 规格名 对应的规格值数组

        //如果当前是默认选中的sku，把对应的属性值 组装到selectedProp
        if (isDefault) {
          propKeys.push(propval[0]);
          selectedPropObj[propval[0]] = propval[1];
        }

        if (props == undefined) {
          props = []; //假设还没有版本，新建个新的空数组
          props.push(propval[1]); //把 "公开版" 放进空数组
        } else {
          if (!this.array_contain(props, propval[1])) { //如果数组里面没有"公开版"
            props.push(propval[1]); //把 "公开版" 放进数组
          }
        }
        skuGroup[propval[0]] = props; //最后把数据 放回版本对应的值
      }
      this.setData({
        selectedPropObj: selectedPropObj,
        propKeys: propKeys
      });
    }
    this.parseSelectedObjToVals();
    this.setData({
      skuGroup: skuGroup,
      allProperties: allProperties
    });
  },
  parseSelectedObjToVals: function() {
    var selectedPropObj = this.data.selectedPropObj;
    var selectedProperties = "";
    var selectedProp = [];
    for (var key in selectedPropObj) {
      selectedProp.push(selectedPropObj[key]);
      selectedProperties += key + ":" + selectedPropObj[key] + ";";
    }
    selectedProperties = selectedProperties.substring(0, selectedProperties.length - 1);
    this.setData({
      selectedProp: selectedProp
    });

    var findSku = false;
    for (var i = 0; i < this.data.skuList.length; i++) {
      if (this.data.skuList[i].properties == selectedProperties) {
        findSku = true;
        this.setData({
          defaultSku: this.data.skuList[i],
        });
        break;
      }
    }
    this.setData({
      findSku: findSku
    });

  },
  toChooseItem: function(e) {

    if (e) {
      var val = e.currentTarget.dataset.val;
      var key = e.currentTarget.dataset.key;
      var selectedPropObj = this.data.selectedPropObj;
      selectedPropObj[key] = val;
      this.setData({
        selectedPropObj: selectedPropObj
      });
      this.parseSelectedObjToVals();
    }

  },

  array_contain: function(array, obj) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
        return true;
    }
    return false;
  },

  buys: function(e) { // 立即购买

    var self = this;

    if (e) {
      var dtos = JSON.stringify(e.currentTarget.dataset);

      if (e.currentTarget.dataset.propertyid == undefined) {
        wx.showToast({
          title: '请选择规格！',
          icon: 'loading',
          duration: 2000,
          success: function () {
            self.toggleDialog1()
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/Spell_group_order/Spell_group_order?dtos=' + dtos
        })

      }

    }
  },
  getcommentList() { //评论列表
    var self = this;

    let prams={
      waresId: self.data.waresId,
      pageSize: 5,
      currPage: 0
    }

    http.getRequest('/api/wares/details/getCommentList',prams,function(res){

      console.log(res,'getCommentList')
      self.setData({
        getcommentList: res.data.data.list,
        totalCount: res.data.data.totalCount
      })
    })
  },
  gotcommentList(e) {

    wx.navigateTo({
      url: '/pages/comment/comment?waresId=' + e.currentTarget.dataset.waresid,
    })
  },
  goback() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  goto() {
    wx.reLaunch({
      url: '/pages/cart/cart'
    })
  },
  getListByWaresId() { //根据商品查询优惠券列表
    var self = this;
    let prams = {
      waresId: self.data.waresId,
      storeId: ''
      }
    http.getRequest('/api/discount/data/getListByWaresId',prams,function(res){
      self.setData({
        getListByWaresId: res.data.data
      })
      var getListByWaresId = self.data.getListByWaresId;
      for (var i = 0; i < getListByWaresId.length; i++) {
        getListByWaresId[i].text = '';
        if (getListByWaresId[i].discountCouponFor == 0) {
          getListByWaresId[i].text = '全平台'
        } else if (getListByWaresId[i].discountCouponFor == 1) {
          getListByWaresId[i].text = '门店'
        } else {
          getListByWaresId[i].text = '指定商品'
        }
        self.setData({
          getListByWaresId
        })

      }
      var getListByWaresId = self.data.getListByWaresId;
      self.setData({
        getListByWaresId1: getListByWaresId.slice(0, 2)
      })
    })
  },
  getDiscountById(e) { // 领取优惠券
    var self = this;
    if (e) {
      var id = e.currentTarget.dataset.id;

      http.getRequest('/api/discount/data/getDiscountById', { id: id }, function (res) {
        if (res.data.code == '0') {
          var getListByWaresId = self.data.getListByWaresId;
          for (var i = 0; i < getListByWaresId.length; i++) {

            // console.log(getListByWaresId[i], '555555')
            if (getListByWaresId[i].id == id) {

              // console.log(88888)
              getListByWaresId[i].isGet = 0;

            }

          }
          self.setData({
            getListByWaresId: getListByWaresId
          })

        }

      })

    }
  
  },
  addcart(e) { //加入购物车
    var self = this;


    if (e) {
      if (e.currentTarget.dataset.propertyid) {
        var dto = JSON.stringify(e.currentTarget.dataset)
        http.postRequest('/api/shop/cart/add', dto, function(res) {
          if (res.data.code == 0) {

            wx.showToast({
              title: '加入购物车成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      } else {
        wx.showToast({
          title: '请选择规格！',
          icon: 'loading',
          duration: 2000,
          success: function () {
            self.toggleDialog1()
          }
        })

      }
    }


  },
  defined(e) { //加入收藏
    var self = this;
    if (e) {
      if (e.currentTarget.dataset.waresid) {

        http.getRequest('/api/shop/collect/add', {
          waresId: e.currentTarget.dataset.waresid
        }, function(res) {
          if (res.data.code == '0') {

            self.setData({
              isCollect: 0
            })

          }
        })
    
      }
    }
  },
  deleteByWaresId(e) { //取消收藏

    let self = this;
    http.getRequest('/api/shop/collect/deleteByWaresId', {
      waresId: e.currentTarget.dataset.waresid
    }, function(res) {

      if (res.data.code == 0) {
        self.setData({
          isCollect: 1
        })
      }
    })
  }

})