// created by the I class. It becomes the "activeTarget" when It is ready to be placed. "activeTarget is a
// global variable that is used for abilities targeted with a click. This ability I makss an "Inazuma" 
// that becomes the active target. Clicking again anywhere activates the Inazuma and moves it to the click
// and sets active target to null/
var Inazuma = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.image = game.assets["Inazuma.png"]
		this.x = player.x - this.width/2;
		this.y = player.y - this. height;
		this.time = 30;
		this.image = game.assets["Inazuma.png"];
		this.frame = 0;
		this.active = false;
		activeTarget = this;

		this.addEventListener('enterframe', function() {
			this.decideBehavior();
		})
	},
	animate:function() {
		if(this.age % 2 == 0) {
			this.swapFrame();
		}
	},

	swapFrame:function() {
		if(this.frame == 0) {
			this.frame = 1;
		}
		else {
			this.frame = 0;
		}
	},
	
	decideBehavior:function() {
		if(this.active == true) {
			this.collision();
			this.animate();
			this.tick();
		}
	},
	
	collision:function() {
		for(var i = 0; i < entities.length; i++) {
			if(entities[i] instanceof Enemy && this.intersect(entities[i])) {
				entities[i].health--;
			}
		}
	},
	
	tick:function() {
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.active = false;
			this.dead = true;
		}
	},
	
	activate:function() {
		this.active = true;
		activeTarget = null;
		this.x -= this.width/2;
		this.y -= this.height/2;
	}
});