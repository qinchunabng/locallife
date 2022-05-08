// components/test/test.js
Component({
  options:{
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    max:{
      type: Number, //值类型
      value: 10 //默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击事件处理函数
    addCount(){
      if(this.data.count >= this.properties.max){
        return
      }
      this.setData({
        count: this.data.count + 1
      });
      this._showCount();
    },
    _showCount(){
      wx.showToast({
        title: 'count是' + this.data.count,
        icon: 'none'
      })
    }
  }
})
