//Handles the button the player presses. This ability transforms the player into a speedy bunny.
//the associated functions are stored in player, as the ability still needs to be handled even after the
// 'U' class sprite dissapears
var U = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "U";
		this.abilityNum = 2;
		this.image = game.assets["u.jpg"];
		this.image2 = game.assets["u_romanji.png"];
		this.frame = 0;
		this.romanji = false;
		
		this.bunnyDuration = 0;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		
		this.isBunny = false;
		
		this.storeImage;
		this.storeFrame;
		this.storeSpeed;
		this.addEventListener('touchstart', function() {
			if(this.ready && !this.romanji) {
				handler.swapAll();
				handler.currentAbility = this;
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
				player.becomeBunny();
				this.reset();
				handler.swapAll();
				handler.pickNewAbility(player);
			}
			else if(this.ready && this.romanji) {
				handler.swapAll();
				handler.currentAbility = null;
			}
		});
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
			
		})
	}
		
});