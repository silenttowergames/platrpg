function loop(){
	if(window.interval == undefined){
		window.interval=setInterval(loop, 1000 / 60);
	}
	
	update();
	draw();
}

function update(){
	if(!F()){
		if(window.FirstEnemy.health > 0 && P().position.X >= FirstFight(true)){
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
	
	if(P().position.Y > S().size.Y * 1.5){
		P(true);
	}
	
	if(F() && F().e.position.Y > S().size.Y * 1.5){
		F(null);
	}
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
	
	// HUD
	D().fillText(
		'Lvl ' + P().level,
		(S().size.X - 60) * S().zoom,
		2 * S().zoom
	)
	
	for(let i=0;i<P().health;i++){
		D().drawImage(
			G(),
			1 + (9 * 1),
			1 + (9 * 3),
			8,
			8,
			(S().size.X - (8 * (i + 1))) * S().zoom,
			2 * S().zoom,
			8 * S().zoom,
			8 * S().zoom
		);
	}
	
	if(F() && F().psychic){
		for(let i=0;i<F().e.health;i++){
			D().drawImage(
				G(),
				1,
				1 + (9 * 3),
				8,
				8,
				(S().size.X - (8 * (i + 1))) * S().zoom,
				(2 + 8) * S().zoom,
				8 * S().zoom,
				8 * S().zoom
			);
		}
	}
}