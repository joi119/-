// pages/test/test.js
Page({
  data: {
    input1: null,
    step:null, // 记录步数
  },
  onLoad() {
    wx.login({
      success: res => {
        console.log(res)
        this.getWeRunData()
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  getWeRunData() {
    let that = this
    wx.getWeRunData({
      success: res => {
        console.log("运动步数密文:", res.cloudID)
        wx.cloud.callFunction({
          name:'weRun',//云函数的文件名
          data:{
            weRunData: wx.cloud.CloudID(res.cloudID),
            obj:{
              shareInfo: wx.cloud.CloudID(res.cloudID)
            }
          },
          success: function (res) {
            console.log("云函数接收到的数据:")
            console.log(res)
            let step = res.result.event.weRunData.data.stepInfoList[30].step
            that.setData({
              step:step
            })
            console.log("得到的今日步数：",that.data.step)
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  bindinput: function (e) {
    this.setData({
      input1: e.detail.value
    })
    console.log("input1:" + this.data.input1)
  },
  primary: function () {
    console.log("input1:" + this.data.input1)
  }
})