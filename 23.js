/**
 * @Title: 第二十三章 离线应用与客户端存储
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/4/13
 */
var online = navigator.onLine;

//事件
EventUtil.addHandler(window, "online", function (event) {

});

EventUtil.addHandler(window, "offline", function (event) {

});

//应用缓存 Appcache
//<html manifest="/offline.manifest">
//offline.manifest中包含了描述文件，MIME类型必须是test/cache-manifest

applicationCache.update();

EventUtil.addHandler(applicationCache, "updateready", function () {
    applicationCache.swapCache();
});

//数据存储
//cookie
document.cookie = "key=winnie"; //不会覆盖原有的cookie，除非已经存在了该名称(key)

//需进行编码
document.cookie = encodeURIComponent("key") + "=" + encodeURIComponent("winnie");

//工具类
var CookieUtil = {
    get: function (name, subName) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(
                document.cookie.substring(cookieStart + cookieName.length,
                    cookieEnd));
        }

        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);

    }
};

//使用
//设置
CookieUtil.set("name", "winnie");
//读取
CookieUtil.get("name");
//删除
CookieUtil.unset("name");


//子cookie
//格式如下
//name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5
var SubCookieUtil = {
    get: function (name, subName) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            return subCookies[subName];
        } else {
            return null;
        }
    },
    getAll: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            parts,
            result = {};

        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length,
                cookieEnd);
            if (cookieValue.length > 0) {
                subCookies = cookieValue.split("&");

                for (var i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    },
    set: function (name, subName, value, expires, path, domain, secure) {
        var subCookies = this.getAll(name) || {};
        subCookies[subName] = value;
        this.setAll(name, subCookies, expires, path, domain, secure);
    },
    setAll: function (name, subCookies, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=",
            subCookieParts = [],
            subName;

        for (subName in subCookies) {
            if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
                subCookieParts.push(
                    encodeURIComponent(subName) + "="
                    + encodeURIComponent(subCookies[subName]));
            }
        }

        if (subCookieParts.length > 0) {
            cookieText += subCookieParts.join("&");

            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
            if (path) {
                cookieText += "; path=" + path;
            }
            if (domain) {
                cookieText += "; domain=" + domain;
            }
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString();
        }
        document.cookie = cookieText;
    },
    unset: function (name, subName, path, domain, secure) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            delete subCookies[subName];
            this.setAll(name, subCookies, null, path, domain, secure);
        }
    },
    unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure);
    }
};

//使用
//设置
SubCookieUtil.set("data", "name", "winnie");
SubCookieUtil.set("data", "age", "27");
//获取
SubCookieUtil.get("data", "name");
//全部设置
SubCookieUtil.setAll("data", {name: "winnie", age: "28"});
//移除
SubCookieUtil.usnet("data", "name");
SubCookieUtil.unsetAll("data");

//IE用户数据
//<div style="behavior:url(#default#userData)" id="dataStore"></div>
var dataStore = document.getElementById("dataStore");
dataStore.setAttribute("name", "winnie");
dataStore.save("Info");

//加载
var info = dataStore.load("Info");
var name = info.getAttribute("name");

//移除
dataStore.removeAttribute("name");
dataStore.save("Info");

//Web存储机制
//Storage，sessionStorage,globalStorage(FF中才有),localStorage
//设值，两种方式
sessionStorage.setItem("name", "winnie");
sessionStorage.name = "winnie";

//获取
var name = sessionStorage.getItem("name");
name = sessionStorage.name;

//迭代
for (var i = 0, len = sessionStorage.length; i < len; i++) {
    var key = sessionStorage.key(i); //获取指定位置上的名字
    var value = sessionStorage.getItem(key);
    console.log(key + "=" + value);
}
for (var key in sessionStorage) {
    var value = sessionStorage.getItem(key);
    console.log(key + "=" + value);
}

//删除
delete sessionStorage.name;
sessionStorage.removeItem("name");

//Firefox2 globalStorage

//localStorage，方法与sessionStorage一样

//兼容形式
function getLocalStorage() {
    if (typeof localStorage == "object") {
        return localStorage;
    } else if (typeof globalStorage == "object") {
        return globalStorage[location.host];
    } else {
        throw new Error("Local storage not available.");
    }
}

//事件
EventUtil.addHandler(document, "storage", function (event) {
    console.log("Storage changed for" + event.detail);
});



//IndexedDB
var request, database, transaction, store;
var indexedDB = window.indexedDB ||
    window.msIndexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB;
request = indexedDB.open("admin");

request.onerror = function (event) {
    console.log("打开数据库失败\n" + event.target.errorCode);
};
request.onsuccess = function (event) {
    database = event.target.result;
    console.log("success, version:" + database.version);
};

request.onupgradeneeded = function (event) {
    database = request.result;
    console.log("new version:" + database.version);
    store = database.createObjectStore("users", {keyPath: "username"});
};

var user = {
    username: "winnie",
    firstName: "cai",
    lastName: "weili",
    password: "test"
};

transaction = database.transaction("users", "readwrite");

var store = database.createObjectStore("users", {keyPath: "username"});

var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

