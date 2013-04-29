var Ika = Class.create (Sprite, {
	initialize:function(width, height, player, direction) {
		Sprite.call(this, width/2, height);				//based on player direction
		this.image = game.assets["ika.png"];
		this.frame = this.direction;
		this.hug = false;
		this.speed = 5;
		
		moveSquid:function() {
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