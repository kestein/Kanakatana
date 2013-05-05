//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Enemy = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		//vars for movement.
		this.xPath = [600,600];
		this.yPath = [400,150];
		this.speed = 5;
		this.name = "Enemy";		//used in collision detection.
		this.vx = 0;				//dertermines direction to move.
		this.vy = 0;
		this.targetNode = 0;
		this.enraged = false;		//determines if headding towards player
		this.targetOfRage = player;
		this.moveArray = [];
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.firstCoordinate = this.coordinates(this.xPath[this.targetNode],this.yPath[this.targetNode]);
		this.moveArrayIndex = 0;
		this.dead = false;
		this.health = 2;
		
		this.slowed = false;
		this.slowSpeed = 1;
		
		
		this.addEventListener('enterframe', function() {	
		this.moveToTarget();
		this.enrage();
		this.checkIfDead();
		
			
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
		this.targetNode++;
		if(this.targetNode == this.xPath.length) {
			this.targetNode = 0;
		}
	},
	
	//moves the enemy to their current target. if enraged, it moves toward the player. modifiers handle adjusting speed
	//when the enemy nears the node.
	moveToTarget:function() {
		//console.log(this.slowed);
		var tempSpeed = this.speed;
		if(this.slowed) {
			tempSpeed = this.slowSpeed;
		}
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
			//vx = Math.min(Math.abs(vx), Math.abs(this.x - this.xPath[this.targetNode]));
			//vy = Math.min(Math.abs(vy), Math.abs(this.y - this.yPath[this.targetNode]));
			this.moveTo( this.x + vx, this.y + vy);
			if(this.x == this.xPath[this.targetNode] && this.y == this.yPath[this.targetNode]) {
				this.changeTarget();
			}
		}
		else {					//the enemy is actively persuing the player
			if(this.x < this.targetOfRage.x) {
				vx= tempSpeed;
			}
			else if(this.x > this.targetOfRage.x) {
				vx= -tempSpeed;
			}
			else {
				vx= 0;
			}
			if(this.y < this.targetOfRage.y) {
				vy= tempSpeed;
			}
			else if(this.y > this.targetOfRage.y) {
				vy= -tempSpeed;
			}
			else {
				vy= 0;
			}
			this.moveTo( this.x + vx, this.y + vy);
		}
		
		/*var tempCoordinate = this.coordinates(this.x, this.y);
		console.log(this.x);
		var tempTarget = this.coordinates(this.xPath[this.targetNode], this.yPath[this.targetNode]);
		this.moveArray = this.calcStraightLine(tempCoordinate, tempTarget);
		if(this.moveArrayIndex <= this.moveArray.length) {
				
		tempCoordinate = this.moveArray[this.moveArrayIndex];
		console.log("ping");
		this.moveTo(tempCoordinate.y, tempCoordinate.x);
		moveArrayIndex++;
		} else {
			moveArrayIndex = 0;
			moveArray = [];
		}*/
	},
	
	//no use yet.
	enrage:function() {
			if (this.enraged == true) {
			
			}
			else {
			
			}
	},
	
	//checks health and kills the enemy if its health is low enough
	checkIfDead:function() {
		if(this.health <= 0) {
			this.dead = true;
		}
	}
	
	
});