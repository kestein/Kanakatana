//Takes in an array of entities and sees if a collision happens
function checkCollisions(player, entities) {
   var ch = 0;
   for(var t = 0; t < entities.length; t++) {
      if(player.intersect(entities[t])) {
         player.isMoving = false;
         if(player.direction == 0) {//moving up
            player.y += 10;
         }
         if(player.direction == 2) {//moving down
            player.y -= 10;
         }
         if(player.direction == 1) {//moving right
            player.x -= 10;
         }
         if(player.direction == 3) {//moving left
            player.x += 10;
         }
         //entities[t].sayLines(stage, game);
      }
   }
}