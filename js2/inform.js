var map=new Map();
$(document).ready(function () {
    getObjectList();
})
function getObjectList(){
    $.post(callurl+"/Notice/Notice/GetList",function (res) {
        var infoList=$("#list");
        console.log(res);
        if (res.Success){
            var list=res.Infor;
            for (var index in list){
                var temp="<div class=\"list-container clearfix\">\n" +
                    "            <div class=\"list-container-fl fl\"></div>\n" +
                    "            <div class=\"list-container-fr fr\" onclick='goToContent([id])'>\n" +
                    "                <div class=\"list-container-fr-container\">\n" +
                    "                    <div class=\"list-container-fr-container-t1\">[title]</div>\n" +
                    "                    <div class=\"list-container-fr-container-t2\">[content]</div>\n" +
                    "                    <div class=\"list-container-fr-container-t3\"><img class=\"list-container-fr-container-t3-img\" src=\"img/inform/list-icon.png\" />[time]</div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "            <div class=\"list-container-ab\"></div>\n" +
                    "        </div>";
                var title=list[index].Title;
                var content=list[index].NoticeContent;
                var id=list[index].ID;
                var time=list[index].ReleaseTime;
                var releaseTime=format(new Date(time),"yyyy/MM/dd");
                temp=temp.replace("[id]",id).replace("[title]",title).replace("[content]",content).replace("[time]",releaseTime);
                infoList.append(temp);
                map.set(id,list[index]);
            }
        }else{
            alert(res.Msg);
        }
    });
}
function goToContent(id) {
    var item = map.get(id);
    var title=item.Title;
    var source=item.Source;
    var content=Base64.encode(item.NoticeContent);
    var time=item.ReleaseTime;
    var url="inform-details.html?title="+title+"&content="+content+"&time="+time+"&source="+source;
    window.location.href=encodeURI(url);
}