function TurnMenu(){
	if(!window.TurnMenuObject){
		window.TurnMenuObject={
			options:[
				{
					title:'Jump',
					points:1,
					enabled:true
				},
				{
					title:'Hit',
					points:1.5,
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
					So().txt.play();
				}
				
				if(I().pressed('ArrowUp')){
					this.optionID--;
					So().txt.play();
				}
				
				if(this.optionID < 0){
					this.optionID=this.options.length-1;
				}
				
				if(this.optionID >= this.options.length){
					this.optionID=0;
				}
				
				if(I().pressed(' ') && this.options[this.optionID].enabled){
					if(this.optionID == 1){
						this.options[this.optionID].enabled=false;
					}else{
						this.options[1].enabled=true;
					}
					
					F().playerMove=this.optionID;
					this.optionID=0;
					So().txt.play();
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
						(
							option.title
							+
							' ('
							+
							(
								TurnMenu().options[i].points
								+
								Math.round(
									TurnMenu().options[i].points
									*
									(P().level / 4)
								)
							)
							+
							' attack)'
							+
							(!option.enabled ? ' [can\'t]' : '')
						),
						32 * S().zoom,
						(16 + (8 * i)) * S().zoom
					);
				}
			}
		};
	}
	
	return window.TurnMenuObject;
}