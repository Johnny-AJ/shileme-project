// pages/formats/formats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetTime: 0,
    clearTimer: false,
    // 轮播图
    swiperList: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575541027970&di=ecf2c0391eb72e50a428c14e99c39bf3&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fdiybbs%2F5812%2Fa5811338_s.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556772324&di=da3d003085891be4d696ed4fed3b6727&imgtype=0&src=http%3A%2F%2Fpic31.nipic.com%2F20130708%2F3347542_143402189000_2.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575542168801&di=457f23a469df75e92b17f5204a71a8f3&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft01034ed8722375e889.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575556890196&di=534195e404a30d70df59d8630c1c877d&imgtype=0&src=http%3A%2F%2Fpic35.nipic.com%2F20131114%2F3347542_141746002353_2.jpg"
    ],

    // 测试
    swiperArrat: [{
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576231348885&di=36b17adf6cfb8d734a5e6f51deedd9b6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F08%2F20181208123535_joilh.thumb.700_0.jpg',
        name: '三吉彩花',
        address: '广州',


      },
      {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576231348885&di=36b17adf6cfb8d734a5e6f51deedd9b6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F08%2F20181208123535_joilh.thumb.700_0.jpg',
        name: '三吉彩花',
        address: '广州'
      }
    ]
  },
  handurl: function(e) {
    // 路由封装
    wx.reLaunch({
      url: e.currentTarget.dataset.url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      targetTime: new Date().getTime() + 6430000,
    
    });
    // 头部标题
    console.log(options,'options')
  },
  onUnload:function(){
    this.setData({
      clearTimer: true
    });
  }
})