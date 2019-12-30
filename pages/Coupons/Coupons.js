// pages/Coupons/Coupons.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        title: [{ text: '未使用' }, { text: '已使用' }, { text: '已过期' }],
        getListByWaresId: [], //优惠劵列表

    },
    // tab栏
    changetbs(e) {

        console.log(e)
        this.setData({
            current: e.currentTarget.dataset.index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.getListByWaresId()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getListByWaresId() {
        wx.request({
            // url: 'http://192.168.2.98:9095/',
        })
    }

})