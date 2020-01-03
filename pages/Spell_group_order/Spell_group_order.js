const app = getApp()

Page({


<<<<<<< HEAD
  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    waresId: '',
    propertyId: '',
    num: '',
    token: '',
    dtos: [],
    address: {},
    addressok: true,
    orderWaresVos:[],
    quota: {},
    allprice: 0,
    inputValue: '',
    doto: {},
    options: {},
    discountId: '',
    isdefault: 1,
    addressId: '',
    addAddressList: [],
    getListByWaresId: [], //优惠劵列表
    showDialog: false, //领劵开关
    getListByWaresId1: [], //优惠劵列表
    coupon: 0, //优惠金额
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {

    var self = this;
    self.setData({
      doto: options.dtos
    })

    self.setData({
      options: options
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

    this.oders(); // 获取扫码购的参数
    this.checked();
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  goto(e) { //提交订单
    var self = this;

    wx.request({
      // 支付地址
      url: 'http://192.168.2.98:9095/api/order/saveOrder?time=' + new Date().getTime(),
      method: "POST",
      header: {
        'token': wx.getStorageSync('token') //请求头携带参数
      },
      data: {
        discountId: self.data.discountId,
        remark: self.data.inputValue,
        addressId: self.data.addressId,
        waresList: self.data.dtos,
       
      },
      success: function(res) {
   
        // 微信支付
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) {

            if (res.errMsg.split(":")[1] == "ok") {
              var allprice = self.data.allprice;

              wx.navigateTo({
                url: '/pages/view/view?allprice=' + allprice,
              })
            } else {



            }
          },
          fail: function(res) {


            var waresList = JSON.stringify(self.data.dtos);

            wx.navigateTo({
              url: '/pages/view1/view1?discountId=' + self.data.discountId + '&remark=' + self.data.inputValue + '&addressId=' + self.data.address.id + '&waresList=' + waresList + '&allprice=' + self.data.allprice,
            })
          }

        })

      }
    })
    // let url=e.
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  oders() { //获取下单详细信息
    var self = this;
    var list = JSON.parse(self.data.options.dtos);
    let dd = [];
    var dtos = dd.concat(list);

    self.setData({
      dtos: dtos
    })
    wx.request({
      url: 'http://192.168.2.98:9095/api/order/savePlace',
      method: 'POST',
      data: {
        dtos: dtos
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: (res) => {
       
        if (res.data.code == 500) {
          wx.showToast({
            title: '库存不足！',
            icon: 'loading',
            duration: 2000,
            success: function(res) {
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1,
                })
              }, 2000)
            }
          })
        }

        self.setData({
          allprice: res.data.data.allprice
        }, () => {
          self.setData({
            coupon: app.returnFloat(self.data.coupon)
        })

          self.setData({
            allprice: app.returnFloat(self.data.allprice)
          })
        })
        self.setData({
          getListByWaresId: res.data.data.marketings
        })
        var getListByWaresId = self.data.getListByWaresId;
       if(getListByWaresId){
         for (var i = 0; i < getListByWaresId.length; i++) {
           getListByWaresId[i].chekok = false;
           getListByWaresId[i].text = '';
           if (getListByWaresId[i].discountCouponFor == 0) {
             getListByWaresId[i].text = '全平台'
           } else {
             getListByWaresId[i].text = '指定商品'
           }

           if (self.data.allprice > getListByWaresId[i].startMoney) {

             getListByWaresId[i].chekok = true;
             var getListByWaresId1 = self.data.getListByWaresId1;
             getListByWaresId1.push(getListByWaresId[i])
             self.setData({
               getListByWaresId1
             })
           }

         }
       }

        self.setData({
          getListByWaresId
        })

        self.setData({
          address: res.data.data.address
        })

        self.setData({
          orderWaresVos: res.data.data.orderWaresVos
        })

        var address = self.data.address;

        self.setData({
          addressId: self.data.address.id
        })
        if (address == null) { //判断地址是否存在默认


          self.setData({
            addressok: false
          })
        } else {

          self.setData({
            addressok: true
          })


        }
      },
      fail: (error) => {

      }
    })
  },
  handurl: function(e) { //路由跳转到填写地址
    var self = this;


    wx.navigateTo({
      url: '/pages/shipping/shipping'
    })


  },
  toggleDialog() { //弹出页关闭
    this.setData({
      showDialog: !this.data.showDialog,

    });
  },

  bindKeyInput: function(e) { //卖家留言
    this.setData({
      inputValue: e.detail.value
    })
  },
  checked() { //从新选择地址
    var self = this;
    var addressId = wx.getStorageSync('addressId');

    wx.request({
      url: 'http://192.168.2.98:9095/api/address/list',
      method: 'GET',
      header: {
        'token': wx.getStorageSync('token') //请求头携带参数
      },
      success: res => {
        self.setData({
          addAddressList: res.data.data
        });
        var addAddressList = self.data.addAddressList;

          if(addAddressList){
            for (var i = 0; i < addAddressList.length; i++) {

              if (addAddressList[i].id == addressId) {

                this.setData({
                  address: addAddressList[i]
                }, () => {
                  wx.setStorageSync('addressId', '')
                })

              }

            }
          }
      }

    })

  },

  toggleDialog() { //优惠劵选择弹出

    this.setData({
      showDialog: !this.data.showDialog,
    });
  },
  checkdiscountId(e) { //选中优惠劵

    var self = this;
    var getListByWaresId = self.data.getListByWaresId;
    var allprice = self.data.allprice;
    for (var i = 0; i < getListByWaresId.length; i++) {
      if (getListByWaresId[i].startMoney < allprice) {

        if (e.currentTarget.dataset.discountid == getListByWaresId[i].id) {



          var aa = app.returnFloat(getListByWaresId[i].startMoney);

          self.setData({
            discountId: e.currentTarget.dataset.discountid,
            showDialog: !self.data.showDialog,
            coupon: aa
          })
        } else {

        }

      }
      self.setData({
        getListByWaresId
      })
    }
  },
