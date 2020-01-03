// pages/inetAddress_copy/inetAddress_copy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
=======



  
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
    id:'',
    name: '', //用户名
    phone: '', //手机号
    province: '', //省
    city: '', //市
    region: "", //区
    address: '' //地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
<<<<<<< HEAD
    console.log(e, 11)
    this.info(e)//根据id查询
  },
=======
    this.info(e)//根据id查询
  },
  
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
  // 按钮
  handtap(e) {
    var self = this
    // 编辑
    wx.request({
      url: 'http://192.168.2.98:9095/api/address/update',
      method: 'POST',
      data: {
        name: self.data.name,
        phone: self.data.phone,
        province: self.data.province,
        city: self.data.city,
        region: self.data.region,
        address: self.data.address,
<<<<<<< HEAD
        isDefault: self.data.id,
=======
        isDefault: self.data.isDefault,
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
        id: self.data.id
      },
      header: {
        'token': wx.getStorageSync("token"), //请求头携带参数
      },
      success: (res) => {
        console.log(res, "修改成功")
        if ( res.data.code==0) {
          wx.navigateBack({
            url: 'pages/shipping/shipping'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      }
    })
  },
<<<<<<< HEAD
  info(e){
=======
  handuserName(e) {
      this.setData({
        name: e.detail.value
      })
  },
  bindRegionChange(e) {
    console.log(e,'adds')
    this.setData({
      city: e.detail.value[1], //市
      region: e.detail.value[2], //区
      province: e.detail.value[0], //地址
    })
  },
  handNumber(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  info(e){//请求数据
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
    var self =this;
    wx.request({
      url: 'http://192.168.2.98:9095/api/address/info',
      data:{
        id:e.id
      },
      header:{
        token:wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res,'info')
        var data= res.data.data;
        self.setData({
          name: data.name,
          phone: data.phone,
          province: data.province,
          city:data.city,
          region: data.region,
          address: data.address,
          isDefault: data.isDefault,
          id:data.id
        })
<<<<<<< HEAD
        console.log(self.data,'data')
=======

  
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
      }
    })
  },
  change(){
    if(this.data.isDefault==0){
      this.setData({
        isDefault:1
      })
    }else{
      this.setData({
        isDefault:0
      })
    }
  }
<<<<<<< HEAD
=======
  
>>>>>>> 52f64f72e88e74a5d1fd6ab67dc3de89912ce267
})