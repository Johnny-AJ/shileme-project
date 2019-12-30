
// 微信登录


// 引入测试
const appconfig = require('../../app.config')
// 路由封装
const http = require('./../http');



/**
* 微信登录
*/
const auth_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/wechat/auth',
        success,
        fail: (res) => { }
    })
}



/**
* 更新用户信息
*/
const updateUserInfo_API = (
    data,
    success
) => {
    return http.POST({
        url: appconfig.apiUrl + '/api/wechat/updateUserInfo',
        success,
        fail: (res) => { }
    })
}


export {
    auth_API,  //微信登录
    updateUserInfo_API  //更新用户信息
}