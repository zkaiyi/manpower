// 排序
function compare(num1, num2){

    var temp1 = parseInt(num1);
    var temp2 = parseInt(num2);

    if(temp1 < temp2) {
        return -1;
    } else if(temp1 == temp2){
        return 0;
    } else {
        return 1;
    }
}


function getall() {
    var json = {
        UserInfo:cookie.get("accessToken")
    };
    $.ajax({
        url:callurl +'/CompanyInfo/MembershipFee/GetList',
        type:'post',
        data: json,
        success: function (res) {
            console.log(res);
            var list = res.Infor;
            var array = [];

            if(list.length == 0){

                sessionStorage.setItem("checkshow","none");
                $(".member-check-fr-top").html("暂无缴费记录")

            }else {

                $(".member-check-fr-top-span03").html(sessionStorage.getItem("chechYears"));
                sessionStorage.removeItem("checkshow");

                for(var i in list){
                    array.push(list[i].Years)
                }


                console.log(array);
                array.sort(compare);
                console.log(array);
                for(var j =0 ; j<array.length ; j++ ){
                    var html01 = '<div class="year-down-list year-down-list01">'+array[j]+'年</div>';
                    $(".year-down").prepend(html01);

                }
                var chechYears = array[array.length-1];
                sessionStorage.setItem("chechYears",chechYears);



            }



        },
        error:function (xml) {
            console.log(xml);

        }

    });
}
getall();

if(sessionStorage.getItem("checkshow")){

}else {
    //初始化年份
    function getYear(Years) {
        var json = {
            UserInfo:cookie.get("accessToken")
        };
        if(Years){
            json.Years = Years
        }
        $.ajax({
            url:callurl +'/CompanyInfo/MembershipFee/GetList',
            type:'post',
            data: json,
            success: function (res) {
                console.log(res);
                var list02 = res.Infor;

                $("#hfname").html(list02[0].Recipient);
                $("#hfphone").html(list02[0].Phone);
                $("#hfaddress").html(list02[0].Address);
                $("#hfimg").attr("src",list02[0].ImgUrl);
                $(".container-zw-need-img").attr("src",list02[0].ImgUrl);

            },
            error:function (xml) {
                console.log(xml);

            }

        });
    }
    getYear(sessionStorage.getItem("chechYears"));

    $(document).on("click",".year-down-list",function () {
        var need_y = $(this).html();
        $(".member-check-fr-top-span03").html(need_y);

        $(this).parent().slideUp();
        $(this).parent().addClass("hide");

        var Yearupdata = need_y.split("年")[0];
        console.log(Yearupdata);
        getYear(Yearupdata);


    });
}

