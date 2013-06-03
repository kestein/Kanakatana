//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Snail = Class.create (Enemy, {
	initialize:function(width, height, xp, yp, player) {
		Enemy.call(this, width, height, xp, yp, player);
		//vars for movement.
		//this.xPath = xp;
		//this.yPath = yp;
		this.speed = 2;
		this.vx = 0;
		this.name = "Snail";		//used in collision detection.
		this.vy = 0;
		this.targetNode = 0;
		this.enraged = false;		//determines if headding towards player
		this.enrageDistance = 150;
		this.moveArray = [];
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.firstCoordinate = this.coordinates(this.xPath[this.targetNode],this.yPath[this.targetNode]);
		this.moveArrayIndex = 0;
		this.dead = false;
		
		this.health = 2;
		
		this.addEventListener('enterframe', function() {	
			
        });
	},
	
	enrageMode:function() {
		var tempSpeed = this.setSpeed();
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
	
	
});