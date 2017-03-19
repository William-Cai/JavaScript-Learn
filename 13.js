/**
 * @Title: 事件对象
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/2/20
 */
/**
 * 兼容 添加事件好移除事件
 * 注意对事件绑定的type值有区分
 * handler 移除的事件必须跟添加的事件一样，否则移除无效
 * @type {{addHandler: EventUtil.addHandler, remove: EventUtil.remove}}
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { //IE
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    remove: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {//IE
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }
};