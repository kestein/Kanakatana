//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Snail = Class.create (Enemy, {
	initialize:function(width, height, player) {
		Enemy.call(this, width, height);
		//vars for movement.
		this.xPath = [600,600];
		this.yPath = [400,150];
		this.speed = 2;
		this.vx = 0;
		this.name = "Enemy";		//used in collision detection.
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
		
		
		this.addEventListener('enterframe', function() {	
		this.moveToTarget();
		this.enrage();
		this.checkIfDead();
		
			
        });
	}
});