function So(){
	return window.Sounds;
}
window.addEventListener('load',function(){
	window.Sounds={
		death:new Howl({src:['death.wav']}),
		hurt:new Howl({src:['hurt.wav']}),
		jump:new Howl({src:['jump2.wav']}),
		level:new Howl({src:['level.wav']}),
		punch:new Howl({src:['punch.wav']}),
		txt:new Howl({src:['text.wav']}),
		vial:new Howl({src:['vial.wav']}),
		xp:new Howl({src:['xp.wav']}),
	};
});