Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:1,
    arry: [{ name: 'a1' }, { name: 'a2' }, { name: 'a3' }, { name: 'a4' }, { name: 'a5' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
  ,
  click(e){
console.log(e)
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      show: index
    })
   

   
    // arry.forEach(function(item,index){
    //   if(index==e.currentTarge.dataset.index){
    //     show: e.currentTarge.dataset.index
    //   }else{
    //     show:0
    //   }
    // })
  }
})