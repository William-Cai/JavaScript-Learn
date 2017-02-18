/**
 * 第七章 函数表达式
 * Created by FFCS-CAIWL on 2016/12/18.
 */

//函数声明的语法
/*function functionName() {

 }
 //只在Firefox,Saari,Chrome和Opera有效
 console.log(functionName.name);*/


//函数声明提升
//函数声明，一个重要的特征就是函数声明提升，
//意思是，在执行代码之前会先预读函数声明。
//意味着可以把函数声明放在调用它的语句后面。
/*sayHi();  //不报错，因为在代码执行之前会先读取函数声明
 function sayHi(){
 console.log('Hi');
 }*/

//函数表达式创建函数
//创建一个函数，并将它赋值给了变量，这种情况下创建的函数叫做匿名函数（anonymous function）
//匿名函数的name属性是空字符串
/*var functionName = function(){};

 sayHi(); //报错，这个时候函数还不存在
 var sayHi = function() {
 console.log('Hi');
 };*/

//不要这样做
/*var condition = true;
 if(condition){
 function sayHi(){
 console.log('Yes');
 }
 }else{
 function sayHi(){
 console.log('No');
 }
 }

 sayHi(); //执行了No。函数声明被提前了，不建议这么写*/

//可以使用函数表达式来创建。
/*var sayHi = null;
 var condition = !1;
 if(condition){
 sayHi = function(){
 console.log('Yes');
 }
 }else{
 sayHi = function(){
 console.log('No');
 }
 }

 sayHi();*/

//TODO 递归
/*function factorial(num){
 if(num <= 1){
 return 1;
 }else{
 return num * factorial( num-1);
 }
 }

 console.log(factorial(3)); // 6
 */
//虽然这个函数表面看起来没有什么问题，但下面的代码却可能导致它报错
/*
 var anotherFactorial = factorial;
 factorial = null;
 console.log(anotherFactorial(4)); //factorial is not a function
 */

//arguments.callee 是一个指向正在执行的函数的指针
//比使用函数名更保险
/*function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}

var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4)); //24 //不报错*/

//但是在严格模式下，不能通过脚本访问arguments.callee，访问这个属性会报错。
//可以使用命名函数表达式来达成相同的结果
/*
var factorial = (function f(num) {
    if (num < 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});

console.log(factorial(3)); //这种在严格模式或非严格模式下都可以使用。
*/

//TODO 闭包
/*function compare(value1, value2) {
    if(value1 < value2){
        return -1;
    }else if(value1 > value2){
        return 1;
    }else{
        return 0;
    }
}

console.log(compare(5, 10));*/

/*function creaeFunctions() {
    var result = [];
    for(var i=0;i< 10; i ++){
        result[i] = function () {
            return i;
        }
    }
    return result;
}

console.log(creaeFunctions()[1]()); //都是 10
*/

//创建另外一个匿名函数强制让闭包的行为符合预期
/*function creaeFunctions() {
    var result = [];
    for(var i=0;i< 10; i ++){
        result[i] = function (num) {
            return function () {
                return num;
            }
        }(i);
    }
    return result;
}

console.log(creaeFunctions()[1]());  //1
*/

//TODO 关于this对象
/*var name = 'this window';
var object = {
    name: 'my object',
    getNameFunc: function () {
        return function () {
            return this.name;
        }
    }
};

console.log(object.getNameFunc()());// this window
*/

/*
var name = 'this window';
var object = {
    name: 'my object',
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        }
    }
};
console.log(object.getNameFunc()()); //my object
*/

//TODO 内存泄漏

//匿名还输保存了一个对assignHandler()的活动对象的引用，因此就会导致无法减少element的引用数。
//只要匿名函数存在，element的引用数至少是1，因此它所占用的内存就永远不会被回收。
/*function assignHandler(){
    var element = document.getElementById('someElement');
    element.onclick = function () {
        console.log(element.id);
    }
}*/


//改进
/*function assignHandler() {
    var element = document.getElementById('someElement');
    var id = element.id;
    element.onclick = function () {
        console.log(id);
    }
    element = null;
}*/


//TODO 模仿块级作用域
/*
function output(count) {
    for(var i=0;i<count;i++){
        console.log(i);
    }
    console.log(i); //10
}

output(10);
*/

/*(function () {
    //这里是块级作用域
})();

var someFunction = function () {
  //这里是块级作用域
};*/

/*
function () {

}()  //出错*/


/*
function output(count) {
    (function () {
        for (var i = 0; i < count; i++) {
            console.log(i);
        }
    })();

    console.log(i); //出错 i is not defined
}

output(10)*/

//TODO 私有变量
//任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量
/*function MyObject() {

    //私有变量和函数
    var pv = 10;

    function pFunction() {
        return false;
    }

    //特权方法
    this.publicMethod = function () {
        pv++;
        return pFunction();
    }
}*/

//TODO  静态私有变量
(function () {

    //私有变量和私有函数
    var privateVariable = 10;

    function privateFunction() {
        return false;
    }

    //构造函数
    MyObject = function () {

    };

    // 公有/特权方法
    MyObject.prototype.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    }

    MyObject.prototype.add = function () {
        privateVariable++;
    }
    MyObject.prototype.getVar = function () {
        return privateVariable;
    }
})();

var my = new MyObject();
var my1 = new MyObject();

my.add();
console.log(my.getVar());
console.log(my1.getVar());

my1.add();
console.log(my.getVar());
console.log(my1.getVar());
//这个例子说明了，privateVariable属于所有实例的共享属性。
//也就是说
