function Vial(X, Y){
	return {
		position:{
			X:X,
			Y:Y
		},
		
		used:false,
		
		update:function(){
			if(this.used){
				return;
			}
			
			if(
				P().position.X + 8 >= this.position.X
				&&
				P().position.X < this.position.X + 8
				&&
				P().position.Y + 8 >= this.position.Y
				&&
				P().position.Y < this.position.Y + 8
			){
				P().XP+=50;
				P().health=5;
				this.used=true;
			}
		},
		
		draw:function(){
			if(this.used){
				return;
			}
			
			D().drawImage(
				G(),
				1 + (9 * 2),
				1 + (9 * 3),
				8,
				8,
				(this.position.X * S().zoom) - Cam().position.X,
				this.position.Y * S().zoom,
				8 * S().zoom,
				8 * S().zoom
			);
		}
	};
}

var Vial0=new Vial(
	110 * 8,
	8
);

var Vial1=new Vial(
	216 * 8,
	8 * 2
);