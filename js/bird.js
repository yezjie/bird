window.onload = function(){
	var box = document.getElementById("box");
	var banner = document.getElementById("banner");
	var bird = document.getElementById("bird");
	var fen = document.getElementById("fen");
	var fen_img = fen.getElementsByTagName("img");
	var ulz = box.getElementsByTagName("ul")[0];
	var dqf = document.getElementById("dqf");
	var maxf = document.getElementById("maxf");
	var ok = document.getElementById("ok");
	var ga_ov = document.getElementById("ga_ov");
	var start = document.getElementById("start");
	var logo = document.getElementById("logo")
	var logo_img = logo.getElementsByTagName("img")[0];
	var start_img = start.getElementsByTagName("img");
	var speed = 1;
	var stor = window.localStorage;
	var gameplay = document.getElementById("gameplay")
	var gameup = document.getElementById("gameup")
	var gameover = document.getElementById("gameover")
	//音乐播放


	if(stor.getItem("fens") == null){
		stor.setItem("fens",0);
	}
	//开始
	start_img[0].addEventListener("touchstart",function(){
		start.style.display = "none";
		logo.style.display = "none";
		clearInterval(timer_bf);
		zhus();
	},false);
	//重新开始
	ok.addEventListener("touchstart",function(){
		gameplay.play();
		ga_ov.style.display = "none";
		ulz.innerHTML = "";
		bird.style.top = "37%";
		zhus();
		timer_banf();
		b_tf();
		t_jian();
		document.addEventListener("touchstart",b_tf,false);
		for(var i=0;i<fen_img.length-1;i++){
			fen_img[i].src = "img/0.jpg";
		}
		fen_img[2].src = "";
		fens = 0;
	},false)
	//banner移动
	var timer_ban;
	banner.style.width = banner.offsetWidth*2 + "px";
	function timer_banf(){
		timer_ban = setInterval(function(){
			if(banner.offsetLeft<-banner.offsetWidth/2){
				banner.style.left = "0px";
			}
			banner.style.left = banner.offsetLeft - speed + "px";
		},20)
	}
	timer_banf();	
	//柱子移动
	//随机数
	function ran(min,max){
		return parseInt(Math.random()*(max-min)+min);
	}
	function scz(){
		var lis = document.createElement("li");
		lis.innerHTML = "<div></div><div></div>"
		ulz.appendChild(lis);
	}
	function zhei(a){
		var zz = ulz.getElementsByTagName("div");
		var h_s = ran(25,55);
		var h_j = ran(70,81);
		zz[a+a].style.height = h_s+"%";
		zz[a+a+1].style.height = h_j-h_s+"%";
	}
	//柱子的生成和移动
	var timer_z1,timer_z2;
	function zhus(){
		bird.style.display = "block";
		fen.style.display = "block";
		setTimeout(function(){
			if(ulz.innerHTML==""){
				scz();
				zhei(0);
				var lil = ulz.getElementsByTagName("li");
				lil[0].style.left = "100%";
				timer_z1 = setInterval(function(){
					lil[0].style.left = lil[0].offsetLeft - speed + "px";
					if(lil[0].offsetLeft == parseInt(box.offsetWidth*0.35)){
						if(lil.length<2){
							scz(0);
							zhei(1);
						}
						lil[1].style.left = "100%";
						clearInterval(timer_z2);
						timer_z2 = setInterval(function(){
							lil[1].style.left = lil[1].offsetLeft - speed + "px"; 
								if(lil[0].offsetLeft == parseInt(box.offsetWidth*0.35)){
									lil[1].style.left = "100%";
									zhei(1);
								}
								if(lil[1].offsetLeft == parseInt(box.offsetWidth*0.35)){
									lil[0].style.left = "100%";
									zhei(0);
								}
						},10);
					}
				},10);
			}
		},2000);
			
	}
	//小鸟运动
	var timer_bf;
	var num = 0;
	//正常飞
	function bf(){
		clearInterval(timer_bf);
		timer_bf = setInterval(function(){
			logo_img.src = "img/bird" + num + ".png";
			num == 0?num=1:num=0;
		},100);
	}
	bf();
	//向下飞
	var timer_down;
	function down_bird(){
		clearInterval(timer_down);
		timer_down = setInterval(function(){
			bird.src = "img/down_bird" + num + ".png";
			num == 0?num=1:num=0;
		},100);
	}
	
	//向上飞
	var timer_up;
	function up_bird(){
		clearInterval(timer_up);
		timer_up = setInterval(function(){
			bird.src = "img/up_bird" + num + ".png";
			num == 0?num=1:num=0;
		},100);
	}
	//向下掉
	var timer_luo;
	function b_luo(){
		down_bird();
		clearInterval(timer_luo);
		timer_luo = setInterval(function(){
			bird.style.top = bird.offsetTop + speed+"px";
			if(bird.offsetTop/box.offsetHeight*100>85){
				bird.style.top = "85%";
			}
		},10);
	}
	//向上飞
	var timer_tf;
	function b_tf(){
		gameup.play();
		clearInterval(timer_luo);
		clearInterval(timer_down);
		up_bird();
		clearInterval(timer_tf);
		var spb = 0;
		var bol = false;
		timer_tf = setInterval(function(){
			bird.style.top = bird.offsetTop - speed+"px";
			if(bird.offsetTop<=0){
				bird.style.top = 0;
			}
			spb++;
			if(spb>50) {
				spb = 0;
				clearInterval(timer_tf);
				clearInterval(timer_up);
				bol = true;
				return bol;
			}
		},10)
		var timer_sss = setInterval(function(){
			if(bol){
				b_luo();
				clearInterval(timer_sss);
			}
				
		},10)
	}
	//点击开始飞
	document.addEventListener("touchstart",b_tf,false);
	//死亡碰撞检测
	var zz = ulz.getElementsByTagName("div");
	var lil = ulz.getElementsByTagName("li");
	var bol_zb = {
			zhu:true,
			bi:true
		}
	function cash(box1,box2){
		var l1 = box1.offsetLeft;
		var r1 = box1.offsetLeft + box1.offsetWidth;
		var t1 = box1.offsetTop;
		var b1 = box1.offsetTop + box1.offsetHeight;

		var l2 = box2.offsetLeft+box2.offsetParent.offsetLeft;
		var r2 = box2.offsetLeft+box2.offsetParent.offsetLeft + box2.offsetWidth;
		var t2 = box2.offsetTop
		var b2 = box2.offsetTop + box2.offsetHeight;
		
		if(l1<r2&&r1>l2&&t1<b2&&b1>t2){
			bol_zb.zhu = true;
		}else{
			bol_zb.zhu = false;
		}
		if(l1 == r2){
			bol_zb.bi = true;
		}else{
			 bol_zb.bi = false;
		}
		return bol_zb;
	}
	function t_jian(){
		clearInterval(timer_jian);
		var timer_jian = setInterval(function(){
			for(var i=0;i<zz.length;i++){
				var bol = cash(bird,zz[i]).zhu;
				if(bol || parseInt(bird.offsetTop/box.offsetHeight*100)==85){
					clearInterval(timer_bf);
					clearInterval(timer_tf);
					clearInterval(timer_up);
					clearInterval(timer_down);
					clearInterval(timer_luo);
					clearInterval(timer_z1);
					clearInterval(timer_z2);	
					clearInterval(timer_ban);
					clearInterval(timer_jian);
					ga_ov.style.display = "block";
					dqf.innerHTML = bl(fens);
					document.removeEventListener("touchstart",b_tf,false);
					if(fens>stor.getItem("fens") && fens>0){
						stor.setItem("fens",fens);
					}
					maxf.innerHTML = bl(stor.getItem("fens"));
					gameover.play();
					gameplay.pause();
					gameplay.currentTime = 0;
				}
			}
		},10)
	}
	t_jian();	

	//计分
	var fens = 0;
	function bl(num){
		return num<10?"0"+num:num;
	}
	var timer_fen = setInterval(function(){
		var fenW = fen.offsetWidth;
		fen.style.marginLeft = -parseInt(fenW/2) + "px";
		for(var i=0;i<lil.length;i++){
			var bol = cash(bird,lil[i]).bi;
			if(bol){
				fens++;
				var defen = bl(fens) + "";
				defen = defen.split("");
				fen_img[0].src = "img/"+ defen[0] + ".jpg";
				fen_img[1].src = "img/"+ defen[1] + ".jpg";
				if(defen.length == 3){
					fen_img[2].src = "img/"+ defen[2] + ".jpg";
				}
			}
		}
	},10)








}
