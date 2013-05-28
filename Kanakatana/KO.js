//koru: shoots a volly of ice balls that freeze and damage enemies.
var Ko = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "Ko";
		this.abilityNum = 6;
      
		this.image = game.assets["ko.jpg"];
		this.image2 = game.assets["ko_romanji.png"];
		this.frame = 0;
		this.romanji = false;
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() {
			if(this.ready && !this.romanji) {
				handler.swapAll();
				handler.currentAbility = this;
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
				this.makeKoru(player);	
				this.reset();
				handler.swapAll();
				handler.pickNewAbility(player);
			}
			else if(this.ready && this.romanji) {
				handler.swapAll();
				handler.currentAbility = null;
			}
			
			
		})
         //this.makeKoru(player, 50, 50);
		 this.addEventListener('enterframe', function() {
			this.cooldown();
		})
		
	},
	makeKoru :function(player) {
		var koru1 = new Koru(25, 25, player, 0);
		entities.push(koru1);
		stage.addChild(koru1);
		var koru2 = new Koru(25, 25, player, 1);
		entities.push(koru2);
		stage.addChild(koru2);
		var koru3 = new Koru(25, 25, player, 1);
		entities.push(koru3);
		stage.addChild(koru3);
		var koru4 = new Koru(25, 25, player, 1);
		entities.push(koru4);
		stage.addChild(koru4);
		var koru5 = new Koru(25, 25, player, 1);
		entities.push(koru5);
		stage.addChild(koru5);
	},
	
	randomSpot: function(center) {
		var random = Math.random()*200 - 100;
		return center + random;
	}
});