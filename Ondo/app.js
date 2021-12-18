// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  loadTimers:function(){
    var that= this;
    let records = wx.getStorageSync('records')||[]
      records.forEach(function (item, index, arry) {
        if(that.globalData.Timers.length==1&&that.globalData.Timers[0].timer_id==null)
            f=1;
        if(f==0){
          console.log(1)
          var i=that.globalData.Timers.length
          var newTimer=[
            {
              timer_id:i+1,//计时器id
              habit_id:null,//习惯id(可没有)
              timer_SetTime:item.keepTime,//计时设定的时间
              timer_CreatedTime:item.startTime,//该计时创建时间
              timer_type:null,
            }
          ]
          if(item.name=='未选择习惯'){
            newTimer.setData({
              timer_type:0,
            })
          }else{
            for(var i=0;i<that.globalData.My_Habits.length;i++){
              if(that.globalData.My_Habits[i].habit_name==item.name){
                newTimer.setData({
                   timer_type:1,
                    habit_id:that.globalData.My_Habits[i].habit_id,//习惯id(可没有)
                })
              }
            }
          }
            that.globalData.Timers=that.globalData.Timers.concat(newTimer)
        }
        else{
          that.globalData.Timers[0].timer_id=1
          that.globalData.Timers[0].timer_SetTime=item.keepTime
          that.globalData.Timers[0].timer_CreatedTime=item.startTime
          if(item.name=='未选择习惯'){
              that.globalData.Timers[0].timer_type=0
          }else{
            for(var i=0;i<that.globalData.My_Habits.length;i++){
              if(that.globalData.My_Habits[i].habit_name==item.name){
                  that.globalData.Timers[0].timer_type=1,
                  that.globalData.Timers[0].habit_id=item.name
              }
            }
          }
        }
      })
  },
  onLoad: function (options) {
    var that= this;
    loadTimers()
    My_Habits=that.globalData.My_Habits  
  } , 
  globalData: {
    userInfo: null,
    updateid:0,//需要+1的习惯
    deleteid:0,//今日取消打卡,天数要-1
    page_type:2,
    habitsnum:6,
    edit:false,
    My_Habits:[
      {
        habit_id:1,//习惯名
        habit_name:'喝水',//习惯id
        habit_createdTime:'',//习惯创建时间
        habit_finishedTime:'',//习惯结束时间
        habit_customTime:0,//习惯的频率(按每隔x天计算)
        habit_num:0,//打卡总次数
        if_DoTodayClork:false,//判断今日是否已打卡
        habit_img:"icon/water.png",   //图片
        ClorkRecords:[{
          clork_id:null,//打卡id
          habit_id:null,//习惯id
          clork_time:null,//打卡时间
        }],
      },
      {
        habit_id:2,
        habit_name:'吃早餐',
        habit_createdTime:'',
        habit_finishedTime:'',
        habit_customTime:0,
        habit_num:0,
        if_DoTodayClork:false,
        habit_img:"icon/breakfast.png",
        ClorkRecords:[{
          clork_id:null,
          habit_id:null,
          clork_time:null,
        }],
      },
      {
        habit_id:3,
        habit_name:'站立休息',
        habit_createdTime:'',
        habit_finishedTime:'',
        habit_customTime:0,
        habit_num:0,
        if_DoTodayClork:false,
        habit_img:"icon/xiuxi.png",
        ClorkRecords:[{
          clork_id:null,
          habit_id:null,
          clork_time:null,
        }],
      },
      {
        habit_id:4,
        habit_name:'运动',
        habit_createdTime:'',
        habit_finishedTime:'',
        habit_customTime:0,
        habit_num:0,
        if_DoTodayClork:false,
        habit_img:"icon/run.png",
        ClorkRecords:[{
          clork_id:null,
          habit_id:null,
          clork_time:null,
        }],
      },
      {
        habit_id:5,
        habit_name:'早睡',
        habit_createdTime:'',
        habit_finishedTime:'',
        habit_customTime:0,
        habit_num:0,
        if_DoTodayClork:false,
        habit_img:"icon/sleep.png",
        ClorkRecords:[{
          clork_id:null,
          habit_id:null,
          clork_time:null,
        }],
      },
      {
        habit_id:6,
        habit_name:'睡前刷牙',
        habit_createdTime:'',
        habit_finishedTime:'',
        habit_customTime:0,
        habit_num:0,
        if_DoTodayClork:false,
        habit_img:"icon/teeth.png",
        ClorkRecords:[{
          clork_id:null,
          habit_id:null,
          clork_time:null,
        }],
      }
    ],
    Habits_library:[
      {
        habit_icon:'icon/water.png',
        habit_name:'醒来喝水',//习惯id
      },
      {
        habit_icon:'icon/breakfast.png',
        habit_name:'吃早餐',
      },
      {
        habit_icon:'icon/teeth.png',
        habit_name:'睡前刷牙',
      },
      {
        habit_icon:'icon/sleep.png',
        habit_name:'早睡',
      },
      {
        habit_icon:'icon/run.png',
        habit_name:'跑步',
      },
      {
        habit_icon:'icon/chiyao.png',
        habit_name:'吃药',
      },
      {
        habit_icon:'icon/e-mail.png',
        habit_name:'清查邮件',
      },
      {
        habit_icon:'icon/tea.png',
        habit_name:'喝茶',
      },
      {
        habit_icon:'icon/daka.png',
        habit_name:'打卡',
      },
      {
        habit_icon:'icon/daiban.png',
        habit_name:'写待办事项',
      },
      {
        habit_icon:'icon/fanqie.png',
        habit_name:'使用番茄钟',
      },
      {
        habit_icon:'icon/read.png',
        habit_name:'阅读',
      },
      {
        habit_icon:'icon/read1.png',
        habit_name:'背单词',
      },
      {
        habit_icon:'icon/kill.png',
        habit_name:'练习新技能',
      },
      {
        habit_icon:'icon/xiuxi.png',
        habit_name:'休息一下',
      },
      {
        habit_icon:'icon/zhuanyan.png',
        habit_name:'转眼运动',
      },
      {
        habit_icon:'icon/tanyueqi.png',
        habit_name:'弹乐器',
      },
      {
        habit_icon:'icon/dazuo.png',
        habit_name:'打坐冥想',
      },
      {
        habit_icon:'icon/jizhang.png',
        habit_name:'记账',
      },
      {
        habit_icon:'icon/riji.png',
        habit_name:'写日记',
      },
      {
        habit_icon:'icon/jiaohua.png',
        habit_name:'浇花',
      },
      {
        habit_icon:'icon/liugou.png',
        habit_name:'遛狗',
      },
      {
        habit_icon:'icon/pengy.png',
        habit_name:'探望朋友',
      },
    ],
    showDialog:{
       id:1,
    },
    Timers:[
      {
        timer_id:null,//计时器id
        habit_id:null,//习惯id(可没有)
        timer_SetTime:null,//计时设定的时间
        timer_CreatedTime:null,//该计时创建时间
        timer_type:null,//计时器的类型：0（无习惯id），1（有习惯id）
      }
    ],
    Logs:[
      {
        log_id:1,//日志id
        log_content:null,//打卡内容
        habit_id:null,//习惯id(可不存在)
        clork_id:null,//打卡id(可不存在)
        log_type:null,//日志类型：0（无打卡id），1（有打卡id）
        log_CreatedTime:null,//日志的创建时间
      }
    ],
  },
  ResetMyHabits:function(e){
    var x=this.globalData.My_Habits
    var a=this.globalData.Habits_library
    for(var i=0;i<x.length;i++){
      this.setData({
        ['x['+i+'].habit_createdTime']:'e.currentTime',//数组内元素赋值方式
      })
    }
  },
  AddMyHabits:function(e){
    var l=this.globalData.My_Habits.length
    let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
    var newHabit=[
      {
        habit_id:l+1,
        habit_name:e.habit_name,
        habit_createdTime:'' + year + month + now.getDate(),//习惯创建时间
        habit_customTime:e.habit_customTime,//习惯的频率(按每隔x天计算)
        habit_num:0,//打卡总次数
        if_DoTodayClork:false,//判断今日是否已打卡
        ClorkRecords:[{
          clork_id:null,//打卡id
          habit_id:null,//习惯id
          clork_time:null,//打卡时间
        }],
      }
    ]
    this.setData({
      'this.globalData.My_Habits':this.globalData.My_Habits.concat(newHabit)
    });
  },
  DeleteHabit:function(e){
    var dataset = e.target.dataset;
    var Index = dataset.index;
    //通过`index`识别要删除第几条数据，第二个数据为要删除的项目数量，通常为1
    this.globalData.My_Habits.splice(Index,1);
    //渲染数据
    this.setData({
      My_Habits:this.globalData.My_Habits
    });
  },
  FinishHabit:function(e){
    var dataset = e.target.dataset;
    var Index = dataset.index;
    // var Index=index;
    this.globalData.My_Habits[Index].habit_finishedTime=new Date();
    //渲染数据
    this.setData({
      My_Habits:this.globalData.My_Habits
    });
  },
  AddLogAlone:function(input){
    var that = this;
    console.log(input)
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        var f=0;
        if(this.globalData.Logs[0].log_content==null)
            f=1;
        if(f==0){
          var i=this.globalData.Logs.length
          var newLog=[
            {
              log_id:i+1,
              log_content:input,//打卡内容
              habit_id:null,//习惯id(可不存在)
              clork_id:null,//打卡id(可不存在)
              log_type:0,//日志类型：0（无打卡id），1（有打卡id）
              log_CreatedTime:'' + year + month + now.getDate(),//日志的创建时间
            }
          ]
            that.globalData.Logs=that.globalData.Logs.concat(newLog)
        }
        else{
            that.globalData.Logs[0].log_content=input
            that.globalData.Logs[0].log_type=0
            that.globalData.Logs[0].log_CreatedTime='' + year + month + now.getDate()
        }
        console.log(that.globalData.Logs)
  },
})
