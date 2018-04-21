function TurnMenu(){
	if(!window.TurnMenuObject){
		window.TurnMenuObject={
			options:[
				{
					title:'Jump Attack',
					points:2,
					enabled:true
				},
				{
					title:'Hit Attack',
					points:3,
					enabled:true
				},
				{
					title:'Psychic',
					points:0,
					enabled:true
				}
			],
			
			optionID:0,
			
			update:function(){
				if(F()){
					this.options[2].enabled=!F().psychic;
				}
				
				if(I().pressed('ArrowDown')){
					this.optionID++;
				}
				
				if(I().pressed('ArrowUp')){
					this.optionID--;
				}
				
				if(this.optionID < 0){
					this.optionID=this.options.length-1;
				}
				
				if(this.optionID >= this.options.length){
					this.optionID=0;
				}
				
				if(I().pressed(' ')){
					F().playerMove=this.optionID;
					this.optionID=0;
				}
			},
			
			draw:function(){
				D().fillText(
					"Choose Your Move:",
					32 * S().zoom,
					8 * S().zoom
				);
				
				for(let i in this.options){
					let option=this.options[i];
					let drawColor='#FFF';
					
					if(i == this.optionID){
						if(option.enabled){
							drawColor='#F00';
						}else{
							drawColor='#900';
						}
					}else{
						if(!option.enabled){
							drawColor='#999';
						}
					}
					
					D().fillStyle=drawColor;
					
					D().fillText(
						option.title + (!option.enabled ? ' [can\'t]' : ''),
						32 * S().zoom,
						(16 + (8 * i)) * S().zoom
					);
				}
			}
		};
	}
	
	return window.TurnMenuObject;
}