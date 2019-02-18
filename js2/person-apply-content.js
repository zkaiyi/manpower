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


