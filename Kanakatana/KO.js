//onigiri: throws a rice ball out that attracts enemies to it
//after x amnt of frames, the onigiri goes away
//when an onigiri is on the map, all enemies.targetOfRage = onigiri
var Ko = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "Ko";
		this.abilityNum = 4;
      
      //change these to KO when those drawables are uploaded
		this.image = game.assets["ko.jpg"];
		this.image2 = game.assets["ko_romanji.png"];
      
      
		this.frame = 0;
		this.romanji = false;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() {
			/*if(this.ready && !this.romanji) {
			handler.currentAbility = this;
				handler.swapAll();
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
            //make a label to ask where the player wants to fire the bullet
            game.rootScene.addEventListener('touchstart', getCoords(evt)); 
				this.reset();
				handler.swapAll();
				handler.pickNewAbility(player);
			}
			else if(this.ready && this.romanji) {
				handler.currentAbility = null;
				handler.swapAll();
			}
		});*/
         this.makeKoru(player, 50, 50);
		});
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	makeKoru :function(player, targetX, targetY) {
   console.log("tx " + targetX + "ty " + targetY);
		var koru = new Koru(25, 25, player, targetX, targetY);
		entities.push(Koru);
		stage.addChild(Koru);
	}	
});