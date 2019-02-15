var id = window.location.href.split("ActivityID=")[1];
var json = {
    UserInfo:cookie.get("accessToken"),
    id:id
};

$.ajax({
    type: "post",
    url: callurl + "/ActivityInfo/Info",
    data:json,
    success:function (res) {
        console.log(res);
        var list = res.Infor;
        $("#banner_img").attr("src",list.CoverImg);
        $(".title-01").html(list.Name);
        $("#yd").html("阅读：" + list.ReadNum);
        $("#zbm").html("总报名人数：" + list.SignupNum + "人");
        $("#synum").html(list.LastNum);
        $(".title02-01").html(list.ActivityContent);



        var  activityTime = info.ActivityTime.replace(/\-/g, '/');

        var time=new Date(activityTime);
        var month=time.getMonth()+1;
        var date=time.getDate();
        var day=time.getDay();
        var hour=time.getHours();
        var minute = time.getMinutes();

        var second=time.getSeconds();
        // console.log(time);
        var t;
        if (hour>=3&&hour<6){
            t="凌晨";
        }else if (hour>=6&&hour<8){
            t="早晨";
        } else if (hour>=8&&hour<11){
            t="上午";
        }else if (hour>=11&&hour<13){
            t="中午";
        }else if (hour>=13&&hour<17){
            t="下午";
        }else if (hour>=17&&hour<19){
            t="傍晚";
        }else if (hour>=19&&hour<23){
            t="晚上";
        }else{
            t="深夜";
        }
        if (hour>12){
            hour=hour-12;
        }
        var t1;
        if (day==0){
            t1="周日";
        } else if (day==1){
            t1="周一";
        } else if (day==2){
            t1="周二";
        }else if (day==3){
            t1="周三";
        }else if (day==4){
            t1="周四";
        }else if (day==5){
            t1="周五";
        }else if (day==6){
            t1="周六";
        }
        if (hour<10){
            hour="0"+hour;
        }
        if (second<10){
            second="0"+second;
        }

        var fy = list.Cost;
        if(fy == null){
            fy="免费"
        }


        $("#activity-time").html("活动时间："+list.ActivityTime+"");
        $("#activity-place").html("活动地点："+list.Address+"");
        $("#activity-money").html("费       用："+fy+" ");
        $("#apply-time").html("报名时间："+list.SSignupTime+"");
        $("#apply-jz").html("截止时间："+list.ESignupTime+"")


    },
    error:function (xml) {

    }
});


// 取消 报名
$(document).on("click","#qx",function () {
    var json = {
        UserInfo:cookie.get("accessToken"),
        ID:sessionStorage.getItem("person-apply-content-qxId")
    };
    $.ajax({
        url:callurl + '/ActivityInfo/SignUp/CancelSignUp',
        type:'post',
        data:json,
        success:function (res) {
            console.log(res);
            //
            if(res.Msg == "取消成功！"){
                alert("取消成功！");
                window.location.href = 'person-apply.html'
            }

        },
        error:function (xml) {
            console.log(xml);
            console.log("失败");
        }
    });
});


// 修改的跳转链接
$("#edit").find("a").attr("href","person-apply-details.html?ActivityID=" +id);


