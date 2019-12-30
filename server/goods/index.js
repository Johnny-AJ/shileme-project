// 商品详情


// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');




/**
 * 评论列表
 */
const getCommentList_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/wares/details/getCommentList',
        success,
        fail: (res) => { }
    })
}

/**
 * 商品属性列表
 */
const getPropertyList_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/wares/details/getPropertyList',
        success,
        fail: (res) => { }
    })
}

/**
* 商品阶级批发列表
*/
const getStageList_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/wares/details/getStageList',
        success,
        fail: (res) => { }
    })
}


/**
* 商品详情
*/
const getWaresInfo_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/wares/details/getWaresInfo',
        success,
        fail: (res) => { }
    })
}

export {
    getWaresInfo_API,   //商品详情
    getStageList_API,   //商品阶级批发列表
    getPropertyList_API,   //商品属性列表
    getCommentList_API   //评论列表
}