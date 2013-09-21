//Handles the button the player presses. This ability spins a Katana in the cardinal directions.
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
		this.katana;
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		
		this.addEventListener('touchstart', function() {//REFACTOR: add to its own function. need temp vars?
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
		this.katana = new Katana(50, 50, player, 0);

		entities.push(this.katana);
		stage.addChild(this.katana);

	}
		
});