var id = window.location.href.split("ActivityID=")[1];
var json = {
    UserInfo:cookie.get("accessToken"),
    ID:id,
    RecordID:sessionStorage.getItem("person-apply-content-qxId")
};

$.ajax({
    type: "post",
    url: callurl + "/ActivityInfo/SignUp/GetList",
    data:json,
    success:function (res) {
        console.log(res);
        var list = res.Infor;
        for(var i in list){
            var html='<div class="apply-details-list">\n' +
                '        <div class="apply-details-list-01"><span class="apply-details-list-01-span01">【报名成功】</span><span class="apply-details-list-01-span02">'+list[i].ActivityName+'</span></div>\n' +
                '        <div class="apply-details-list-container">\n' +
                '\n' +
                '            <div class="apply-details-list-container-list clearfix">\n' +
                '\n' +
                '                <div class="apply-details-list-container-list-container apply-details-list-container-list-container01 fl clearfix">\n' +
                '                    <div class="a-d-l-c-l-c-fl fl">姓&nbsp;&nbsp;&nbsp;名：</div>\n' +
                '                    <div class="a-d-l-c-l-c-fr fl"><input class="a-d-l-c-l-c-fr-int name01" disabled="disabled" value="'+list[i].Name+'"></div>\n' +
                '                </div>\n' +
                '\n' +
                '                <div class="apply-details-list-container-list-container apply-details-list-container-list-container01 fl clearfix">\n' +
                '                    <div class="a-d-l-c-l-c-fl fl">职&nbsp;&nbsp;&nbsp;务：</div>\n' +
                '                    <div class="a-d-l-c-l-c-fr fl"><input class="a-d-l-c-l-c-fr-int zw01" disabled="disabled" value="'+list[i].Duties+'"></div>\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '\n' +
                '            <div class="apply-details-list-container-list">\n' +
                '                <div class="apply-details-list-container-list-container clearfix">\n' +
                '                    <div class="a-d-l-c-l-c-fl fl">联系方式：</div>\n' +
                '                    <div class="a-d-l-c-l-c-fr fl"><input class="a-d-l-c-l-c-fr-int mobel01" disabled="disabled" value="'+list[i].ContactNumber+'"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div class="apply-details-list-container-list">\n' +
                '                <div class="apply-details-list-container-list-container clearfix">\n' +
                '                    <div class="a-d-l-c-l-c-fl fl">报名时间：</div>\n' +
                '                    <div class="a-d-l-c-l-c-fr fl">'+list[i].AddTime+'</div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '        </div>\n' +
                '        <div class="apply-details-edit" data-ID="'+list[i].ID+'">修改</div>\n' +
                '    </div>'



            $(".apply-details-container").append(html);
        }

    },
    error:function (xml) {

    }
});

// 活动详情修改其中的
$(function () {

    $(document).on("click",".apply-details-edit",function () {
        $(this).siblings().find(".apply-details-list-container-list").find("input").attr('disabled',false);
        $(this).addClass("apply-details-edit-add").html("确认修改")
    });

    $(document).on("click",".apply-details-edit-add",function () {
        var t = $(this).siblings().find(".apply-details-list-container-list");
        var personId = $(this).attr("data-id");

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

        var json02 = {
            ID:personId,
            Name:name01,
            Duties:zw01,
            ContactNumber:mobel01,
            UserInfo:cookie.get("accessToken")
        };
        $.ajax({
            url:callurl + "/ActivityInfo/SignUp/ModifySignUp",
            data:json02,
            type:"post",
            success:function (res) {
                console.log(res);
                alert("您已经成功修改！");
                if(res.Msg == "编辑成功"){
                    t.children().children().find(".name01").val(name01);
                    t.children().children().find(".zw01").val(zw01);
                    t.children().children().find(".mobel01").val(mobel01);
                    $("input").attr('disabled',"disabled");
                }
            },
            error:function (xml) {
                console.log(xml)
            }
        });


        $(this).removeClass("apply-details-edit-add").html("修改");
    })


});

