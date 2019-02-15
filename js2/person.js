var accessToken = {
    UserInfo:cookie.get("accessToken")
};
$.ajax({
    url:callurl + '/CompanyInfo/Info',
    type:'post',
    data:accessToken,
    success:function (res) {
        console.log(res);
        $(".banner-name").html(res.Infor.Name);
        $(".banner-ip-01").html(res.Infor.PhoneNumber);

        // /person-message.html页面信息
        $("#pmCompany").html(res.Infor.Name);
        $("#pmName").html(res.Infor.Contact);
        $("#pmPhone").html(res.Infor.PhoneNumber);









    },
    error:function (xml) {
        console.log(xml);
        console.log("失败");
    }
});

// 退出登录
$(document).on("click",".bth",function () {
    sessionStorage.clear();
    alert("退出登录成功");
    window.location.href="login.html";
    cookie.deleteAll();
});