// 请求封装


// 测试地址
const appConfig = require('../app.config');


//GET请求  
function GET(requestHandler) {
    request('GET', requestHandler)
}
//POST请求  
function POST(requestHandler) {
    request('POST', requestHandler)
}
//DELETE请求  
function DELETE(requestHandler) {
    request('DELETE', requestHandler)
}
//PUT请求  
function PUT(requestHandler) {
    request('PUT', requestHandler)
}

// 封装了发送请求
let request = (method, requestHandler) => {
    var params = requestHandler.data;
    var apiUrl = requestHandler.url;
    var isToast = requestHandler.isToast;
    var hideToast = requestHandler.hideToast;
    if (typeof requestHandler.isToast === 'undefined') {
        isToast = true
    }
    // 请求完成接口是否关闭 toast的loading弹框(默认关闭)
    if (typeof requestHandler.hideToast === 'undefined') {
        hideToast = true
    }
    // 封装发送请求
    wx.request({
        url: apiUrl,
        data: params,
        method: method,  //get post delete put
        header: {
            // 本地缓存中指定的 key
            "Authorization": wx.getStorageSync("accessToken") ? wx.getStorageSync("accessToken") : '',
            "token": wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
        },
        success: function (res) {
            if (hideToast) {
                wx.hideToast();
            }
            if (res.statusCode > 300 || res.statusCode < 200) {
                //报错后是否提示
                if (isToast) {
                    wx.showToast({
                        title: '请求状态码' + res.statusCode,
                        duration: 2000,
                        mask: true,
                        icon: 'none',
                    })
                }
                // if (res.data.error) {
                //     if (res.data.error.code == 10001) {
                //         wx.removeStorageSync('accesssToken');
                //         wx.removeStorageSync('userInfo');
                //         wx.setStorageSync('isLogin', false);
                //     }
                // }
                if (requestHandler.fail) {
                    requestHandler.fail(res);
                }
                return;
            } else {
                if (res.data.code == 3021) {
                    wx.showToast({
                        title: '登录失效，请重新登录',
                        duration: 1500,
                        mask: true,
                        icon: 'none',
                    })
                    wx.removeStorageSync('token')
                    wx.removeStorageSync('accountId')
                    wx.removeStorageSync('role')
                    let timer = setTimeout(() => {
                        clearTimeout(timer)
                        timer = null
                        wx.redirectTo({
                            url: '/pages/login/login',
                        })
                    }, 1500)

                    return
                }
                requestHandler.success(res.data)
            }
        },
        fail: function (error) {
            if (requestHandler.fail) {
                requestHandler.fail(error)
            }
            if (hideToast) {
                wx.hideToast();
            }
        },
        complete: function (complete) {
            if (requestHandler.complete) {
                requestHandler.complete(complete);
            }
        }
    })
}


module.exports = {
    GET: GET,
    POST: POST,
    DELETE: DELETE,
    PUT: PUT
}