//HIRIGANA: Ke
//REFACTOR: description
var Ketsueki = Class.create (Sprite, {
	initialize:function(width, height, player, directionMode, spawn) {
		if(directionMode == 4) {
			this.direction = player.direction;
		}
		else {
			this.direction = directionMode;
		}
		this.localPlayer = player;
		Sprite.call(this, width, height);			
		this.x = spawn.x;
		this.y = spawn.y;
		this.name = "Ketsueki";
		this.speed = 2;
		this.vx = 0;
		this.vy = 0;
		this.dead = false;
		this.time = 160;
		this.damage = 1;
		this.bloodied = false;
		this.image = game.assets["ketsueki.png"];
		this.frame = 0;
		
		this.addEventListener('enterframe', function() {
			this.moveBlood();
			this.collide(player);

			this.tick();

		})
	},
	//moves the pencil in the direction it is facing.
	moveBlood:function() {
		var vx = 0;
		var vy = 0;
		if(this.direction == 3) {
			vx = -this.speed;
		}
		else if(this.direction == 1) {
			vx = this.speed;
		}
		if(this.direction == 0) {
			vy = -this.speed;
		}
		else if(this.direction == 2) {
			vy = this.speed;
		}

		//console.log(vx + " " + vy);
		this.moveTo(this.x + vx , this.y + vy);
		
	},
	
	tick:function() {
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.dead = true;
		}
	},
	

	collide:function(player) {
		for(var i = 0; i < entities.length; i++) {
			//console.log(this.intersect(entities[i]));
			if(entities[i] instanceof Enemy && this.intersect(entities[i])) {
					if(entities[i].health > 0) {
						entities[i].health -= this.damage;
					}
					this.dead = true;
					if(entities[i].health == 0) {
						this.bloodsplosion(player);
					}
					
			}
		}
	},
	
	bloodsplosion:function(player) {
		var k1 = new Ketsueki(this.width, this.height, player, 0, this);
		var k2 = new Ketsueki(this.width, this.height, player, 1, this);
		var k3 = new Ketsueki(this.width, this.height, player, 2, this);
		var k4 = new Ketsueki(this.width, this.height, player, 3, this);
		entities.push(k1);
		stage.addChild(k1);
		entities.push(k2);
		stage.addChild(k2);
		entities.push(k3);
		stage.addChild(k3);
		entities.push(k4);
		stage.addChild(k4);
	}
});