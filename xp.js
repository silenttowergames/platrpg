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
	
	XPify:function(xp){
		let _xp="" + xp;
		
		while(_xp.length < 3){
			_xp="0" + _xp;
		}
		
		return _xp;
	},
	
	update:function(){
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
				
				if(P().XP <= this.xpRemain){
					P().XP=this.xpRemain;
					this.countdown=this.countdownLimit;
				}
			}else{
				if(--this.countdown > 0){
					if(this.countdown == this.countdownLimit / 2){
						P().level++;
						P().gravity=-3;
					}
				}else{
					this.xpRemain=null;
					this.cutscene=false;
				}
			}
		}
	}
};