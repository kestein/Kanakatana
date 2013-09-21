//Handles the button the player presses. THis ability throws a pencil in the direction the player is currently facing.
var E = Class.create (Ability, {
	initialize:function(width, height, player, handler) {
		Sprite.call(this, width, height);
		this.name = "E";
		this.abilityNum = 3;
		this.image = game.assets["e.jpg"];
		this.image2 = game.assets["e_romanji.png"];
		this.frame = 0;
		this.romanji = false;
		
		this.ready = false;
		this.chargeRate = 0.02;
		this.opacity = 0;
		this.addEventListener('touchstart', function() {//REFACTOR: move to its own function
			if(this.ready && !this.romanji) {
				handler.currentAbility = this;
				handler.swapAll();
			}
			else if(this.ready && this.romanji && handler.currentAbility == this) {
				this.makePencil(player);
				this.reset();
				handler.swapAll();
				handler.pickNewAbility(player);
			}
			else if(this.ready && this.romanji) {
				handler.currentAbility = null;
				handler.swapAll();
			}
		});
		
		this.addEventListener('enterframe', function() {
			this.cooldown();
		})
	},
	
	makePencil:function(player) {
		var enpitsu = new Enpitsu(50, 50, player);
		entities.push(enpitsu);
		stage.addChild(enpitsu);
	}
		
});