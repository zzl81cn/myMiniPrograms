// pages/demo/star/star.js
let app = getApp()
let count = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    employList: [
      {id: '180100', name: '张三', avatarImg: 'https://www.zzl81cn.com/my-mp-wechat/common/avatar/man.png'},
      {id: '180101', name: '张三', avatarImg: 'https://www.zzl81cn.com/my-mp-wechat/common/avatar/man.png'},
      {id: '180102', name: '张三', avatarImg: 'https://www.zzl81cn.com/my-mp-wechat/common/avatar/man.png'},
      {id: '180103', name: '张三', avatarImg: 'https://www.zzl81cn.com/my-mp-wechat/common/avatar/man.png'},
      {id: '180104', name: '张三', avatarImg: 'https://www.zzl81cn.com/my-mp-wechat/common/avatar/man.png'}
    ],
    stars: [0, 1, 2, 3, 4],
    normalSrc: 'https://www.zzl81cn.com/my-mp-wechat/common/star/no-star.png',
    selectedSrc: 'https://www.zzl81cn.com/my-mp-wechat/common/star/full-star.png',
    halfSrc:'https://www.zzl81cn.com/my-mp-wechat/common/star/half-star.png',
    key: 0, //评分
    currentEmployId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击左边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      // 只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    count = key
    this.setData({
      key: key
    })
  },
  //点击右边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    count = key
    this.setData({
      key: key
    })
  },
  startRating:function(e) {
    wx.showModal({
      title: '分数',
      content: "" + count,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  radioChange: function(e) {
    console.log('radioChange', e.detail.value)
    this.setData({
      currentEmployId: e.detail.value
    })
  },
  // 评价文本
  bindEvaluation(e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      evaluationText: v
    })
  },
  /* 校验洗车工 */
  validatorEmploy () {
    let flag = false
    if (this.data.currentEmployId === null) {
      wx.showToast({
        title: '请选择洗车工',
        icon: 'none'
      });
    } else {
      flag = true
    }
    return flag
  },
  /* 校验评星 */
  validatorStar () {
    let flag = false
    if (this.data.key === 0) {
      wx.showToast({
        title: '请打分',
        icon: 'none'
      });
    } else {
      flag = true
    }
    return flag
  },
  /* 校验评价 */
  validatorEvaluationText () {
    let flag = false
    if (this.data.evaluationText === '') {
      wx.showToast({
        title: '请您填写评价',
        icon: 'none'
      });
    } else {
      flag = true
    }
    return flag
  },
  validatorAll () {
    if (!this.validatorEmploy()) {
      return
    }
    if (!this.validatorStar()) {
      return
    }
    return true
  },

  /* 提交 */
  submit: function() {
    let that = this
    if(that.validatorAll()) {
      console.log('Submit is ok')
      wx.navigateTo({
        url: '/pages/index/carWash/evaluationFinished/evaluationFinished'
      })
    }
  },
  /* 加载中 */
  showWxLoading: function(){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  },
  /* 公共报错方法 */
  showErrorModal: function(name, error) {
    wx.showModal({
      title: '提示',
      content: name + error.message ? error.message : '调用服务端接口失败，请重试！',
      showCancel: false
    })
  },
  /* 公共报错方法 */
  showWxErrorModal: function(err) {
    wx.showModal({
      title: '提示',
      content: err.errMsg,
      // content: err.message,
      showCancel: false
    })
  },
  codeFail: function(error) {
    wx.showToast({
      title: error ? error : '出错了！'
    })
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
})