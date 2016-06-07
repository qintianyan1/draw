$(function(){
	var can,cobj,palt;
	var copy=$(".copy");
	$(".new").click(function(){
		var w=1000,h=600;	
		can=$("<canvas id='can' width="+w+" height="+h+"></canvas>")[0];
		$(can).appendTo(".palette");
		copy.css({width:w,height:h});
		cobj=can.getContext("2d");
		palt=new palette(cobj,can,$(copy)[0]);
		palt.draw();
		draw();
})
		function draw(){	
			$('#rect').click(function(){
				palt.type=this.id
				palt.draw();
			})
			$('#arc').click(function(){
				palt.type=this.id
				palt.draw();
			})
			$('#line').click(function(){
				palt.type=this.id
				palt.draw();
			})
			$('#pencil').click(function(){
				palt.type=this.id
				palt.pencil();
			})
			$('#poly').click(function(){
				palt.type=this.id
				palt.polyNum=prompt('请输入多边形边数');
				palt.draw();
			})
			$('#ang').click(function(){
				palt.type="ang"
				palt.angNum=prompt('请输入多角形角数');
				palt.draw();
			})
			$('#lineWidth').change(function(){
				palt.lineWidth=this.value
			})
			$('#strokeStyle').change(function(){
				palt.strokeStyle=this.value
			})
			$('#fillStyle').change(function(){
				palt.fillStyle=this.value
			})
			$('#fill').click(function(){
				palt.style='fill'
			})
			$('#stroke').click(function(){
				palt.style='stroke'
			})
			$('.chexiao').click(function(){
				var end=palt.history.pop()
				if(palt.history.length>0){
					palt.o.putImageData(palt.history[palt.history.length-1],0,0,0,0,palt.width,palt.height);
				}else{
					palt.o.clearRect(0,0,palt.width,palt.height)
					alert('已经不能再撤销了')
				}	
			})
			$('.save').click(function(){
				location.href=can.toDataURL('image/png').replace("image/png","image/octet-stream")
			})
		}
})