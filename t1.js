/**
 * Created by CAIWL on 2016/8/25.
 */

var say = function () {
    var num = 0;
    var s = function () {
        num++;
        return num;
    }
    return s;
}

//var says = say();

//console.log(says());

function abc(key) {
    /*switch (true){
     case key>10&&key<=20:
     console.log(1)
     break;
     case key>20:
     console.log(2)
     break;
     }*/
    /* if(key>10&& key <20){
     console.log(1)
     }else if(key >20) {
     console.log(2)
     }else{
     console.log(3)
     }*/
    var a = 'aaa', b = a;
    b = '3333';
    var obj = new Object();
    var obj2 = obj;
    obj2.name = 'name';
    console.log(obj.name)
    console.log(a)
    console.log(b)
}

//abc(11);

/*(function () {
 var a = b = 5;
 })();
 console.log('b:', b);*/

/*var fullName = 'John Doe';
 var obj = {
 fullName: 'Colin Ihrig',
 prop: {
 fullName: 'Aurelio De Rosa',
 getFullName: function () {
 return this.fullName;
 }
 }
 };

 console.log('========================');
 console.log(obj.prop.getFullName());
 var test = obj.prop.getFullName;
 console.log(test())
 console.log(test.call(obj));*/

/*
 function setName(obj){
 obj.name = 'winnie';
 obj = new Object();
 obj.name = 'ddfdf';
 }
 var person = new Object();
 setName(person);
 console.log(person.name);*/

/*function buildUrl(){
 var gs = "?debug=true";
 with(location){
 var url = href +gs;
 }

 return url;
 }

 console.log(buildUrl())*/

/*
 var a = "";
 console.log(a.constructor == String)*/
/*
 function itemTest() {
 var item = new Array("one", "two","three");
 var itemRef = item;
 item.push("four")
 console.log(item.length === itemRef.length)

 var a = "jjjjjjjjjjj";
 var aRef = a;
 a+="ddddd";
 console.log(a)
 console.log(aRef)

 }

 itemTest();*/

/*
 var f = function() {
 return 23;
 }

 var foo = "abc";
 if(true){
 var foo = "test";
 }

 alert(foo);

 function ftest() {
 var foo = "old ddd"
 }

 ftest()

 alert(foo == "test")*/
/*
 function add(num){
 return function (toAdd) {
 return num+toAdd
 }
 }

 var test = add(5)(4);

 alert(test)*/
//console.log(test);

/*
 function Person(students, teacher){
 var person = this;
 function disp(){
 alert(this.names = students.join('-'))
 }
 this.students = students;
 this.teacher = teacher;
 disp()
 }

 var a = new Person(['cai','winnie'],['weili']);

 console.log(a.names);*/

/*function User(name, age) {
 var year = new Date().getFullYear() - age;

 this.getYearBorn = function () {
 return year;
 }
 }

 var user = new User('winnie', 26);

 alert(user.getYearBorn())*/

/*function User(properties) {
 console.dir(properties)
 for(var i in properties){
 (function (which) {
 var p= i
 which['set'+ p] = function (val) {
 properties[p] = val;
 }
 which['get'+p] = function () {
 return properties[p]
 }
 })(this)
 }
 }
 var params = {
 name:"winnie",
 age:"27"
 }
 var user = new User(params)

 user.setage(222)
 console.log(user.getage());
 console.log(params.age);

 params.name="caiwinnie"
 console.log(user.getname());*/

/*
 function f(num) {
 if (num <= 1)
 return 1;
 else
 return num * f(num - 1);
 }

 console.log(f(5));

 function f2(num) {
 if (num <= 1) {
 return 1;
 } else {
 return num * arguments.callee(num - 1)
 }
 }

 console.log(f2(5));*/
/*

 function outer() {
 inner();
 }

 function inner() {
 console.log(inner.caller);
 }

 outer();*/


/*
 function htmlEscape(text) {
 return text.replace(/[<>"&]/g, function (match, pos, originalText) {
 switch (match){
 case "<":
 return "&lt;";
 case ">":
 return "&gt;";
 case "&":
 return "&amp;";
 case "\"":
 return "&quot;";
 }
 });
 }

 console.log(htmlEscape("<p class=\"greeting\">&Hello world!</p>"));*/


/*
 var stringValue = "yellow";

 console.log(stringValue.localeCompare('brick'));
 console.log(stringValue.localeCompare('yellow'));
 console.log(stringValue.localeCompare('zoo'));
 */

//console.log(String.fromCharCode(104, 101, 108, 108, 111));

/*
 var uri = "http://www.baidu.com/idea value.html#start";
 console.log(encodeURI(uri));
 console.log(encodeURIComponent(uri));*/

