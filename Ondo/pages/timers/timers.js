const util = require('../../utils/util.js');
const app = getApp();
const defaultLogName = {
  work: '计时',
}
const actionName = {
  stop: '停止',
  start: '开始'
}
Page({
  data: {
    hiddenmodalput: true,
    remainTimeText: '',
    showTime: 0,
    endTime: 0,
    timerType: 'work',
    record: {},
    completed: false,  //是否结束
    isRuning: false,   //是否运行
    isStop: false,
    isFirst: false,

    selectShow:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
  },
  onLoad:function(){
    var tmp=new Array();
    tmp[0]="未选择习惯"
    var myhabits=app.globalData.My_Habits
    for(var i=0;i<myhabits.length;i++){
      if(myhabits[i].habit_finishedTime==''){
        var x=myhabits[i].habit_name
        tmp.push(x)
      }
      else{
        continue;
      }
    }
    this.setData({
      selectData:tmp
    })
  },
  // 点击下拉显示框
  selectTap() {
      this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    //let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    let Index = e.detail.value;
    console.log(Index)
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
    this.changeLogName()
  },

  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true,
    })
    this.onShow()
  },
  setTime: function (e) {
    this.setData({
    'workTime': e.detail.value
    })
    //记录
    wx.setStorage({
      key: 'workTime',
      data: e.detail.value
    })
  },
  onShow: function () {
    var tmp=new Array();
    tmp[0]="未选择习惯"
    var myhabits=app.globalData.My_Habits
    for(var i=0;i<myhabits.length;i++){
      if(myhabits[i].habit_finishedTime==''){
        var x=myhabits[i].habit_name
        tmp.push(x)
      }
      else{
        continue;
      }
    }
    this.setData({
      selectData:tmp
    })
    if (this.data.isRuning) return
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00'
    })
  },
  startTimer: function (e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e.target.dataset.type
    let showTime = this.data[timerType + 'Time']
    let keepTime = showTime * 60 * 1000
    let logName = this.logName || defaultLogName[timerType]
    let isStop = this.data.isStop
    let keepM =parseInt((keepTime/1000-this.data.showTime)/60);
    let keepS = (keepTime/1000-this.data.showTime)%60;

    console.log(this.data.isFirst)
    if(!this.data.isFirst){
      this.setData({
        endTime: keepTime + startTime,
        isFirst:!this.data.isFirst
      })
    }
    console.log(this.data.isFirst)
    console.log(keepTime)
    console.log(showTime)
    console.log(this.data.endTime)

    if (!isRuning) {
      // this.stopTimer()
      this.timer = setInterval((function () {
        this.updateTimer()
      }).bind(this), 1000)
    } else{
      this.setData({
        isStop:!isStop,
        isFirst:!this.data.isFirst
      })
      let record = this.data.record  
      record.keepM = keepM
      record.keepS = keepS
      // console.log(record.keepM)
      // console.log(record.keepS)
      this.saveLog(this.data.record)
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ':00',
      showTime:  showTime * 60,
    })
    // if(!this.data.isFirst){
    //   this.setData({
    //     endTime: keepTime + startTime,
    //     isFirst:!this.data.isFirst
    //   })
    // }
    
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    // console.log(keepTime)
    
    this.data.record = {
      name: logName,
      startTime: now,
      keepTime: keepTime/60/1000, //keepTime/60/1000
      endTime: keepTime + startTime,
      keepM: keepM,
      keepS: keepS,
      year: year,
      month: month,
      day: now.getDate()
      // createTime: '' + year + month + now.getDate()
    }   
  },
  suspendTimer: function (e) {
    let isStop = this.data.isStop
    let showTime = this.data.showTime
    let keepTime =  showTime * 1000

    let now = Date.now();
    this.setData({
      isStop: !isStop,
      completed: false,
      endTime:keepTime+now
      // remainTimeText: showTime,
    })

    // this.endTime = keepTime + now
    // console.log(this.data.endTime)
    // console.log(keepTime)

    if (!this.data.isStop) {
      //this.stopTimer()
      this.timer = setInterval((function () {
        this.updateTimer()
      }).bind(this), 1000)
    } else{
      this.stopTimer()
    }
    
  },

  stopTimer: function () {
    // clear timer
    this.timer && clearInterval(this.timer)
    this.setData({
      timer:null
    })
  },

  updateTimer: function () {
    let now = Date.now()
    //let record = this.data.record  
    let remainingTime = Math.round((this.data.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    // console.log(this.data.endTime)
    // console.log(remainingTime)
    // update text
    if (remainingTime > 0) {
      // let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      let remainTimeText = M + ":" + S
      this.setData({
        remainTimeText: remainTimeText,
        showTime: remainingTime
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      // this.stopTimer()
      // return
    }
  },
  changeLogName: function () {
    this.logName = this.data.selectData[this.data.index]
    console.log(this.logName)
  },

  saveLog: function (record) {
    //wx.setStorageSync('records', [])  //清空记录
    var records = wx.getStorageSync('records') || [ ]
    records.unshift(record)
    wx.setStorageSync('records', records)
  }
})