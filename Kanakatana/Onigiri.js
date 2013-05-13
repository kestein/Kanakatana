 var Onigiri = Class.create (Sprite, {
	initialize:function(width, height, player) {
      Sprite.call(this, width, height);
      this.image = game.assets["onigiri.png"];
      this.speed = 10;
      this.x = player.x;
      this.y = player.y;
      this.direction = player.direction;
      this.vx = 0;
      this.vy = 0;
      
      for(var i = 0; i < entities.length; i++) {
			if(entities[i] instanceof Enemy) {
				entities[i].targetOfRage = this;
			}
		}
      
      this.addEventListener('enterframe', function() {
         //remove the onigiri after age > 600
         if(this.age >= 150) {
            for(var i = 0; i < entities.length; i++) {
			      if(entities[i] instanceof Enemy) {
				      entities[i].targetOfRage = player;
			      }
               //remove the onigiri from entities
               if(entities[i] instanceof Onigiri) {
                  entities.splice(i, 1);
               }
		      }
            stage.removeChild(this);
         }
         else {
            this.moveOnigiri();
         }
		});
   },
   moveOnigiri:function() {
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
		this.moveTo(this.x + this.vx , this.y + this.vy);
      if(this.speed > 0) {
         this.speed -= 1;
      }
   }
});