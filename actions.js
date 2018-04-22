function loop(){
	if(window.interval == undefined){
		window.interval=setInterval(loop, 1000 / 60);
	}
	
	update();
	draw();
}

function update(){
	if(window.intro > 0){
		return;
	}
	
	if(!F()){
		if(window.FirstEnemy.health > 0 && P().position.X >= FirstFight(true)){
			F(new FirstFight());
		}
		
		if(window.SecondEnemy.health > 0 && P().position.X >= SecondFight(true)){
			F(new SecondFight());
		}
		
		if(window.ThirdEnemy.health > 0 && P().position.X >= ThirdFight(true)){
			F(new ThirdFight());
		}
		
		if(window.FourthEnemy.health > 0 && P().position.X >= FourthFight(true)){
			F(new FourthFight());
		}
	}else{
		F().update();
	}
	
	P().update();
	window.FirstEnemy.update();
	window.SecondEnemy.update();
	window.ThirdEnemy.update();
	window.FourthEnemy.update();
	window.Vial0.update();
	window.Vial1.update();
	window.Vial2.update();
	
	Ef().update();
	Cam().update();
	I().update();
	XP().update();
	
	if(P().position.Y > S().size.Y * 1.5){
		P(true);
	}
	
	if(F() && F().e.position.Y > S().size.Y * 1.5){
		P().XP += F().e.XP;
		F(null);
	}
}

function draw(){
	D().clearRect(0,0,C().width,C().height);
	
	if(window.intro > 0){
		D().fillStyle='#FFF';
		D().fillRect(0,0,C().width,C().height);
		
		let height=500;
		
		if(height > C().height){
			height=C().height;
		}
		
		let width=height * 1.334;
		
		D().drawImage(
			document.getElementById('logo'),
			(C().width - width) / 2,
			(C().height - height) / 2,
			width,
			height
		);
		
		if(window.intro < 15){
			let alpha=1 / (15 / (15 - (window.intro)));
			
			console.log(alpha);
			
			D().fillStyle='rgba(0,0,0,' + alpha + ')';
			D().fillRect(0,0,C().width,C().height);
		}
		
		window.intro--;
		return;
	}
	
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
	
	window.Vial0.draw();
	window.Vial1.draw();
	window.Vial2.draw();
	P().draw();
	window.FirstEnemy.draw();
	window.SecondEnemy.draw();
	window.ThirdEnemy.draw();
	window.FourthEnemy.draw();
	
	if(F()){
		F().draw();
	}
	
	Ef().draw();
	
	// HUD
	D().fillText(
		'Lvl ' + P().level,
		(S().size.X - 64) * S().zoom,
		2 * S().zoom
	);
	
	D().fillText(
		'XP: ' + XP().XPify(P().XP) + "/" + XP().limits[P().level],
		(S().size.X - 64) * S().zoom,
		4 * S().zoom
	);
	
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
	
	if(isWon() && --window.startCelebratingTimer < 0){
		if(--window.youWinColorTimer < 0){
			do {
				window.randomColor='#';
				
				for(let i=0;i<3;i++){
					window.randomColor+=Math.round(Math.random() * 1) == 1 ? 'F' : '0';
				}
			}
			while(window.randomColor == '#000');
			
			window.youWinColorTimer=window.youWinColorTimerLimit;
		}
		
		D().fillStyle=randomColor;
		D().font=(12 * S().zoom) + 'px PressStart2P';
		
		D().fillText(
			'You Win!',
			((S().size.X / 2) - 42) * S().zoom,
			16 * S().zoom
		);
	}
}

function isWon(){
	return (
		window.FirstEnemy.health <= 0
		&&
		window.SecondEnemy.health <= 0
		&&
		window.ThirdEnemy.health <= 0
		&&
		window.FourthEnemy.health <= 0
	);
}

window.youWinColorTimer=0;
window.youWinColorTimerLimit=5;
window.startCelebratingTimer=90;

window.intro=60;