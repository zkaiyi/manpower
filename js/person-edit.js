function checkTEL(tel) {
    if (tel.search(/^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)!= -1){
        return true;
    }
    else{
        return false;
    }
}

// 验证
function submit() {
    var pass00 = $("#pass00").val();
    var pass01 = $("#pass01").val();
    var pass02 = $("#pass02").val();
    var yzm = $("#yzm").val();


    if (pass00) {
        $("#tip2").addClass("hide");
    } else {
        $("#tip2").removeClass("hide");
    }


    if (pass01) {
        $("#tip3").addClass("hide");
    } else {
        $("#tip3").removeClass("hide");
    }


    if (pass02 !== pass01) {
        $("#tip4").removeClass("hide").html("与第一次密码输入不符!");
    } else if (pass02 == "") {
        $("#tip4").removeClass("hide").html("请再次输入密码!");
    } else {
        $("#tip4").addClass("hide").html("请再次输入密码!");
    }


    if (yzm) {
        $("#tip5").addClass("hide");
    } else {
        $("#tip5").removeClass("hide");
    }







}



// 企业修改
$(function () {
    var firm01 = $(".firm-sz-01").width();
    $(".firm-sz-01").css("height",firm01 / 1.74675 + "px" );
    var firm02 = $(".firm-sz-01-01").width();
    $(".firm-sz-01-01").css("height",firm02 / 1.345 + "px" );
});

// 修改手机号码
// 发送短信验证码
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数
    function sendMessage() {
        var telephone=$("[name='telephone']").val();
        //验证手机号格式
        var mobile = /^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;


        if(telephone && mobile.test(telephone)){
            curCount = count;
            //设置button效果，开始计时
            $("#btnSendCode").attr("disabled", "true");
            $("#btnSendCode").val("剩余" + curCount);
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次


            //向后台发送处理数据
            // var mobel = $("#mobel").val();
            // var json = {
            //     mobile: mobel,
            //     type:3
            // };
            // $.ajax({
            //     url:callurl +'/common/sendMessageAnd',
            //     type:'post',
            //     data: JSON.stringify(json),
            //     contentType: 'application/json',
            //     dataType: "json",
            //     success: function (res) {
            //         console.log(res);
            //     },
            //     error:function (xml) {
            //         console.log(xml);
            //         if(xml.message === "请求太过频繁，请稍后再试"){
            //             alert(xml.message);
            //         }
            //     }
            //
            // });

        }else{
            alert('请输入手机号码');
            $("[name='telephone']").focus();
            return false;
        }


    }

//timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $("#btnSendCode").removeAttr("disabled");//启用按钮
            $("#btnSendCode").val("重新发送");
        }
        else {
            curCount--;
            $("#btnSendCode").val("剩余" + curCount);
        }
    }

    // 活动详情
    $(function () {
        $(".a-d-l-c-l-c-fr-int").attr('disabled',true);

        $(document).on("click",".apply-details-edit",function () {
            $(this).siblings().find(".apply-details-list-container-list").find("input").attr('disabled',false);
            $(this).addClass("apply-details-edit-add").html("确认修改")
        })

        $(document).on("click",".apply-details-edit-add",function () {
            var t = $(this).siblings().find(".apply-details-list-container-list");

            var name01 = t.children().children().find(".name01").val();
            var zw01 = t.children().children().find(".zw01").val();
            var mobel01 = t.children().children().find(".mobel01").val();
            console.log(name01);
            console.log(zw01);
            console.log(mobel01);

            if(name01){

            }else {
                alert("请输入姓名");
                return false;
            }

            if(zw01){

            }else {
                alert("请输入职务");
                return false;
            }

            if(checkTEL(mobel01)){

            }else {
                alert("请检查手机格式");
                return false;
            }




            alert("您已经成功修改！");
            t.children().children().find(".name01").val(name01);
            t.children().children().find(".zw01").val(zw01);
            t.children().children().find(".mobel01").val(mobel01);
            $(this).siblings().find(".apply-details-list-container-list").find("input").attr('disabled',true);
            $(this).removeClass("apply-details-edit-add").html("修改")
        })


    });

