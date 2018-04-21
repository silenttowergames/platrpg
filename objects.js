function O(){
	return {
		// Most stuff
		animation:{
			list:{
				idle:[
					[ 0, 20 ],
					[ 1, 20 ]
				],
				
				walk:[
					[ 4, 5 ],
					[ 0, 5 ]
				]
			},
			
			animID:'idle',
			
			frameID:0,
			
			duration:0
		},
		
		draw:function(){
			let animation;
			let frame;
			
			if(--this.animation.duration <= 0){
				if(++this.animation.frameID >= this.animation.list[this.animation.animID].length){
					this.animation.frameID=0;
				}
				
				this.animation.duration=this.animation.list[this.animation.animID][this.animation.frameID][1];
			}
			
			animation=this.animation.list[this.animation.animID];
			frame=animation[this.animation.frameID];
			
			D().drawImage(
				G(),
				1 + (frame[0] * 9),
				1 + (9 * this.textureY),
				8,
				8,
				this.position.X * S().zoom,
				this.position.Y * S().zoom,
				8 * S().zoom,
				8 * S().zoom
			);
		},
		
		hitbox:function(){
			return {
				X:this.X,
				Y:this.Y,
				W:8,
				H:8
			};
		},
		
		position:{
			X:0,
			Y:0
		},
		
		textureY:0,
		
		
		
		
		
		// Gameplay meta functions
		
		touchingBottom:function(isWhile){
			let
				X=Math.floor(this.position.X / 8),
				Y=Math.floor((this.position.Y + 8 - (isWhile == true ? 1 : 0)) / 8)
			;
			
			for(let y=Y;y<Y+1;y++){
				if(y < 0 || y >= M().length){
					continue;
				}
				
				for(let x=X;x<X+1;x++){
					if(x < 0 || x >= M()[y].length){
						continue;
					}
					
					if(Solids().indexOf(M()[y][x]) != -1){
						return true;
					}
				}
			}
			
			return false;
		},
		
		
		
		
		
		// Gameplay variables
		gravity:0,
		gravityLimit:5,
		
		
		
		
		
		// Gameplay function
		update:function(){
			// Perform gravity math
			if(this.touchingBottom()){
				while(this.touchingBottom(true)){
					this.position.Y--;
				}
				
				this.gravity=0;
			}else{
				if(this.gravity < this.gravityLimit){
					this.gravity++;
				}
			}
			
			
			
			
			
			// Move object
			this.position.Y += this.gravity;
		}
	};
}

function P(){
	if(window.player == undefined){
		let p=new O();
		window.player=p;
	}
	
	return window.player;
}