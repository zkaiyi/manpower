function checkTEL(tel) {
    if (tel.search(/^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)!= -1){
        return true;
    }
    else{
        return false;
    }
}



// 验证码
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