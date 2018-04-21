var Camera = {
	position:{
		X:0,
		Y:0
	},
	
	update:function(){
		let farthestRight=M()[M().length - 1].length * 8;
		let anchor=32;
		
		this.position.X=P().position.X - anchor;
		
		if(this.position.X < 0){
			this.position.X=0;
		}
		
		if(this.position.X + (S().size.X) > farthestRight){
			this.position.X=farthestRight - (S().size.X);
		}
		
		this.position.X *= S().zoom;
	}
};

function Cam(){
	return window.Camera;
}