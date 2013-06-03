//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Slimeball = Class.create (Sprite, {
	initialize:function(width, height, slime, player) {
		Sprite.call(this, width, height);
		this.speed = 8;
		this.name = "Slimeball";		//used in collision detection.
		this.image = game.assets["slimeball.png"];
		this.x = slime.x;
		this.y = slime.y;
		this.moveArray = [];
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.moveArrayIndex = 0;
		this.dead = false;
		
		this.startCoordinates = new this.coordinates(this.y, this.x);
		this.endCoordinates = new this.coordinates(player.y, player.x);
		this.moveArray = this.calcStraightLine(this.startCoordinates, this.endCoordinates);
		this.addEventListener('enterframe', function() {	
			//this.collide();
			this.moveToTarget();
			this.growOld();
        });
	},
	
	collide:function() {
		
	},
	
	//This is used to make calcStraightLine work. A pair of X and Y coordinates
   coordinates:function(X, Y) {
			this.x = X;
			this.y = Y;
	},
	//Bresenham's line algorithm, generates an array of points to move the player along while moving.
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
			// Set coordinates
			coordinatesArray.push(new this.coordinates(y1, x1));
			if (Math.abs(x1-x2)<0.0001 && Math.abs(y1-y2)<0.0001) break;
			}
			// Return the result
    return coordinatesArray;
	},
	
	moveToTarget:function() {
		if(this.moveArrayIndex <= this.moveArray.length 
		&& typeof this.moveArray[this.moveArrayIndex] !== 'undefined'
		&& !this.dead) {
			this.x = this.moveArray[this.moveArrayIndex].x;
			this.y = this.moveArray[this.moveArrayIndex].y;
			this.moveArrayIndex += this.speed;
			if(this.moveArrayIndex >= this.moveArray.length ) {
				this.dead = true;
			}
		}
	},
	
	growOld:function() {
		if (this.age > 90) {
			this.dead = true;
		}
	}
});