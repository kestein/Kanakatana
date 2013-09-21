//REFACTOR: This is not part of the game. Remove this.
var Ika = Class.create (Sprite, {
	initialize:function(width, height, player, direction) {
		Sprite.call(this, width, height);				//based on player direction
		this.image = game.assets["ika.png"];
		this.direction = direction;
		this.frame = this.direction;
		this.hug = false;
		this.speed = 5;
		this.vx = 0;
		this.vy = 0;
		this.dead = false;
		this.time = 300;
		
		this.addEventListener('enterframe', function() {//REFACTOR: remove
			this.collision();
			if(!this.hug) {
				this.moveSquid();
			}
			else {
				this.tick();
			}
		});
	},
		
		moveSquid:function() {
		if(this.direction == 0) {
			this.vy = -this.speed;
		}
		else if(this.direction == 1) {
			this.vx = this.speed;
		}
		else if(this.direction == 2) {
			this.vy = this.speed;
		}
		else if(this.direction == 3) {
			this.vx = -this.speed;
		}
		//console.log(this.x);
		this.moveTo(this.x + this.vx , this.y + this.vy);
	},
	
	hugTarget:function(target) {
		if(target) {
			this.x = target.x;
			this.y = target.y;
			this.frame = 0;
			target.slowed = true;
		}
	},
	
	tick:function() {
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.dead = true;
		}
	},
	
	collision:function() {
		for(var i = 0; i < entities.length; i++) {
			if(entities[i] instanceof Enemy && this.intersect(entities[i])) {
				this.hug = true;
				this.hugTarget(entities[i]);
				//entities[i].slowed = true;
			}
		}
	}
});