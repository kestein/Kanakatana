//Handles the button the player presses. THis ability throws a pencil in the direction the player is currently facing.
var E = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.name = "E";
		this.frame = 0;
		
		this.addEventListener('touchstart', function() {
			this.makePencil(player);
			
		})
	},
	
	makePencil:function(player) {
		var enpitsu = new Enpitsu(50, 50, player);
		entities.push(enpitsu);
		stage.addChild(enpitsu);
	}
		
});