=======
    /**
     * 页面的初始数据
     */
    data: {
        showDialog: false,
        waresId: '',
        propertyId: '',
        num: '',
        token: '',
        dtos: [],
        address: {},
        addressok: true,
        orderWaresVos: [],
        quota: {},
        allprice: 0,
        inputValue: '',
        doto: {},
        options: {},
        discountId: '',
        isdefault: 1,
        addressId: '',
        addAddressList: [],
        getListByWaresId: [], //优惠劵列表
        showDialog: false, //领劵开关
        getListByWaresId1: [], //优惠劵列表
        coupon: 0, //优惠金额
    },

    /**
     * 生命周期函数--监听页面加载
     */


    onLoad: function(options) {

        var self = this;
        self.setData({
            doto: options.dtos
        })

        self.setData({
            options: options
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

        this.oders(); // 获取扫码购的参数
        this.checked();
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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },
    goto(e) { //提交订单
        var self = this;

        wx.request({
                // 支付地址
                url: 'http://192.168.2.98:9095/api/order/saveOrder?time=' + new Date().getTime(),
                method: "POST",
                header: {
                    'token': wx.getStorageSync('token') //请求头携带参数
                },
                data: {
                    discountId: self.data.discountId,
                    remark: self.data.inputValue,
                    addressId: self.data.addressId,
                    waresList: self.data.dtos,

                },
                success: function(res) {

                    // 微信支付
                    wx.requestPayment({
                        timeStamp: res.data.data.timeStamp,
                        nonceStr: res.data.data.nonceStr,
                        package: res.data.data.package,
                        signType: res.data.data.signType,
                        paySign: res.data.data.paySign,
                        success(res) {

                            if (res.errMsg.split(":")[1] == "ok") {
                                var allprice = self.data.allprice;

                                wx.navigateTo({
                                    url: '/pages/view/view?allprice=' + allprice,
                                })
                            } else {



                            }
                        },
                        fail: function(res) {


                            var waresList = JSON.stringify(self.data.dtos);

                            wx.navigateTo({
                                url: '/pages/view1/view1?discountId=' + self.data.discountId + '&remark=' + self.data.inputValue + '&addressId=' + self.data.address.id + '&waresList=' + waresList + '&allprice=' + self.data.allprice,
                            })
                        }

                    })

                }
            })
            // let url=e.
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    oders() { //获取下单详细信息
        var self = this;
        var list = JSON.parse(self.data.options.dtos);
        let dd = [];
        var dtos = dd.concat(list);

        self.setData({
            dtos: dtos
        })
        wx.request({
            url: 'http://192.168.2.98:9095/api/order/savePlace',
            method: 'POST',
            data: {
                dtos: dtos
            },
            header: {
                token: wx.getStorageSync('token')
            },
            success: (res) => {

                if (res.data.code == 500) {
                    wx.showToast({
                        title: '库存不足！',
                        icon: 'loading',
                        duration: 2000,
                        success: function(res) {
                            setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }, 2000)
                        }
                    })
                }

                self.setData({
                    allprice: res.data.data.allprice
                }, () => {
                    self.setData({
                        coupon: app.returnFloat(self.data.coupon)
                    })

                    self.setData({
                        allprice: app.returnFloat(self.data.allprice)
                    })
                })
                self.setData({
                    getListByWaresId: res.data.data.marketings
                })
                var getListByWaresId = self.data.getListByWaresId;
                if (getListByWaresId) {
                    for (var i = 0; i < getListByWaresId.length; i++) {
                        getListByWaresId[i].chekok = false;
                        getListByWaresId[i].text = '';
                        if (getListByWaresId[i].discountCouponFor == 0) {
                            getListByWaresId[i].text = '全平台'
                        } else {
                            getListByWaresId[i].text = '指定商品'
                        }

                        if (self.data.allprice > getListByWaresId[i].startMoney) {

                            getListByWaresId[i].chekok = true;
                            var getListByWaresId1 = self.data.getListByWaresId1;
                            getListByWaresId1.push(getListByWaresId[i])
                            self.setData({
                                getListByWaresId1
                            })
                        }

                    }
                }

                self.setData({
                    getListByWaresId
                })

                self.setData({
                    address: res.data.data.address
                })

                self.setData({
                    orderWaresVos: res.data.data.orderWaresVos
                })

                var address = self.data.address;

                self.setData({
                    addressId: self.data.address.id
                })
                if (address == null) { //判断地址是否存在默认


                    self.setData({
                        addressok: false
                    })
                } else {

                    self.setData({
                        addressok: true
                    })


                }
            },
            fail: (error) => {

            }
        })
    },
    handurl: function(e) { //路由跳转到填写地址
        var self = this;


        wx.navigateTo({
            url: '/pages/shipping/shipping'
        })


    },
    toggleDialog() { //弹出页关闭
        this.setData({
            showDialog: !this.data.showDialog,

        });
    },

    bindKeyInput: function(e) { //卖家留言
        this.setData({
            inputValue: e.detail.value
        })
    },
    checked() { //从新选择地址
        var self = this;
        var addressId = wx.getStorageSync('addressId');

        wx.request({
            url: 'http://192.168.2.98:9095/api/address/list',
            method: 'GET',
            header: {
                'token': wx.getStorageSync('token') //请求头携带参数
            },
            success: res => {
                self.setData({
                    addAddressList: res.data.data
                });
                var addAddressList = self.data.addAddressList;

                if (addAddressList) {
                    for (var i = 0; i < addAddressList.length; i++) {

                        if (addAddressList[i].id == addressId) {

                            this.setData({
                                address: addAddressList[i]
                            }, () => {
                                wx.setStorageSync('addressId', '')
                            })

                        }

                    }
                }
            }

        })

    },

    toggleDialog() { //优惠劵选择弹出

        this.setData({
            showDialog: !this.data.showDialog,
        });
    },
    checkdiscountId(e) { //选中优惠劵

        var self = this;
        var getListByWaresId = self.data.getListByWaresId;
        var allprice = self.data.allprice;
        for (var i = 0; i < getListByWaresId.length; i++) {
            if (getListByWaresId[i].startMoney < allprice) {

                if (e.currentTarget.dataset.discountid == getListByWaresId[i].id) {



                    var aa = app.returnFloat(getListByWaresId[i].startMoney);

                    self.setData({
                        discountId: e.currentTarget.dataset.discountid,
                        showDialog: !self.data.showDialog,
                        coupon: aa
                    })
                } else {

                }

            }
            self.setData({
                getListByWaresId
            })
        }
    },
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267



})