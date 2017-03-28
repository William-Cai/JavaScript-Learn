/**
 * @Title 第十三章 事件对象
 * @Description
 * @Author Winnie.Cai
 * @CreteData 2017/3/22.
 */

/**
 * 兼容 添加事件好移除事件
 * 注意对事件绑定的type值有区分
 * handler 移除的事件必须跟添加的事件一样，否则移除无效
 */
//TODO 13.2.5 跨浏览器的事件处理程序
var EventUtil = {
    /**
     * 添加事件
     * @param element dom元素
     * @param type 事件类型
     * @param handler 事件处理函数
     */
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            /**
             * 第三个参数，true表示在捕获阶段调用事件处理程序。 false表示在冒泡阶段调用事件处理程序
             */
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { //IE8及更早，该方法添加的都到事件冒泡
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    /**
     * 兼容DOM的浏览器中，event变量只是简单的传入而已，但在IE中，event参数是未定义的（undefined），因此可以使用window.event
     * @param event
     * @returns {Event}
     */
    getEvent: function (event) {
        return event ? event : window.event;
    },
    /**
     * 返回事件的目标，检测event的target属性，如果不存在就反悔srcElement属性的值
     * @param event
     * @returns {EventTarget|string|*|Node|Object}
     */
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    /**
     * 取消事件的默认行为
     * @param event
     */
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false; //false：取消默认行为
        }
    },
    /**
     *
     * @param event
     */
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;  //true：阻止冒泡
        }
    },
    /**
     * 移除事件
     * @param element dom元素
     * @param type 事件类型
     * @param handler 事件处理函数，注意：必须与添加的一样才能移除掉
     */
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {//IE
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    /**
     * 相关元素获取
     * @param event
     * @returns {*}
     */
    getRelatedTarget: function (event) {
        //兼容IE，IE9支持以下所有属性
        if (event.relatedTarget) {// IE8及之前版本不支持该属性
            return event.relatedTarget;
        } else if (event.toElement) { //在mouseout事件触发时，IE的toElement属性保存了相关元素
            return event.toElement;
        } else if (event.fromElement) { //在mouseover事件触发时，IE的fromElement属性保存了相关元素
            return event.fromElement;
        } else {
            return null;
        }
    },
    /**
     * DOM的button属性：0表示主鼠标按钮，1表示中间的数遍按钮（鼠标滚轮按钮），2表示次鼠标按钮。
     * IE8及更早版本的button属性：0：表示没有按下按钮。1表示主鼠标按钮。2表示次鼠标按钮。3表示同时按下了主、次鼠标按钮。
     *      4表示按下了中间的鼠标按钮。5表示同时按下了主，中间的鼠标按钮。6表示按下了次、中间的鼠标按钮。7表示同时按下了三个鼠标按钮。
     * @param event
     * @returns {*}
     */
    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    /**
     * 向上：120，向下：-120。
     * 备注：FF添加滚动事件为EventUtil.addHandler(document, "DOMMouseScroll", fn);
     *      Opera浏览器中的wheelDelta的正负号是相反的。
     * @param event
     * @returns {*}
     */
    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta); //配合第九章的client
        } else { //FF中有个名为DOMMouseScroll的事件，属性的值是-3的倍数，所以让所有浏览器兼容的，就乘于40。
            return -event.detail * 40;
        }
    },
    /**
     * 只有在keypress中才会获取到
     * @param event
     * @returns {*}
     */
    getCharCode: function (event) {
        //按下keypress才包含值
        if (typeof event.charCode == "number") {
            return event.charCode; //IE9,Firefox,Chrome和Safari
        } else {
            return event.keyCode; //IE8及之前版本和Opera
        }
    }
};

/**
 * 13.3 事件对象
 */
//TODO 13.3.1 DOM中的事件对象
// 事件对象eventPhase，可以用来确定事件当前处于什么阶段
var btn = document.getElementById('myBtn');
btn.onclick = function (event) {
    alert(event.eventPhase); // 2
};

document.body.addEventListener('click', function (event) {
    alert(event.eventPhase); //第三个参数为true，得到1；第三个参数为false，得到3。
}, true);//true表示在捕获阶段调用事件处理程序。 false表示在冒泡阶段调用事件处理程序

document.body.onclick = function (event) {
    alert(event.eventPhase); //3
};

//TODO 13.3.2 IE中的事件对象
//第一种
var btn = document.getElementById('myBtn');
btn.onclick = function () {
    var event = window.event;
    alert(event.type); //click
};
//第二种
btn.attachEvent('onclick', function (event) {
    alert(event.type); //click
});

