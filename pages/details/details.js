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
    pageSize: 5,
    currPage: 0,
    getListByWaresId: [],
    getListByWaresId1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var self = this;
    this.setData({
      waresId: options.waresid
    })

    // this.setData({
    //   waresId: 9
    // })

    this.get_data(options.waresid); // 获取商品数据
    var self = this;
    wx.request({ //获取商品规格
        url: 'http://192.168.2.98:9095/api/wares/details/getPropertyList',
        method: "get",
        data: {
          waresId: self.data.waresId
        },
        success(res) {

          console.log(res.data, '66666666')
          self.setData({
            imgsurl: res.data.data.imgUrl
          })

          self.setData({
            skuList: res.data.data.skuList
          })

          self.groupSkuProp();

        }



      }),
      this.getcommentList(); //评论列表
    this.getListByWaresId() //根据商品查询优惠券列表


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
    wx.request({
      url: 'http://192.168.2.98:9095/api/wares/details/getWaresInfo',
      method: "get",
      data: {
        waresId: waresId
      },
      success(res) {
        console.log(res, 'getWaresInfo')

        self.setData({
          list: res.data.data
        })
        self.setData({
          price: self.data.list.mallPrice
        })

        self.setData({
          pic: self.data.list.images[0]
        })


      }
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
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  // input输入框
  handleChange1({
    detail
  }) {
    this.setData({
      value1: detail.value
    })
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

      // if (!defaultSku || skuList[i].price == this.data.price) {


      //   defaultSku = skuList[i];

      //   isDefault = true;
      //   this.setData({
      //     defaultSku: defaultSku
      //   });
      // }

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

   if(e){
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

   if(e){
     var dtos = JSON.stringify(e.currentTarget.dataset);
     console.log(dtos, 'dtos')
     if (e.currentTarget.dataset.propertyid == undefined) {
       wx.showToast({
         title: '请选择规格！',
         icon: 'loading',
         duration: 2000
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
    wx.request({
      url: 'http://192.168.2.98:9095/api/wares/details/getCommentList',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        waresId: self.data.waresId,
        pageSize: self.data.pageSize,
        currPage: self.data.currPage

      },
      success: function(res) {
        console.log(res, 'getCommentList')
      }
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
    wx.request({
      url: 'http://192.168.2.98:9095/api/discount/data/getListByWaresId',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        waresId: self.data.waresId,
        storeId: ''

      },
      success: function(res) {

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
        console.log(self.data.getListByWaresId, 'getListByWaresId')
      }
    })
  },
  getDiscountById(e) { // 领取优惠券

   if(e){
     var id = e.currentTarget.dataset.id;

   }
    var self = this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/discount/data/getDiscountById',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: id

      },
      success: function(res) {


        if (res.data.code == '0') {
          var getListByWaresId = self.data.getListByWaresId;
          for (var i = 0; i < getListByWaresId.length; i++) {

            console.log(getListByWaresId[i], '555555')
            if (getListByWaresId[i].id == id) {

              console.log(88888)
              getListByWaresId[i].isGet = 0;

            }

          }
          self.setData({
            getListByWaresId: getListByWaresId
          })
        
        }

      }
    })


  },
  addcart(e) { //加入购物车
    var self = this;
  

    if (e) {
      if (e.currentTarget.dataset.propertyid) {
        var dto = JSON.stringify(e.currentTarget.dataset)
        wx.request({
          url: 'http://192.168.2.98:9095/api/shop/cart/add',
          header: {
            token: wx.getStorageSync('token'),
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          data: dto,
          success: function (res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '加入购物车成功',
                icon: 'success',
                duration: 1000
              })
            }
          }

        })
      } else {
        wx.showToast({
          title: '请添加规格',
          icon: 'loading',
          duration: 1000
        })
      }
    }
    
   
  },
  defined(e){
    var self = this;
    if(e){
      if (e.currentTarget.dataset.waresid){
        wx.request({
          url: 'http://192.168.2.98:9095/api/shop/collect/add',
          data:{
            waresId: e.currentTarget.dataset.waresid
          },
          header:{
            token:wx.getStorageSync('token')
          },
          success:function(res){
            if(res.data.code=='0'){
              wx.showToast({
                title: '已经加入收藏',
                icon: 'success',
                duration: 1000
              })
            }
          }
        })
      }
    }
  }
})