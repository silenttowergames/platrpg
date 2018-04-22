function XP(){
	return window.XPvars;
}

var XPvars = {
	limits:[
		100,
		250,
		500,
		1000,
		1
	],
	
	cutscene:false,
	xpRemain:null,
	
	countdown:0,
	countdownLimit:120,
	
	currentLevel:0,
	currentXP:0,
	
	lastCheckpoint:8,
	lastCheckpointBuffer:8,
	
	XPify:function(xp){
		let _xp="" + xp;
		
		while(_xp.length < 3){
			_xp="0" + _xp;
		}
		
		return _xp;
	},
	
	update:function(){
		if(F()){
			this.lastCheckpointBuffer=F().threshold;
		}else if(this.lastCheckpointBuffer > this.lastCheckpoint){
			this.lastCheckpoint=this.lastCheckpointBuffer;
		}
		
		this.currentLevel=P().level;
		this.currentXP=P().XP;
		
		let limit=XP().limits[P().level];
		
		if(P().XP >= limit){
			this.cutscene=true;
		}
		
		if(this.cutscene){
			if(this.xpRemain == null){
				this.xpRemain=P().XP - limit;
			}
			
			if(P().XP > this.xpRemain){
				P().XP-=Math.ceil((P().XP - this.xpRemain) / 30);
				
				So().xp.play();
				
				if(P().XP <= this.xpRemain){
					P().XP=this.xpRemain;
					this.countdown=this.countdownLimit;
				}
			}else{
				if(--this.countdown > 0){
					if(this.countdown == this.countdownLimit / 2){
						P().level++;
						P().gravity=-3;
						Ef().new(
							'Level up!',
							P().position.X,
							P().position.Y - 16
						);
						So().level.play();
					}
				}else{
					this.xpRemain=null;
					this.cutscene=false;
				}
			}
		}
	}
};