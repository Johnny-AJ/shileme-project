// pages/indent/indent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        tbslist: [{
                titie: '全部',
                indes: 0,
                orderState: '',
                currPage: 1
            },
            {
                titie: '待付款',
                indes: 1,
                orderState: 1,
                currPage: 1
            },
            {
                titie: '待发货',
                indes: 2,
                orderState: 2,

            },
            {
                titie: '待收货',
                indes: 3,
                orderState: 3,

            },
            {
                titie: '待评价',
                indes: 4,
                orderState: 4,

            },
        ],
        cartlist: [], //全部数据
        cartlist1: [], //拿到最新的数据
        orderState: '', //订单状态。不传 全部, 1 待付款，2 待发货，3 待收货，4 待评论，5 已完成
        currPage: 1, //页码
        pageSize: 5, //最多输入条数
        hasNext: true,
        loading: false, // 是否显示loading
    },
    goto(e) {

        wx.reLaunch({

            url: '/pages/scango/scango'

        })
    },
    click(e) { //点击切换tabs
        if (e) {
            if (e.currentTarget.dataset.orderstate) {

                this.setData({
                    cartlist: [],
                    currPage: 1,
                    current: e.currentTarget.dataset.index,
                    orderState: e.currentTarget.dataset.orderstate
                })


            } else {
                this.setData({
                    cartlist: [],
                    current: 0,
                    currPage: 1,
                    orderState: ''
                })

            }
            this.software()
        }

        // this.software();

        // !this.data.cartlist[this.data.current] && this.software();
        // console.log(e,'this.data.cartlist')


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        console.log(options)
        if (options.index == 0) {
            this.setData({
                current: options.index,
                orderState: ''
            })
        } else {

            this.setData({
                current: options.index,
                orderState: options.orderState
            })
        }

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.software()
    },
    software() {


        var self = this;
        wx.request({
            url: 'http://192.168.2.98:9095/api/order/getUserOrderList',
            header: {
                token: wx.getStorageSync('token')
            },
            data: {
                pageSize: self.data.pageSize,
                orderState: self.data.orderState,
                currPage: self.data.currPage
            },
            success(res) {
                var cartlist = self.data.cartlist;
                var cartlist1 = [];
                cartlist1 = res.data.data.list;
                self.setData({
                    loading: false,
                    cartlist: cartlist.concat(cartlist1),
                    hasMore: cartlist1.length == 5

                })
                console.log(self.data.cartlist, '66666')

            }

        })


    },
    confirm(e) {
        var self = this;
        wx.request({
            url: 'http://192.168.2.98:9095/api/order/updateOrderStateIsSucceed',
            header: {
                token: wx.getStorageSync('token')
            },
            data: {
                orderId: e.currentTarget.dataset.orderid
            },
            success: function(res) {
                var cartlist = self.data.cartlist;

                if (res.data.code == 0) {
                    wx.showToast({
                        title: '已经确认收货',
                        icon: 'success',
                        duration: 1500
                    }, () => {
                        cartlist.forEach(i => {
                            if (i.orderId == e.currentTarget.dataset.orderid) {
                                cartlist.slice(i, 1)
                            }
                        })
                    })
                }
                console.log(res, 'updateOrderStateIsSucceed')
            }

        })
    },
    goto(e) { //跳转到订单详情
        let orderId = e.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: '/pages/order/order?orderId=' + orderId + '&s=0'
        })
    },
    buys(e) {
        console.log()
    },
    remind() { //提示发货
        wx.showToast({
            title: '提醒成功',
            icon: 'success',
            duration: 2000
        })
    }

})