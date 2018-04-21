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
			
			if(this.flip){
				D().scale(-1,1);
			}
			
			D().drawImage(
				G(),
				1 + (frame[0] * 9),
				1 + (9 * this.textureY),
				8,
				8,
				(this.position.X + (this.flip ? 8 : 0)) * S().zoom * (this.flip ? -1 : 1) - (Cam().position.X * (this.flip ? -1 : 1)),
				this.position.Y * S().zoom,
				8 * S().zoom,
				8 * S().zoom
			);
			
			if(this.flip){
				D().scale(-1,1);
			}
		},
		
		flip:false,
		
		hitbox:function(){
			return {
				X:this.X,
				Y:this.Y,
				W:8,
				H:8
			};
		},
		
		position:{
			X:32,
			Y:32
		},
		
		textureY:0,
		
		
		
		
		
		// Gameplay meta functions
		
		touchingBottom:function(isWhile){
			let
				X=[
					Math.floor((this.position.X + 1) / 8),
					Math.floor((this.position.X + 6) / 8)
				],
				Y=Math.floor((this.position.Y + 8 - (isWhile ? 1 : 0)) / 8)
			;
			
			for(let y=Y;y<Y+1;y++){
				if(y < 0 || y >= M().length){
					continue;
				}
				
				for(let x=0;x<X.length;x++){
					let xx=X[x];
					
					if(xx < 0 || xx >= M()[y].length){
						continue;
					}
					
					if(Solids().indexOf(M()[y][xx]) != -1){
						return true;
					}
				}
			}
			
			return false;
		},
		
		touchingRight:function(isWhile){
			let
				Y=[
					Math.floor((this.position.Y + 1) / 8),
					Math.floor((this.position.Y + 6) / 8)
				],
				X=Math.floor((this.position.X + 7 - (isWhile ? 1 : 0)) / 8)
			;
			
			for(let y=0;y<Y.length;y++){
				let yy=Y[y];
				
				if(yy < 0 || yy >= M().length){
					continue;
				}
				
				for(let x=X;x<X+1;x++){
					if(x < 0 || x >= M()[yy].length){
						continue;
					}
					
					if(Solids().indexOf(M()[yy][x]) != -1){
						return true;
					}
				}
			}
			
			return false;
		},
		
		touchingLeft:function(isWhile){
			let
				Y=[
					Math.floor((this.position.Y + 1) / 8),
					Math.floor((this.position.Y + 6) / 8)
				],
				X=Math.floor((this.position.X - (isWhile ? 1 : 0)) / 8)
			;
			
			for(let y=0;y<Y.length;y++){
				let yy=Y[y];
				
				if(yy < 0 || yy >= M().length){
					continue;
				}
				
				for(let x=X;x<X+1;x++){
					if(x < 0 || x >= M()[yy].length){
						continue;
					}
					
					if(Solids().indexOf(M()[yy][x]) != -1){
						return true;
					}
				}
			}
			
			return false;
		},
		
		touchingTop:function(isWhile){
			let
				X=[
					Math.floor((this.position.X + 1) / 8),
					Math.floor((this.position.X + 6) / 8)
				],
				Y=Math.floor((this.position.Y - (isWhile ? 1 : 0)) / 8)
			;
			
			for(let y=Y;y<Y+1;y++){
				if(y < 0 || y >= M().length){
					continue;
				}
				
				for(let x=0;x<X.length;x++){
					let xx=X[x];
					
					if(xx < 0 || xx >= M()[y].length){
						continue;
					}
					
					if(Solids().indexOf(M()[y][xx]) != -1){
						return true;
					}
				}
			}
			
			return false;
		},
		
		update:function(){},
		
		
		
		
		
		// Gameplay variables
		gravity:0,
		gravityLimit:5,
		
		coyoteTime:0,
		coyoteTimeLimit:10,
		
		attack:false,
		jump:false,
		moveLeft:false,
		moveRight:false,
		
		
		
		
		
		// Gameplay function
		logic:function(){
			// Jumping
			if(this.jump && this.coyoteTime < this.coyoteTimeLimit){
				this.gravity=-4;
			}
			
			
			
			
			
			// Walking
			let Xmove=0;
			if(this.moveRight){
				this.flip=false;
				Xmove++;
			}
			
			if(this.moveLeft){
				this.flip=true;
				Xmove--;
			}
			
			
			
			
			
			// Move object
			this.position.X += Xmove;
			this.position.X=Math.round(this.position.X);
			
			this.position.Y += this.gravity;
			this.position.Y=Math.round(this.position.Y);
			
			
			
			
			
			// Ceilings
			while(this.touchingTop()){
				this.position.Y++;
				this.gravity=0;
			}
			
			
			
			
			
			// Perform gravity math
			if(this.touchingBottom()){
				this.coyoteTime=0;
				
				while(this.touchingBottom(true)){
					this.position.Y--;
				}
				
				this.gravity=0;
			}else{
				if(this.gravity < this.gravityLimit){
					this.gravity+=0.3;
				}
				
				this.coyoteTime++;
			}
			
			
			
			
			
			// Walls
			while(this.touchingRight()){
				this.position.X--;
			}
			
			while(this.touchingLeft()){
				this.position.X++;
			}
		}
	};
}

function P(){
	if(window.player == undefined){
		let p=new O();
		
		p.update=function(){
			if(!F()){
				this.moveRight=I().down('ArrowRight');
				this.moveLeft=I().down('ArrowLeft');
				this.attack=I().down('ArrowDown');
				this.jump=I().pressed('ArrowUp');
			}else{
				this.moveRight=this.moveLeft=this.attack=this.jump=false;
			}
			
			this.logic();
		};
		
		window.player=p;
	}
	
	return window.player;
}

function E(){
	let e=new O();
	
	e.flip=true;
	
	e.position.X=e.position.initX=180;
	
	e.update=function(){
		this.logic();
	};
	
	return e;
}

var FirstEnemy=new E();