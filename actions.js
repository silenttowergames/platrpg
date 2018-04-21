function loop(){
	if(window.interval == undefined){
		window.interval=setInterval(loop, 1000 / 60);
	}
	
	update();
	draw();
}

function update(){
	P().update();
	
	I().update();
}

function draw(){
	D().clearRect(0,0,C().width,C().height);
	
	D().fillStyle='#000';
	D().fillRect(0,0,C().width,C().height);
	
	D().imageSmoothingEnabled=false;
	
	for(let Y in M()){
		for(let X in M()[Y]){
			let T=M()[Y][X];
			
			if(T <= 0){
				continue;
			}
			
			D().drawImage(
				G(),
				1 + (9 * (T - 1)),
				19,
				8,
				8,
				X * 8 * S().zoom,
				Y * 8 * S().zoom,
				8 * S().zoom,
				8 * S().zoom
			);
		}
	}
	
	P().draw();
}