/*eval("console.log('hi')");*/

/*
 var max = Math.max.apply(Math, [3, 52, 23, 64])
 console.log(max);

 console.log(Math.floor(Math.random() * 100 + 1));*/
/*
 var person ={};
 Object.defineProperty(person, "name", {
 configurable: false,
 value:"winnie"
 });
 console.log(person.name);
 person.name= "caiweili";
 console.log(person.name);*/

/*var book = {
    _year: 2004,
    edition: 1
}

Object.defineProperty(book, 'year', {
    get: function () {
        return this._year;
    },
    set: function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

console.log(book);
book.year = 2010;
console.log(book);*/

/*var person = {
    _year: 2004,
    year: 0,
    edition:1
};
Object.defineProperties(person, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function () {
            return this._year;
        },
        set: function (newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004
            }
        }
    }
});

console.log(person);//{ _year: 2004, year: [Getter/Setter], edition: 1 }
person.year = 2010;
console.log(person);//{ _year: 2010, year: [Getter/Setter], edition: 7 }

var descript = Object.getOwnPropertyDescriptor(person, '_year');
var descript1 = Object.getOwnPropertyDescriptor(person, 'year');

console.log(descript.value);//2010
console.log(descript.configurable); //true
console.log(descript.enumerable);//true
console.log(descript1.value);//undefined
console.log(descript1.configurable);//true
console.log(descript1.enumerable);//true
console.log(typeof descript1.get);//function*/


/*function Person(){}
Person.prototype.name = "Nicholas";

var person1 = new Person();
var person2 = new Person();
// console.log(person1.hasOwnProperty('name')); //false
// console.log('name' in person1); // true

person1.name = "winnie";
// console.log(person1.name); // winnie
// console.log(person1.hasOwnProperty('name')); //true
// console.log('name' in person1); // true

// console.log(person2.name);  // Nicholas
// console.log(person2.hasOwnProperty('name')); //false
// console.log('name' in person2); // true

delete person1.name;
console.log(person1.name); // Nicholas
console.log(person1.hasOwnProperty('name')); //false
console.log('name' in person1); // true
*/




/* function Person() {

 }

 Person.prototype.name = 'winnie';
 Person.prototype.age = 26;
 Person.prototype.job = 'it';*/
/*
 var keys = Object.keys(Person.prototype);
 console.log(keys);[ 'name', 'age', 'job' ]

 var p1 = new Person();
 p1.name="caiwili";
 p1.age = 20;

 var pkeys = Object.keys(p1);
 console.log(pkeys); // ['name', 'age']
 */

// var keys = Object.getOwnPropertyNames(Person.prototype);
// console.log(keys); //[ 'constructor', 'name', 'age', 'job' ]


/*
function Person(){};

Person.prototype ={
    constructor: Person,
    name:"winnie",
    age: 18,
    job:"IT",
    sayName: function () {
        console.log(this.name);
    }
}

var friend = new Person();

console.log(friend instanceof Object); //true
console.log(friend instanceof Person); //true
console.log(friend.constructor == Person); //false
console.log(friend.constructor == Object); //true
*/

/*function Person(){};

Person.prototype ={
    constructor: Person,
    name:"winnie",
    age: 18,
    job:"IT",
    friends:['ssss','ddddd'],
    sayName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push('dfddfd');
console.log(person1.friends);
console.log(person2.friends);
console.log(person1.friends === person2.friends);
*/

/*
function Person(name, age, job) { //构造函数
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends= ['Vibo', 'H.Cong']
}

Person.prototype = { //原型构造
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    }
}


var person1 = new Person('winnie', 18, 'IT');
var person2 = new Person('winnie2', 182, 'IT2');

person1.friends.push('Van');
console.log(person1.friends); //[ 'Vibo', 'H.Cong', 'Van' ]
console.log(person2.friends); //[ 'Vibo', 'H.Cong' ]
console.log(person1.friends === person2.friends);//false
console.log(person1.sayName === person2.sayName);//true
*/
/*
function Person(name, age, job){ //寄生模式
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
*/

/*
function Person(name) { //稳妥构造函数模式
    var o = new Object();
    o.sayName = function () {
        console.log(name);
    }
    return o;
}
*/

