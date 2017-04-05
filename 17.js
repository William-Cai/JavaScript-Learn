/**
 * @Title: 第十七章 错误处理
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/4/5
 */
//浏览器调试

//try-catch 语句
try {

} catch (error) {
    if (error instanceof TypeError) {
        //处理
    } else if (error instanceof ReferenceError) {
        //处理
    }
    alert(error.message);
} finally {

}

//错误类型
// Error,基本类型，其他类型都集成该类型
// EvalError,eval()使用不当的时候抛出
// RangeError,数值超出范围
// ReferenceError,找不到对象
// SyntaxError,把语法错误的JavaScript字符串传入eval()
// TypeError,变量中保存着意外的类型时候，或者在访问不存在的方式时
// URIError在使用encodeURI()和decodeURI()的是，URI的格式不正确

//抛出异常 throw
throw 123456;//自定义错误类型
throw {};
throw "";
throw true;

throw new Error("Something bad happened");// 内置错误类型

//创建自定义错误类型
function CustomError(message) {
    this.name = "CustomError";
    this.message = message;
}

CustomError.prototype = new Error();//利用原生链

throw new CustomError("My custom error message");//使用自定义创建的错误

//error 事件
window.onerror = function (message, url, line) {
    alert(message);
    return false;//该返回可以阻止浏览器报告错误的【默认行为】。
};

//image也支持error事件
var image = new Image();
EventUtil.addHandler(image, "error", function (event) {
    alert("image not loaded");
});
image.src = "";//指定不存在的图片

//通信错误 使用encodeURIComponent()对数据进行编码


