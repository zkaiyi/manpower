function getYear(Years) {
    var json = {

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

            $("#hfname").html();
            $("#hfphone").html();
            $("#hfaddress").html();
            $("#hfimg").attr("src");
        },
        error:function (xml) {
            console.log(xml);

        }

    });
}
getYear();