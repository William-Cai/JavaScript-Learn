/**
 * @Title: 第二十一章 Ajax与Comet
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/4/11
 */

//XHR
//适用 IE7 之前的版本
function createXHR() {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
            i, len;
        for (i = 0, len = versions.length; i < len; i++) {
            try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
            } catch (ex) {
                //跳过
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

//IE7 及更高版本
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    }
    else if (typeof ActiveXObject != "undefined"){
     if(typeof arguments.callee.activeXString != "string") {
         var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
             i, len;
         for (i = 0, len = versions.length; i < len; i++) {
             try {
                 new ActiveXObject(versions[i]);
                 arguments.callee.activeXString = versions[i];
                 break;
             } catch (ex) {
                 //跳过
             }
         }
         return new ActiveXObject(arguments.callee.activeXString);
     }
    } else {
        throw new Error("No XHR object available.");
    }
}

var xhr = createXHR();

xhr.open("get", "url", false); //同步
//头部信息：Accept,Accept-Charset,Accept-Encoding,Accept-Language,Connection,Cookie,Host,Referer,User-Agent
xhr.setRequestHeader("key", "value"); //设置请求头部的信息， 可以自定义，也可以是内置的
xhr.send(null); //传递的数据data


//=================以下要保持写在open()方法调用之前============================
//状态变化事件
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.readyState >= 200 && xhr.readyState < 300) || xhr.readyState == 304) {
            alert(xhr.responseText);
        } else {
            alert("Request wa unsuccessful: " + xhr.status);
        }
    }
};

//终止请求
xhr.abort();

//get请求需要对后缀的参数进行编码
function addURLParam(url, key, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
    return url;
}

//跨浏览器的CORS
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        vxhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

//其他跨域技术
//图像PING
var img = new Image();
img.onload = img.onerror = function () {
    alert("DONE!")
};

img.src = "";

//JSONP(JSON with padding)
callback({"name": "Winnie"});

//例子：http://abc.com/json/?callback=handleResponse
function handleResponse(response) {
    alert(response);
}

var script = document.createElement("script");
script.src = "http://abc.com/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);

//Comet
function createStreamingClient(url, progress, finished) {
    var xhr = new XMLHttpRequest(),
        received = 0;
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {
            //
            result = xhr.responseText.substring(received);
            received += result.length;

            progress(result);
        } else if (xhr.readyState == 4) {
            finished(xhr.responseText);
        }
    };
    xhr.send(null);
    return xhr;
}

//服务器发送事件 SSE(Server-Sent Events)
var source = new EventSource("my.php");

source.onmessage = function (event) {
    var data = event.data;
    //处理数据

};

//强制立即断开
source.close();

//Web Socket
var socket = new WebSocket("ws://www.example.com/server.php");

//关闭
socket.close();

//发送
socket.send("hello world!");
socket.send(JSON.stringify({})); //JSON串

socket.onmessage = function (event) {
    var data = event.data;
    //处理数据

};

socket.onopen = function () {

};
socket.onerror = function () {

};
socket.onclose = function (event) {
    console.log("Was clean?" + event.wasClean + " Code:" + event.code + " Reason=" + event.reason);
};
