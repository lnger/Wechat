// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    hiddenmodalput:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
    type:0,
    icons: [],
    log:null
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goAdd:function(){
      wx.navigateTo({
        url: '../../pages/habits_add/habits_add'
      });
     getApp().globalData.page_type=1;
  },
  record: function (e) {
    var id=e.target.id;
    console.log(id);
    getApp().globalData.updateid=id;
    getApp().globalData.deleteid=id;
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
    })
    this.choose;
  },
  choose:function(e){
    var id=e.target.id;
    if(id=='b1'){
      console.log(getApp().globalData.updateid,getApp().globalData.deleteid);
    }
    if(id=='b2'){
      getApp().globalData.deleteid=0;
      console.log(getApp().globalData.updateid,getApp().globalData.deleteid);
    }
  },
  //取消
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
    getApp().globalData.updateid=0;
    getApp().globalData.deleteid=0;
  },
  //确认
  confirm: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    var id=getApp().globalData.updateid-1;
    // var str='icons['+id+'].days';
    var color='icons['+id+'].color';
    var num=app.globalData.My_Habits[id].habit_num;
    if(getApp().globalData.deleteid==0){
      if(num!=0){
        getApp().globalData.My_Habits[id].habit_num=num-1;
        app.globalData.updateid=0;
        getApp().globalData.My_Habits[id].if_DoTodayClork=false;
           this.setData({
              hiddenmodalput: true,
            })
      }  
    }
    else{
      getApp().globalData.My_Habits[id].habit_num=num+1;
      app.globalData.updateid=0;
      app.globalData.deleteid=0;
      getApp().globalData.My_Habits[id].if_DoTodayClork=true;
      this.setData({
        hiddenmodalput: true,
      })
      var newClork=[{
        clork_id:getApp().globalData.My_Habits[id].ClorkRecords.length+1,
        habit_id:getApp().globalData.My_Habits[id].habit_id,
        clork_time:'' + year + month + now.getDate(),
      }]
      getApp().globalData.My_Habits[id].ClorkRecords=getApp().globalData.My_Habits[id].ClorkRecords.concat(newClork)
    }
    // console.log(num+' '+getApp().globalData.My_Habits[id].habit_num);
    var i=app.globalData.Logs.length;
    console.log('before'+app.globalData.Logs.length);
    if(this.data.log!=null){
      var newLog=[
         {
             log_id:i+1,
             log_content:this.data.log,//打卡内容
             habit_id:id+1,//习惯id(可不存在)
             clork_id:getApp().globalData.My_Habits[id].ClorkRecords.length+1,//打卡id(可不存在)
             log_type:1,//日志类型：0（无打卡id），1（有打卡id）
             log_CreatedTime:'' + year + month + now.getDate(),//日志的创建时间
          }
    ]

       app.globalData.Logs=app.globalData.Logs.concat(newLog);
       console.log(app.globalData.Logs);
    }
    
    this.onShow()
  },

  log: function(res){
    var content=res.detail.value;
     this.setData({
       log:content
     });
     console.log(this.data.log);
   },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    this.data.icons=[];
    for (var i=0;i<app.globalData.My_Habits.length;i++){
      if(!app.globalData.My_Habits[i].if_DoTodayClork) var c="#fff" ;
      else var c="#2BB6C9" ;
        this.data.icons.push({
          id:app.globalData.My_Habits[i].habit_id,
          name:app.globalData.My_Habits[i].habit_name,
          num:app.globalData.My_Habits[i].habit_num,
          pic:"../../"+app.globalData.My_Habits[i].habit_img,
          color:c
       })}
 
      this.setData({
        icons: this.data.icons    
      }); 
    //  if(this.data.type==0){
    //   var app=getApp();
    //   var id=app.globalData.showDialog.id;
    //   // console.log(id);
    //   var pic='../../'+app.globalData.Habits_library[id-1].habit_icon;
    //   var name=app.globalData.Habits_library[id-1].habit_name;
    //   var id=this.data.length+1;
    //   this.data.icons.push({id:id,name:name,days:0,pic:pic,color:"#fff"});
    //   // console.log(this.data.icons[this.data.icons.length-1].pic);
    //   this.setData({
    //       icons:this.data.icons,
    //       length:id
    //   })
      // console.log(this.data.length);
    //  }
    //  else if(this.data.type==1){
    //   this.setData({
    //     type:0
    // })
    //  }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
