//Takes in an array of entities and sees if a collision happens
function checkCollisions(player) {
   var ch = 0;
   for(var t = 0; t < entities.length; t++) {
      if(player.intersect(entities[t])) {
         player.isMoving = false;
         if(player.direction == 0) {//moving up
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
         if(player.direction == 2) {//moving down
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
         if(player.direction == 1) {//moving right
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
         if(player.direction == 3) {//moving left
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
      }
   }
   if(map.hitTest(player.x, player.y)) {
		if(player.direction == 0) {//moving up
			/*if(player.x - player.endCoordinate.x < 0) {//r
				player.x -= 1;
			}
			if(player.x - player.endCoordinate.x > 0) {//left
				player.x += 1;
			}
			else {*/
				player.y += 1;
		//	}
			player.moveArray.length = 0;
			//this.isMoving = false;
         }
         if(player.direction == 2) {//moving down
			/*if(player.x - player.endCoordinate.x < 0) {//right
				player.x -= 1;
			}
			if(player.x - player.endCoordinate.x > 0) {//left
				player.x += 1;
			}
			else {*/
				player.y -= 1;
			//}
			player.moveArray.length = 0;
			//this.isMoving = false;
         }
         if(player.direction == 1) {//moving right
		    /*if(player.y - player.endCoordinate.y < 0) {//up
				player.y += 1;
			}
			if(player.y - player.endCoordinate.y > 0) {//down
				player.y -= 1;
			}
			else {*/
				player.x -= 1;
	//		}
			player.moveArray.length = 0;
			//this.isMoving = false;
         }
         if(player.direction == 3) {//moving left
	    	/*if(player.y - player.endCoordinate.y < 0) {
				player.y += 1;
			}
			if(player.y - player.endCoordinate.y > 0) {
				player.y -= 1;
			}
			else {*/
				player.x += 1;
//			}
			player.moveArray.length = 0;
			//this.isMoving = false;
         }
   }
}