function login() {
    var name = $("#name").val();
    var password = $("#password").val();

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

    var json = {
        Account:name,
        Password:password
    };

    $.ajax({
        url:callurl + "/CompanyInfo/Login",
        type:"post",
        data:json,
        success:function (res) {

            console.log(res);
            console.log(res.Infor);
            cookie.set("accessToken", res.Infor);
            if(res.Msg == "登录成功"){
                window.location.href = 'index.html'
            }else {
                alert(res.Msg)
            }
        },
        error:function (xml) {
            console.log(xml);
        }
    })

    
}