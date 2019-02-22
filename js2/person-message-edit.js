// 获取初始信息
var accessToken = {
    UserInfo:cookie.get("accessToken")
};
$.ajax({
    url:callurl + '/CompanyInfo/Info',
    type:'post',
    data:accessToken,
    success:function (res) {
        console.log(res);
        $("#pmfCompany").val(res.Infor.Name);
        $("#pmfName").val(res.Infor.Contact);
        $("#mobel").val(res.Infor.PhoneNumber);


    },
    error:function (xml) {
        console.log(xml);
        console.log("失败");
    }
});
// 获取初始信息============================

// 修改企业名称
function fsub() {
    // alert("1111");
    var Name = $(".firm-top-01-int").val();
    // 上传材料
    var pic = $("#uppic")[0].files[0];
    var formData  = new FormData();
    formData.append("file",pic);
    fileImg(formData);
    if(!pic){
        pic =$("#imgFile").attr("src");
        return false;
    }
    if(!Name){
        alert("姓名不能为空")
    }
    var json = {
        Name:Name,
        TradePermit:sessionStorage.getItem("file"),
        UserInfo:cookie.get("accessToken")
    };
    $.ajax({
        url:callurl +'/CompanyInfo/Register/ChangeName',
        type:'post',
        data: json,
        success: function (res) {
            console.log(res);
            if(res.Msg == "提交成功,请等待审核"){
                alert("提交成功,请等待审核");
                window.location.href='person-message.html'
            }
        },
        error:function (xml) {
            console.log(xml);

        }

    });
}
// 修改名称
function nsub() {
    var Name = $(".firm-top-01-int").val();
    var json = {
        Name:Name,
        UserInfo:cookie.get("accessToken")

    };
    $.ajax({
        url:callurl +'/CompanyInfo/Register/ChangeContact',
        type:'post',
        data: json,
        success: function (res) {
            console.log(res);
            if(res.Msg=="修改成功"){
                alert("修改成功");
                window.location.href='person-message.html'
            }
        },
        error:function (xml) {
            console.log(xml);

        }

    });
}

// 修改手机号
// 修改手机号码
// 发送短信验证码

function checkTEL(tel) {
    if (tel.search(/^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)!= -1){
        return true;
    }
    else{
        return false;
    }
}


var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
function sendMessage() {
    var telephone=$("[name='telephone']").val();
    //验证手机号格式
    var mobile = /^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;


    // if(telephone && mobile.test(telephone)){
    if(checkTEL(telephone)){

        curCount = count;
        //设置button效果，开始计时
        $("#btnSendCode").attr("disabled", "true");
        $("#btnSendCode").val("剩余" + curCount);
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次


        //向后台发送处理数据
        var mobel = $("#mobel").val();
        var json = {
            Phone: mobel,
            UserInfo:cookie.get("accessToken")
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
        alert('请检查手机格式');
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

function psub() {
    var Name = $(".firm-top-01-int").val();
    var Code=$("#yzm").val();
    var json = {
        Phone:Name,
        Code:Code,
        UserInfo:cookie.get("accessToken")

    };

    if(!Code){
        alert("请输入验证码");
        return false;
    }
    $.ajax({
        url:callurl +'/CompanyInfo/Register/ChangePhone',
        type:'post',
        data: json,
        success: function (res) {
            console.log(res);
            alert(res.Msg);
            if(res.Msg=="修改成功"){
                window.location.href='person-message.html'
            }
        },
        error:function (xml) {
            console.log(xml);

        }

    });
}


