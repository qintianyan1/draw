function palette (cobj,canvas,copy) {
	this.o=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	//线条宽度  填充颜色  描边颜色  绘制类型
	this.lineWidth=1; //线条的宽度
	this.strokeStyle="#000000";//描边的颜色
	this.fillStyle="#000000"//填充的颜色
	// this.type="stroke";
	this.polyNum=5;
	this.angNum=5;
	this.style='stroke'; //fill  ||   stroke
	this.type="ang";
	this.history=[];//定义的history数组
}
//重置
palette.prototype.reset=function(){
	this.o.fillStyle=this.fillStyle;
	this.o.strokeStyle=this.strokeStyle
	this.o.lineWidth=this.lineWidth
}
palette.prototype.draw=function(){
	var that=this;//this是window对象 所以要转换
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.reset()
		that.copy.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			//this.type line
			that.o.clearRect(0,0,that.width,that.height)//清除画布
			if(that.history.length>0){
				that.o.putImageData(that.history[that.history.length-1],0,0,0,0,that.width,that.height)
			}
		    that[that.type](dx,dy,mx,my)//用户选什么执行什么
		}
		document.onmouseup=function(){
			that.copy.onmousemove=null;
			document.onmouseup=null;
			that.history.push(that.o.getImageData(0,0,that.width,that.height))
		}
	}
}
//线条
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);//开始坐标
	this.o.lineTo(x2,y2);//结束坐标
	this.o.stroke();
	this.o.closePath();
}
//矩形
palette.prototype.rect=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1
	this.o.beginPath();
	this.o.rect(x1+.5,y1+.5,w,h);
	this.o.closePath();
	this[this.style]
	this.o.fill();
	
}
//圆
palette.prototype.arc=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2)//获取半径 sqrt开平方
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,2*Math.PI,false);
	this.o.closePath();
	this.o.fill();
}
//铅笔
palette.prototype.pencil=function(x1,y1,x2,y2){
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.reset();
		that.o.beginPath();
		that.copy.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.lineTo(mx,my);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.o.closePath();
			that.copy.onmousemove=null;
			document.onmouseup=null;
			that.history.push(that.o.getImageData(0,0,that.width,that.height));
		}
	}	
}
//多边形
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var len=this.polyNum;
	var ag=360/len;
	this.o.beginPath();
	for(var i=0;i<len;i++){
		this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
	}
	this.o.closePath();
	this.o[this.style]();	
}
//n角行
palette.prototype.ang=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var r1=r/3;
	var an1=this.angNum*2;
	var ag=360/an1;
	this.o.beginPath();
	for(var i=0;i<an1;i++){
		if(i%2==0){
			this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
		}else{
			this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r1,y1+Math.sin(i*ag*Math.PI/180)*r1);
		}
		
	}
	this.o.closePath();
	this.o[this.style]();	
}

palette.prototype._r=function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}
