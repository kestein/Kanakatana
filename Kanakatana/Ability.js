//Handles the button the player presses. This is the superclass of all buttons
var Ability = Class.create (Sprite, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.frame = 0;
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.image2;
		this.romanji = false;
		
		this.addEventListener('enterframe', function() {//REFACTOR: set cooldown
			//this.cooldown();
		});
		this.addEventListener('touchstart', function() {//REFACTOR: remove
			console.log(ready);
		});
	},
	//adds opacity to the image, when it hits 1, it takes the ability off cooldown
	cooldown:function() {
		if(!this.ready) {
			this.opacity += this.chargeRate;
			if(this.opacity >= 1) {
				this.opacity = 1;
				this.ready = true;
			}
			
		}
	},
	// makes the ability unsuable until it comes off cooldown.
	reset:function() {
		this.ready = false;
		this.opacity = 0
	},
	
	//swaps the hirigana and romanji images. is used in AbilityHandler
	swapImage:function() {
		var tempImage = this.image;
		this.image = this.image2;
		this.image2 = tempImage;
		this.romanji = !this.romanji;
	}
	
		
});