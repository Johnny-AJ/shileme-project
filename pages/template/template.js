// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     show:1,
//     arry: [{ name: 'a1' }, { name: 'a2' }, { name: 'a3' }, { name: 'a4' }, { name: 'a5' }]
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
    
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
    
//   },



//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
    
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
    
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
    
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
 
//   }
//   ,
//   click(e){
// console.log(e)
//     let index = e.currentTarget.dataset.index;
//     console.log(index)
//     this.setData({
//       show: index
//     })
   

   
//     // arry.forEach(function(item,index){
//     //   if(index==e.currentTarge.dataset.index){
//     //     show: e.currentTarge.dataset.index
//     //   }else{
//     //     show:0
//     //   }
//     // })
//   }
// })







// // pages/scango/scango.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     value1: 1,
//     token: '',
//     contents: {},
//     imgs: [],
//     value1: 1,
//     commodityAttr: [],
//     imgindex: 0,
//     attrValueList: [],
//     imgUrls: [],
//     currentSwiper: 0,
//     autoplay: true,
//     showDialog: false,
//     showDialog1: false,
//     boolean: true,
//     list: {},
//     comments: {}
//   },
 
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
    
//     // 头部标题
//     wx.setNavigationBarTitle({
//       title: '扫码购'
//     }),
//       this.request()
//   },
//   /**
//    * 生命周期函数--监听页面显示
//    */


//   onShow: function () {

//     var self = this;
//     // 评论请求
//     // wx.request({
//     //   url: 'http://192.168.2.98:9095/api/wares/details/getCommentList',
//     //   data: {
//     //     start: 0,
//     //     limit: 4,
//     //     waresId: 28
//     //   },
//     //   success(res) {
//     //     comments: res.data
//     //   }
//     // })
//     // 规格选择
//     wx.request({
//       url: 'http://192.168.2.119:9095//api/wares/details/getPropertyList',
//       method: "get",
//       data: {
//         waresId: 28
//       },
//       success(res) {
//         console.log(1111, res.data.data)
//         self.setData({
//           commodityAttr: res.data.data.commodityAttr
//         })
//       }
//     }),
//       this.setData({
//         includeGroup: this.data.commodityAttr
//       });
//     this.distachAttrValue(this.data.commodityAttr);
//     // 只有一个属性组合的时候默认选中 
//     // console.log(this.data.attrValueList); 
//     if (this.data.commodityAttr.length == 1) {
//       for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
//         this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
//       }
//       this.setData({
//         attrValueList: this.data.attrValueList
//       });
//     }

//   },
//   /* 获取数据 */
//   distachAttrValue: function (commodityAttr) {
//     var self = this;

