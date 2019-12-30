// 首页封装


// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');



/**
* 热卖标签列表
*/
const findAllCategoryName_API = (
    // 三个返回值
    data,
    success
) => {
    return http.POST({
        url: appconfig.apiUrl + '/api/index/findAllCategoryName',
        success,
        fail: (res) => { }
    })
}

/**
* 超值拼团
*/
const findGroupBuyList_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/index/findGroupBuyList',
        success,
        fail: (res) => { }
    })
}


/**
* 标签列表
*/
const findNewCategoryName_API = (
    data,
    success,
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/index/findNewCategoryName',
        success,
        fail: (res) => { }
    })
}


/**
* 新品列表
*/
const getNewList_API = (
    data,
    success,
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/index/getNewList',
        success,
        fail: (res) => { }
    })
}


/**
* 热卖列表
*/
const getSellingList_API = (
    data,
    success,
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/index/getSellingList',
        success,
        fail: (res) => { }
    })
}


/**
* 限时购
*/
const timeoutbuy_API = (
    data,
    success,
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/index/timeoutbuy',
        success,
        fail: (res) => { }
    })
}


export {
    findAllCategoryName_API,   //热卖标签列表
    findGroupBuyList_API,   //超值拼团
    findNewCategoryName_API,   //标签列表
    getNewList_API,   //新品列表
    getSellingList_API,   //热卖列表
    timeoutbuy_API   //限时购
}