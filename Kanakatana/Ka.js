//Handles the button the player presses. This ability throws 4 Katanas in the cardinal directions.
// They Damage enemies.
var Ka = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "Ka";
		this.abilityNum = 5;
		this.image = game.assets["ka.jpg"];
		this.image2 = game.assets["ka_romanji.png"];
		this.frame = 0;
		this.localPlayer = player;
		this.romanji = false;
		this.s1;
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
				this.makeKatanas(this.localPlayer);	
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
	
	makeKatanas:function(player) {
		this.s1 = new Katana(50, 50, player, 0);
		this.s2 = new Katana(50, 50, player, 1);
		this.s3 = new Katana(50, 50, player, 2);
		this.s4 = new Katana(50, 50, player, 3);
		entities.push(this.s1);
		stage.addChild(this.s1);
		entities.push(this.s2);
		stage.addChild(this.s2);
		entities.push(this.s3);
		stage.addChild(this.s3);
		entities.push(this.s4);
		stage.addChild(this.s4);
	}
		
});