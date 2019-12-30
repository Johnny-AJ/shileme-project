// pages/group/group.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        spelllist: [{
            imgurl: '',
            name: '保湿急救 网红蓝药丸面膜',
            numbers: 22,
            number: 2,
            price: '79.00',
            id: 11
        }, {
            imgurl: '',
            name: '爆款口红',
            numbers: 50,
            number: 3,
            price: '299.00',
            id: 12
        }, {
            imgurl: '',
            name: '驱蚊神器-驱蚊灯',
            numbers: 82,
            number: 2,
            price: '29.00',
            id: 13
        }, {
            imgurl: '',
            name: '急速保湿霜，美丽女人专爱品',
            numbers: 22233,
            number: 3,
            price: '69.00',
            id: 14
        }]

    },
    handurl: function(e) {
        var id = e.currentTarget.dataset.id;
        console.log(66666)
            // 路由封装
        wx.navigateTo({
            url: '/pages/formats/formats?id=' + id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
})