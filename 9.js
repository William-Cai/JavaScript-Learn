/**
 * @Title: 客户端检测
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/2/20
 */
//TODO 能力检测
/*if(object.propertyInQuestions){
    //使用object.propertyInQuestions
}*/


//TODO 更可靠的能力检测

//不要这样做！这不是能力检测----只是检测了是否存在响应的方法
function isSortable(object) {
    return !!object.sort;
}

//检测是否拥有函数
function isSortable(object) {
    return typeof 'function' == object.sort; //也有可能返回object
}

//关于typeof行为不标准
//在IE中会导致错误
var xhr = new ActiveXObject('Microsoft.XMLHttp');
if(xhr.open){
    //执行操作
}

//浏览器环境下测试任何对象得到某个头型是否存在，要使用下面这个函数。
function isHostMethod(object, property) {
    var t = typeof object[property];
    return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
}

//TODO 用户代理字符串
var client = function () {
    //内核
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        //具体版本号
        ver: null

    };

    //浏览器
    var browser = {
        ie:0,
        firefox:0,
        safari:0,
        konq:0,
        opera:0,
        chrome:0,

        //具体版本
        ver: null
    };

    //平台
    var system = {
        win: false,
        mac: false,
        x11: false
    };

    return {engine: engine, browser: browser, system: system};
}();

//检测浏览器,以下一步步检测下去，按顺序检测

var engine = client.engine;
var browser = client.browser;
var system = client.system;
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = p.indexOf("x11") == 0;
var ua = navigator.userAgent;

if (window.opera) { //opera
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);

} else if (/AppleWebKit\/(\S+)/.test(ua)) { //检测WebKit
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);

    //确定是chrome还是safari
    if(/Chrome\/(\S+)/.test(ua)){
        browser.ver = RegExp["$1"];
        browser.chrome = parseFloat(browser.ver);
    }else if(/Version\/(\S+)/.test(ua)){
        browser.ver = RegExp["$1"];
        browser.safari = parseFloat(browser.ver);
    } else {
        // 近似地确定版本号
        var safariVersion = 1;
        if (engine.webkit < 100) {
            safariVersion = 1;
        } else if (engine.webkit < 312) {
            safariVersion = 1.2;
        } else if (engine.webkit < 412) {
            safariVersion = 1.3;
        } else {
            safariVersion = 2;
        }

        browser.safari = browser.ver = safariVersion;
    }

} else if (/KHTML\/(S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) { //检测KHTML
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.konq = parseFloat(engine.ver);

} else if (/rt:([^\)]+)\) Gecko\/\d{8}/.test(ua)) { //检测Gecko
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    //确定是不是firefox
    if(/Firefox\/(\S+)/.test(ua)){
        browser.ver = RegExp["$1"];
        browser.firefox = parseFloat(browser.ver);
    }

} else if (/MSIE ([^;]+)/.test(ua)) { //检测IE
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver);

}