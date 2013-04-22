//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Enemy = Class.create (Sprite, {
	initialize:function(width, height) {
		Sprite.call(this, width, height);
		//vars for movement.
		this.xPath = [200,400];
		this.yPath = [200,250];
		this.speed = 2;
		this.targetNode = 0;
		this.moveArray = [];
		this.speed = 2;
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.firstCoordinate = this.coordinates(this.xPath[this.targetNode],this.yPath[this.targetNode]);
		this.moveArrayIndex = 0;
		console.log(this.moveArrayIndex);
		
		
		this.addEventListener('enterframe', function() {	
		this.moveToTarget();
		/*var tempCoordinate = new Coordinates(this.x, this.y);
		var tempTarget = new Coordinates(this.xPath[this.targetNode], this.yPath[this.targetNode]);
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
			
        });
	},
	coordinates: function(X, Y) {
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
	changeTarget:function() {
		this.targetNode++;
		if(this.targetNode > this.xPath.length) {
			this.targetNode = 0;
		}
	},
	moveToTarget:function() {
	
	}
	
	
});