//     /** 
//     将后台返回的数据组合成类似 
//     { 
//     attrKey:'型号', 
//     attrValueList:['1','2','3'] 
//     } 
//     */
//     // 把数据对象的数据（视图使用），写到局部内 
//     var attrValueList = this.data.attrValueList;
//     // 遍历获取的数据 
//     for (var i = 0; i < commodityAttr.length; i++) {
//       for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
//         var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
//         // console.log('属性索引', attrIndex); 
//         // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置 
//         if (attrIndex >= 0) {
//           // 如果属性值数组中没有该值，push新值；否则不处理 
//           if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
//             attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
//           }
//         } else {
//           attrValueList.push({
//             attrKey: commodityAttr[i].attrValueList[j].attrKey,
//             attrValues: [commodityAttr[i].attrValueList[j].attrValue]
//           });
//         }
//       }
//     }
//     // console.log('result', attrValueList) 
//     for (var i = 0; i < attrValueList.length; i++) {
//       for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
//         if (attrValueList[i].attrValueStatus) {
//           attrValueList[i].attrValueStatus[j] = true;
//         } else {
//           attrValueList[i].attrValueStatus = [];
//           attrValueList[i].attrValueStatus[j] = true;
//         }
//       }
//     }
//     this.setData({
//       attrValueList: attrValueList
//     });
//   },
//   getAttrIndex: function (attrName, attrValueList) {
//     // 判断数组中的attrKey是否有该属性值 
//     for (var i = 0; i < attrValueList.length; i++) {
//       if (attrName == attrValueList[i].attrKey) {
//         break;
//       }
//     }
//     return i < attrValueList.length ? i : -1;
//   },
//   isValueExist: function (value, valueArr) {
//     // 判断是否已有属性值 
//     for (var i = 0; i < valueArr.length; i++) {
//       if (valueArr[i] == value) {
//         break;
//       }
//     }
//     return i < valueArr.length;
//   },
//   /* 选择属性值事件 */
//   selectAttrValue: function (e) {
//     /* 
//     点选属性值，联动判断其他属性值是否可选 
//     { 
//     attrKey:'型号', 
//     attrValueList:['1','2','3'], 
//     selectedValue:'1', 
//     attrValueStatus:[true,true,true] 
//     } 
//     console.log(e.currentTarget.dataset); 
//     */
//     var attrValueList = this.data.attrValueList;
//     var index = e.currentTarget.dataset.index; //属性索引 
//     var key = e.currentTarget.dataset.key;
//     var value = e.currentTarget.dataset.value;
//     if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
//       if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
//         // 取消选中 
//         this.disSelectValue(attrValueList, index, key, value);
//       } else {
//         // 选中 
//         this.selectValue(attrValueList, index, key, value);
//       }
//     }
//   },
//   /* 选中 */
//   selectValue: function (attrValueList, index, key, value, unselectStatus) {
//     // console.log('firstIndex', this.data.firstIndex); 
//     var includeGroup = [];
//     if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选 
//       var commodityAttr = this.data.commodityAttr;
//       // 其他选中的属性值全都置空 
//       // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus); 
//       for (var i = 0; i < attrValueList.length; i++) {
//         for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
//           attrValueList[i].selectedValue = '';
//         }
//       }
//     } else {
//       var commodityAttr = this.data.includeGroup;
//     }
//     // console.log('选中', commodityAttr, index, key, value); 
//     for (var i = 0; i < commodityAttr.length; i++) {
//       for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
//         if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
//           includeGroup.push(commodityAttr[i]);
//         }
//       }
//     }
//     attrValueList[index].selectedValue = value;
//     // 判断属性是否可选 
//     for (var i = 0; i < attrValueList.length; i++) {
//       for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
//         attrValueList[i].attrValueStatus[j] = false;
//       }
//     }
//     for (var k = 0; k < attrValueList.length; k++) {
//       for (var i = 0; i < includeGroup.length; i++) {
//         for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
//           if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
//             for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
//               if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
//                 attrValueList[k].attrValueStatus[m] = true;
//               }
//             }
//           }
//         }
//       }
//     }
//     // console.log('结果', attrValueList); 
//     this.setData({
//       attrValueList: attrValueList,
//       includeGroup: includeGroup
//     });
//     var count = 0;
//     for (var i = 0; i < attrValueList.length; i++) {
//       for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
//         if (attrValueList[i].selectedValue) {
//           count++;
//           break;
//         }
//       }
//     }
//     if (count < 2) { // 第一次选中，同属性的值都可选 
//       this.setData({
//         firstIndex: index
//       });
//     } else {
//       this.setData({
//         firstIndex: -1
//       });
//     }
//   },
//   /* 取消选中 */
//   disSelectValue: function (attrValueList, index, key, value) {
//     var commodityAttr = this.data.commodityAttr;
//     attrValueList[index].selectedValue = '';
//     // 判断属性是否可选 
//     for (var i = 0; i < attrValueList.length; i++) {
//       for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
//         attrValueList[i].attrValueStatus[j] = true;
//       }
//     }
//     this.setData({
//       includeGroup: commodityAttr,
//       attrValueList: attrValueList
//     });
//     for (var i = 0; i < attrValueList.length; i++) {
//       if (attrValueList[i].selectedValue) {
//         this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
//       }
//     }
//   },
//   submit: function () {
//     var value = [];
//     for (var i = 0; i < this.data.attrValueList.length; i++) {
//       if (!this.data.attrValueList[i].selectedValue) {
//         break;
//       }
//       value.push(this.data.attrValueList[i].selectedValue);
//     }
//     if (i < this.data.attrValueList.length) {
//       wx.showToast({
//         title: '请选择完整！',
//         icon: 'loading',
//         duration: 1000
//       })
//     } else {
//       var valueStr = "";
//       for (var i = 0; i < value.length; i++) {
//         console.log(value[i]);
//         valueStr += value[i] + ",";
//       }
//       wx.showModal({
//         title: '提示',
//         content: valueStr,
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击确定')
//           } else if (res.cancel) {
//             console.log('用户点击取消')
//           }
//         }
//       })
//       console.log(valueStr);
//     }
//   },
//   goto: function (e) {
//     wx.navigateTo({
//       url: '/pages/comment/comment',
//     })
//   },
  // buys: function (e) {

  //   console.log(e)
  //   var dtos = JSON.stringify(e.currentTarget.dataset);
  //   // var dtos = e.currentTarget.dataset;

  //   wx.navigateTo({
  //     url: '/pages/Spell_group_order/Spell_group_order?dtos=' + dtos
  //   })
  // },
