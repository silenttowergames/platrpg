function F(set){
	if(set != undefined){
		window.FightObject=set;
	}
	
	return window.FightObject;
}

function Fight(){
	return {
		conversation:[
			'Hello there!',
			'Get hecked'
		],
		
		convoStringID:0,
		convoString:'',
		
		characterWait:0,
		characterWaitLimit:4,
		
		draw:function(){
			D().fillText(
				this.convoString,
				16 * S().zoom,
				8 * S().zoom
			);
		},
		
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
			}
		}
	};
}