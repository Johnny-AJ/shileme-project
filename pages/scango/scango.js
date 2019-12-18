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
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;

    this.setData({
      waresId: options.waresId
    })

    this.get_data(options.waresId); // 获取商品数据


    var self = this;
    wx.request({ //获取商品规格
      url: 'http://192.168.2.98:9095/api/wares/details/getPropertyList',
      method: "get",
      data: {
        waresId: self.data.waresId
      },
      success(res) {


        self.setData({
          imgsurl: res.data.data.imgs
        })

        self.setData({
          skuList: res.data.data.skuList
        })

        self.groupSkuProp();

      }



    })

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

  /**
   * 用户点击右上角分享
   */


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

      if (!defaultSku || skuList[i].price == this.data.price) {


        defaultSku = skuList[i];

        isDefault = true;
        this.setData({
          defaultSku: defaultSku
        });
      }

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

    var val = e.currentTarget.dataset.val;
    var key = e.currentTarget.dataset.key;
    var selectedPropObj = this.data.selectedPropObj;
    selectedPropObj[key] = val;
    this.setData({
      selectedPropObj: selectedPropObj
    });
    this.parseSelectedObjToVals();

  },

  array_contain: function(array, obj) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
        return true;
    }
    return false;
  },
  // 立即购买
  buys: function(e) {

    var self = this;

    var dtos = JSON.stringify(e.currentTarget.dataset);

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
})