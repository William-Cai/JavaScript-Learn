/**
 * @Title: 第十八章 JavaScript与XML
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/4/5
 */
var xmldom = document.implementation.createDocument("", "root", null);

console.log(xmldom.documentElement.tagName);//root

var child = xmldom.createElement("child");
xmldom.documentElement.appendChild(child);

//检测 DOM2级XML
var hasXmlDom = document.implementation.hasFeature("XML", "2.0");

//将 XML 解析为DOM文档
var parser = new DOMParser();
var xmldom = parser.parseFromString("<root><child/></root>", "text/xml");

//创建XML文档的实例
function createDocument() {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
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

//解析过程出错
if (xmldom.parseError.length != 0) {
    alert("An error occurred:\nError Code:" + +xmldom.parseError.errorCode + "\n"
        + "Line: " + xmldom.parseError.line + "\n"
        + "Line Pos: " + xmldom.parseError.linepos + "\n"
        + "Reason: " + xmldom.parseError.reason
    );
}

//加载XML文件
xmldom.async = false; //默认true（异步）。false为同步

xmldom.loadXML("example.xml");

//加载完成，事件
xmldom.onreadystatechange = function () {
    if (xmldom.readyState == 4) { //DOM已经完成可以使用
        if (xmldom.parseError.length != 0) {
            //错误处理
        } else {
            //成功处理

        }
    }
};


//跨浏览器处理XML
function parseXML(xml) {
    var xmldom = null;
    if (typeof DOMParser != "undefined") {
        xml = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementByTagName("parseerror");
        if (errors.length) {
            throw new Error("XML parsing error:" + errors[0].textContext);
        }
    } else if (typeof ActiveXObject != "undefined") { //IE8及之前版本
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0) {
            throw new Error("XML parsing error:" + xmldom.parseError.reason);
        }
    } else {
        throw new Error("No XML parser available");
    }
    return xmldom;
}

var xmldom = null;
try {
    xmldom = parseXML("<root><child/></root>")
} catch (ex) {
    alert(ex.message);
}

//序列化
function serializeXml(xmldom) {
    if (typeof XMLSerializer != "undefined") {
        return (new XMLSerializer()).serializeToString(xmldom);
    } else if (typeof xmldom.xml != "undefined") { //IE将其内置在属性xml中
        return xmldom.xml;
    } else {
        throw new Error("Could not serialize XML DOM.");
    }
}

//XPath 的支持
var supportXPath = document.implementawtion.hasFeature("XPath", "3.0");

//XSLT