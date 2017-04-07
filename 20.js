/**
 * @Title: 第二十章 JSON
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/4/7
 */
//简单对象
// 5
// ""
// true
// null

//对象 属性一定要用引号
/*{
 "name":"winnie",
 "age":"28"
 }*/

//数组
//[25, "3232", true]

//JSON对象
var book = {
    "title": "Professional JavaScript",
    "authors": ["winnie"],
    edition: 3,
    year: 2017,
    //额外设置
    "eg": {
        "authors": ["caiweili"]
    }
};
//全局对象，浏览器支持IE8+,FF3.5+,Safari4+,Chrome和Opera10.5+
var jsonText = JSON.stringify(book); //{"title":"Professional JavaScript","authors":["winnie"],"edition":3,"year":2017,"eg":{"authors":["caiweili"]}}
console.log(jsonText);

//过滤结果
jsonText = JSON.stringify(book, ["title", "authors"]);//{"title":"Professional JavaScript","authors":["winnie"]}
console.log(jsonText);

jsonText = JSON.stringify(book, function (key, value) {
    switch (key) {
        case "authors":
            return value.join(",");
        case "year":
            return 2222;
        case "edition":
            return undefined; //如果为undefined，输出的结果会删除这个属性，不会出现在结果中
        default:
            return value;
    }
});
console.log(jsonText); //{"title":"Professional JavaScript","authors":" winnie","year":2222,"eg":{"authors":"caiweili"}}

