$(document).ready(function () {
    var id=getCurrentId();
    getContentInfo(id);
});
function getContentInfo(id) {
    $.post(callurl+"/ActivityInfo/Info",{ID:id,UserInfo:cookie.get("accessToken")},function (res) {
        console.log(res);
        if (res.Success){
            var info=res.Infor;


            // 判断活动时间是否结束
            var jdata = new Date();
            var activedata = new Date(info.ESignupTime);
            var startdata = new Date(info.SSignupTime);
            var time1 = jdata.getTime();
            var time2 = activedata.getTime();
            var time3 = startdata.getTime();
            if(time1 > time2 ){
                $(".active-sub").html("活动已结束").css("background-color","#b5b5b5");
            }

            if(time1 < time3 ){
                $(".active-sub").html("还未开始").css("background-color","#b5b5b5");
            }

            if(info.LastNum === 0){
                $(".active-sub").html("名额已满").css("background-color","#f8b551");
            }





            $("#cover-img").attr("src",info.CoverImg);
            $("#content-title").html(info.Name);
            $("#read-num").html(info.ReadNum);
            $("#apply-num").html(info.SignupNum);
            $("#synum").html(info.LastNum);
            $("#content-info").html(info.ActivityContent);
            var  activityTime = info.ActivityTime;
            var time=new Date(activityTime);
            var month=time.getMonth()+1;
            var date=time.getDate();
            var day=time.getDay();
            var hour=time.getHours();
            var minute = time.getMinutes();
            var second=time.getSeconds();
            var t;
            // 凌晨:3:00--6:00
            // 早晨:6:00---8:00
            // 上午:8:00--11:00
            // 中午:11:00--13:00
            // 下午:13:00--17:00
            // 傍晚:17:00--19:00
            // 晚上:19:00--23:00
            // 深夜:23:00--3:00




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
            $("#activity-time").html("活动时间："+month+"月"+date+"日（"+t1+"）"+t+" "+hour+":"+minute+"");
            $("#activity-place").html("活动地点："+info.Address+"");
            $("#activity-money").html("费       用："+info.Cost+" ");
            $("#apply-time").html("报名时间："+info.SSignupTime+"");
        }else{
            alert(res.Msg);
        }
    });
}

function showPeopleListInputs(num){
    $("#people-num").addClass("hide").removeClass("tcc-wapper-add");
    setTimeout(function () {
        $("#people-num").removeClass("hide")
    },10);
    $("#people-list").removeClass("hide");
    for(var i=0;i<num;i++){
        var html = ' <div class="items">\n' +
            '            <div class="tcc-wapper-title clearfix"><div class="tcc-wapper-title-span fl"></div>填写信息</div>\n' +
            '            <div class="tcc-wapper-item">\n' +
            '                <div class="item">\n' +
            '                    <div class="item-01">姓名</div>\n' +
            '                    <div class="item-02"><input  class="item-02-input namesID" type="text" placeholder="请输入您的姓名"></div>\n' +
            '                    <!--<div id="tip2" class="tip hide">请输入您姓名！</div>-->\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="item">\n' +
            '                    <div class="item-01">联系方式</div>\n' +
            '                    <div class="item-02"><input  class="item-02-input phoneID" type="text" placeholder="请输入您的联系方式"></div>\n' +
            '\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="item">\n' +
            '                    <div class="item-01">职务</div>\n' +
            '                    <div class="item-02"><input  class="item-02-input zwID" type="text" placeholder="请确认您的职务"></div>\n' +
            '\n' +
            '                </div>\n' +
            '\n' +
            '\n' +
            '            </div>\n' +
            '        </div>';
        $(".items-container").append(html)
    }
}


function qd() {
    var synum = $("#synum").text();
    console.log(synum);

    var num = $("#num").val();
    console.log(num);
    if(num){
        if(num > synum){
            alert("最多不能超过" +synum + "人！" );
        }else {
            showPeopleListInputs(num);
        }
    }else {
        alert("人数不能为空！" );
    }

}





function qd1() {

        var list =$(".items");
        var message = [];
        console.log(list.length)
        for(i=0;i<list.length;i++){
            var messageArray = {};
            var nameAp =  $(list[i]).children().children().children().find(".namesID").val();
            var phoneAp = $(list[i]).children().children().children().find(".phoneID").val();
            var zwAp = $(list[i]).children().children().children().find(".zwID").val();
            messageArray.Name = nameAp;
            messageArray.ContactNumber = phoneAp;
            messageArray.Duties = zwAp;
            if (nameAp==""){
                alert("姓名不得为空");
                return;
            }
            if (phoneAp==""){
                alert("手机号不得为空");
                return;
            }
            if (phoneAp.length==11){
                //手机号正则
                if(!(/^1[34578]\d{9}$/.test(phoneAp))){
                    alert("联系方式输入有误，请重填");
                    return false;
                }
            } else{
                //电话号码正则
                if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(phoneAp)){
                    alert('联系方式输入有误，请重填');
                    return false;
                }
            }
            message.push(messageArray);
        }
        var id=getCurrentId();
        var params={
            ActivityID:id,
            PeopleList:JSON.stringify(message),
            UserInfo:cookie.get("accessToken")
        };
        $.post(callurl+"/ActivityInfo/SignUp",params,function (res) {
            if (res.Success){
                $("#people-list").addClass("hide");
                $(".items-container").html();
                $(".success-wipper").removeClass("hide");
            }else{
                alert(res.Msg)
            }
        });






}