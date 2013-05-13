//onigiri: throws a rice ball out that attracts enemies to it
//after x amnt of frames, the onigiri goes away
//when an onigiri is on the map, all enemies.targetOfRage = onigiri
var O = Class.create (Ability, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.name = "O";
		this.abilityNum = 4;
		this.image = game.assets["o.jpg"];
		this.frame = 0;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		
		this.addEventListener('touchstart', function() {
			if(this.ready) {
				this.makeRiceBall(player);
				this.reset();
			}
		});
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	
	makeRiceBall:function(player) {
		var onigiri = new Onigiri(25, 25, player);
		entities.push(onigiri);
		stage.addChild(onigiri);
	}
		
});