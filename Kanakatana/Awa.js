var Awa = Class.create (Sprite, {
	initialize:function(width, height, player, direction) {
		Sprite.call(this, width, height);				//based on player direction
		this.image = game.assets["awa.png"];
		this.direction = direction;
		this.frame = this.direction;
		this.hug = false;
		this.speed = 5;
		this.vx = 0;
		this.vy = 0;
		this.dead = false;
		this.opacity = 0.7;
		this.time = 300;
		
		this.addEventListener('enterframe', function() {
			this.stayOnPlayer(player);
			this.tick();
			this.collision();
		});
	},
	
	stayOnPlayer:function(player) {
		this.x = player.x - this.width/2 + player.width/2;
		this.y = player.y - this.height/2 + player.height/2;
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
				entities[i].stunTimer = 80;
				entities[i].stunned = true;
			}
		}
	}
	
});