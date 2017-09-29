//index.js
//获取应用实例
const app = getApp()

//下面的代码在page({})外面
/* 毫秒级倒计时 */
/* function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送"
    });
    // timeout则跳出递归
    return;
  }

  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒"
  });

  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
// 秒数
var second = Math.floor(micro_second / 1000);
// 小时位
var hr = Math.floor(second / 3600);
// 分钟位
var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
// 秒位
var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
// 毫秒位，保留2位
var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

return sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
return num < 10 ? "0" + num : num
} */


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    flag: false,
    codeDis: false,
    phoneCode: "获取验证码",
    telephone: "",
    codePhone: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  changeCode: function () {
    var _this = this
    let telephone = this.data.telephone
    if (telephone.length != 11 || isNaN(telephone)) {
      wx.showToast({
        title: '请输入有效的手机号码',
        icon: "loading"
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return
    }
    this.setData({
      codeDis: true
    })
    //发送短信验证码
    RQ.request({
      url: "******************",
      data: {
        phone: this.data.telephone
      },
      success: function (res) {
        let data = res.data
        if (data.respCode != "000") {
          _this.setData({
            codeDis: false
          })
          wx.showToast({
            title: data.respMessage,
            icon: "loading"
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        } else {
          _this.setData({
            phoneCode: 60
          })
          // 倒计时
          let time = setInterval(() => {
            let phoneCode = _this.data.phoneCode
            phoneCode--
            _this.setData({
              phoneCode: phoneCode
            })
            if (phoneCode == 0) {
              clearInterval(time)
              _this.setData({
                phoneCode: "获取验证码",
                flag: true
              })
            }
          }, 1000)
        }
      }
    })
  },
  phoneinput: function (e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      telephone: value
    })
  },
  codeinput: function (e) {
    let value = e.detail.value
    console.log(value)
    this.setData({
      codePhone: value
    })
  },


  /*
     //手机输入框遗失光标则获取value然后把数据放入this.data.linkTel中去
    blurTel: function (e) {
      var linkTel = e.detail.value.replace(/\s/g, "");
      this.setData({
        linkTel: linkTel
      })
    },
    //点击发送验证码，获取手机号码，往后台发送数据
    setVerify: function (e) {
      var linkTel = this.data.linkTel;
  
      var _Url = "申请下发短信的地址";//这个由后台或者你们公司的短信平台提供，一般是http://ip:prot/短信验证项目和具体地址
      var total_micro_second = 60 * 1000;    //表示60秒倒计时，想要变长就把60修改更大
      //验证码倒计时
      count_down(this, total_micro_second);
      wx.request({
        url: _Url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: [{
          agentLinktel: linkTel
        }],
        success: function (res) {
          if (res.data.code == "00") {
            wx.showModal({
              title: '提示',
              content: '发送验证码成功！',
              showCancel: false
            })
          }
        },
        fail: function (res) {
          console.log("error res=")
          console.log(res.data)
        }
      });
    }, 
    */

})
