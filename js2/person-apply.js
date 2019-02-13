// 我的报名
var accessToken = {
    UserInfo:cookie.get("accessToken")
};

$.ajax({
    url:callurl + '/ActivityInfo/SignUp/GetSignUpList',
    type:'post',
    data:accessToken,
    success:function (res) {
        console.log(res);
        var list = res.Infor;
        console.log(list);
        for(var i in list){
            var html = '<div class="apply" data-applyId="'+list[i].ActivityID+'" data-Id="'+list[i].ID+'">\n' +
                '            <div class="apply-01"><span class="apply-01-span">【报名成功】</span><span class="apply-03-span">'+list[i].ActivityName+'</span></div>\n' +
                '            <div class="apply-02">&nbsp;&nbsp;报名时间：<span class="apply-02-span">'+list[i].AddTime+'</span></div>\n' +
                '        </div>'

            $(".apply-contaienr").append(html)

        }
    },
    error:function (xml) {
        console.log(xml);
        console.log("失败");
    }
});

$(document).on("click",".apply",function () {
    var ActivityID = $(this).attr("data-applyId");
    window.location.href='person-apply-content.html?ActivityID=' +ActivityID;
    var personId = $(this).attr("data-Id");

    sessionStorage.setItem("person-apply-content-qxId",personId)
});