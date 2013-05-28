//Handles the button the player presses. THis ability throws 4 squids in the cardinal directions. they slow enemies.
var Ki = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "I";
		this.abilityNum = 7;
		this.image = game.assets["ki.jpg"];
		this.image2 = game.assets["ki_romanji.png"];
		this.frame = 0;
		this.localPlayer = player;
		this.romanji = false;
		this.kirikabu;
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
				this.makeStump(this.localPlayer);	
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
	
	makeStump:function(player) {
		this.kirikabu = new Kirikabu(20, 20, player);
		this.kirikabu.x = player.x;
		this.kirikabu.y = player.y;
		entities.push(this.kirikabu);
		stage.addChild(this.kirikabu);
	}
		
});