//Handles the button the player presses. THis ability throws a pencil in the direction the player is currently facing.
var A = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "A";
		this.abilityNum = 0;
		this.image = game.assets["a.jpg"];
		this.image2 = game.assets["a_romanji.png"];
		this.frame = 0;
		this.romanji = false;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() {
			if(this.ready && this.romanji && handler.currentAbility == this) {
				this.makeBubble(player);
				this.reset();
				handler.swapAll();
				handler.pickNewAbility(player);
			}
			else if(this.ready && this.romanji) {
				handler.swapAll();
				handler.currentAbility = null;
			}
			else if(this.ready) {
				handler.swapAll();
				handler.currentAbility = this;
			}
		});
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	
	makeBubble:function(player) {
		var awa = new Awa(64, 64, player);
		entities.push(awa);
		stage.addChild(awa);
	}
		
});