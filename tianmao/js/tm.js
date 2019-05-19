
window.onload = function(){
	lb();//轮播图程序
	xllb("xl1");//顶条下拉列表1234
	xllb("xl2");
	xllb("xl3");
	xllb("xl4");
	cllb("cedh");//侧拉导航内容程序
	
}
//下拉列表	单个下拉块的

function xllb(id){
	var oId = document.getElementById(id);	
	var oDdd = oId.getElementsByTagName("div")[0];
	oId.onmouseenter = function(){
		oId.className = "libg";
		oDdd.style.display = "block";
		oDdd.style.zIndex = "99";
	}
	oId.onmouseleave = function(){
		oId.className = " ";
		oDdd.style.display = "none";
		oDdd.style.zIndex = "0";
	}
}

//搜索框点击事件    当搜索框中的内容改变的时候需要将框中的文字隐藏 还没写
//新想法：失去焦点时候显示leabl 得到焦点时候隐藏leabl 在input里面写入pac那个属性
function ssk(id1,id2){
	var oform = document.getElementById(id1);
	var otext = document.getElementById(id2);
	var oleb = oform.getElementsByTagName("label")[0];
	var time1 = null;
	otext.onfocus = function(){
		var time1 = setInterval(huoqu,10);
		oleb.style.color = "rgb(204,204,204)";
	}
	otext.onblur = function(){
		clearTimeout(time1);
		oleb.style.display = "block";
		oleb.style.color = "rgb(102,102,102)";
	}
	function huoqu(){
		if(otext.value!=""){
			oleb.style.display = "none";
		}
	}
}

//侧边导航栏	原网页采用了事件委托将事件交给了dl处理省去了for循环	有空改下
function cllb(dhid){
	var oDh = document.getElementById(dhid);	
	var aDdd = oDh.children;
	for (var i=1;i<aDdd.length;i++) {
		aDdd[i].ind = i;						
		aDdd[i].onmouseenter = function(){		
			var index = this.ind;
			oDiv = aDdd[index].children[1];
			oDiv.style.visibility = "visible";
		} 
		aDdd[i].onmouseleave = function(){
			var index = this.ind;
			oDiv = aDdd[index].children[1];
			oDiv.style.visibility = "hidden";
		}
	}
}
//侧边导航栏 jq版 委托事件
//轮播图 透明度 层级 display 三种共同作用
//过程描述：
//当前图层 o:1; z:1 d:b; 一秒后 o:0; z:0; d:n;
//操作图层 o:0; z:0; d:n; 一秒内 o:0-1; z:2; d:b;  一秒后 o:1; z:1; d:b;
var t = null;//定时器命名
var h = null;//定时器命名
var n = 0;//标识位置用
var s = 0;
var q = 0;
function lb(){	
	var lbid = document.getElementById("lb");
	var lbk = lbid.children;//0为轮播图片部分 1为下标部分
	var albdiv = lbk[0].children;//轮播样式设置部分
	var albli = lbk[1].children;//下标样式设置部分
	var num = albdiv.length;
	var timer = null;//下标点击事件结束延时开始执行轮播
	s = n;//计算当前正在显示的图片下标
	n = (n+1)%num;//计算当前应该操作的图片下标
	
    for (var i=0;i<albli.length;i++) {
    	albli[i].ind = i;
    	albli[i].onclick = function(){
    		clearTimeout(timer);
    		clearTimeout(h);
			q = this.ind;
			albli[n].className = " ";
			albli[q].className = "xh-dq";
			albdiv[n].style.display = "none";
			albdiv[q].style.display = "block";
			for (var f=0;f<albli.length;f++) {
				albdiv[f].style.opacity = 1;
				albdiv[f].style.zIndex = 0;
			}
			n = q;
			timer = setInterval(function(){
				
			},1000);//等待一秒后继续开始轮播
			h=setTimeout(lb,2000);
    	}
   }
	//下标样式操作
	albli[s].className = " ";
	albli[n].className = "xh-dq";
//	//控制元素显示隐藏
//	albdiv[s].style.display = "none";
//	albdiv[n].style.display = "block";
	//一秒内操作
	for (var i = 0;i<1000;i++) {
		var op = albdiv[s].style.opacity;
		var op2 = albdiv[n].style.opacity;
		albdiv[s].style.opacity = (Number(op)*1000-1)/1000;
		albdiv[n].style.opacity = (Number(op2)*1000+1)/1000;
	}
	albdiv[n].style.display = "block";
	albdiv[n].style.zIndex = 2;
	albdiv[s].style.display = "none";
	//一秒后操作
	t && clearInterval(t);
	t = setInterval(function(){
		albdiv[s].style.display = "none";
		albdiv[s].style.opacity = 0;
		albdiv[s].style.zIndex = 0;
		albdiv[n].style.zIndex = 1;
		t && clearInterval(t);    
        t = null;
	},1000);
    h && clearTimeout(h);    
    h=setTimeout(lb,2000);
}



// 随机颜色
function randomColor(){
	var str = "1234567890abcdef";
	var color="#";
	for(var i = 0;i<6;i++){
		var num=parseInt(Math.random()*str.length);
		color=color+str.charAt(num);
	}
	return color;
}