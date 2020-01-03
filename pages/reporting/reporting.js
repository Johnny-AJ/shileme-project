// pages/reporting/reporting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        setList: []
    },
    // tab栏
    handleChange({
        detail
    }) {
        this.setData({
            current: detail.key
        });
    },
    handurl1(e) {
        // 路由封装
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        })
    },
    setReportingList() {
        wx.request({
            url: 'http://192.168.2.98:9095/api/probation/getList',
            header: {
                token: wx.getStorageSync("token")
            },
            success: res => {
                console.log(res, 3349)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        let self = this
        self.setReportingList()
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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

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

    }
})