/**
 * 事件类型
 * */
//TODO 13.4.1 UI事件
//DOMActive,load,unload,abort,error,select,resize,scroll
var isSupported = document.implementation.hasFeature('HTMLEvents', '2.0'); //确定浏览器是否支持“DOM2级事件”
var isSupported = document.implementation.hasFeature('UIEvents', '3.0'); //确定浏览器是否支持“DOM3级事件”

//load
EventUtil.addHandler(window, 'load', function (event) {
    //该处理函数的event参数没有做兼容处理，需要再调用其他方法，getEvent
    alert("Loaded!");
});

//创建script元素，并确定脚本是否加载完成。
//IE9+，Firefox、Opera、和Safari3+ 及更高版本才支持
EventUtil.addHandler(window, 'load', function (event) {
    var script = document.createElement('script');
    EventUtil.addHandler(script, 'load', function (event) {
        alert('Loaded!');
    });
    script.src = "example.js";
    document.body.appendChild(script); //只有在 1、设置了<script>元素的src 和 2、并添加该元素到文档后，才会开始下载JavaScript文件。
});
//创建Link元素，却确定加载完成情况
EventUtil.addHandler(window, 'load', function (event) {
    var link = document.createElement('link');
    EventUtil.addHandler(link, 'load', function (event) {
        alert('Loaded!');
    });
    link.src = "example.js";
    document.getElementsByTagName('head')[0].appendChild(link); //只有在 1、设置了<link>元素的href 和 2、并添加该元素到文档后，才会开始下载样式文件。
});

//unload
//只要用户从一个页面切换到另外一个页面，就会发生unload事件。
//根据“DOM2级事件”，应该在<body>元素而非window对象上面触发。不过，所有浏览器都在window上实现，为了向后兼容。
EventUtil.addHandler(window, 'unload', function (event) {
    alert('Unloaded!');
});
//resize
//当浏览器窗口被调整到一个新的高度或者宽度时候触发。
EventUtil.addHandler(window, 'resize', function (event) {
    alert('Resized!');
});
//scroll
EventUtil.addHandler(window, 'scroll', function (event) {
    if (document.compatMode == "CSS1Compat") { //标准模式
        alert(document.documentElement.scrollTop);
    } else if (document.compatMode == "BackCompat") { //混合模式
        alert(document.body.scrollTop)
    } else {

    }
});

//TODO 13.4.2 焦点事件
//blur,DOMFocusIn,DOMFocusOut,focus,focusin,focusout
var isSupported = document.implementation.hasFeature('FocusEvent', '3.0');

//TODO 13.4.3 鼠标与滚轮事件
//click,dbclick,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup
var isSupported = document.implementation.hasFeature('MouseEvents', '2.0'); //除dbclick、mouseenter和mouseleave
var isSupported = document.implementation.hasFeature('MouseEvent', '3.0');

//客户区坐标位置
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, 'click', function (event) {
    event = EventUtil.getEvent(event);
    alert("Client coordinates:" + event.clientX + "," + event.clientY); //兼容所有浏览器。注意！：该值不包含页面滚动的距离，因此这个位置并不表示鼠标在页面上的位置。
});
//页面坐标位置
EventUtil.addHandler(div, 'click', function (event) {
    event = EventUtil.getEvent(event);
    alert("Page coordinates:" + event.pageX + "," + event.pageY);
}); //在页面没有滚动的情况下，pageX和pageY 的值 与 clientX和clientY的值 相等。

//页面坐标位置--兼容浏览器获取
EventUtil.addHandler(div, 'click', function (event) {
    event = EventUtil.getEvent(event);
    // 注意 IE8及更早版本不支持事件对象上的页面坐标
    var pageX = event.pageX,
        pageY = event.pageY;
    // 混杂模式document.body；标准模式document.documentElement
    if (pageX === undefined) {
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }

    if (pageY === undefined) {
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }

    alert("Page coordinates:" + pageX + "," + pageY);
});

//屏幕坐标位置
EventUtil.addHandler(div, 'click', function (event) {
    event = EventUtil.getEvent(event);
    alert("Screen coordinates:" + event.screenX + "," + event.screenY);
});

//修改键
//在window键盘是win键，Mac中是Cmd键
EventUtil.addHandler(div, 'click', function (event) {
    event = EventUtil.getEvent(event);
    var keys = [];

    if (event.shiftKey) {
        keys.push('shift');
    }
    if (event.ctrlKey) {
        keys.push('ctrl');
    }
    if (event.altKey) {
        keys.push('alt');
    }
    if (event.metaKey) { //IE8及之前版本不支持metaKey属性
        keys.push('metaK');
    }

    alert("Keys:" + keys.join(","));
});