//   request() {

//     var self = this;
//     wx.setNavigationBarTitle({
//       title: '商品详情'
//     }),
//       // 数据请求
//       wx.request({
//         url: 'http://192.168.2.98:9095/api/wares/details/getWaresInfo',
//         method: "get",
//         data: {
//           waresId: 28
//         },
//         success(res) {
//           console.log(66666, res)
//           self.setData({
//             list: res.data.data
//           })


//         }
//       })
//   }

// })



Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 01.规格选择
    selectArr: [], //存放被选中的值
    shopItemInfo: {}, //存放要和选中的值进行匹配的数据
    subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
    // 02.规格显示
    skuShow: null,
    guigedata: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.request({
      url: 'https://www.easy-mock.com/mock/5cdd6b00fd487e51be5eb0a0/',
      data: {},
      header: {},
      success: (res) => {

        console.log(res,'测试')
        this.guigedata = res.data.guige_data
        this.setData()
      },
      fail: (err) => {
        console.log(err)
      }
    });
   
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  setData() {
    let sku = this.guigedata.sku;
    for (let i = 0, len = sku.length; i < len; i++) {
      this.shopItemInfo[sku[i].attr_ids.replace(/\//g, ",")] = sku[i];
      /* 
      * 修改数据结构格式，用规格组成的id用逗号分割作属性名
      *  */
    }
    this.checkItem();
  },

  // 01.规格选择
  specificationBtn(item, n, event, index) {
    /* 
     * n是外层循环，index是内层循环
     * item是数据项
     * event事件对象
     *  */
    if (this.selectArr[n] != item) {
      /* 
      * n是外层索引，也就是颜色、尺寸这样的规格类别
      * (this.selectArr[n] != item) 也就是这一类规格没有再点击一样的
      *  */
      this.selectArr[n] = item;
      this.subIndex[n] = index;
    } else {
      /* 
      * 如果是点击了这一类里刚点击了的规格，则去除选中态
      * 也就是点击了选中再点击去除选中
      * */
      this.selectArr[n] = "";
      this.subIndex[n] = -1; //去掉选中的颜色
    }
    this.checkItem();
  },
  checkItem() {
    let option = this.guigedata.apec_attr;
    let result = []; //定义数组存储已经被选中的值
    let len = option.length;
    for (let i = 0; i < len; i++) {
      result[i] = this.selectArr[i] ? this.selectArr[i] : "";
    }
    for (let i = 0; i < len; i++) {
      let last = result[i]; //把选中的值存放到字符串last去
      let leng = option[i].attrs.length;
      for (let k = 0; k < leng; k++) {
        result[i] = option[i].attrs[k].id; //赋值，存在直接覆盖，不存在往里面添加id值
        /* 
        * 循环判断每一个规格项
        * 在数据里面添加字段isShow来判断是否可以选择
        * 
        *  */
        option[i].attrs[k].isShow = this.isMay(result);
        /* 
        *  因为this.guigedata.apec_attr是一个对象，
        * option是指向这个对象的引用
        * 对option数据改动this.guigedata.apec_attr也会跟着改动
        * 用this.guigedata.apec_attr来渲染的oItem项数据也跟着变动
        * 
        *  */
        // console.log(this.guigedata.apec_attr[i].attrs[k].isShow,'===',option[i].attrs[k].isShow)
      }
      result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
    }
    this.$forceUpdate(); //重绘
  },
  isMay(result) {
    console.log(result)
    let len = result.length;
    for (let i = 0; i < len; i++) {
      if (result[i] == "") {
        return true; //如果数组里有为空的值，那直接返回true
      }
    }
    return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
  },

})