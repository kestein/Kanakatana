// created by the Ki class. It becomes the "activeTarget" when It is ready to be placed. "activeTarget is a
// global variable that is used for abilities targeted with a click. This ability I makss an "Inazuma" 
// that becomes the active target. Clicking again anywhere activates the Kirikabu
// and moves it to the click and sets active target to null/
var Kirikabu = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.image = game.assets["kirikabu.png"]
		this.x = player.x - this.width/2;
		this.y = player.y - this. height;
		this.time = 160;
		this.activeTargetJump = true;
		this.frame = 0;
		this.active = false;
		activeTarget = this;

		this.addEventListener('enterframe', function() {
			this.decideBehavior();
		})
	},
	
	decideBehavior:function() {
		if(this.active == true) {
			this.collision();
			this.tick();
		}
	},
	
	collision:function() {
		for(var i = 0; i < entities.length; i++) {
			if(entities[i] instanceof Enemy && this.intersect(entities[i]) && this.active) {
				if(entities[i].x > this.x) {
					entities[i].x += 30;
				}
				else if(entities[i].x < this.x) {
					entities[i].x -= 30;
				}
				if(entities[i].y > this.y) {
					entities[i].y += 30;
				}
				else if(entities[i].y < this.y) {
					entities[i].y -= 30;
				}
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