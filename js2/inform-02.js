var map=new Map();
$(document).ready(function () {
    getObjectList();
});
function getObjectList(){
    $.post(callurl+"/Notice/Notice/GetList",{type:1},function (res) {
        var infoList=$("#list");
        console.log(res);
        if (res.Success){
            var list=res.Infor;
            var urly = "";
            for (var index in list){

                if(list[index].Url){
                    urly = list[index].Url
                }

                var temp="<div class=\"list-container clearfix\">\n" +
                    "            <div class=\"list-container-fl fl\"></div>\n" +
                    "            <div class=\"list-container-fr fr\" data-id='"+list[index].ID+"' data-url='"+urly+"'>\n" +
                    "                <div class=\"list-container-fr-container\">\n" +
                    "                    <div class=\"list-container-fr-container-t1\">[title]</div>\n" +
                    "                    <div class=\"list-container-fr-container-t2\">[content]</div>\n" +
                    "                    <div class=\"list-container-fr-container-t3\"><img class=\"list-container-fr-container-t3-img\" src=\"img/inform/list-icon.png\" />[time]</div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "            <div class=\"list-container-ab\"></div>\n" +
                    "        </div>";
                var title=list[index].Title;
                var content=list[index].Abstract;
                console.log(content);
                var id=list[index].ID;
                var time01=list[index].ReleaseTime.split("-")[0] + "/" + list[index].ReleaseTime.split("-")[1] + "/" +list[index].ReleaseTime.split("-")[2];
                var time = time01.split(" ")[0];

                temp=temp.replace("[id]",id).replace("[title]",title).replace("[content]",content).replace("[time]",time);
                infoList.append(temp);
                map.set(id,list[index]);
            }
        }else{
            alert(res.Msg);
        }
    });
}
$(document).on("click",".list-container-fr",function () {
    var id = $(this).attr("data-id");
    var urly = $(this).attr("data-url");
    if(urly){
        window.location.href=urly;
    }else {
        var url="inform-details02.html?id="+id;
        window.location.href=encodeURI(url);
    }
})
// function goToContent(id) {
//     var url="inform-details02.html?id="+id;
//     window.location.href=encodeURI(url);
// }