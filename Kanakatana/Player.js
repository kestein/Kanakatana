//This acts as an addition to the sprite class. I decided to move Player to its own class since main.js
//will be getting pretty big eventually.
var Player = Class.create(Sprite, {
   initialize:function(width, height) {
		Sprite.call(this, width, height);
		/** click to move things **/
		this.moveArrayIndex = 0;
		this.direction = 0;
		this.moveArray = [];
		this.isMoving = false;
		this.speed = 3;
		
		this.addEventListener('enterframe', function() {
		this.checkNPC();
		this.moveToClick();
		})
   },
   
   coordinates:function(X, Y) {
			this.x = X;
			this.y = Y;
	},
	
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
	
	targetClick:function(clickX, clickY) {
	//console.log(this.moveArray);
	//console.log(this.moveArrayIndex);
	this.moveArray = [];
	this.moveArrayIndex = 0;
		if(this.x == clickX && this.y == clickY) {
			this.isMoving = false;
		}
		else {
			var startCoordinates = new this.coordinates(this.x, this.y);
			var endCoordinates = new this.coordinates(clickX, clickY);
			this.moveArray = this.calcStraightLine(startCoordinates, endCoordinates);
		}
		//console.log(this.moveArray);
		//console.log(this.moveArrayIndex);
	},
	
	moveToClick:function() {
		var tempCoordinate = new this.coordinates(this.x, this.y);
		if(this.moveArrayIndex <= this.moveArray.length 
		&& typeof this.moveArray[this.moveArrayIndex] !== 'undefined') {
				
				tempCoordinate = this.moveArray[this.moveArrayIndex];
				console.log(this.moveArray);
				this.moveTo(tempCoordinate.y, tempCoordinate.x);
				this.moveArrayIndex+= this.speed;
				isMoving = true;
			} else {
				this.moveArrayIndex = 0;
				this.moveArray = [];
				this.isMoving = false;
			}
	},
	
	checkNPC:function() {
		
	}
	
	
});