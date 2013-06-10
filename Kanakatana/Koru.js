 var Koru = Class.create (Sprite, {
	initialize:function(width, height, player) {
      Sprite.call(this, width, height);
      this.image = game.assets["koru.png"];
	  this.name = "koru";
      this.speed = 10;
      this.x = player.x;
      this.y = player.y;
	  this.dead = false;
	  this.time = 130;
	  this.speed = 7;
	  this.addEventListener('enterframe', function() {
			this.tick();
			this.checkCollide();
		});
      //this.targetX = targetX;
      //this.targetY = targetY;
      //this.slope = (this.targetY - this.y)/(this.targetX - this.x);
            
   },

   
   tick:function() {
		this.time--;
		if(this.time <= 0) {

			this.dead = true;
		}
		//console.log(this.time);
		//console.log(this.dead);
	},
   
   checkCollide:function() {
      for(var f = 0; f < entities.length; f++) {
        if(this.intersect(entities[f]) && entities[f] instanceof Enemy) {
            entities[f].Stunned = true;
			entities[f].stunTimer = 131;
			if(entities[f] instanceof Snail) {
				entities[f].image = game.assets["snailice.png"];
			}
			else if(entities[f] instanceof Slime) {
				entities[f].image = game.assets["slimeice.png"];
			}
            //stage.removeChild(this);
            this.dead = true; //move it offscreen so it gets cleaned up in enterframe
        }
      }
   }
   
   
});