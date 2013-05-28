//Handles the button the player presses. THis ability throws 4 squids in the cardinal directions. they slow enemies.
var Ke = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "I";
		this.abilityNum = 8;
		this.image = game.assets["ke.jpg"];
		this.image2 = game.assets["ke_romanji.png"];
		this.frame = 0;
		this.localPlayer = player;
		this.romanji = false;
		this.ketsueki;
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() {
			if(this.ready && !this.romanji) {
				handler.swapAll();
				handler.currentAbility = this;
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
				this.makeBlood(this.localPlayer);	
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
	
	makeBlood:function(player) {
		this.ketsueki = new Ketsueki(20, 20, player);
		this.ketsueki.x = player.x;
		this.ketsueki.y = player.y;
		entities.push(this.ketsueki);
		stage.addChild(this.ketsueki);
	}
		
});