function C(){
	return document.getElementById('c');
}
function D(){
	if(window.ctx != undefined){
		return window.ctx;
	}
	
	return window.ctx=C().getContext('2d');
}

function resizeCanvas(){
	var sizeM=Math.floor(window.innerWidth / S().size.X);
	
	if((oSM=Math.floor(window.innerHeight / S().size.Y)) < sizeM){
		sizeM=oSM;
	}
	
	if(sizeM < 1){
		sizeM=1;
	}
	
	S().zoom=sizeM;
	
	C().width=S().size.X * S().zoom;
	C().height=S().size.Y * S().zoom;
	
	C().style.top=(window.innerHeight - C().height) / 2 + 'px';
	C().style.left=(window.innerWidth - C().width) / 2 + 'px';
}

window.addEventListener('resize',resizeCanvas);
window.addEventListener('load',function(){
	resizeCanvas();
	loop();
});