<<<<<<< HEAD
// pages/scango/scango.js
=======
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    value1:1,
    token: '',
    contents: {},
    imgs: [],
    value1: 1,
    commodityAttr: [],
    imgindex: 0,
    attrValueList: [],
    imgUrls: [],
    currentSwiper: 0,
    autoplay: true,
    showDialog: false,
    showDialog1: false,
    boolean: true,
    list: {},
    comments: {}
  },
  // 弹出层方法
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog,

    });
  },
=======
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
    pageSize:5,
    currPage:0


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
        waresId: 9//self.data.waresId
      },
      success(res) {

        console.log(res.data,'')
        self.setData({
          imgsurl: res.data.data.imgs
        })

        self.setData({
          skuList: res.data.data.skuList
        })

        self.groupSkuProp();

      }



    }),
    this.getcommentList()

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
        waresId:9//waresId
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
  // 弹出领劵层方法
  toggleDialog() {

    this.setData({
      showDialog: !this.data.showDialog,
    });
  },
  // 弹出规格层方法
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  toggleDialog1() {
    this.setData({
      showDialog1: !this.data.showDialog1
    });
<<<<<<< HEAD

  },
=======
  },
  // 轮播图
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  // input输入框
<<<<<<< HEAD
  
  handleChange1({ detail }) {
=======
  handleChange1({
    detail
  }) {
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
    this.setData({
      value1: detail.value
    })
  },
<<<<<<< HEAD
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 头部标题
    wx.setNavigationBarTitle({
      title: '扫码购'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onLoad: function() {

  },
  onShow: function() {

    var self = this;
    wx.setNavigationBarTitle({
        title: '商品详情'
      }),
      // 数据请求
      wx.request({
        url: 'http://192.168.2.98:9095/api/wares/details/getWaresInfo',
        method: "get",
        data: {
          waresId: 28
        },
        success(res) {
          self.setData({
            list: res.data.data
          })
        }
      }),
      // 评论请求
      // wx.request({
      //   url: 'http://192.168.2.98:9095/api/wares/details/getCommentList',
      //   data: {
      //     start: 0,
      //     limit: 4,
      //     waresId: 28
      //   },
      //   success(res) {
      //     comments: res.data
      //   }
      // })

      wx.request({
        url: 'http://192.168.2.119:9095//api/wares/details/getPropertyList',
        method: "get",
        data: {
          waresId: 28
        },
        success(res) {
          console.log(1111, res.data.data)
          self.setData({
            commodityAttr: res.data.data.commodityAttr
          })
        }
      }),
      this.setData({
        includeGroup: this.data.commodityAttr
      });
    this.distachAttrValue(this.data.commodityAttr);
    // 只有一个属性组合的时候默认选中 
    // console.log(this.data.attrValueList); 
    if (this.data.commodityAttr.length == 1) {
      for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
        this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
      }
      this.setData({
        attrValueList: this.data.attrValueList
      });
    }

  },
  /* 获取数据 */
  distachAttrValue: function(commodityAttr) {
    var self = this;
   

    /** 
    将后台返回的数据组合成类似 
    { 
    attrKey:'型号', 
    attrValueList:['1','2','3'] 
    } 
    */
    // 把数据对象的数据（视图使用），写到局部内 
    var attrValueList = this.data.attrValueList;
    // 遍历获取的数据 
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
        // console.log('属性索引', attrIndex); 
        // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置 
        if (attrIndex >= 0) {
          // 如果属性值数组中没有该值，push新值；否则不处理 
          if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
            attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
          }
        } else {
          attrValueList.push({
            attrKey: commodityAttr[i].attrValueList[j].attrKey,
            attrValues: [commodityAttr[i].attrValueList[j].attrValue]
          });
        }
      }
    }
    // console.log('result', attrValueList) 
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].attrValueStatus) {
          attrValueList[i].attrValueStatus[j] = true;
        } else {
          attrValueList[i].attrValueStatus = [];
          attrValueList[i].attrValueStatus[j] = true;
        }
      }
    }
    this.setData({
      attrValueList: attrValueList
    });
  },
  getAttrIndex: function(attrName, attrValueList) {
    // 判断数组中的attrKey是否有该属性值 
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrName == attrValueList[i].attrKey) {
        break;
      }
    }
    return i < attrValueList.length ? i : -1;
  },
  isValueExist: function(value, valueArr) {
    // 判断是否已有属性值 
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i] == value) {
        break;
      }
    }
    return i < valueArr.length;
  },
  /* 选择属性值事件 */
  selectAttrValue: function(e) {
    /* 
    点选属性值，联动判断其他属性值是否可选 
    { 
    attrKey:'型号', 
    attrValueList:['1','2','3'], 
    selectedValue:'1', 
    attrValueStatus:[true,true,true] 
    } 
    console.log(e.currentTarget.dataset); 
    */
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index; //属性索引 
    var key = e.currentTarget.dataset.key;
    var value = e.currentTarget.dataset.value;
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
      if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
        // 取消选中 
        this.disSelectValue(attrValueList, index, key, value);
      } else {
        // 选中 
        this.selectValue(attrValueList, index, key, value);
      }
    }
  },
  /* 选中 */
  selectValue: function(attrValueList, index, key, value, unselectStatus) {
    // console.log('firstIndex', this.data.firstIndex); 
    var includeGroup = [];
    if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选 
      var commodityAttr = this.data.commodityAttr;
      // 其他选中的属性值全都置空 
      // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus); 
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = '';
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup;
    }
    // console.log('选中', commodityAttr, index, key, value); 
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
          includeGroup.push(commodityAttr[i]);
        }
      }
    }
    attrValueList[index].selectedValue = value;
    // 判断属性是否可选 
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = false;
      }
    }
    for (var k = 0; k < attrValueList.length; k++) {
      for (var i = 0; i < includeGroup.length; i++) {
        for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
          if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
            for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
              if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                attrValueList[k].attrValueStatus[m] = true;
              }
            }
          }
        }
      }
    }
    // console.log('结果', attrValueList); 
    this.setData({
      attrValueList: attrValueList,
      includeGroup: includeGroup
    });
    var count = 0;
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].selectedValue) {
          count++;
          break;
        }
      }
    }
    if (count < 2) { // 第一次选中，同属性的值都可选 
      this.setData({
        firstIndex: index
      });
    } else {
      this.setData({
        firstIndex: -1
      });
    }
  },
  /* 取消选中 */
  disSelectValue: function(attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr;
    attrValueList[index].selectedValue = '';
    // 判断属性是否可选 
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = true;
      }
    }
    this.setData({
      includeGroup: commodityAttr,
      attrValueList: attrValueList
    });
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrValueList[i].selectedValue) {
        this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
      }
    }
  },
  submit: function() {
    var value = [];
    for (var i = 0; i < this.data.attrValueList.length; i++) {
      if (!this.data.attrValueList[i].selectedValue) {
        break;
      }
      value.push(this.data.attrValueList[i].selectedValue);
    }
    if (i < this.data.attrValueList.length) {
      wx.showToast({
        title: '请选择完整！',
        icon: 'loading',
        duration: 1000
      })
    } else {
      var valueStr = "";
      for (var i = 0; i < value.length; i++) {
        console.log(value[i]);
        valueStr += value[i] + ",";
      }
      wx.showModal({
        title: '提示',
        content: valueStr,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      console.log(valueStr);
    }
  },
  goto: function(e) {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },
  buys: function(e) {
    var dtos = JSON.stringify(e.currentTarget.dataset);
    // var dtos = e.currentTarget.dataset;

      wx.navigateTo({
        url: '/pages/Spell_group_order/Spell_group_order?dtos=' + dtos
      })
=======
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
  
  buys: function (e) {// 立即购买

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

  },
  getcommentList(){
    var self=this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/wares/details/getCommentList',
      header:{
        token: wx.getStorageSync('token')
      },
      data:{
        waresId: 9,//self.data.waresId,
        pageSize: self.data.pageSize,
        currPage: self.data.currPage

      },
      success:function(res){
        console.log(res,'getCommentList')
      }
    })
>>>>>>> 1eb06d9583af236b7485e283fba9b2d4b18d2d9d
  }
})