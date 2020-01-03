// pages/inetAddress_copy/inetAddress_copy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
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
        console.log(e, 11)
        this.info(e) //根据id查询
    },
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
                isDefault: self.data.id,
                id: self.data.id
            },
            header: {
                'token': wx.getStorageSync("token"), //请求头携带参数
            },
            success: (res) => {
                console.log(res, "修改成功")
                if (res.data.code == 0) {
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
    info(e) {
        var self = this;
        wx.request({
            url: 'http://192.168.2.98:9095/api/address/info',
            data: {
                id: e.id
            },
            header: {
                token: wx.getStorageSync('token')
            },
            success: function(res) {
                console.log(res, 'info')
                var data = res.data.data;
                self.setData({
                    name: data.name,
                    phone: data.phone,
                    province: data.province,
                    city: data.city,
                    region: data.region,
                    address: data.address,
                    isDefault: data.isDefault,
                    id: data.id
                })
                console.log(self.data, 'data')
            }
        })
    },
    change() {
        if (this.data.isDefault == 0) {
            this.setData({
                isDefault: 1
            })
        } else {
            this.setData({
                isDefault: 0
            })
        }
    }
})