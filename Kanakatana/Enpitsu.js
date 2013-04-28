//HIRIGANA: E
//this class handles the pencil that E launches. Call it using the width and height of 50 x 50.
//these dimentions are adjusted according to the direction, then "Sprite.call" is called.
var Enpitsu = Class.create (Sprite, {
	initialize:function(width, height, player) {
		this.direction = player.direction;		//used for chosing direction and what image/frame to use.
		if(this.direction == 0 ||this.direction == 2) {		//chooses what size to make the sprite 
			Sprite.call(this, width/2, height);				//based on player direction
		}
		else {
			Sprite.call(this, width, height/2);
		}
		this.x = player.x;
		this.y = player.y;
		this.name = "Enpitsu";
		this.speed = 8;
		this.vx = 0;
		this.vy = 0;
		this.dead = false;
		this.damage = 1;
		if(this.direction == 0 ||this.direction == 2) {		//chooses what image file to use
			this.image = game.assets["enpitsu2.png"];
		}
		else {
			this.image = game.assets["enpitsu1.png"];
		}
		if(this.direction == 0 || this.direction == 1) {		//chooses what image file to use
			this.frame = 0;
		}
		else{
			this.frame = 1;
		}
		
		this.addEventListener('enterframe', function() {
			this.movePencil();
		})
	},
	//moves the pencil in the direction it is facing.
	movePencil:function() {
		if(this.direction == 0) {
			this.vy = -this.speed;
		}
		else if(this.direction == 1) {
			this.vx = this.speed;
		}
		else if(this.direction == 2) {
			this.vy = this.speed;
		}
		else if(this.direction == 3) {
			this.vx = -this.speed;
		}
		this.moveTo(this.x + this.vx , this.y + this.vy);
	}		
});