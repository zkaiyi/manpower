// 电话正则

function checkTEL(tel) {
    if (tel.search(/^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)!= -1){
        return true;
    }
    else{
        return false;
    }
}



// 日常
$(function () {
    var myDate= new Date();
    var startYear=2008;
    var nowYear=myDate.getFullYear();
    for (var i=startYear;i<=nowYear;i++) {
        var html01 = '<div class="year-down-list">'+i+'年</div>';
        $(".year-down").prepend(html01);
    };

    $(document).on("click",".item-02-input-div",function () {
        if($(this).find(".year-down").hasClass("hide")){
            $(this).find(".year-down").slideDown();
            $(this).find(".year-down").removeClass("hide");

        }else {
            $(this).find(".year-down").slideUp();
            $(this).find(".year-down").addClass("hide");
        }
    });
    $(document).on("click",".year-down-list",function () {
        var need_y = $(this).html();
        $(".item-02-input-div-span").html(need_y);
    });


    var w01=$(".item-02-cl").width();
    $(".item-02-cl").css("height",w01/1.619 + "px")
    var w02=$(".item-02-cl-center-01").width();
    $(".item-02-cl-center-01").css("height",w02/1.634 + "px")
});

// 确实验证

    function uploading() {
        var year=$("#year").text();
        console.log(year);
        var sjname=$("#sjname").val();
        var sjmobel=$("#sjmobel").val();
        var sjaddress=$("#sjaddress").val();

        if(year==="请输入年份"){
            // $("#tip1").removeClass("hide");
            alert("请选择年份");
        }else {

        }

        if(sjname){

        }else {
            alert("请输入收件人姓名");
        }


        if(checkTEL(sjmobel)){

        }else {
            alert("请检查收件人电话");
        }



        if(sjaddress){

        }else {
            alert("请输入收件人地址");
        }






    }
