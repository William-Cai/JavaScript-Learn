/**
 * @Title: 第十五章 Canvas绘图
 * @Description:
 * @Author:Weili.Cai
 * @Created Date:2017/3/29
 */
var drawing = document.getElementById("drawing");

//确保浏览器支持<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");

    // ...... 其他操作


    //取得图像的数据URI
    var imgURI = drawing.toDataURL("image/png");

    //输出显示图像
    var image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image)
}

//TODO 填充和描边
//填充矩形
context.fillRect(10, 10, 50, 50);//left top width height
//描边矩形
context.strokeRect(10, 10, 50, 50);

context.fillStyle = "rgba(0,0,255, 0.5)";
context.fillRect(30, 30, 50, 50);
context.strokeRect(30, 30, 50, 50);

//清除矩形
context.clearRect(40, 40, 10, 10);

//TODO 绘制路径
//开始init
context.beginPath();
//绘制外圈
context.arc(100, 100, 99, 0, 2 * Math.PI, false);
context.moveTo(194, 100);
context.lineTo(45, 100);


//TODO 绘制文本
context.font = "bold 14px Arial";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("12", 100, 20);

//TODO 变换
//rotate,scale,translate,setTransform

//TODO 绘制图像
var image = document.images[0];
context.drawImage(image, 10, 10); //image left top
context.drawImage(image, 50, 10, 20, 30); //image left top width height
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60);//image src-left src-top src-width src-height dest-left dest-top dest-width dest-height

//TODO 阴影
//shadowColor,shadowOffsetX,shadowOffsetY,shadowBlur

//TODO 渐变
//createLinearGradient
var gradient = context.createLinearGradient(30, 30, 70, 70);//src-left sec-top dest-left dest-top
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
//绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 70, 70);

//TODO 模式
var pattern = context.createPattern(image, "repeat");
context.fillStyle = pattern;
context.fillRect(10, 10, 150, 150);

//TODO 使用图像数据
var imageData = context.getImageData(10, 5, 50, 50);

//TODO 合成
context.globalAlpha = 0.5;

//TODO WebGL
//视图
var buffer = new ArrayBuffer(20); //数组缓冲器类型
var bytes = buffer.byteLength;
//基于整个缓冲器创建一个新视图
var view = new DataView(buffer);
//创建一个开始于字节9的新视图
var view = new DataView(buffer, 9);
//创建一个从字节9开始到字节18的新视图
var view = new DataView(buffer, 9, 18);

//类型化视图

//TODO 15.3.2 WebGL上下文
if (drawing.getContext) {
    var gl = drawing.getContext("experimental-webgl", {}); //参数2是一个对象，里面有属性
    if (gl) {
        //使用WebGL
    }
}

//。。。