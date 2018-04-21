function I(){
	return window.Input;
}

var Input = {
	keys:[],
	oldkeys:[],
	
	down:function(k){
		return this.keys[k] == true;
	},
	
	up:function(k){
		return this.keys[k] != true;
	},
	
	pressed:function(k){
		return this.keys[k] == true && this.oldkeys[k] != true;
	},
	
	released:function(k){
		return this.keys[k] != true && this.oldkeys[k] == true;
	},
	
	keydown:function(e){
		I().keys[e.key]=true;
	},
	
	keyup:function(e){
		I().keys[e.key]=false;
	},
	
	update:function(){
		I().oldkeys=[];
		
		for(let i in I().keys){
			I().oldkeys[i]=I().keys[i];
		}
	}
};

window.addEventListener('keydown',I().keydown);
window.addEventListener('keyup',I().keyup);