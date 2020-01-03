Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'tab1',
        seachtext: '',
        pageSize: 10,
        currPage: 1,
        seach: [],
        type: '',
        subscript: 0,
        tittle: [{
                text: '推荐',
                type: ''

            },
            {
                text: '价格从低到高',
                type: 2

            },
            {
                text: '价格从高到低',
                type: 1

            }
        ]



    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;
        self.setData({
            seachtext: options.seach,
        })
        self.search()
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

    },
    handleChange({ detail }) {
        this.setData({
            current: detail.key
        });
    },
    search() { //搜索结果
        var self = this

        wx.request({
            url: 'http://192.168.2.98:9095/api/search/wares/searchWares',
            header: {
                token: wx.getStorageSync('token')
            },
            data: {
                pageSize: self.data.pageSize,
                currPage: self.data.currPage,
                search: self.data.seachtext
            },
            success: function(res) {

                console.log(res, '55555')
                if (JSON.stringify(res.data.data) == "{}") {
                    console.log(9999)
                    self.setData({
                        seach: []
                    })
                } else {
                    self.setData({
                        seach: res.data.data
                    })

                }

                console.log(self.data.seach, 'self.data.seach')

            }
        })
    },
    change(e) {
        console.log(e)
            // this.setData({
            //   subscript:e.currPage.d
            // })
    }
})