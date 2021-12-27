// pages/habit_content/habit_content.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // item:{
        //     id:0,
        //     name:'未命名',
        //     customTime:7,
        //     img:'../../icon/new.png'
        // },
        habit:{id:1,icon:'../../icon/water.png',name:'醒来喝水'},
        habit_times:[
            {value:'起床'},
            {value:'晨间'},
            {value:'中午'},
            {value:'午间'},
            {value:'晚间'},
            {value:'睡前'},
            {value:'任意时间'}
        ],
        days:[
            {value:'周一'},
            {value:'周二'},
            {value:'周三'},
            {value:'周四'},
            {value:'周五'},
            {value:'周六'},
            {value:'周日'}
        ],
       config:{config1:'inline',config2:'none',config3:'none'}
        
    },

    chooseNum:function(e){
        var id=e.target.id;
            if(id==1){
                this.setData({
                    config:{
                    config1:"inline",
                    config2:"none",
                    config3:"none"}
                })
            }
            else if(id==2){
                this.setData({
                    config:{
                    config1:"none",
                    config2:"inline",
                    config3:"none"}
                });
            }
            else if(id==3){
                this.setData({
                    config:{
                    config1:"none",
                    config2:"none",
                    config3:"inline"}
                });
            }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var that=this;
//         if(options.Id!=0){      
//             for(var i=0;i<app.globalData.My_Habits.length;i++){          
//                 if(app.globalData.My_Habits[i].habit_id==options.Id)
//             {   
//                 that.data.item.id=app.globalData.My_Habits[i].habit_id,  //id
//                 that.data.item.name=app.globalData.My_Habits[i].habit_name,  //名称
//                 that.data.item.customTime=app.globalData.My_Habits[i].habit_customTime //打卡频次,
//                 that.data.item.img="../../"+app.globalData.My_Habits[i].habit_img
//                 }
//             }
//             that.setData({
//                 item:that.data.item
//             })
//         } 
        if(getApp().globalData.edit){
            this.setData({
                habit:{
                id:options.Id,
                icon:'../../'+getApp().globalData.My_Habits[options.Id-1].habit_img,
                name:getApp().globalData.My_Habits[options.Id-1].habit_name}
            });
        }
        else{
        if(options.id!=0){
            const app=getApp();
            this.setData({
                habit:{
                id:options.id,
                icon:'../../'+app.globalData.Habits_library[options.id-1].habit_icon,
                name:app.globalData.Habits_library[options.id-1].habit_name}
            });
        }
        else{
            this.setData({
                habit:{
                id:0,
                icon:'../../icon/new.png',
                name:'未命名'}
            });
        }}
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

    },
   name: function(res){
    var that=this;
    that.data.habit.name=res.detail.value;
     that.setData({
       habit:that.data.habit
     })
   },
   
   //计算频次 按照周计算
//    customTime1:function(res){
//     var that=this;
//     that.data.item.customTime=res.detail.value/7;
//     that.setData({
//         item:that.data.item
//     })
//    },
   //计算频次，按照月计算
//    customTime2:function(res){
//     var that=this;
//     that.data.item.customTime=res.detail.value/30;
//     that.setData({
//         item:that.data.item
//     })
//    },

   sub:function(e){
    //如果是index来的返回index
    console.log(getApp().globalData.page_type);
    if(getApp().globalData.page_type==1){
         wx.switchTab({
            url: "../../pages/index/index"
        })
    }
    else{
       var that=this;
       console.log(app.globalData.My_Habits)
       for (var i=0;i<app.globalData.My_Habits.length;i++){
           console.log(app.globalData.My_Habits[i].habit_id)
            if(app.globalData.My_Habits[i].habit_id==that.data.habit.id){
                app.globalData.My_Habits[i].habit_name=that.data.habit.name,
                app.globalData.My_Habits[i].customTime=that.data.habit.customTime
            }
       }
       wx.switchTab({
         url: '../habits/habits',
       });
    }
    if(!getApp().globalData.edit){
        let now=new Date();
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        log_CreateTime:''+year+month+now.getDate();
        getApp().globalData.My_Habits.push({
             habit_id:getApp().globalData.habitsnum+1,
             habit_name:this.data.habit.name,
             habit_createdTime:''+year+month+now.getDate(),
             habit_finishedTime:'',
             habit_customTime:0,
             habit_num:0,
             if_DoTodayClork:false,
             habit_img:'../../'+this.data.habit.icon,
             ClorkRecords:[{
                  clork_id:null,
                  habit_id:null,
                  clork_time:'',}]}); 
             getApp().globalData.habitsnum=getApp().globalData.habitsnum+1;
         console.log(getApp().globalData.habitsnum);
    }
    else getApp().globalData.edit=false;
    }
})