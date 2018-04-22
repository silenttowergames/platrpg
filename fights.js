function F(set){
	if(set !== undefined){
		window.FightObject=set;
	}
	
	return window.FightObject;
}

function Fight(){
	return {
		conversation:[],
		
		convoStringID:0,
		convoString:'',
		
		characterWait:0,
		characterWaitLimit:4,
		
		yourTurn:true,
		turnEnding:false,
		playerMove:null,
		
		psychic:false,
		
		dead:null,
		
		draw:function(){
			D().fillText(
				this.convoString,
				16 * S().zoom,
				8 * S().zoom
			);
			
			
			
			if(this.dead == null && this.convoStringID >= this.conversation.length && this.yourTurn && this.playerMove == null){
				TurnMenu().draw();
			}
		},
		// draw()
		
		e:null,
		
		update:function(){
			// If the conversation is still happening
			if(this.convoStringID >= 0 && this.convoStringID < this.conversation.length){
				// If this line isn't done being written yet
				if(this.convoString.length < this.conversation[this.convoStringID].length){
					// Press space to finish this line
					if(I().pressed(' ')){
						this.convoString=this.conversation[this.convoStringID];
					// Or, wait for it to finish writing itself
					}else{
						if(this.characterWait++ >= this.characterWaitLimit){
							this.convoString += this.conversation[this.convoStringID].substr(this.convoString.length, 1);
							this.characterWait=0;
						}
					}
				// If the line is done being written
				}else{
					// If space is pressed again, go to the next line
					// Or, finish the conversation
					if(I().pressed(' ')){
						this.convoString='';
						this.convoStringID++;
					}
				}
			}else{
				this.logic();
			}
		},
		// update()
		
		
		
		
		
		logic:function(){
			let alreadyDead=this.dead != null;
			
			if(
				P().position.X == this.threshold
				&&
				this.e.position.X == this.e.position.initX
				&&
				(
					(P().health <= 0 && (this.dead = P()))
					||
					(this.e.health <= 0 && (this.dead=this.e))
				)
			){
				if(!alreadyDead){
					this.dead.gravity=-5;
				}
				
				this.dead.touchingBottom=this.dead.touchingTop=this.dead.touchingLeft=this.dead.touchingRight=function(){return false;}
				return;
			}
			
			if(this.yourTurn){
				if(this.playerMove == null){
					TurnMenu().update();
				}else{
					if(this.turnEnding){
						if(P().position.X > this.threshold){
							P().moveLeft=!(P().moveRight=false);
						}else{
							P().moveLeft=false;
							P().flip=false;
							P().position.X=this.threshold;
							this.playerMove=null;
							this.turnEnding=false;
							this.yourTurn=false;
						}
					}else{
						switch(this.playerMove){
							// Jump move
							case 0:
								P().moveRight=P().position.X < this.e.position.X;
								
								if(P().jump){
									P().jump=false;
								}else if(P().position.X == this.e.position.X - 32){
									P().jump=true;
								}
								
								if(
									P().position.X > this.e.position.X - 8
									&&
									P().position.Y > this.e.position.Y - 8
								){
									P().gravity=-3;
									this.turnEnding=true;
									P().moveLeft=!(P().moveRight=false);
									this.e.health-=(hpm=TurnMenu().options[this.playerMove].points + Math.round(TurnMenu().options[this.playerMove].points * (P().level / 4)));
									Ef().new(
										hpm,
										this.e.position.X + 8,
										this.e.position.Y
									);
								}
								
								break;
							
							// Hit move
							case 1:
								if(P().moveRight && P().position.X >= this.e.position.X - 12){
									P().attacking=P().attackingLimit;
								}
								
								P().moveRight=P().position.X < this.e.position.X - 12;
								
								if(!P().moveRight && P().attacking <= 0){
									this.turnEnding=true;
									this.e.health-=(hpm=TurnMenu().options[this.playerMove].points + Math.round(TurnMenu().options[this.playerMove].points * (P().level / 4)));
									Ef().new(
										hpm,
										this.e.position.X + 8,
										this.e.position.Y
									);
								}
								
								break;
							
							case 2:
								this.psychic=true;
								this.playerMove=null;
								this.yourTurn=false;
								break;
							
							default:
								this.playerMove=null;
								this.turnEnding=true;
								break;
						}
					}
				}
			}else{
				if(this.turnEnding){
					if(this.e.position.X < this.e.position.initX){
						this.e.moveLeft=!(this.e.moveRight=true);
					}else{
						this.e.moveRight=false;
						this.e.flip=true;
						this.e.position.X=this.e.position.initX;
						this.turnEnding=false;
						this.yourTurn=true;
					}
				}else{
					this.e.moveLeft=this.e.position.X > P().position.X;
					
					if(
						this.e.position.X < P().position.X + 8
						&&
						this.e.position.Y > P().position.Y - 8
					){
						this.e.gravity=-3;
						this.turnEnding=true;
						P().health-=this.e.attackPower;
						Ef().new(
							this.e.attackPower,
							P().position.X,
							P().position.Y
						);
					}
					
					if(this.e.jump){
						this.e.jump=false;
					}else if(this.e.position.X == P().position.X + 28){
						this.e.jump=true;
					}
				}
			}
		},
		// logic()
	};
}





function FirstFight(getThreshold){
	let threshold=204;
	
	if(getThreshold){
		return threshold;
	}
	
	let F=new Fight();
	
	F.threshold=threshold;
	
	F.conversation=[
		'Halt!',
		'. . .',
		'Fight me!'
	];
	
	F.e=window.FirstEnemy;
	
	return F;
}