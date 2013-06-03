//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Slime = Class.create (Enemy, {
	initialize:function(width, height, xp, yp, player) {
		Enemy.call(this, width, height, xp, yp, player);
		this.speed = 3;
		this.vx = 0;
		this.name = "Enemy";		//used in collision detection.
		this.vy = 0;
		this.targetNode = 0;
		this.enraged = false;		//determines if headding towards player
		this.enrageDistance = 250;
		this.moveArray = [];
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.firstCoordinate = this.coordinates(this.xPath[this.targetNode],this.yPath[this.targetNode]);
		this.moveArrayIndex = 0;
		this.dead = false;
		
		this.health = 1;
		
		this.addEventListener('enterframe', function() {	
		//this.moveToTarget();
		//this.checkIfDead();
		if (!this.stunned){
				//this.moveToTarget();
			}
		
			
        });
	},
	
	enrageMode:function() {
		console.log("Angry Slime!");
	}
});