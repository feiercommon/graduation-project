	k=1;
	ks=1;
    function reset(nums,cxt){

        context.fillStyle=colorsChange;
        var offsetX = width_x, offsetY = width_y;
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

        return;

    }

    function start(){
			ks=1;
			document.getElementById("note").style.visibility="visible";
			s=document.getElementById("s").value;
			f=document.getElementById("f").value;
			m=document.getElementById("m").value;
            var nums=[];
            nums.push({num:s.substring(0,1)})
            nums.push({num:s.substring(1,-1)})
            nums.push({num: 10});
            nums.push({num:f.substring(0,1)})
            nums.push({num:f.substring(1,-1)})
            nums.push({num: 10});
            nums.push({num:m.substring(0,1)})
            nums.push({num:m.substring(1,-1)});
        	reset(nums,canvas)
			if(k==1){
				k=0;
				// djuge();
			}else{
				alert("请先停止上次的倒计时闹铃，再开始新的！");
			}
		}
		function djs(){
			setTimeout("djuge()",1000);
		}
		function djuge(){
			if(ks==1){//停止或开始
				document.getElementById("m").value=m;
				if(m>0){
					m--;
					djs();
				}else{
					if(f>0){
						f--;
						document.getElementById("f").value=f;
						m=59;
					    djs();
					}else{
						if(s>0){
						s--;
						document.getElementById("s").value=s;
						f=59;
					    djs();
						}else{
							cancel();
						}
					}
				}
			}//停止或开始
		}
		function cancel(){
			var audio = document.getElementById('music');
			document.getElementById('music').src="music/"+document.getElementById("v").value+".mp3";
			audio.play();
			document.getElementById("note").innerHTML="倒计时已结束！！";
			a=1;
			action();
		}
		function stop(){
			//k=0 进行倒计时；k=1音乐播放中
				ks=0;//停止倒计时
				var audio = document.getElementById('music');
				audio.pause();
				document.getElementById("note").innerHTML="倒计时正在进行！";
				document.getElementById("note").style.visibility="hidden";
				a=2;
				k=1;//先ks赋值1在k开始循环
		}
		function action(){
			setTimeout("ac()",1000);
		}
		function ac(){
			if(a==1){
				document.getElementById("note").style.visibility="visible";
				a=0;
				action();
			}else if(a==0){
				document.getElementById("note").style.visibility="hidden";
				a=1;
				action();
			}
		}