/**
 * @Title: 第十四章 表单
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/3/28
 */
var EventUtil = {
    /**
     * 获得剪切板
     * @param event
     * @returns {string}
     */
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    /**
     * 设置剪切板内容
     * @param event
     * @param value
     * @returns {boolean}
     */
    setClipboardText: function (event, value) {
        if (event.clipboardData) { //非IE，处理期间才有
            return event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) { //IE
            return window.clipboardData.setData("text", value);
        }
    }
};

var firstForm = document.forms[0]; //通过索引值
var myForm = document.forms["form2"]; //通过name值

//在JavaScript中，调用submit()可以提交表单，但是无法触发表单的submit事件，因此要在调用之前验证表单
//方式一：提交表单
EventUtil.addHandler(form, 'submit', function (event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
});
//方式二：提交表单
myForm.submit(); ///----该方法不会触发上面的绑定函数

//方式一重置表单
EventUtil.addHandler(form, 'reset', function (event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
});
//方式二：重置表单
myForm.reset(); //-----该方法会触发上面的绑定事件