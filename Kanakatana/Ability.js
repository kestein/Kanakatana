//Handles the button the player presses. This is the superclass of all buttons
var Ability = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.frame = 0;
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	
	cooldown:function() {
	
		if(!this.ready) {
			this.opacity += this.chargeRate;
			if(this.opacity >= 1) {
				this.opacity = 1;
				this.ready = true;
			}
			
		}
	},
	reset:function() {
		this.ready = false;
		this.opacity = 0
	}
	
		
});