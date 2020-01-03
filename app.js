//app.js
App({
    // 全局数据
    globaData: {
        token: '',
        userInfo: null,
        code: null
    },
    onLaunch: function() {
        var self = this;
        // 微信登录
        wx.login({
            success: res => {
                if (res.code) {
                    // 发送请求
                    wx.request({
                        // 微信登录
                        url: 'http://192.168.2.98:9095//api/wechat/auth',
                        data: {
                            code: res.code
                        },
                        method: "get",
                        success: function(res) {
                            if (res.data.code == 0) {
                                var token = res.data.msg;
                                wx.setStorage({
                                        key: 'token',
                                        data: token
                                    })
                                    // 获取用户信息
                                wx.getUserInfo({
                                    success: function(res) {
                                        // console.log(res, 456)
                                        var userInfo = res.userInfo //用户信息
                                        wx.request({
                                            // 用户信息
                                            url: 'http://192.168.2.98:9095/api/wechat/updateUserInfo',
                                            method: "post",
                                            data: res.userInfo,
                                            header: {
                                                'token': token, //请求头携带参数
                                                'content-type': 'application/json',
                                            },
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            },
        })

    },
    globalData: {
        // 定义全局请求队列
        requestQueue: [],
        // 是否正在进行登陆
        isLanding: true,
        // 购物车商品数量
        totalCartCount: 0
    },
    returnFloat: function(value) { 
        var value = Math.round(parseFloat(value) * 100) / 100; 
        var xsd = value.toString().split("."); 
        if (xsd.length == 1) { 
            value = value.toString() + ".00"; 
            return value; 
        } 
        if (xsd.length > 1) { 
            if (xsd[1].length < 2) { 
                value = value.toString() + "0"; 
            } 
            return value; 
        }
    },
  filterArr: function (arr, attribute) {


    var new_arr = [];


    var json_arr = [];


    for (var i = 0; i < arr.length; i++) {


      if (new_arr.indexOf(arr[i][attribute]) == -1) {

        // -1代表没有找到


        new_arr.push(arr[i][attribute]);

        //如果没有找到就把这个name放到arr里面，以便下次循环时用


        json_arr.push(arr[i]);


      } else { }

    }


    return json_arr;
  },

})