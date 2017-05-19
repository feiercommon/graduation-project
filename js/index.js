$(function(){
    var window_width = 920;
    var window_height = 400;
    var RADIUS = 7; //球半径
    var colorsChange = "#005eac";
    var width_x=100;
    var width_y=30;
    var times=new Date(2017,10,25,0,0,0);
    var NUMBER_GAP = 10; //数字之间的间隙
    var u=0.65; //碰撞能量损耗系数
    var context; //Canvas绘制上下文
    var balls = []; //存储彩色的小球
    var bianNum=5;
    const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //彩色小球的颜色
    var currentNums = []; //屏幕显示的8个字符
    var digit =
        [
            [
                [0,0,1,1,1,0,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,0,1,1,0],
                [0,0,1,1,1,0,0]
            ],//0
            [
                [0,0,0,1,1,0,0],
                [0,1,1,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [1,1,1,1,1,1,1]
            ],//1
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,1,1],
                [1,1,1,1,1,1,1]
            ],//2
            [
                [1,1,1,1,1,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,1,0,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//3
            [
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,0],
                [0,0,1,1,1,1,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,1,1,0],
                [1,1,1,1,1,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,1]
            ],//4
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,1,1,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//5
            [
                [0,0,0,0,1,1,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//6
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0]
            ],//7
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//8
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,1,1,0,0,0,0]
            ],//9
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0]
            ]//:
        ];
    function getTimecha(cxt,future){
        var future=times;
        var nums = [];
        context.fillStyle=colorsChange;
        var date = new Date();
        var offsetX = width_x, offsetY = width_y;
        var cha=(future.getTime()-(new Date()).getTime())/1000;
        var hours =parseInt(cha%(60*60*24)/(60*60));
        var num1 = Math.floor(hours/10);
        var num2 = hours%10;
        nums.push({num: num1});
        nums.push({num: num2});
        nums.push({num: 10}); //冒号
        var minutes=parseInt(cha%(60*60*24)%(60*60)/(60));
        var num1 = Math.floor(minutes/10);
        var num2 = minutes%10;
        nums.push({num: num1});
        nums.push({num: num2});
        nums.push({num: 10}); //冒号
        var seconds=parseInt(cha%(60*60*24)%(60*60)%(60));
        var num1 = Math.floor(seconds/10);
        var num2 = seconds%10;
        nums.push({num: num1});
        nums.push({num: num2});
        for(var x = 0;x<nums.length;x++){
            nums[x].offsetX = offsetX;
            offsetX = drawSingleNumber(offsetX,offsetY,nums[x].num,cxt);
            //两个数字连一块，应该间隔一些距离
            if(x<nums.length-1){
                if((nums[x].num!=10) &&(nums[x+1].num!=10)){
                    offsetX+=NUMBER_GAP;
                }
            }
        }

        //说明这是初始化
        if(currentNums.length ==0){
            currentNums = nums;
        }else{
            //进行比较
            for(var index = 0;index<currentNums.length;index++){
                if(currentNums[index].num!=nums[index].num){
                    //不一样时，添加彩色小球
                    addBalls(nums[index]);
                    currentNums[index].num=nums[index].num;
                }
            }
        }
        renderBalls(cxt);
        updateBalls();

        return date;
    }

    function addBalls (item) {
        var num = item.num;
        var numMatrix = digit[num];
        for(var y = 0;y<numMatrix.length;y++){
            for(var x = 0;x<numMatrix[y].length;x++){
                if(numMatrix[y][x]==1){
                    var ball={
                        offsetX:item.offsetX+(RADIUS+1)+(RADIUS+1)*2*x,
                        offsetY:30+(RADIUS+1)+(RADIUS+1)*2*y,
                        color:colors[Math.floor(Math.random()*colors.length)],
                        g:1.5+Math.random(),
                        vx:Math.pow(-1, Math.ceil(Math.random()*10))*4+Math.random(),
                        vy:-5
                    }
                    balls.push(ball);
                }
            }
        }
    }

    function renderBalls(cxt){
            for(var index = 0;index<balls.length;index++){
                cxt.beginPath();
                cxt.fillStyle=balls[index].color;
                cxt.arc(balls[index].offsetX, balls[index].offsetY, RADIUS, 0, 2*Math.PI);
                cxt.fill();
            }
    }

    function updateBalls () {
        var i =0;
        for(var index = 0;index<balls.length;index++){
            var ball = balls[index];
            ball.offsetX += ball.vx;
            ball.offsetY += ball.vy;
            ball.vy+=ball.g;
            if(ball.offsetY > (window_height-RADIUS)){
                ball.offsetY= window_height-RADIUS;
                ball.vy=-ball.vy*u;
            }
            if(ball.offsetX>RADIUS&&ball.offsetX<(window_width-RADIUS)){

                balls[i]=balls[index];
                i++;
            }
        }
        //去除出边界的球
        for(;i<balls.length;i++){
            balls.pop();
        }
    }
    function drawSingleNumber(offsetX, offsetY, num, cxt){
        var numMatrix = digit[num];
        for(var y = 0;y<numMatrix.length;y++){
            for(var x = 0;x<numMatrix[y].length;x++){
                if(numMatrix[y][x]==1){
                    cxt.beginPath();
                    cxt.arc(offsetX+RADIUS+RADIUS*2*x,offsetY+RADIUS+RADIUS*2*y,RADIUS,0,2*Math.PI);
                    cxt.fill();
                }
            }
        }
        cxt.beginPath();
        offsetX += numMatrix[0].length*RADIUS*2;
        return offsetX;
    }

    var canvas = document.getElementById("canvas");
    canvas.width=window_width;
    canvas.height=window_height;
    context = canvas.getContext("2d");

    //记录当前绘制的时刻
    var currentDate = new Date();

    var t=setInterval(function(){
        //清空整个Canvas，重新绘制内容
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        getTimecha(context);
    }, 50);


    //大小功能
    var flags1 = true;
    $(".left_particle").click(function () {
        if(flags1){
            window_width = 620;
            window_height = 300;
            RADIUS = 4; //球半径
            NUMBER_GAP = 20; //数字之间的间隙
            u=0.65; //碰撞能量损耗系数
            width_x=200;width_y=80;
            flags1 = !flags1;
        }else{
            window_width = 920;
            window_height = 400;
            RADIUS = 7; //球半径
            NUMBER_GAP =10; //数字之间的间隙
            u=0.65; //碰撞能量损耗系数
            width_x=100;width_y=30;
            flags1 = !flags1;
        }
    });

    //颜色
    var flags2 = true;
    $(".left_blobbs").click(function () {
        if(flags2){
            colorsChange="";
            flags2 = !flags2;
        }else{
            colorsChange="#005eac";
            flags2 = !flags2;
        }
    });


    //重置
    $(".left_jelly").click(function () {
        $(".alert").css({display:"block"});
        clearInterval(t)
    });
    $(".last").click(function () {
        var id_time=new Date();
        var hour=parseInt(document.getElementById("id_hour").value);
        id_time.setHours(hour);
        var minutes=parseInt(document.getElementById("id_minutes").value);
        id_time.setMinutes(minutes);
        var seconds=parseInt(document.getElementById("id_seconds").value);
        id_time.setSeconds(seconds);
        times=id_time;
        $(".alert").css({display:"none"});
        t=setInterval(function(){
            //清空整个Canvas，重新绘制内容
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            getTimecha(context);
        }, 50);
    });


    //点击显示钟表
    var flags3 = true;
    $(".left_chase").click(function(){
        if(flags3){
            $("#canvas").css({display:"none"});
            $("#myCanvas").css({display:"block"});
            flags3 = !flags3;
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext('2d');
            function drawclock() {
                var deg = Math.PI / 180;
                ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
                //表盘
                ctx.beginPath();
                ctx.arc(250, 250, 200, 0, Math.PI * 2, true);
                ctx.lineWidth = 10;
                ctx.strokeStyle = "darksalmon";
                ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.lineWidth = 5;
                //数字
                for (var i = 0; i < 12; i++) {
                    txt=i<1?12:[i];        //三目运算符
                    ctx.font = "15px  KaiTi";
                    ctx.lineWidth = 2;
                    ctx.strokeText(txt, 244 + Math.sin(deg * 30 * i) * 170, 256 - Math.cos(deg * 30 * i) * 170);
                }
                //时间点
                for (var j = 0; j < 60; j++) {
                    ctx.beginPath();
                    ctx.lineWidth =j%5==0?5:2;
                    ctx.moveTo(250 + Math.sin(deg * 6 * j) * 185, 250 - Math.cos(deg * 6 * j) * 185);
                    ctx.lineTo(250 + Math.sin(deg * 6 * j) * 195, 250 - Math.cos(deg * 6 * j) * 195);
                    ctx.stroke();
                }
                //获取时间
                var now = new Date(); //定义时间
                var sec = now.getSeconds(); //获取秒
                var minute = now.getMinutes(); //获取分钟
                var hour = now.getHours(); //获取小时
                //小时必须获取浮点类型，产生偏移（小时+分钟比）
                hour = hour + minute / 60;
                hour = hour > 12 ? hour - 12 : hour;//将24小时转换为12小时
                //画分针
                ctx.save();//保存了ctx当前的状态值
                ctx.beginPath();
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 5;
                ctx.moveTo(250, 250);
                ctx.lineTo(250 + Math.sin(deg * 6 * minute) * 150, 250 - Math.cos(deg * 6 * minute) * 150);
                ctx.stroke();
                //画秒针
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;
                ctx.moveTo(250, 250);
                ctx.lineTo(250 + Math.sin(deg * 6 * sec) * 170, 250 - Math.cos(deg * 6 * sec) * 170);
                ctx.stroke();
                ctx.restore();
                //画时针
                ctx.beginPath();
                ctx.strokeStyle = "mediumspringgreen";
                ctx.lineWidth = 10;
                ctx.moveTo(250, 250);
                ctx.lineTo(250 + Math.sin(deg * 30 * hour) * 130, 250 - Math.cos(deg * 30 * hour) * 130);
                ctx.stroke();
                ctx.restore();//将ctx之前的状态值还原回去
            }
            drawclock();
            setInterval(drawclock, 1000);
        }else {
            $("#myCanvas").css({display:"none"});
            $("#canvas").css({display:"block"});
            flags3 = !flags3;
        }
    });


    //  切换背景样式
   //(img文件夹下的图片1、2、3、4、5、6，获取随机数，拼接字符串“随机”+.jpg 达到背景切换的需求)
	function random (){
	    return  Math.ceil(Math.random()*6);
	}
	$('.right_chase').click(function(){
	    var src = $('body').css('backgroundImage');
	    var sd=src.substring(src.indexOf("img/"),src.indexOf(".jpg"));
	    var nums=sd.substring(sd.length-1);
	    srcs = src.substr(0,-5)+random()+'.jpg';
	    $("body").css("background","url(img/"+srcs+")");
	});


    //暂停时间
    var flags4 = true;
    $(".right_blobbs").click(function () {
        if(flags4){
            clearInterval(t);
            flags4=!flags4;
        }else{
            t=setInterval(function(){
                //清空整个Canvas，重新绘制内容
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                getTimecha(context);
            }, 50);
            flags4=!flags4;
        }
    });


    //拖拽
    $(".right_particle").click(function(){
    		events();
    });

    //3d按钮
    var flags5 = true;
    $(".right_jelly").click(function(){
        if(flags5){
            $("#canvas").css({display:"none"});
            $("#youcanvas").css({display:"block"});
            flags5=!flags5;
            (function () {
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                window.requestAnimationFrame = requestAnimationFrame;
            })();
            var canvas = document.getElementById("canvas"),
                shapeCan = document.createElement("canvas"),
                ctx = canvas.getContext("2d"),
                sCtx = shapeCan.getContext("2d"),
                width = window.innerWidth,
                height = document.body.offsetHeight,
                vanishPointY = height/2,
                vanishPointX = width /2.5,
                focalLength = 300,
                angle = 0,
                angleY = 0,
                angleX = 0,
                angleZ = 0,
                mouseX = 0,
                mouseY = 0;

            var settings = {
                MouseRotation: false,
                ClockColor: {
                    r: 0,
                    g: 94,
                    b: 172
                }
            }


            canvas.width = width;
            canvas.height = height;

            shapeCan.width = 200;
            shapeCan.height = 100;
            sCtx.font = '3em Arial';

            /*
             *	Controls the emitter
             */
            function Emitter() {
                this.particles = [];
                this.shapeParts = [];

                this.x = 1;
                this.y = 1;
                this.z = 1;

                this.getShape();

                this.startTime = new Date().getTime();
                this.checkInterval = 200;
            }

            Emitter.prototype.update = function () {
                var partLen = this.particles.length;

                if (settings.MouseRotation) {
                    angleX = (mouseY - vanishPointY) * 0.01;
                    angleY = (mouseX - vanishPointX) * 0.01;
                } else {
                    angleY = Math.sin(angle += 0.01);
                    angleX = Math.sin(angle);
                    angleZ = Math.sin(angle);
                }

                // z-sorting
                this.particles.sort(function (a, b) {
                    return b.z - a.z;
                });

                for (var i = 0; i < partLen; i++) {
                    var particle = this.particles[i];
                    if (particle) {
                        particle.update();
                    }
                }

            }

            Emitter.prototype.getShape = function () {
                var d = new Date(),
                    hour = d.getHours() % 12,
                    min = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes(),
                    sec = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();


                sCtx.clearRect(0, 0, shapeCan.width, shapeCan.height);
                sCtx.fillText(hour + ":" + min + ":" + sec, 0, 30);

                var imageData = sCtx.getImageData(0, 0, shapeCan.width, shapeCan.height).data;

                for (var i = 0; i < imageData.length; i += 4) {
                    var x = i / 4 % shapeCan.width,
                        y = (i / 4 - x) / shapeCan.width,
                        index = i;

                    if (imageData[i + 3] > 0) {
                        for (var p = 0; p < 4; p++) {
                            if (!this.shapeParts[index + p]) {
                                var particle = new Particle({
                                    x: ((x * 2)) - 200,
                                    y: ((y * 2)) - 100,
                                    z: 10
                                });
                                this.shapeParts[index + p] = particle;
                                this.particles[index + p] = particle;
                            }
                        }
                    } else {
                        for (var p = 0; p < 4; p++) {
                            if (this.shapeParts[index + p]) {
                                this.shapeParts[index + p].explode();
                                this.shapeParts[index + p] = undefined;
                            }
                        }
                    }
                }
            }

            Emitter.prototype.render = function () {
                if (new Date().getTime() > this.startTime + this.checkInterval) {
                    this.startTime = new Date().getTime();
                    this.getShape();
                }

                var imgData = ctx.createImageData(width, height),
                    data = imgData.data,
                    partLen = this.particles.length;

                for (var i = 0; i < partLen; i++) {
                    var particle = this.particles[i];
                    if (particle && particle.render && particle.xPos < width && particle.xPos > 0 && particle.yPos > 0 && particle.yPos < height) {
                        for (var w = 0; w < particle.size; w++) {
                            for (var h = 0; h < particle.size; h++) {
                                if (particle.xPos + w < width && particle.xPos + w > 0 && particle.yPos + h > 0 && particle.yPos + h < height) {
                                    pData = (~~ (particle.xPos + w) + (~~ (particle.yPos + h) * width)) * 4;
                                    data[pData] = settings.ClockColor.r;
                                    data[pData + 1] = settings.ClockColor.g;
                                    data[pData + 2] = settings.ClockColor.b;
                                    data[pData + 3] = particle.color[3];
                                }
                            }
                        }
                    } else if (particle && !particle.render) {
                        this.particles[i] = undefined;
                        delete particle;
                    }
                }

                ctx.putImageData(imgData, 0, 0);
            };


            /*
             *	Controls the individual particles
             */
            function Particle(options) {
                options = options || {};

                this.maxDist = 1000;

                this.x = options.x || (Math.random() * 10) - 5;
                this.y = options.y || (Math.random() * 10) - 5;
                this.z = options.z || (Math.random() * 10) - 5;

                this.startX = this.x;
                this.startY = this.y;
                this.startZ = this.z;

                this.xPos = 0;
                this.yPos = 0;

                this.angle = 0;

                this.vx = 0;
                this.vy = 0;
                this.vz = 0;

                this.color = [0, 0, 0, 255]
                this.render = true;
                this.scaler = 2;
            }

            Particle.prototype.explode = function () {
                this.vx = (Math.random() * 30) - 15;
                this.vy = (Math.random() * 30) - 15;
                this.vz = (Math.random() * 30) - 15;
            }

            Particle.prototype.rotate = function () {
                var x = this.startX * Math.cos(angleZ) - this.startY * Math.sin(angleZ),
                    y = this.startY * Math.cos(angleZ) + this.startX * Math.sin(angleZ);

                this.x = x;
                this.y = y;

                x = this.startX * Math.cos(angleY) - this.startZ * Math.sin(angleY);
                var z = this.startZ * Math.cos(angleY) + this.startX * Math.sin(angleY);

                this.x = x;
                this.z = z;

                y = this.startY * Math.cos(angleX) - this.startZ * Math.sin(angleX);
                z = this.startZ * Math.cos(angleX) + this.startY * Math.sin(angleX);

                this.y = y;
                this.z = z;
            }

            Particle.prototype.update = function () {
                this.x = (this.startX += this.vx);
                this.y = (this.startY += this.vy);
                this.z = (this.startZ -= this.vz);

                this.rotate();

                this.render = false;

                if (this.z > -focalLength) {
                    var scale = focalLength / (focalLength + this.z);

                    this.size = scale * this.scaler;
                    this.xPos = vanishPointX + this.x * scale;
                    this.yPos = vanishPointY + this.y * scale;

                    var dx = this.startX - this.x,
                        dy = this.startY - this.y,
                        dz = this.startZ - this.z,
                        dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < this.maxDist) {
                        this.render = true;
                    }

                }
            }

            function render() {
                emitter.update();
                emitter.render();
                requestAnimationFrame(render);
            }

            var emitter = new Emitter();
            render();

            var gui = new dat.GUI();
            gui.add(settings, 'MouseRotation');
            gui.addColor(settings, 'ClockColor');

            document.body.addEventListener("mousemove", function (e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            window.onresize = function () {
                height = canvas.height = document.body.offsetHeight;
                width = canvas.width = document.body.offsetWidth;
                vanishPointY = height / 2;
                vanishPointX = width / 2;
            };
        }else{
            $("#youcanvas").css({display:"none"});
            $("#canvas").css({display:"block"});
            flags5=!flags5;
        }
    })
});