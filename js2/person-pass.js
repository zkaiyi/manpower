// 验证
function submit() {
    var pass00 = $("#pass00").val();
    var pass01 = $("#pass01").val();
    var pass02 = $("#pass02").val();

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

    if($(".tip").hasClass("hide")){

    }else {
        return false;
    }

    var json = {
        OldPass:pass00,
        NewPass:pass01,
        UserInfo:cookie.get("accessToken")
    };

    $.ajax({
        url:callurl + "/CompanyInfo/Register/ChangePassword",
        type:"post",
        data:json,
        success:function (res) {
            console.log(res);
            alert(res.Msg);
            if(res.Msg == "修改成功"){
                sessionStorage.clear();
                window.location.href = 'login.html';
                cookie.deleteAll();

            }
        },
        error:function (xml) {
            console.log(xml);
        }
    })













}