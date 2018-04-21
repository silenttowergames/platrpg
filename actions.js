function loop(){
	if(window.interval == undefined){
		window.interval=setInterval(loop, 1000 / 60);
	}
	
	update();
	draw();
}

function update(){
	
}

function draw(){
	D().clearRect(0,0,C().width,C().height);
	
	D().fillStyle='#000';
	D().fillRect(0,0,C().width,C().height);
	
	D().imageSmoothingEnabled=false;
	
	D().drawImage(
		G(),
		1,
		1,
		8,
		8,
		0,
		0,
		8 * S().zoom,
		8 * S().zoom
	);
}