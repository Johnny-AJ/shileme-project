// 试用


// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');



/**
 * 试用商品列表
 */
const getProbationList_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/probation/getProbationList',
        success,
        fail: (res) => { }
    })
}