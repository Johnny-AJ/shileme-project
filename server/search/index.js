// 商品搜索


// 引入测试
const appconfig = require('../../app.config.js')
// 路由封装
const http = require('./../http');



/**
* 商品搜索
*/
const search_API = (
    data,
    success
) => {
    return http.GET({
        url: appconfig.apiUrl + '/api/search/wares/search',
        success,
        fail: (res) => { }
    })
}


export {
    search_API   //商品搜索
}