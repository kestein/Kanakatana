//HIRIGANA: Ke
//this class handles the chain that Ke launches. 
var Ketsueki = Class.create (Sprite, {
	initialize:function(width, height, player) {
		this.direction = player.direction;
		this.localPlayer = player;
		Sprite.call(this, width, height);			
		this.x = player.x;
		this.y = player.y;
		this.name = "Ketsueki";
		this.speed = 3;
		this.vx = 0;
		this.vy = 0;
		this.dead = false;
		this.time = 200;
		this.damage = 1;
		this.attached = false;
		this.bloodied = false;
		this.image = game.assets["ketsueki.png"];
		this.frame = 0;
		
		this.addEventListener('enterframe', function() {
			this.moveBlood();
			this.collide();
			//this.x += 1;
			this.tick();

		})
	},
	//moves the pencil in the direction it is facing.
	moveBlood:function() {
		var vx = 0;
		var vy = 0;
		if(this.bloodied || this.age > 80) {
			if(this.x > this.localPlayer.x) {
				vy = -this.speed;
			}
			else if(this.x < this.localPlayer.x) {
				vx = this.speed;
			}
			if(this.y > this.localPlayer.y) {
				vy = -this.speed;
			}
			else if(this.y < this.localPlayer.y) {
				vy = this.speed;
			}
		}
		else {
			if(this.direction == 0) {
				vy = -this.speed;
			}
			else if(this.direction == 1) {
				vx = this.speed;
			}
			else if(this.direction == 2) {
				vy = this.speed;
			}
			else if(this.direction == 3) {
				vx = -this.speed;
			}
		}
		//console.log(vx + " " + vy);
		this.moveTo(this.x + vx , this.y + vy);
		
	},
	
	tick:function() {
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.active = false;
			this.dead = true;
		}
	},
	

	collide:function() {
		for(var i = 0; i < entities.length; i++) {
			//console.log(this.intersect(entities[i]));
			if(entities[i] instanceof Enemy && this.intersect(entities[i])) {
				if(!this.bloodied) {
					entities[i].health -= this.damage;
					this.bloodied = true;
					this.frame = 1;
				}
			}
			if(entities[i] instanceof Player && this.intersect(entities[i])) {
				if(this.bloodied) {
					entities[i].health += this.damage;
					this.bloodied = true;
				}
				if(this.age > 30) {
					this.dead = true;
				}
			}
		}
	}
});