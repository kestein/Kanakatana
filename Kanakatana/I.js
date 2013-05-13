//Handles the button the player presses. THis ability throws 4 squids in the cardinal directions. they slow enemies.
var I = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "I";
		this.abilityNum = 1;
		this.image = game.assets["i.jpg"];
		this.image2 = game.assets["i_romanji.png"];
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
				this.makeSquids(this.localPlayer);	
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
	
	makeSquids:function(player) {
		this.s1 = new Ika(50, 50, player, 0);
		this.s2 = new Ika(50, 50, player, 1);
		this.s3 = new Ika(50, 50, player, 2);
		this.s4 = new Ika(50, 50, player, 3);
		this.s1.x = player.x;
		this.s1.y = player.y;
		this.s2.x = player.x;
		this.s2.y = player.y;
		this.s3.x = player.x;
		this.s3.y = player.y;
		this.s4.x = player.x;
		this.s4.y = player.y;
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