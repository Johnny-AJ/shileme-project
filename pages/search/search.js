// pages/search/search.js

let timer;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputShowed: false,
        getHotSearch: [], //热门搜索数据
        searchHistory: [], //历史搜索数据
        seach: [],
        currPage: 1,
        pageSize: 8,
        inputValue: '',
        isok: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onShow: function() {
        this.getHotSearch() //热门搜索数据
        this.searchHistory() //历史记录
    },
    // 路径封装
    handurl: function(e) {
        // 路由封装
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        })
    },
    verification: function(e) {

        var name = e.currentTarget.dataset.name;

        　　
        this.setData({

            [inputValue]: e.detail.value.replace(/\s+/g, '')

        })

    },
    bindKeyInput: function(e) {


        var inputValue = e.currentTarget.dataset.name;
        this.setData({
            [inputValue]: e.detail.value.replace(/\s+/g, '')
        })
        if (this.data.inputValue) {
            clearTimeout(timer);
            if (this.data.inputValue) {
                timer = setTimeout(() => {
                    this.search()
                }, 800);

            }
        }

    },
    clear() {
       wx.navigateBack({
         delta: 1,
       })

    },
    getHotSearch() { //热门搜索
        var self = this;
        wx.request({
            url: 'http://192.168.2.98:9095/api/search/wares/getHotSearch',
            header: {
                token: wx.getStorageSync('token')
            },
            data: {
                pageSize: self.data.pageSize,
                currPage: self.data.currPage
            },
            success: function(res) {
                self.setData({
                    getHotSearch: res.data.data.list
                })
            },
            verification: function(e) {

                var name = e.currentTarget.dataset.name;

            }
        })
    },
    deletes() { //删除历史记录
        var self = this;
        wx.request({
            url: 'http://192.168.2.98:9095/api/search/wares/delete',
            data: '',
            header: {
                token: wx.getStorageSync('token')
            },
            success: function(res) {
                if (res.data.code == 0) {
                    self.searchHistory()
                }
            }
        })
    },
    searchHistory() { //历史记录
        var self = this;
        wx.request({
            url: 'http://192.168.2.98:9095/api/search/wares/searchHistory',
            data: {
                pageSize: self.data.pageSize,
                currPage: self.data.currPage,
            },
            header: {
                token: wx.getStorageSync('token')
            },
            success: function(res) {

                self.setData({
                    searchHistory: res.data.data.list
                })
                console.log(res)
            }
        })
    },
    // 点击键盘上的搜索
    bindconfirm: function(e) {
        var that = this;
        var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value;

        if (discountName.trim()) {
            wx.navigateTo({
                url: '/pages/searches/searches?seach=' + discountName
            })
        }
    },
    click(e) { //点击历史记录
        wx.navigateTo({
            url: '/pages/searches/searches?seach=' + e.currentTarget.dataset.name
        })

    }


})