//Handles the button the player presses. THis ability throws 4 squids in the cardinal directions. they slow enemies.
var I = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "I";
		this.abilityNum = 1;
		this.image = game.assets["i.jpg"];
		this.image2 = game.assets["i_romanji.png"];
		this.frame = 0;
		this.localPlayer = player;
		this.romanji = false;
		this.inazuma;
		this.s2;
		this.s3;
		this.s4;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() {
			if(this.ready && !this.romanji) {
				handler.swapAll();
				handler.currentAbility = this;
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
				this.makeSquids(this.localPlayer);	
				this.reset();
				handler.swapAll();
				handler.pickNewAbility(player);
			}
			else if(this.ready && this.romanji) {
				handler.swapAll();
				handler.currentAbility = null;
			}
			
			
		})
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	
	makeSquids:function(player) {
		this.inazuma = new Inazuma(32, 100, player);
		this.inazuma.x = player.x;
		this.inazuma.y = player.y;
		entities.push(this.inazuma);
		stage.addChild(this.inazuma);
	}
		
});