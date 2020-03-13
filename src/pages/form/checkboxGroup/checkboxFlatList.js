// pages/form/checkboxGroup/checkboxFlatList.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnLoading: false,
    appointment: '请选择',
    storeAddress: null,
    form: {
      phone: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // that.getStoreList()
    // that.processData(that.data.selectedList)
    // let temp = that.proccessTree(that.data.selectedList)
    let temp = that.newPro()
    let tempParamsList = that.proccessAPParams(app.globalData.selectedAppointmentPackage)
    that.setData({
      'form.phone': options.mobile,
      temp: temp,
      tempParamsList: tempParamsList
    })
  },
  /* 一维数组相同id组成list */
  newPro: function() {
    let that = this
    // let tempData = that.data.selectedList
    let tempData = app.globalData.selectedAppointmentPackage
    let tempRes = Object.values(tempData.reduce((a, b) => {
      if (a[b.laborsetId]) {
        /* a[b.laborsetId].childGroup.push({
          Code: b,
        }) */
        a[b.laborsetId].childGroup.push(b)
      } else {
        a[b.laborsetId] = {
          laborsetName: b.laborsetName,
          laborsetId: b.laborsetId,
          /* childGroup: [{
            Code: b,
          }] */
          childGroup: [b]
        }
      }
      return a
    }, {}))
    console.log('tempRes ', tempRes)
    return tempRes
  },
  proccessAPParams: function(data) {
    let that = this
    let tempData = data
    let tempResult = []
    tempData.forEach(item => {
      item.laborsetAccountId = item.id
      tempResult.push(item)
    })
    return tempResult
  },
  /* 选择时间 */
  selectTime: function () {
    wx.navigateTo({
      url: '/pages/index/carBeauty/timeSelector/timeSelector'
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