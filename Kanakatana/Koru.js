 var Koru = Class.create (Sprite, {
	initialize:function(width, height, player, targetX, targetY) {
      Sprite.call(this, width, height);
      this.image = game.assets["koru.png"];
      this.speed = 10;
      this.x = player.x;
      this.y = player.y;
      this.direction = player.direction;
      this.vx = 0;
      this.vy = 0;
      this.targetX = targetX;
      this.targetY = targetY;
      this.slope = (this.targetY - this.y)/(this.targetX - this.x);
            
      this.addEventListener('enterframe', function() {
         //remove the koru once it is offscreen
         console.log("made it");
         if(this.x >= game.width || this.y >= game.height || this.x < 0 || this.y < 0) {
            for(var i = 0; i < entities.length; i++) {
               //remove the koru from entities
               if(entities[i] instanceof Koru) {
                  entities.splice(i, 1);
               }
		      }
            stage.removeChild(this);
         }
         else {
            this.moveKoru();
            checkCollide();
         }
		});
   },
   moveKoru:function() {
		this.moveTo(this.x + 1 , this.y + this.slope);
   },
   checkCollide:function() {
      for(var f = 0; f < entities.length; f++) {
         if(this.intersect(entities[f]) && entities[f] instanceof Enemy) {
            entities[f].health = entities[f].health - 1;
            entities[f].Stunned = true;
            stage.removeChild(this);
            this.x = 1000000000;//move it offscreen so it gets cleaned up in enterframe
         }
      }
   }
});