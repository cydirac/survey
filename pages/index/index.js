//index.js
//获取应用实例
const app = getApp()
const gendersval = ['Male','Female']

Page({
  data: {
    pickershow: false,
    gendertx: 'Gender',
    staffnumtx: 'Input Staff Number',
    mobilenumtx: 'Input Mobile Number',
    genders: gendersval,
    genderIndex:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindGenderChange: function (e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  survey_form: function(e){
    wx.request({
      url: 'http://117.78.7.87:8080/api/survey',
      header: {
        'content-type': 'application/json'
      },
      data: {
        uid: 'DKA7AB7',
        staffnum: e.detail.value.staffnumberval,
        mobilenum: e.detail.value.mobilenumberval,
        gender: this.data.genders[this.data.genderIndex]
      },
      method: 'POST',
      success(res){
        console.log(res.data)
      }
    }),
    wx.navigateTo({
        url: '../result/result',
      })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
