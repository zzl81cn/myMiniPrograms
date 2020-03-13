// pages/form/checkboxGroup/checkboxGroup.js

let damageReserveList = require('../../../data/damageReserveList')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '', /* 手机号 */
    isDisabledSubmit: true,
    damageReserveListData: damageReserveList.data,
    tempFlatResult: null,
    selectedList: null,
    dataListFlag: 1, /* 标记返回刷新数据 */
    dataListEmpty: false /* 无数据标记 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* 折叠手风琴方法 */
  switchCollapse: function(e) {
    let that = this
    console.log('switch', e.currentTarget.dataset.index)
    let tempIndex = e.currentTarget.dataset.index
    let tempResult =  that.data.damageReserveListData
    for (let i = 0; i < tempResult.length; i++) {
      if (i === tempIndex) {
        tempResult[i].collapsed = !tempResult[i].collapsed
        console.log('switch item', tempResult[i].collapsed)
      }
    }
    that.setData({
      damageReserveListData: tempResult
    })
  },
  /* 更新禁用提交按钮状态 */
  isDisabledSubmit: function() {
    let that = this
    let tempSelectedList = that.data.selectedList
    if (tempSelectedList.length > 0) {
      that.setData({
        isDisabledSubmit: false
      })
    } else {
      that.setData({
        isDisabledSubmit: true
      })
    }
  },
  /* 复选方法 */
  checkboxChange: function (e) {
    let that = this
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let tempSelectIdArr = e.detail.value
    // let tempDamageReserveListData = that.data.tempFlatResult
    // let tempDRLDLength = tempDamageReserveListData.length
    // let tempResult = []
    // if (tempSelectIdArr) {
    //   // 遍历全部子项
    //   tempDamageReserveListData.forEach((itemI, indexI) => {
    //     tempSelectIdArr.forEach((itemJ, indexJ) => {
    //       if (itemI.id.toString() === itemJ) {
    //         console.log('checkbox item ', itemI)
    //         tempResult.push(itemI)
    //       }
    //     })
    //   })
    //   console.log('checkResult ', tempResult)
    // }
    // that.setData({
    //   selectedList: tempResult
    // })
    // that.isDisabledSubmit()
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