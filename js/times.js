/**
 * Created by admin on 2017/5/28.
 */
onmessage = function (event) {
    // 将数据提取出来。
    var data = JSON.parse(event.data);

    var ks = data.ks;
    var m = data.m;
    var f = data.f;
    var s = data.s;
    var time;
    if(event.data=='false'){
        clearInterval(time)
    }
    time=setInterval(function () {
        if(ks==1){//停止或开始
            // document.getElementById("m").value=m;
            if(m>0){
                m--;
            }else{
                if(f>0){
                    f--;
                    // document.getElementById("f").value=f;
                    m=59;
                }else{
                    if(s>0){
                        s--;
                        // document.getElementById("s").value=s;
                        f=59;
                    }else{
                        clearInterval(time)
                        postMessage('false');
                        return;
                    }
                }
            }
        }//停止或开始
        var data={
            s:s,
            f:f,
            m:m
        }
        postMessage(JSON.stringify(data));
    },1000)
    // 发送消息，将会触发前台JavaScript脚本中
    // Worker对象的onmessage方法
}
