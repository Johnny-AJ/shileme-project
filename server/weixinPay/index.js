// 微信支付



// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');




/**
 * 微信支付
 */
const weixinPay_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/wx/pay/weixinPay',
        success,
        fail: (res) => { }
    })
}

export {
    weixinPay_API   //微信支付
}