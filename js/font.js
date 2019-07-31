// “()()”表示自执行函数
(function (doc, win) {
    var docEl = doc.documentElement,
        // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100*(clientWidth / 750) + 'px';
        };

    recalc();
    //判断是否支持监听事件 ，不支持则停止
    if (!doc.addEventListener) return;
    //注册翻转事件
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);



function timestampToTime(times) {
    var date = new Date(times );
    Y = date.getFullYear()+'-';
    M = (date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate() <10 ? '0'+(date.getDate()) : date.getDate()) ;
    hh = (date.getHours()<10 ? '0'+(date.getHours()) : date.getHours())+':';
    mm = (date.getMinutes()<10 ? '0'+(date.getMinutes()) : date.getMinutes())+':';
    ss = (date.getSeconds()<10 ? '0'+(date.getSeconds()) : date.getSeconds());
    return Y + M + D + hh + mm + ss;
}