/*function SuperType(){
 this.property = true;
 }

 SuperType.prototype.getSuperValue = function () {
 return this.property;
 }

 function SubType() {
 this.subproperty = false;
 }

 SubType.prototype = new SuperType();

 SubType.prototype.getSubValue = function () {
 return this.subproperty;
 }

 var instance = new SubType();
 console.log(instance.getSuperValue()); // true
 console.log("==========================");
 console.log(instance instanceof Object); //true
 console.log(instance instanceof SuperType); //true
 console.log(instance instanceof SubType); //true
 console.log("==========================");
 console.log(Object.prototype.isPrototypeOf(instance)); //true
 console.log(SuperType.prototype.isPrototypeOf(instance)); //true
 console.log(SubType.prototype.isPrototypeOf(instance)); //true


 console.log("=========================");
 SubType.prototype.getSuperValue = function () {
 return false;
 }
 console.log(instance.getSuperValue()); // false*/

/*
 function SuperType() {
 this.colors = ['red', 'blue', 'green']
 }

 function SubType(){
 // 借用构造函数
 //SuperType.call(this); //有无这段话影响很大
 //SuperType.apply(this); //有无这段话影响很大
 }

 SubType.prototype = new SuperType();


 var instance1 = new SubType(); //够着函数还是指向了SuperType

 instance1.colors.push('black');
 console.log(instance1.colors);//[ 'red', 'blue', 'green', 'black' ]

 var instance2 = new SubType();
 console.log(instance2.colors);//[ 'red', 'blue', 'green', 'black' ]
 */

//组合继承
/*function SuperType(name) {
 this.name = name;
 this.colors= ['red','blue','green'];
 }

 SuperType.prototype.sayName =function () {
 console.log(this.name);
 }

 function SubType(name,age) {
 SuperType.call(this, name);
 this.age = age;
 }

 SubType.prototype = new SuperType();

 SubType.prototype.sayAge = function () {
 console.log(this.age);
 }

 var instance1 = new SubType('winnie', 27);
 instance1.colors.push('black');
 console.log(instance1.colors);//[ 'red', 'blue', 'green', 'black' ]
 instance1.sayName();//winnie
 instance1.sayAge();//27

 var instance2 = new SubType('dfdf', 3333);
 console.log(instance2.colors);//[ 'red', 'blue', 'green' ]
 instance2.sayName();//dfdf
 instance2.sayAge();//3333*/

//原型式继承
/*
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

 var person = {
 name: "winnie",
 friends: ['shelby', 'court', 'van']
 }

 var anotherPerson = object(person);
 anotherPerson.name = "greg";
 anotherPerson.friends.push('rob');

 console.log(anotherPerson);

 var yetAnotherPerson = object(person);
 yetAnotherPerson.name = 'Linda';
 yetAnotherPerson.friends.push('dfd');

 console.log(yetAnotherPerson);

 console.log(person);*/

//构造函数模式
/*
 function SuperType(name) {
 this.name = name;
 }

 function SubType() {
 SuperType.call(this, "Nicholas"); //SubType的复用性就没有了

 this.age = 29;
 }

 var instance = new SubType();
 console.log(instance.name);
 console.log(instance.age);
 */

//组合继承
/*function SuperType(name) {
 this.name = name;
 this.colors= ['red', 'blue', 'green'];
 }

 SuperType.prototype.sayName = function () {
 console.log(this.name);
 };

 function SubType(name, age) {
 //继承属性
 SuperType.call(this, name);
 this.age = age;
 }

 SubType.prototype = SuperType.prototype;

 SubType.prototype.sayAge = function () {
 console.log(this.age);
 };

 var instance1 = new SubType("Winnie", 29);
 instance1.colors.push('black');
 console.log(instance1.colors);
 instance1.sayName();
 instance1.sayAge();

 var instance2 = new SubType('Winnie2', 27);
 console.log(instance2.colors);
 instance2.sayName();
 instance2.sayAge();*/

//原型式继承
/*function object(o){
 function F(){};
 F.prototype = o;
 return new F();
 }

 var person = {
 name: 'Winnie',//基本类型值属性
 friends: ['Shelby', 'Court', 'Van'] //引用类型值属性？共享了
 };

 var anotherPerson = object(person);
 anotherPerson.name = 'Greg';
 anotherPerson.friends.push('Rob');
 console.log(anotherPerson.friends);//共享

 var yetAnotherPerson = object(person);
 yetAnotherPerson.name = 'Linda';
 yetAnotherPerson.friends.push('Barbie');
 console.log(yetAnotherPerson.friends);

 console.log(person.friends);*/

//寄生式继承
/*
 function object(o){
 function F(){}
 F.prototype = o;
 return new F();
 }

 function createAnother(original) {
 var clone = object(original);
 clone.sayHi = function () {
 console.log('Hi');
 };
 return clone;
 }

 var person = {
 name: 'Winnie',
 friends: ['Shelby', 'Court', 'Van']
 };

 var anotherPerson = createAnother(person);
 anotherPerson.sayHi();

 function SuperType(name){

 }*/
