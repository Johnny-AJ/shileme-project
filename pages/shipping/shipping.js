// pages/shipping/shipping.js
Page({

    /**
     * 页面的初始数据
     */
    data: {


        delArray: [], // 删除
        addAddressList: [], // 地址列表
        token: '',
        address: [],
        dtos: {},
        dto: {},
        delid: '', //删除
        id: '',
        isDefault: '' //默认
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;
        // self.setData({
        //   dtos: options.dtos
        // })
        const token = wx.getStorageSync('token')
        self.setData({
                token
            })
            // 头部标题

        // 用户名
        // let address = wx.getStorageSync("address")
        // // console.log(address)
        // this.setData({
        //   address
        // })



        // 地址列表

    },
    address() {
        var self = this;
        var token = wx.getStorageSync('token');
        console.log(token)
        wx.request({
            url: 'http://192.168.2.98:9095/api/address/list',
            method: 'GET',
            header: {
                'token': token, //请求头携带参数
            },
            success: res => {
                console.log(res, "地址")
                self.setData({
                    addAddressList: res.data.data
                });
                var addAddressList = self.data.addAddressList;
                for (var i = 0; i < addAddressList.length; i++) {
                    addAddressList[i].checked = false;
                    if (addAddressList[i].isDefault == 0) {
                        addAddressList[i].checked = true;
                    }

                    self.setData({
                        addAddressList: addAddressList
                    });

                }

            }
        })
    },
    // 编辑
    handeditor(e) {
        console.log(e, '修改地址')
        wx.navigateTo({
            url: '/pages/inetAddress_copy/inetAddress_copy?id=' + e.currentTarget.dataset.id //跳转到编辑页面
                // url: '/pages/inetAddress_copy/inetAddress_copy'
        })
    },
    // 删除
    handdel(e) {
        console.log(e)
        var delid = e.currentTarget.dataset.id
        var self = this
            // console.log(self.data.addAddressList)
        wx.showModal({
            title: '警告',
            content: '是否确认删除你的当前收货地址',
            success: (res) => {
                // var addAddressList = this.data.addAddressList
                if (res.confirm) {
                    self.address()
                } else if (res.cancel) {

                }
                wx.request({
                    url: 'http://192.168.2.98:9095/api/address/delete?id=' + self.data.id,

                    method: 'GET',
                    data: {
                        id: delid
                    },
                    header: {
                        'token': self.data.token, //请求头携带参数
                    },
                    success: (res) => {
                        self.setData({
                            addAddressList: res.data.data
                        });
                        this.address();
                    }
                })
            }
        })
    },
    // 新增地址
    handNewvoid(e) {
        wx.navigateTo({
            url: '/pages/inetAddress/inetAddress'
        })
    },
    // 默认勾选地址
    radioChange(e) {


        console.log(e, 'e默认勾选地址');
        wx.request({
            url: 'http://192.168.2.98:9095/api/address/updateDefault',
            method: 'GET',
            data: {
                id: e.detail.value,
                isDefault: 0
            },
            header: {
                'token': wx.getStorageSync('token'), //请求头携带参数
            },
            success: function(res) {
                console.log(res, 'res')
            }
        })
    },
    onShow() {
        this.address();

    },
    click(e) {
        console.log()
            // var addressId = e.currentTarget.dataset.addressid;
            // console.log(addressId,'addressId666')
        wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)

        wx.navigateBack({
            url: '/pages/Spell_group_order/Spell_group_order'
        })

    }
})