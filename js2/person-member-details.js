// 确实验证

function uploading() {
    var year=$("#year").text();
    console.log(year);
    var sjname=$("#sjname").val();
    var sjmobel=$("#sjmobel").val();
    var sjaddress=$("#sjaddress").val();

    if(year==="请输入年份"){
        alert("请选择年份");
        return false
    }else {

    }

    if(sjname){

    }else {
        alert("请输入收件人姓名");
        return false
    }


    if(checkTEL(sjmobel)){

    }else {
        alert("请检查收件人电话");
        return false
    }



    if(sjaddress){

    }else {
        alert("请输入收件人地址");
        return false
    }


    // 上传材料
    var pic = $("#uppic")[0].files[0];
    var formData  = new FormData();
    formData.append("file",pic);
    fileImg(formData);

    if(!pic){
        pic =$("#imgFile").attr("src");
        alert("请上传材料证明");
        return false;
    }

    var json = {
        Years:year,
        Recipient:sjname,
        Phone:sjmobel,
        Address:sjaddress,
        ImgUrl:sessionStorage.getItem("file")
    };



    $.ajax({
        url:callurl +'/CompanyInfo/MembershipFee/Edit',
        type:'post',
        data: json,
        success: function (res) {
            console.log(res);
            if(res.Msg == "添加成功"){
                window.location.href='person.html'
            }

        },
        error:function (xml) {
            console.log(xml);

        }

    });














}