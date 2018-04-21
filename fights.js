function F(set){
	if(set != undefined){
		window.FightObject=set;
	}
	
	return window.FightObject;
}

function Fight(getThreshold){
	return {
		conversation:[],
		
		convoStringID:0,
		convoString:'',
		
		characterWait:0,
		characterWaitLimit:4,
		
		yourTurn:false,
		turnEnding:false,
		playerMove:null,
		
		logic:function(){},
		
		draw:function(){
			D().fillText(
				this.convoString,
				16 * S().zoom,
				8 * S().zoom
			);
			
			
			
			if(this.yourTurn && this.playerMove == null){
				TurnMenu().draw();
			}
		},
		
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
		}
	};
}





function FirstFight(getThreshold){
	if(getThreshold){
		return 104;
	}
	
	let F=new Fight();
	
	F.conversation=[
		'Halt!',
		'. . .',
		'Fight me!'
	];
	
	F.e=window.FirstEnemy;
	
	F.logic=function(){
		if(this.yourTurn){
			if(this.playerMove == null){
				TurnMenu().update();
			}else{
				switch(this.playerMove){
					// Jump move
					case 0:
						break;
					
					// Hit move
					case 1:
						break;
					
					default:
						this.playerMove=null;
						break;
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
					this.e.gravity-=7;
					this.turnEnding=true;
				}
				
				if(this.e.jump){
					this.e.jump=false;
				}else if(this.e.position.X == P().position.X + 28){
					this.e.jump=true;
				}
			}
		}
	};
	
	return F;
}