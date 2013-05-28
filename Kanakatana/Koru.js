 var Koru = Class.create (Sprite, {
	initialize:function(width, height, player, mode) {
      Sprite.call(this, width, height);
      this.image = game.assets["koru.png"];
      this.speed = 10;
      this.x = player.x + Math.random()*100 - 50;
      this.y = player.y + Math.random()*100 - 50;
      this.direction = player.direction;
      this.xTarget = this.x;
      this.yTarget = this.y;
	  this.dead = false;
	  this.active = true;
	  this.mode = mode;
	  this.time = 130;
	  this.speed = 7;
	  if(mode == 0) {
			activeTarget = this;
	  }
	  this.addEventListener('enterframe', function() {
			this.moveKoru();
			this.tick();
			this.checkCollide();
		});
      //this.targetX = targetX;
      //this.targetY = targetY;
      //this.slope = (this.targetY - this.y)/(this.targetX - this.x);
            
   },
   moveKoru:function() {
		if(this.x > this.xTarget) {
			this.moveTo(this.x - this.speed, this.y);
		}
		else if(this.x < this.xTarget) {
			this.moveTo(this.x + this.speed, this.y);
		}
		if(this.y > this.yTarget) {
			this.moveTo(this.x, this.y - this.speed);
		}
		else if(this.y < this.xTarget) {
			this.moveTo(this.x, this.y + this.speed);
		}
		
   },
   
   tick:function() {
		this.time--;
		if(this.time <= 0 || Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
			this.active = false;
			this.dead = true;
		}
		//console.log(this.time);
		//console.log(this.dead);
	},
   
   checkCollide:function() {
      for(var f = 0; f < entities.length; f++) {
         if(this.mode == 1 && this.intersect(entities[f]) && entities[f] instanceof Enemy) {
            entities[f].health = entities[f].health - 1;
            entities[f].Stunned = true;
			entities[f].image = game.assets["ice.png"];;
            //stage.removeChild(this);
            this.dead = true; //move it offscreen so it gets cleaned up in enterframe
         }
		 if(this.mode == 1 && entities[f] instanceof Koru && entities[f].mode == 0) {
					this.xTarget = entities[f].x;
					this.yTarget = entities[f].y;
			}
      }
   },
   
   activate:function() {
		console.log("activated");
		if(this.mode == 0) {
			this.active = true;
			activeTarget = null;
			
			this.x -= this.width/2;
			this.y -= this.height/2;
			this.xTarget = this.x;
			this.yTarget = this.y;
			console.log(this.xTarget);
			console.log(this.yTarget);
		}
		for(var f = 0; f < entities.length; f++) {
			if(entities[f] instanceof Koru && entities[f].mode == 1) {
			console.log("going to 0");
				entities[f].xTarget = this.x;
				entities[f].yTarget = this.y;
			}
		}
   },
   
   
});