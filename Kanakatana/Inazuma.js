// created by the I class. It becomes the "activeTarget" when It is ready to be placed. "activeTarget is a
// global variable that is used for abilities targeted with a click. This ability I makss an "Inazuma" 
// that becomes the active target. Clicking again anywhere activates the Inazuma and moves it to the click
// and sets active target to null
var Inazuma = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.name = "Inazuma"
		this.x = player.x - this.width/2;
		this.y = player.y - this. height;
		this.targetX;
		this.targetY;
		this.time = 40;
		this.activeTargetJump = false;
		this.image = game.assets["Inazuma2.png"];
		this.frame = 0;
		this.speed = 4;
		this.reachedTarget;
		this.active = false;
		activeTarget = this;
		player.isLightning = true;
		this.readyToDie = false;
		this.addEventListener('enterframe', function() {
			this.decideBehavior();
		})
		
		this.addEventListener('removed', function() {	
			player.isLightning = false;
        });
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
			this.moveToTarget();
			this.animate();
			this.tick();
			this.isAtTarget();
			activeTarget = null;
		}
	},
	//checks for collision with enemies.
	collision:function() {
		for(var i = 0; i < entities.length; i++) {
			if(entities[i] instanceof Enemy && this.intersect(entities[i])) {
				entities[i].health--;
			}
		}
	},
	
	tick:function() {
		if(this.readyToDie)
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.active = false;
			this.dead = true;
		}
	},
	
	activate:function(clickX, clickY) {
		this.active = true;
		this.targetX = clickX - this.width/2;
		this.targetY = clickY - this.height;
		this.readyToDie = true
		console.log("ping");
		
	},
	
	moveToTarget:function() {
		var vx = 0;
		var vy = 0;
		if(this.x > this.targetX) {
			vy = -this.speed;
		}
		else if(this.x < this.targetX) {
			vx = this.speed;
		}
		if(this.y > this.targetY) {
			vy = -this.speed;
		}
		else if(this.y < this.targetY) {
			vy = this.speed;
		}
		if(Math.abs(this.x - this.targetX) <= this.speed){
			vx = Math.abs(this.x - this.targetX);
		}
		if(Math.abs(this.y - this.targetY) <= this.speed){
			vy = Math.abs(this.y - this.targetY);
		}
		this.moveTo(this.x + vx , this.y + vy);
	},
	
	isAtTarget:function() {
		if(Math.abs(this.x - this.targetX) <= this.speed
		&& Math.abs(this.y - this.targetY) <= this.speed
		|| this. age >= 90) {
			//this.readyToDie = true;
		}
	}
	
	
});