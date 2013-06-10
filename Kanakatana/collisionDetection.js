//Takes in an array of entities and sees if a collision happens
function checkCollisions(player) {

   var ch = 0;
   var dx = 0;
   var dy = 0;
   for(var t = 0; t < entities.length; t++) {
		if(entities[t].enrageable && player.within(entities[t], entities[t].enrageDistance)) {	//Enemies attack player if close

			entities[t].enraged = true;
		}
		else if(entities[t].enrageable) {
			entities[t].enraged = false;
		}
      if(player.intersect(entities[t])) {
		if(entities[t] instanceof Enemy && entities[t].stunned == false) {		//enemy sends player back to start
			player.x = 50;
			player.y = 50;
			player.moveArray.length = 0;
			break;
		 }
         player.isMoving = false;
		 if(entities[t] instanceof NPC) {
			if(player.x > entities[t].x) {
				player.x += player.speed;
			}
			else if(player.x < entities[t].x) {
				player.x -= player.speed;
			}
			if(player.y > entities[t].y) {
				player.y += player.speed;
			}
			else if(player.y < entities[t].y) {
				player.y -= player.speed;
			}
			player.moveArray.length = 0;
		 }
		
		 if(entities[t] instanceof NPC && !player.isListeningToNPC && player.quests.length > 0) {
         player.quests[player.quests.length - 1](player);
         player.isListeningToNPC = true;
       }
      }
   }
   //check colission with walls against corners of player
   if(map.hitTest(player.x, player.y)) {	//top left
		dx += 1;
		dy += 1;
		player.moveArray.length = 0;
   }
   if(map.hitTest(player.x + player.width, player.y)) {	//top right
		dx -= 1;
		dy += 1;
		player.moveArray.length = 0;
   }
   if(map.hitTest(player.x, player.y + player.height)) {		//bottom left
		dx += 1;
		dy -= 1;
		player.moveArray.length = 0;
   }
   if(map.hitTest(player.x + player.width, player.y + player.height)) {	//bottom right
		dx -= 1;
		dy -= 1;
		player.moveArray.length = 0;
   }
   player.x += dx;
   player.y += dy;
   
}
//collision detection between entities, does not include player
function collideEntities() {
	for(var i = 0; i < entities.length; i++) {
		for(var j = 0; j < entities.length; j++) {
			if(entities[i] instanceof Enpitsu && entities[j] instanceof Enemy && entities[j].intersect(entities[i])) {
					entities[i].dead = true;
					entities[j].health -= entities[i].damage;
			}
		}
	}
	cleanEntities();

}