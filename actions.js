function loop(){
	if(window.interval == undefined){
		window.interval=setInterval(loop, 1000 / 60);
	}
	
	update();
	draw();
}

function update(){
	if(!F()){
		if(P().position.X >= FirstFight(true)){
			F(new FirstFight());
		}
	}else{
		F().update();
	}
	
	P().update();
	window.FirstEnemy.update();
	
	Ef().update();
	Cam().update();
	I().update();
}

function draw(){
	D().clearRect(0,0,C().width,C().height);
	
	D().fillStyle='#000';
	D().fillRect(0,0,C().width,C().height);
	
	D().textBaseline='top';
	D().font=(4 * S().zoom) + 'px PressStart2P';
	D().fillStyle='#FFF';
	
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
				X * 8 * S().zoom - Cam().position.X,
				Y * 8 * S().zoom,
				8 * S().zoom,
				8 * S().zoom
			);
		}
	}
	
	P().draw();
	window.FirstEnemy.draw();
	
	if(F()){
		F().draw();
	}
	
	Ef().draw();
}