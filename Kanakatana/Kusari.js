//HIRIGANA: Ku
//this class handles the chain that Ku launches. 
var Kusari = Class.create (Sprite, {
	initialize:function(width, height, player, direction) {
		this.direction = direction;
		Sprite.call(this, width, height);			
		this.x = player.x;
		this.y = player.y;
		this.oldX = player.x
		this.name = "Kusari";
		this.speed = 12;
		this.vx = 0;
		this.vy = 0;
		this.dead = false;
		this.time = 100;
		this.damage = 0;
		this.attached = false;
		this.prisoner;
		this.image = game.assets["kusari.png"];
		
		this.addEventListener('enterframe', function() {
			this.moveChain();
			this.collide();
			this.tick();
			this.dieOnReturn();
		})
	},
	//moves the pencil in the direction it is facing.
	moveChain:function() {

		if(this.prisoner && this.direction == 0) {
			this.moveTo(this.x + this.speed/2, this.y);
			this.prisoner.moveTo(this.x + this.speed/2, this.y);
		}
		else if(this.prisoner && this.direction == 1) {
			this.moveTo(this.x - this.speed/2, this.y);
			this.prisoner.moveTo(this.x + this.speed/2, this.y);
		}
		else if(this.direction == 0) {
			this.moveTo(this.x - this.speed , this.y);
		}
		else if(this.direction == 1) {
			this.moveTo(this.x + this.speed , this.y);
		}
		
	},
	
	tick:function() {
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.active = false;
			this.dead = true;
		}
	},
	
	dieOnReturn:function() {
		
		if(this.direction == 1 && this.x < this.oldX ) {
			this.active = false;
			this.dead = true;
		}
		else if(this.direction == 0 && this.x > this.oldX ) {
			this.active = false;
			this.dead = true;
		}
	},

	collide:function() {
		for(var i = 0; i < entities.length; i++) {
			//console.log(this.intersect(entities[i]));
			if(entities[i] instanceof Enemy && this.intersect(entities[i])) {
				console.log("football");
				entities[i].stunTimer = this.time;
				entities[i].stunned = true;
				if(!this.prisoner) {
					this.prisoner = entities[i]
				}
			}
		}
	}
});