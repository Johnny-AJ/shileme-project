// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');



/**
 * 首页轮播图--banner图
 */
const banners_API = (
    data,
    success,
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/index/banner/banners',
        success,
        fail: (res) => { }
    })
}

export {
    banners_API   //banner图-轮播图
}