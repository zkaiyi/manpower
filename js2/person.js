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

// 清除所有的cookie
function deleteCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
    if(cookies.length > 0)
    {
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            var domain = location.host.substr(location.host.indexOf('.'));
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
        }
    }
}




// 退出登录
$(document).on("click",".bth",function () {
    sessionStorage.clear();
    deleteCookie();
    alert("退出登录成功");
    window.location.href="login.html";
});