//相关元素
EventUtil.addHandler(div, 'mouseout', function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var relatedTarget = EventUtil.getRelatedTarget(event);
    alert("Moused out of:" + target.tagName + " to " + relatedTarget.tagName);
});

//鼠标按钮
//DOM模型中下的button属性比IE模型下的button属性更为简单也更为实用
//参考EventUtil.getButton()
EventUtil.addHandler(btn, 'mousedown', function (event) {
    event = EventUtil.getEvent(event);
    alert(EventUtil.getButton(event));
});

//更多的事件信息
//event对象中还提供了detail
//IE有其他的altLeft,ctrlLeft,shiftLeft,offsetX,offsetY
EventUtil.addHandler(btn, 'mousedown', function (event) {
    event = EventUtil.getEvent(event);
    window.console.log(event.detail);//累加从1开始，每次点击加一次，每次点击的间隔要小
});

//鼠标滚轮事件
EventUtil.addHandler(document, 'mousewheel', function (event) {
    event = EventUtil.getEvent(event);
    var delta = EventUtil.getWheelDelta(event);
    window.console.log(delta);
});

//添加滚动事件
(function () {
    function handleMouseWheel(event) {
        event = EventUtil.getEvent(event);
        var delta = EventUtil.getWheelDelta(event);
        window.console.log(delta);
    }

    EventUtil.addHandler(document, 'mousewheel', handleMouseWheel);
    EventUtil.addHandler(document, 'DOMMouseScroll', handleMouseWheel); //FF才适用的
})();

//触摸设备
//没有鼠标
// 1.不支持dbclick（双击浏览器会放大，不可改变）
// 2.轻击可单击元素会触发mousemove事件，如果此操作会导致内容变化，将不再有其他事件发生。
//   如果屏幕没有发生变化，会依次发生mousedown，mouseup和click事件。
// 3.mousemove事件也会触发mouseover和mouseout事件
// 4.两个手指放在屏幕上且页面随手指移动而滚动时会触发mousewheel和scroll事件

//无障碍性问题


//TODO 13.4.4 键盘与文本事件
//3个键盘事件,keydown，keypress，keyup
//键码
//Firefox和Opera中，分号键（;）返回59，但是在IE和Safari返回的是186.
//
EventUtil.addHandler(textbox, 'keypress', function (event) {
    event = EventUtil.getEvent(event);
    textbox.value = EventUtil.getCharCode(event);
    window.console.log(String.fromCharCode(textbox.value));// 取得字符编码可以用该方法转换成实际的字符，输出大写
});

//只支持IE9+,Safari,Chrome
EventUtil.addHandler(textbox, 'textInput', function (event) {
    event = EventUtil.getEvent(event);
    alert(event.data);//按下的就是实际字符，也能区分有没有shift的，会区分大小写
});

//IE 支持inputMethod，表示该文本是通过什么方式输入到控件中的。

//设备中的键盘事件

//TODO 13.4.5 复合事件
//IE9+支持
var isSupported = document.implementation.hasFeature('CompositionEvent', '3.0');

//TODO 13.4.6 变动事件
//IE8及更早版本不支持，Opera 9+不支持DOMSubtereModified

//TODO 13.4.7
//contextmenu事件
//beforeunload事件
//DOMContentLoaded事件
//readystatechange事件
//pageShow和pageHide事件
//hashchange事件
var isSupported = ("onhashchange" in window) &&
    (document.documentMode === undefined || document.documentMode > 7);

//TODO 13.4.8 设备事件
//orientationchange事件
//MozOrientation
//deviceorientation
//devicemotion

//TODO 13.4.9 触摸与手势事件
//触摸事件
//

//TODO 13.6 模拟事件
//TODO 13.6.1 DOM中的事件模拟
var btn = document.querySelector("#myBtn");
//创建事件对象
var _ev = document.createEvent("MouseEvents");
//初始化事件对象
_ev.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//触发事件
btn.dispatchEvent(_ev);

//TODO 13.6.2 IE中的事件模拟
var event = document.createEventObject();
event.screenX = 100;
event.screenY = 0;
event.clientX = 0;
event.clientY = 0;
event.ctrlKey = false;
event.altKey = false;
event.shiftKey = false;
event.button = 0;
btn.fireEvent("onclick", event);
