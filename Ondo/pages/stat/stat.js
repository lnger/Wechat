// pages/stat/stat.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item:0,
        clork:false,
        log:false,
        timer:false,
        year: 0,
        month: 0,
        date: ['日', '一', '二', '三', '四', '五', '六'],
        dateArr: [],
        isToday: 0,
        isTodayWeek: false,
        todayIndex: 0,
        today: 0,
        Habit_or_Time:false,
        records: [], //时间

        logs:[],
        myhabits:[],
        ifHaveLog:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      const app=getApp()
      global=app.globalData
        this.setData({
            item:options.item,
            clork:false,
            log:false,
            timer:false,
            logs:global.Logs,
            myhabits:global.My_Habits,
        })
        if(options.item==1){
            this.setData({
                clork:true
            })
        }
        if(options.item==2){
            this.setData({
                log:true
            })
        }
        if(options.item==3){
            this.setData({
                timer:true
            })
            this.getRecords()
        }
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        this.dateInit();
        this.setData({
          year: year,
          month: month,
          today: now.getDate(),
          isToday: '' + year + month + now.getDate()
        })
    },
    getRecords: function () {
      let records = wx.getStorageSync('records')||[]
      records.forEach(function (item, index, arry) {
        item.startTime = new Date(item.startTime).toLocaleString()
      })
      this.setData({
        records: records
      })
      console.log(records)
    },
      dateInit: function (setYear, setMonth) {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let dateArr = [];                       //需要遍历的日历数组数据
        let arrLen = 0;                         //dateArr的数组长度
        let now = setYear ? new Date(setYear, setMonth) : new Date();
        let year = setYear || now.getFullYear();
        let nextYear = 0;
        let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
        let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
        let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                          //目标月1号对应的星期
        let dayNums = new Date(year, nextMonth, 0).getDate();               //获取目标月有多少天
        let obj = {};
        let num = 0;
        if (month + 1 > 11) {
          nextYear = year + 1;
          dayNums = new Date(nextYear, nextMonth, 0).getDate();
        }
        arrLen = startWeek + dayNums;
        for (let i = 0; i < arrLen; i++) {
          if (i >= startWeek) {
            num = i - startWeek + 1;
            obj = {
              isToday: '' + year + (month + 1) + num,
              dateNum: num,
              weight: 5
            }
          } else {
            obj = {};
          }
          dateArr[i] = obj;
        }
        this.setData({
          dateArr: dateArr
        })
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let nowMonth = nowDate.getMonth() + 1;
        let nowWeek = nowDate.getDay();
        let getYear = setYear || nowYear;
        let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
        if (nowYear == getYear && nowMonth == getMonth) {
          this.setData({
            isTodayWeek: true,
            todayIndex: nowWeek
          })
        } else {
          this.setData({
            isTodayWeek: false,
            todayIndex: -1
          })
        }
      },
      /**
       * 上月切换
       */
      lastMonth: function () {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
        let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
        this.setData({
          year: year,
          month: (month + 1)
        })
        this.dateInit(year, month);
      },
      /**
       * 下月切换
       */
      nextMonth: function () {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
        let month = this.data.month > 11 ? 0 : this.data.month;
        this.setData({
          year: year,
          month: (month + 1)
        })
        this.dateInit(year, month);
      },
    TipToday: function (e) {
        this.setData({
          today:e.currentTarget.dataset.id,
        })
      },
      ifHaveLogs:function(e){
        const app=getApp()
        var x=app.globalData.Logs
        for(var i=0;i<x.length;i++){
          console.log(x[i].log_CreatedTime)
          if(e.currentTarget.dataset.id==x[i].log_CreatedTime){
            this.setData({
              ifHaveLog:true
            })
            break;
          }
        }
      },
      HabitOrTime:function(e){
          console.log("触发HabitOrTime");
          console.log(e.currentTarget.dataset.id);
          if(e.currentTarget.dataset.id==1){
            this.setData({
                Habit_or_Time:false,
              })
          }else if(e.currentTarget.dataset.id==2){
            this.setData({
                Habit_or_Time:true,
              })
              this.CreateCanvas()
          }
      },
      CreateCanvas:function(){
        var that=this
        const app=getApp()
        var MH=app.globalData.My_Habits
        var wxCharts = require('wxcharts.js');
        var windowW=0;
        this.setData({
          imageWidth: wx.getSystemInfoSync().windowWidth
        }) ;
        console.log(this.data.imageWidth) ;
        //计算屏幕宽度比列
        windowW = this.data.imageWidth/375;    
        var Icategories=new Array()
        var Iseries=[{}]
        var Idata=new Array()
        for(var i=0;i<MH.length;i++){
          Icategories[i]=MH[i].habit_name
          Idata[i]=MH[i].habit_num
        }
        var Iseries=[{
            name:'习惯列表',
            data:Idata
          }]
        new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: Icategories,
          series:Iseries,
          yAxis: {
            format: function (val) {
              return val ;
            },
            title: '打卡次数',
            min: 0
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 25
            }
          },
          width: 370,
          height:220,
        });    
      }
})