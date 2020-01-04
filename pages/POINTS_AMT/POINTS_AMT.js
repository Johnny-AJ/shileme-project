// pages/POINTS_AMT/POINTS_AMT.js;
let http =require('../../utils/http.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addAddressList: [],
        name: '', //用户名
        phone: '', //电话
        province: '', //省
        city: '', //市
        region: '', //区
        address: '' //道路
    },

    handNewvoid(e) { // 新增地址
        wx.navigateTo({
            url: '/pages/shipping/shipping'
        })
    },

    handleConversion(e) { // 立刻兑换
        wx.showToast({
            title: '兑换成功',
        })
        wx.navigateTo({
            url: "/pages/consistent/consistent"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;

      http.getRuest('api/address/info', { id: options.id},function(res){
        var data = res.data.data;
        self.setData({
          name: data.name,
          phone: data.phone,
          province: data.province,
          city: data.city,
          region: data.region,
          address: data.address,
          id: data.id
        })
      })
        // wx.request({
        //     url: 'http://192.168.2.98:9095/api/address/info', //ID查询
        //     data: {
        //         id: options.id
        //     },
        //     header: {
        //         token: wx.getStorageSync('token')
        //     },
        //     success: function(res) {
        //         console.log(res, 'info')
        //         var data = res.data.data;
        //         self.setData({
        //             name: data.name,
        //             phone: data.phone,
        //             province: data.province,
        //             city: data.city,
        //             region: data.region,
        //             address: data.address,
        //             id: data.id
        //         })
        //         console.log(self.data, 'data')
        //     }
        // })
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

 
})