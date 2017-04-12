/**
 * @Title: 第二十二章 高级技巧
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/4/12
 */
//安全的类型检测
function isArray(value) {
    return Object.prototype.toString.call(value) == "[Object Array]";
}
function isFunction(value) {
    return Object.prototype.toString.call(value) == "[Object Function]";
}
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[Object RegExp]";
}

//作用域安全的构造函数
function Person(name, age, job) {
    if (this instanceof Person) {
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name, age, job);
    }
}

var person = Person("winnie", 12, "IT");

//原型链，继承
Man.prototype = new Person();

//惰性载入函数
function abc() {
    if (a != 0) {
        abc = function () {

        }
    } else {
        abc = function () {

        }
    }
}

//函数绑定
function bind(fn, context) {
    return function () {
        return fn.apply(fn, arguments); //arguments是内部函数的，不是bind()的
    }
}

//函数柯里化
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.log(1, args);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        console.log(2, finalArgs);
        return fn.apply(fn, finalArgs);
    }
}

//用柯里化来改造bind函数
function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(context, finalArgs);
    }

}

//防篡改对象
//不可扩展
var person = {name: "winnie"};
Object.preventExtensions(person);
person.age = 15;
console.log(person.age);//undefined

//密封对象
var person = {name: "winnie"};
Object.seal(person);
person.age = 15;
console.log(person.age); //undefined
delete person.name;
console.log(person.name);//winnie

//检测是否可以扩展
Object.isExtensible(person);
Object.isSealed(person); //注：因为密封了，也就是不可扩展

//冻结对象
Object.freeze(person);
person.age = 29;
console.log(person.age); //undefined

delete person.name;
console.log(person.name); //winnie

person.name = "caiwinnie";
console.log(person.name); //winnie

//检测冻结
Object.isFrozen(person);

//高级定时器
setTimeout(function (diff) {
    if (diff > 0) {
        //晚调用
    } else if (diff < 0) {
        //提早调用
    } else {
        //及时调用
    }
}, 250);

//重复定时器
var interval = 500;
setTimeout(function () {
    //处理中

    setTimeout(arguments.callee, interval);
}, interval);

//Yielding Processes
for (var i = 0, i = data.length; i < len; i++) {
    process(data[i]);
}

//改造后，若异步
setTimeout(function () {
    var item = data.shift();
    process(item);
    if (data.length > 0) {
        setTimeout(arguments.callee, 100);
    }
}, 100);

//数组分组模式，实质上换成了“待办事宜”
function chunk(array, process, context) {
    setTimeout(function () {
        var item = array.shift(); //注意，原数组会改变的，记得传入的array是克隆过的，如传入array.concat()
        process.call(context, item);

        if (array.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    }, 100)
}

//函数节流
var processor = {
    timeoutId: null,
    performProcessing: function () {
        //实际执行代码
    },
    process: function () {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(function () {
            this.performProcessing();
        }.bind(this), 100);
    }
};

processor.process();

//改造
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100);
}

//自定义事件