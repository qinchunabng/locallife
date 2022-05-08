// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList:[],
    page:1,
    pageSize:10,
    total:0,
    isLoading: false
  },
  getShopList(cb){
    console.log("cb:",cb)
    wx.showLoading({
      title: 'loading...',
    });
    this.setData({
      isLoading: true
    });
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method:'GET',
      data:{
        _page:this.data.page,
        _limit:this.data.pageSize
      },
      success: (res)=>{
        // console.log(res);
        this.setData({
          shopList:[...this.data.shopList,...res.data],
          total: res.header['X-Total-Count']-0
        });
      },
      complete:()=>{
        wx.hideLoading({
          success: (res) => {},
        });
        this.setData({
          isLoading: false
        });
        cb && cb();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    });
    this.getShopList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    //重置关键数据，重新发起请求
    this.setData({
      page:1,
      shopList:[],
      total: 0
    });
    this.getShopList(function() {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // console.log("onPullDownRefresh");
    //如果当前没有加载数据，才加载数据
    if(!this.data.isLoading){
      //如果当前已经达到最大页，则不再继续加载数据
      var isReachMaxPage = this.data.page * this.data.pageSize >= this.data.total;
      if(!isReachMaxPage){
        this.setData({
          page: this.data.page + 1
        });
        this.getShopList();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})