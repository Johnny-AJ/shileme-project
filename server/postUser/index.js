// 用户评论

// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');




/**
* 查看详情
*/
const info_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/user/comment/info',
        success,
        fail: (res) => { }
    })
}


/**
* 管理员查看评论列表
*/
const list_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/user/comment/list',
        success,
        fail: (res) => { }
    })
}


/**
* 回复
*/
const reply_API = (
    data,
    success
) => {
    return http.POST({
        url: appconfig.apiUrl + '/api/user/comment/reply',
        success,
        fail: (res) => { }
    })
}


/**
* 用户添加评论
*/
const save_API = (
    data,
    success
) => {
    return http.POST({
        url: appconfig.apiUrl + '/api/user/comment/save',
        success,
        fail: (res) => { }
    })
}


/**
* 更新评价显示状态
*/
const supdateStatus_API = (
    data,
    success
) => {
    return http.POST({
        url: appconfig.apiUrl + '/api/user/comment/updateStatus',
        success,
        fail: (res) => { }
    })
}

export {
    supdateStatus_API,
    save_API,
    reply_API,
    list_API,
    info_API
}