//Handles the button the player presses. THis ability throws a pencil in the direction the player is currently facing.
var I = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.name = "I";
		this.image = game.assets["i.png"];
		this.frame = 0;
		
		this.addEventListener('touchstart', function() {
			this.makeSquids(player);
			
		})
	},
	
	makeSquids:function(player) {
		var s1 = new Squid(50, 50, player, 0);
		var s2 = new Squid(50, 50, player, 1);
		var s3 = new Squid(50, 50, player, 2);
		var s4 = new Squid(50, 50, player, 3);
		entities.push(s1);
		stage.addChild(s1);
		entities.push(s2);
		stage.addChild(s2);
		entities.push(s3);
		stage.addChild(s3);
		entities.push(s4);
		stage.addChild(s4);
	}
		
});