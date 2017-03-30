/**
 * @Title: 第十六章 HTML5 脚本编程
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/3/30
 */
//TODO 16.1 跨文档消息传递(XDM)
var iframeWindow = document.getElementById("myframe").contentWindow;
iframeWindow.postMessage("A secret", "http://www.wrox.com");

EventUtil.addHandler(window, 'message', function (event) {
    if(event.origin == "http://www.wrox.com"){
        //处理接收到的数据
        //processMessage(event.data);

        //可选：向来源窗口发送回执
        event.source.postMessage("Received!", "http://p2p.wrox.com"); //event.source 大多情况下是windo对象的【代理】，但不是window对象。
    }
});

//原生拖放
//拖放：dragstart，drag，dragend
//拖动到有效的放置目标：dragenter，dragover，dragleave或drop

//媒体元素
//属性


//历史状态管理
