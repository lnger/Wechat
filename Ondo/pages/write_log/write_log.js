Page({
    onShareAppMessage() {
      return {
        title: 'form',
        path: 'page/component/pages/form/form'
      }
    },
    data: {
      pickerHidden: true,
      chosen: '',
    },
    pickerConfirm(e) {
      this.setData({
        pickerHidden: true
      })
      this.setData({
        chosen: e.detail.value
      })
    },
  
    pickerCancel() {
      this.setData({
        pickerHidden: true
      })
    },
  
    pickerShow() {
      this.setData({
        pickerHidden: false
      })
    },
  
    formSubmit(e) {
      const app = getApp();
      if(e.detail.value.input!=''){
        app.AddLogAlone(e.detail.value.input);
      }
      wx.switchTab({
        url: '../account/account'   // 目的页面url
      })
    },
  
    formReset(e) {
      this.setData({
        chosen: ''
      })
    }
  })