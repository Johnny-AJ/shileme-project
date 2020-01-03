// pages/fill/fill.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploaderList: [], //图片列表
        uploaderNum: 0, //图片数量
        showUpload: true, //超过图片数量  默认9张
        report: '', //文本内容
        probationId: '' //提交报告ID
    },
    // 提交
    handleBtn(e) {
        let self = this
            // console.log(e, "提交")
        wx.request({
            url: 'http://192.168.2.98:9095/api/personal/probation/add',
            method: "POST",
            header: {
                token: wx.getStorageSync('token')
            },
            data: {
                imgUrl: self.data.uploaderList,
                probationId: self.data.probationId,
                report: self.data.report
            },
            success: (res) => {
                // console.log(res, 789)
                if (res.data.code == 0) {
                    wx.showToast({
                        title: "提交成功",
                        icon: 'success'
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                    })
                }
            }
        })
    },

    // 文本框内容
    handInput(e) {
        console.log(e, "文本框内容")
        let self = this
        self.setData({
                report: e.detail.value
            })
            // console.log(e.detail.value, "value")
    },

    // 删除图片
    clearImg: function(e) {
        var nowList = []; //新数据
        var uploaderList = this.data.uploaderList; //原数据

        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum: this.data.uploaderNum - 1,
            uploaderList: nowList,
            showUpload: true
        })
    },
    //展示图片
    showImg: function(e) {
        var that = this;
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index]
        })
    },
    //上传图片
    upload: function(e) {
        var that = this;
        wx.chooseImage({
            count: 9 - that.data.uploaderNum, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                console.log(res)
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList.concat(tempFilePaths);

                if (uploaderList.length == 9) {
                    that.setData({
                        showUpload: false
                    })
                }
                that.setData({
                    uploaderList: uploaderList,
                    uploaderNum: uploaderList.length,
                })

                console.log(that.data.uploaderList, 'uploaderList')
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(e) {
        let self = this
        console.log(e, "e")
        let probationId = e.probationId //提交报告ID
        self.setData({
            probationId: e.probationId
        })
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