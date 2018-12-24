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




}