// 微信登录
// wx.login({
//   success: function(res) {
//     if (res.code) {
//       // 发送请求
//       wx.request({
//         url: appconfig.apiUrl + '/api/wechat/auth',

//         // 微信登录
//         url: 'http://192.168.2.98:9095//api/wechat/auth',
//         data: {
//           code: res.code
//         },
//         method: "get",
//         success: function(res) {
//           if (res.data.code == 0) {
//             var token = res.data.msg;
//             // 获取用户信息
//             wx.getUserInfo({
//                 success: function(res) {
//                   // console.log(res, 456)
//                   var userInfo = res.userInfo //用户信息
//                   wx.request({
//                     // 用户信息
//                     url: 'http://192.168.2.98:9095/api/wechat/updateUserInfo',
//                     method: "post",
//                     data: res.userInfo,
//                     header: {
//                       'token': token, //请求头携带参数
//                       'content-type': 'application/json',
//                     },
//                   })
//                 }
//               }),
//               wx.request({
//                 // 支付地址
//                 // url: 'http://192.168.2.119:9095/api/wx/pay/weixinPay',
//                 method: "get",
//                 header: {
//                   'token': token, //请求头携带参数
//                 },
//                 success: function(res) {
//                   // console.log(res)
//                   // 微信支付
//                   wx.requestPayment({
//                     timeStamp: res.data.data.timeStamp,
//                     nonceStr: res.data.data.nonceStr,
//                     package: res.data.data.package,
//                     signType: res.data.data.signType,
//                     paySign: res.data.data.paySign,
//                   })
//                 }
//               })
//           }
//         }
//       })
//     }
//   }
// })


// 用户当前设置
// wx.getSetting({
//   success: (res) => {
//     // 授权结果
//     if (res.authSetting["scope.userInfo"]) {
//       // 获取用户信息
//       wx.getUserInfo({
//         success: (res) => {
//           // console.log(res)
//           this.globaData.userInfo = res.userInfo;
//           if (this.userInfoReadyCallback) {
//             this.userInfoReadyCallback(res)
//           }
//         },
//         // 失败回调
//         fail: (res) => {
//           // 重定向到登录页
//           wx.redirectTo({
//             url: '"pages/login/login"',
//           })
//         }
//       })
//     }
//   }
// })

// --------------------------------------------------------

// 路由
// bindtap = "handurl" data - url="/pages/scango/scango"
// // 路径封装
// handurl: function(e) {
//   // 路由封装
//   wx.navigateTo({
//     url: e.currentTarget.dataset.url,
//   })
// },

// ----------------------------------------------

// tab栏
// handleChange({
//   detail
// }) {
//   this.setData({
//     current: detail.key
//   });
// },

//   .indent.checktbs {
//   height: 90rpx;
//   width: 100 %;
// }

// .indent.tabs {
//   width: 100 %;
//   position: fixed;
//   left: 0;
//   top: 0;
//   height: 91rpx;
//   display: flex;
//   background: #fff;
//   align - items: center;
//   padding - bottom: 10rpx;
//   box - sizing: border - box;
//   border: none!important;
// }

// < view class="checktbs" >
//   <i-tabs current="{{ current }}" color="#F02B50" bindchange="handleChange" i-class="tabs">
//     <i-tab key="tab1" title="全部"></i-tab>
//     <i-tab key="tab2" title="代付款"></i-tab>
//     <i-tab key="tab3" title="代发货"></i-tab>
//     <i-tab key="tab4" title="待收货"></i-tab>
//     <i-tab key="tab5" title="待评价"></i-tab>
//   </i-tabs>
// </view >

// "component": true,
//   "usingComponents": {
//   "i-tabs": "../../components/tabs/index",
//     "i-tab": "../../components/tab/index"
// }
// --------------------------------------------------
// "navigationBarTitleText": "热卖榜"

// ==============
// <view class="img2">
//   <image src="../../static/imgs/imgs.png"></image>
// </view>