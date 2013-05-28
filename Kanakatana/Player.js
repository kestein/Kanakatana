//This acts as an addition to the sprite class. I decided to move Player to its own class since main.js
//will be getting pretty big eventually.
//REMEMBER TO PUSH QUESTS INTO THE AVAILABLE QUEST ARRAY
var Player = Class.create(Sprite, {
   initialize:function(width, height) {
		Sprite.call(this, width, height);
		/** click to move things **/
		this.moveArrayIndex = 0;
		this.alive = true;
		this.frame = 5;
		this.moveArray = [];
		this.isMoving = false;
		this.direction = 2;
		this.speed = 4;
		this.endCoordinate =  this.coordinates(0,0);
		this.isListeningToNPC = false;
		this.isTargeting = false;
		//abilities
		this.unlockedAbilities = 5;
		//u
		this.storeImage;
		this.storeFrame;
		this.storeSpeed;
		this.isBunny = false;
		this.bunnyDuration = 0;
		
		//quests
      this.quests = new Array();
      this.quests.push(startQ2);
      this.quests.push(startIntroQuest);
      
		this.addEventListener('enterframe', function() {
         this.moveToClick();
		 this.walkAnimation();
		 this.timeDown();
		})
		
   },
   //Creates the array of quests for the palyer
   addQuests:function() {
      this.quests.push(startIntroQuest);
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
	//this function gets called by an event listener. It uses calcStreightLine to make an array for the player to traverse.
	targetClick:function(clickX, clickY) {
	this.moveArray = [];
	this.moveArrayIndex = 0;
		if(this.x == clickX && this.y == clickY) {
			this.isMoving = false;
		}
		else {
			var startCoordinates = new this.coordinates(this.x, this.y);
			var endCoordinates = new this.coordinates(clickX, clickY);
			this.endCoordinate = endCoordinates;
			this.moveArray = this.calcStraightLine(startCoordinates, endCoordinates);
		}
		if(Math.abs(this.x - clickX) > Math.abs(this.y - clickY) && this.image == game.assets["player.png"]) {
				if(this.x < clickX) {
					this.direction = 1;
					this.frame =8;
				}
				else {
					this.direction = 3;
					this.frame = 5;
				}
			}
			else if(this.image == game.assets["player.png"]) {
				if(this.y < clickY) {
					this.direction = 2;
					this.frame = 2;
				}
				else {
					this.direction = 0;
					this.frame = 11;
				}
			}
			else if (this.image == game.assets["usagi2.png"]) {
				if(this.x < clickX) {
					this.direction = 1;
					this.frame = 0;
				}
				else {
					this.direction = 3;
					this.frame = 1;
				}
			}
			//this.frame = (this.direction *9) + 5;
	},
	
	//Moves the player to the clicked my traversing through the array 'speed' steps at a time.
	moveToClick:function() {
		var tempCoordinate = new this.coordinates(this.x, this.y);
		//console.log(this.isListeningToNPC);
		if(this.moveArrayIndex <= this.moveArray.length 
		&& typeof this.moveArray[this.moveArrayIndex] !== 'undefined' && !this.isListeningToNPC) {
				
				tempCoordinate = this.moveArray[this.moveArrayIndex];
				
				this.moveTo(tempCoordinate.y, tempCoordinate.x);
				this.moveArrayIndex+= this.speed;
				this.isMoving = true;
			} else {
				this.moveArrayIndex = 0;
				this.moveArray = [];
				this.isMoving = false;
			}
		//check collisions here
		checkCollisions(this);
	},
	//animates the players walk cycle
	walkAnimation:function() {
		if(this.age % 3  == 0 && this.isMoving == true && this.image == game.assets["player.png"]) {
			if(this.frame == 5 || this.frame == 2 || this.frame == 8 || this.frame == 11) {
				this.frame = this.frame-2;
			}
			else {
				this.frame++;
			}
		}
		if(this.age %1 == 0) {		//debug
			//console.log(this.y);
		}
	},
	
	becomeBunny:function() {
		this.storeImage = this.image;
		this.storeFrame = this.frame;
		this.storeSpeed = this.speed;
		this.image = game.assets["usagi2.png"];
		this.frame = 0;
		this.speed = this.speed * 2;
		this.bunnyDuration = 100;
		this.isBunny = true;
	},
	
	timeDown:function() {
	//console.log(player);
		if (this.bunnyDuration > 0) {
			this.bunnyDuration--;
		}
		else if(this.isBunny){
			this.bunnyDuration = 0;
			this.isBunny = false;
			this.becomeHuman();
		}
	},
	
	becomeHuman:function(player) {
		this.image = game.assets["player.png"];
		this.frame = this.storeFrame;
		this.speed = this.storeSpeed;
	}
	
	
});