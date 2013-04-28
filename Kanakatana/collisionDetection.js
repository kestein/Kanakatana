//Takes in an array of entities and sees if a collision happens
function checkCollisions(player) {

   var ch = 0;
   var dx = 0;
   var dy = 0;
   for(var t = 0; t < entities.length; t++) {
		if(entities[t].name == 'Enemy' && player.within(entities[t], 160)) {	//Enemies attack player if close

			entities[t].enraged = true;
		}
		else if(entities[t].name == 'Enemy') {
			entities[t].enraged = false;
		}
      if(player.intersect(entities[t])) {
		if(entities[t].name == 'Enemy') {		//enemy sends player back to start
			player.x = 50;
			player.y = 50;
			player.moveArray.length = 0;
			break;
		 }
         player.isMoving = false;
		 if(entities[t].name == "NPC") {
			if(player.direction == 0 && player.endCoordinate) {//moving up
				//diagonal checks
				if(player.x - player.endCoordinate.x < 0) {//r
					player.x = entities[t].x - player.width - 1;
				}
				if(player.x - player.endCoordinate.x > 0) {//left
					player.x = entities[t].x + player.width + 1;
				}
				//not diagonals
				else {
					player.y = entities[t].y + player.height + 1;
				}
				player.moveArray.length = 0;
				//this.isMoving = false;
			}
			if(player.direction == 2  && player.endCoordinate) {//moving down
				if(player.x - player.endCoordinate.x < 0) {//right
					player.x = entities[t].x - player.width - 1;
				}
				if(player.x - player.endCoordinate.x > 0) {//left
					player.x = entities[t].x + player.width + 1;
				}
				else {
					player.y = entities[t].y - player.height - 1;
				}
				player.moveArray.length = 0;
				//this.isMoving = false;
			}
			if(player.direction == 1 && player.endCoordinate) {//moving right
				if(player.y - player.endCoordinate.y < 0) {//up
					player.y = entities[t].y + player.height + 1;
				}
				if(player.y - player.endCoordinate.y > 0) {//down
					player.y = entities[t].y - player.height - 1;
				}
				else {
					player.x = entities[t].x - player.width - 1;
				}
				player.moveArray.length = 0;
				//this.isMoving = false;
			}
			if(player.direction == 3 && player.endCoordinate) {//moving left
				if(player.y - player.endCoordinate.y < 0) {
					player.y = entities[t].y + player.height + 1;
				}
				if(player.y - player.endCoordinate.y > 0) {
					player.y = entities[t].y - player.height - 1;
				}
				else {
					player.x = entities[t].x + player.width + 1;
				}
				player.moveArray.length = 0;
				//this.isMoving = false;
			}
			player.isListeningToNPC = true;
		 }
		 if(entities[t] instanceof NPC && !player.isListeningTospeaker) {
         startIntroQuest(player);
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
			if(entities[i].name == "Enpitsu" && entities[j].name == "Enemy" && entities[j].intersect(entities[i])) {
				
				entities[i].dead = true;
				entities[j].health-= entities[i].damage;
			}
		}
	}
	cleanEntities();

}