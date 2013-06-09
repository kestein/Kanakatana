var CreditSheet = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		
		this.image = game.assets["Credits.png"];
		this.creditAmount = new Label();
		this.creditAmount.scale(2, 2);
		this.creditAmount.x = 540;
		this.creditAmount.y = 40;
		if(player) {
			this.creditAmount.text = player.credits.toString();
		}
		else {
			this.creditAmount.text = 'error';
		}
		
		this.addEventListener('enterframe', function() {	
			this.updateScore(player);
        });
		
		this.addEventListener('removed', function() {	
			this.removeLabel();
        });
		
		this.addEventListener('addedtoscene', function() {	
			hud.addChild(this.creditAmount);
        });
	},
	
	updateScore: function(player) {
		if(player) {
			this.creditAmount.text = player.credits.toString();
		}
		else {
			this.creditAmount.text = 'error';
		}
	},
	
	removeLabel: function(player) {
		hud.removeChild(this.creditAmount);
	}
});