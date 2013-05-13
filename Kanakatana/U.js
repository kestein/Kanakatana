//Handles the button the player presses. THis ability throws a pencil in the direction the player is currently facing.
var U = Class.create (Ability, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.name = "U";
		this.abilityNum = 2;
		this.image = game.assets["u.jpg"];
		this.frame = 0;
		
		this.duration = 0;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		
		this.isBunny = false;
		
		this.storeImage;
		this.storeFrame;
		this.storeSpeed;
		
		this.addEventListener('touchstart', function() {
			if(this.ready) {
				this.becomeBunny(player);
				this.reset();
				//console.log(player);
			}
		});
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
			this.timeDown(player);
			
		})
	},
	
	becomeBunny:function(player) {
		this.storeImage = player.image;
		this.storeFrame = player.frame;
		this.storeSpeed = player.speed;
		player.image = game.assets["usagi.png"];
		player.frame = 0;
		player.speed = player.speed * 2;
		this.duration = 100;
		this.isBunny = true;
	},
	
	timeDown:function(player) {
	//console.log(player);
		if (this.duration > 0) {
			this.duration--;
		}
		else if(this.isBunny){
			this.duration = 0;
			this.isBunny = false;
			this.becomeHuman(player);
		}
	},
	
	becomeHuman:function(player) {
		player.image = player.image = game.assets["chars.gif"];
		console.log(player);
		player.frame = this.storeFrame;
		player.speed = this.storeSpeed;
	}
		
});