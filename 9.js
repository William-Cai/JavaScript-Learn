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

//完整版检测脚本，包括检测呈现的引擎、平台、Windows操作系统、移动设备和游戏系统。
var client = function () {

    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        //完整的版本号
        ver: null
    };

    //浏览器
    var browser = {
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        //具体的版本号
        ver: null
    };

    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        x11: false,

        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        //游戏系统
        wii: false,
        ps: false
    };

    //检测浏览器,以下一步步检测下去，按顺序检测
    var p = navigator.platform;

    var ua = navigator.userAgent;

    if (window.opera) { //opera
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);

    } else if (/AppleWebKit\/(\S+)/.test(ua)) { //检测WebKit
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);

        //确定是chrome还是safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
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
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }

    } else if (/MSIE ([^;]+)/.test(ua)) { //检测IE
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);

    }

    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p.indexOf("x11") == 0) || (p.indexOf("Linux") == 0);

    //检测Windows操作系统
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }

    //检测移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;


    //windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }

    }


    //检测ios版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp["$1"].replace("_", "."));
        } else {
            system.ios = 2;
        }
    }

    //检测Android版本
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp["$1"]);
    }

    //游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    //返回对象值
    return {engine: engine, browser: browser, system: system};

}();//End 立即执行