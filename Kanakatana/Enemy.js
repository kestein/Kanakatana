//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Enemy = Class.create (Sprite, {
	initialize:function(width, height, xp, yp, player) {
		Sprite.call(this, width, height);
		//vars for movement.
		this.xPath = xp;
		this.yPath = yp;
		this.pathReverse = false;
		this.speed = 0;
		this.enrageable = true;
		this.name = "Enemy";		//used in collision detection.
		this.vx = 0;				//dertermines direction to move.
		this.vy = 0;
		this.done = false;
		this.targetNode = 0;
		this.lastVisitedNode = 0;
		this.faceToWallCount = 0;
		this.enraged = false;		//determines if headding towards player
		this.enrageDistance = 200;
		this.targetOfRage = player;
		this.moveArray = [];
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.firstCoordinate = this.coordinates(this.xPath[this.targetNode],this.yPath[this.targetNode]);
		this.moveArrayIndex = 0;
		this.dead = false;
		this.health = 2;
		
		
		
		this.slowed = false;
		this.slowSpeed = 1;
		
		this.stunned = false;
		this.stunTimer = 0;
		
		
		this.addEventListener('enterframe', function() {

			if (!this.stunned){
				this.moveToTarget();
			}
			this.collideWithWalls();
			//this.enrage();
			this.isStunned();
			this.checkIfDead();
			this.reduceEnemyCount();
			
        });
		
		this.addEventListener('removed', function() {
			this.addCredits(player);
        });
	},
	coordinates: function(X, Y) {
			this.x = X;
			this.y = Y;
	},
	//see player.calcStraightLine.
	calcStraightLine:function(startCoordinates, endCoordinates) {
			var coordinatesArray = [];
			// Translate coordinates
			var x1 = startCoordinates.x;
			var y1 = startCoordinates.y;
			var x2 = endCoordinates.x;
			var y2 = endCoordinates.y;
			// Define differences and error check
			var dx = Math.abs(x2 - x1);
			var dy = Math.abs(y2 - y1);
			var sx = (x1 < x2) ? 1 : -1;
			var sy = (y1 < y2) ? 1 : -1;
			var err = dx - dy;
			// Set first coordinates
			coordinatesArray.push(new this.coordinates(y1, x1));
			// Main loop
			while (!(Math.abs(x1 - x2) <2 && Math.abs(y1 - y2) < 2)) {
			var e2 = err << 1;
			if (e2 > -dy) {
				err -= dy;
				x1 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y1 += sy;
			}
			//console.log(x1-x2);
			// Set coordinates
			coordinatesArray.push(new this.coordinates(y1, x1));
			if (Math.abs(x1-x2)<0.0001 && Math.abs(y1-y2)<0.0001) break;
			}
			// Return the result
    return coordinatesArray;
	},
	
	//sets the enemy's target to the next coordinate in its path. loops back to first target when route is completed
	changeTarget:function() {
		//console.log(this.lastVisitedNode);
		this.lastVisitedNode = this.targetNode;
		if(!this.pathReverse) {
			this.targetNode++;
			if(this.targetNode == this.xPath.length) {
				this.targetNode = 0;
				this.pathReverse = true;
			}
		}
		else {
			this.targetNode--;
			if(this.targetNode == -1) {
				this.targetNode = 0;
				this.pathReverse = false;
			}
		}
	},
	
	//moves the enemy to their current target. if enraged, it moves toward the player. modifiers handle adjusting speed
	//when the enemy nears the node.
	moveToTarget:function() {
		
		var tempSpeed = this.setSpeed();
		if(this.enraged == false) {			//this is if Enemy is following its normal course
			if(this.x < this.xPath[this.targetNode]) {
				vx= tempSpeed;
			}
			else if(this.x > this.xPath[this.targetNode]) {
				vx= -tempSpeed;
			}
			else {
				vx= 0;
			}
			if(this.y < this.yPath[this.targetNode]) {
				vy= tempSpeed;
			}
			else if(this.y > this.yPath[this.targetNode]) {
				vy= -tempSpeed;
			}
			else {
				vy= 0;
			}
			if(Math.abs(vx) > Math.abs(this.x - this.xPath[this.targetNode])) {
				vx = this.x - this.xPath[this.targetNode];
			}
			if(Math.abs(vy) > Math.abs(this.y - this.yPath[this.targetNode])) {
				vy = this.y - this.yPath[this.targetNode];
			}
			this.moveTo( this.x + vx, this.y + vy);
			if(this.x == this.xPath[this.targetNode] && this.y == this.yPath[this.targetNode]) {
				this.changeTarget();
			}
		}
		else {					//the enemy is actively persuing the player
			this.enrageMode();
		}
	},
	
	//no use yet.
	
	
	//checks health and kills the enemy if its health is low enough
	checkIfDead:function() {
		if(this.health <= 0) {
			this.dead = true;
		}
	},
	
	isStunned:function() {
		if(this.stunTimer > 0) {
			this.stunTimer--;
			this.stunned = true;
		}
		else {
			this.stunned = false;
			this.stunTimer = 0;
		}
	},
	//check colission with walls against corners of enemy
	collideWithWalls: function() {
		var dx = 0;
		var dy = 0;
		var tempSpeed = this.setSpeed();
		if(this.stunned) {
			return;
		}
   if(map.hitTest(this.x, this.y)) {	//top left
		dx += this.speed;
		dy += this.speed;
		this.moveArray.length = 0;
   }
   if(map.hitTest(this.x + this.width, this.y)) {	//top right
		dx -= this.speed;
		dy += this.speed;
		this.moveArray.length = 0;
   }
   if(map.hitTest(this.x, this.y + this.height)) {		//bottom left
		dx += this.speed;
		dy -= this.speed;
		this.moveArray.length = 0;
   }
   if(map.hitTest(this.x + this.width, this.y + this.height)) {	//bottom right
		dx -= this.speed;
		dy -= this.speed;
		this.moveArray.length = 0;
		}
		this.x +=  dx;
		this.y +=  dy;
		if (dx != 0 || dy != 0) {
			this.faceToWallCount++;
		}
		if (this.faceToWallCount >= 3) {
			this.faceToWallCount = 0;
			this.giveUpOnNode();
		}
		
	},
	
	setSpeed:function() {
		var tempSpeed;
		if(this.slowed) {
			tempSpeed = this.slowSpeed;
		}
		if (this.stunned) {
			tempSpeed = 0;
		}
		else {
			tempSpeed = this.speed;
		}
		
		return tempSpeed;
	},
	
	giveUpOnNode:function() {
		var tempNode;
		this.pathReverse = !this.pathReverse;
		tempNode = this.targetNode;
		this.targetNode = this.lastVisitedNode;
		this.lastVisitedNode = tempNode;
	},
	
	reduceEnemyCount:function() {
		if(this.dead) {
			//console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
			
		}
	},
	
	addCredits: function(player) {
		player.credits += this.creditValue;
	}
	
	
});