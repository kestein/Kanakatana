/*Handles the button the player presses. This ability throws 2 horizontal chains
 that stun and pull enemies
*/
var Ku = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "I";
		this.abilityNum = 7;
		this.image = game.assets["ku.jpg"];
		this.image2 = game.assets["ku_romanji.png"];
		this.frame = 0;
		this.localPlayer = player;
		this.romanji = false;
		this.kusari;
		this.kusari2;
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() //REFACTOR: move to its own function. in ability.
			if(this.ready && !this.romanji) {
				handler.swapAll();
				handler.currentAbility = this;
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
				this.makeChain(this.localPlayer);	
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
	
	makeChain:function(player) {
		this.kusari = new Kusari(40, 10, player, 0);
		this.kusari.x = player.x;
		this.kusari.y = player.y;
		entities.push(this.kusari);
		stage.addChild(this.kusari);
		this.kusari2 = new Kusari(40, 10, player, 1);
		this.kusari2.x = player.x;
		this.kusari2.y = player.y;
		entities.push(this.kusari2);
		stage.addChild(this.kusari2);
	}
		
});