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
        var mobel = $("#mobel").val();
        var json = {
            Phone: mobel
        };
        $.ajax({
            url:callurl +'/CompanyInfo/Register/SendCode',
            type:'post',
            data: json,
            success: function (res) {
                console.log(res);
            },
            error:function (xml) {
                console.log(xml);
                if(xml.message === "请求太过频繁，请稍后再试"){
                    alert(xml.message);
                }
            }

        });

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



function checkTEL(tel) {
    if (tel.search(/^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)!= -1){
        return true;
    }
    else{
        return false;
    }
}

// 表单验证
function validate() {

    var name = $("#name").val();
    var password = $("#password").val();
    var jpassword = $("#jpassword").val();
    var username = $("#username").val();
    var mobel = $("#mobel").val();
    var yzm = $("#yzm").val();

    if(name){
        $("#tips1").addClass("hide");
    }else {
        $("#tips1").removeClass("hide");
    }


    if(password){
        $("#tips2").addClass("hide");
    }else {
        $("#tips2").removeClass("hide");
    }



    if(jpassword!==password){
        $("#tips3").removeClass("hide").html("与第一次密码输入不符!");
    }else if(jpassword==""){
        $("#tips3").removeClass("hide").html("请再次输入密码!");
    }else{
        $("#tips3").addClass("hide").html("请再次输入密码!");
    }


    if(username){
        $("#tips4").addClass("hide");
    }else {
        $("#tips4").removeClass("hide");
    }


    if(checkTEL(mobel)){
        $("#tips5").addClass("hide");
    }else if(mobel==""){
        $("#tips5").removeClass("hide").html("请输入手机号码!");

    }else{
        $("#tips5").removeClass("hide").html("请检查手机格式!");
    }


    if(yzm){
        $("#tips6").addClass("hide");
    }else {
        $("#tips6").removeClass("hide");
    }


    if($(".tip").hasClass("hide")){

    }else {
        return false;
    }


    var pic = $("#uppic")[0].files[0];
    var pic02 = $("#uppic02")[0].files[0];
    var formData  = new FormData();
    formData.append("file",pic);
    var formData02  = new FormData();
    formData02.append("file",pic02);










    if(!pic){
        pic =$("#imgFile").attr("src");
        sessionStorage.setItem("src", pic);
        alert("缺少申请表");
        return false;


    }

    if(!pic02){
        pic02 =$("#imgFile02").attr("src");
        sessionStorage.setItem("src02", pic);
        alert("缺少营业执照");
        return false;

    }


    // 图片上传
// 申请表
    $.ajax({
        url:callurl + '/File/UpFile',
        type:'post',
        data:formData,
        dataType:'JSON',
        cache: false,
        processData: false,
        contentType: false,
        async:false,
        success:function (res) {
            console.log(res);
            var file = res.Infor;
            sessionStorage.setItem("file_src", file);


        },
        error:function (xml) {
            console.log(xml);
            console.log("失败");
        }
    });

    // 营业执照
    $.ajax({
        url:callurl + '/File/UpFile',
        type:'post',
        data:formData02,
        dataType:'JSON',
        cache: false,
        processData: false,
        contentType: false,
        async:false,
        success:function (res) {
            console.log(res);
            var file02 = res.Infor;
            sessionStorage.setItem("file_src02", file02)
        },
        error:function (xml) {
            console.log(xml);
            console.log("失败");
        }
    });




    var json = {
        Name:name,
        Password:password,
        Contact:username,
        PhoneNumber:mobel,
        ApplyForm:sessionStorage.getItem("file_src"),
        TradePermit:sessionStorage.getItem("file_src02"),
        Code:yzm
        };



    $.ajax({
        url:callurl +'/CompanyInfo/Register',
        type:'post',
        data: json,
        success: function (res) {
            console.log(res);
            alert(res.Msg);
            if(res.Msg == "注册成功，等待后台审核"){

                window.location.href='login.html'

            }
        },
        error:function (xml) {
            console.log(xml);

        }

    });

























}
