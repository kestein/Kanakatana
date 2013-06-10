//An addition to the Sprite class. For now I am implementing speciffic stuff into it. I will either expand
//to be able to handle all enemies or to not be directly used and be inherited by all enemy types.

var Slime = Class.create (Enemy, {
	initialize:function(width, height, xp, yp, player) {
		Enemy.call(this, width, height, xp, yp, player);
		this.localPlayer = player;
		this.image = game.assets["slime.png"];
		this.speed = 3;
		this.vx = 0;
		this.name = "Slime";		//used in collision detection.
		this.vy = 0;
		this.targetNode = 0;
		this.enraged = false;		//determines if headding towards player
		this.enrageDistance = 250;
		this.moveArray = [];
		this.startCoordinate = this.coordinates(this.x,this.y);
		this.firstCoordinate = this.coordinates(this.xPath[this.targetNode],this.yPath[this.targetNode]);
		this.moveArrayIndex = 0;
		this.dead = false;
		this.shotCooldown = 0;
		this.cooldownMax = 90;
		this.creditValue = 100;
		
		this.health = 1;
		
		this.addEventListener('enterframe', function() {	
			this.clearSlimeballs();
        });
	},
	
	enrageMode:function() {
		
		if(this.shotCooldown <= 0) {
			this.shootSlime();
			//console.log(this.localPlayer.x);
			//console.log(this.localPlayer.y);
		}
		this.shotCooldown--;
		
	},
	
	shootSlime:function() {
		if(this.dead) {
			return;
		}
		//var slimeball = new Slimeball(20, 20, this, this.localPlayer);
      var slimeball = new Slimeball(20, 20, this, this.targetOfRage);
		entities.push(slimeball);
		stage.addChild(slimeball);
		this.shotCooldown = this.cooldownMax;
	},
	
	clearSlimeballs:function() {
		if(this.dead) {
			for(var i; i < entities.length; i++) {
				if(entities[i] instanceof Slimeball) {
					entities[i].dead = true;
				}
			}
		}
	},
	
	returnImage:function() {
		this.image = game.assets["slime.png"];
		this.frame = 0;
	}
});