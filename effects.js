function Ef(){
	return window.Effects;
}

var Effects = {
	list:[],
	
	update:function(){
		for(let i in this.list){
			let effect=this.list[i];
			
			effect.position.Y--;
			if(effect.expires-- <= 0){
				this.list.splice(i,1);
			}
		}
	},
	
	draw:function(){
		D().fillStyle='#F00';
		D().font=(2 * S().zoom) + 'px PressStart2P';
		
		for(let i in this.list){
			let effect=this.list[i];
			
			D().fillText(
				effect.title,
				(effect.position.X * S().zoom) - Cam().position.X,
				effect.position.Y * S().zoom
			);
		}
	},
	
	new:function(power, X, Y){
		this.list.push({
			title:power,
			expires:30,
			position:{
				X:X,
				Y:Y
			}
		});
	},
};