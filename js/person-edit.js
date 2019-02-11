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

