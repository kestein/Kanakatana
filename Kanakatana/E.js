//Handles the button the player presses. THis ability throws a pencil in the direction the player is currently facing.
var E = Class.create (Ability, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.name = "E";
		this.abilityNum = 3;
		this.image = game.assets["e.jpg"];
		this.frame = 0;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		
		this.addEventListener('touchstart', function() {
			if(this.ready) {
				this.makePencil(player);
				this.reset();
			}
		});
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	
	makePencil:function(player) {
		var enpitsu = new Enpitsu(50, 50, player);
		entities.push(enpitsu);
		stage.addChild(enpitsu);
	}
		
});