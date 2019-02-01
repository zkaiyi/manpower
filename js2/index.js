$(document).ready(function () {
    getObjectList(1,7);
})
//亲 分页特效自己搞定哦
function getObjectList(page,rows) {
    $.post(callurl+"/ActivityInfo/List",{Page:page,Rows:rows},function (res) {
        console.log(res);
        if (res.Success){
            var listItem=$("#listItem");
            //listItem.empty();
            var list=res.Infor.rows;
            for (index in list){
                var temp='<div class="active-list-container" onclick="goToContentPage([id])">\n' +
                    '            <div class="list clearfix">\n' +
                    '                <div class="list-fl fl"><img class="list-fl-img"  onerror="this.src=\'img/index/active-01.png\'" src="[image]" /></div>\n' +
                    '                <div class="list-fr fr">\n' +
                    '                    <div class="list-fr-top clearfix">\n' +
                    '                        <div class="list-fr-top-fl fl">[title]</div>\n' +
                    '                        <div class="[statusClass]">[state]</div>\n' +
                    '                    </div>\n' +
                    '                    <div class="list-fr-bot">[content]</div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>';
                var title=list[index].Name;
                var content=list[index].ActivityContent;
                var statusClass='list-fr-top-fr';
                var status=list[index].Status;
                var image=list[index].CoverImg;
                var id=list[index].ID;
                if (list[index].Status==0){
                    status='进行中';
                    statusClass='list-fr-top-fr fr';
                    if (list[index].LastNum==0){
                        status='名额已满';
                        statusClass='list-fr-top-fr list-fr-top-fr-man fr';
                    }
                }else if (list[index].Status==1){
                    status='还未开始';
                    statusClass='list-fr-top-fr list-fr-top-fr-wks fr';
                }else{
                    status='已结束';
                    statusClass='list-fr-top-fr list-fr-top-fr-js fr';
                }

                temp=temp
                    .replace("[title]",title)
                    .replace("[state]",status)
                    .replace("[statusClass]",statusClass)
                    .replace("[image]",image)
                    .replace("[id]",id)
                    .replace('[content]',content);
                listItem.append(temp);
            }
        } else{
            alert(res.Msg);
        }
    })
}
function goToContentPage(id) {
    window.location.href='active.html?id='+id;
}