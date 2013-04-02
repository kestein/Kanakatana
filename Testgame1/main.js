
enchant();


window.onload = function(){
    var game = new Game(800, 600);
	
    game.fps = 30;
	game.preload("map.png");
	game.preload("player.png");
	
	var map;	
	var player;
	var stage = new Group();
		
    game.onload = function(){	
		
		/** player things **/
		player = new Sprite(50, 50);
		player.image = game.assets["player.png"];
		player.x = 50;
		player.y = 50;
		
		player.isMoving = false;
        player.direction = 0;
        player.addEventListener('enterframe', function() {
            this.frame = this.direction;
            if (this.isMoving) {
                this.moveBy(this.vx, this.vy);
 
                if ((this.vx && (this.x) % 50 == 0) || (this.vy && this.y % 50 == 0)) {
                    this.isMoving = false;
                }
            } else {
                this.vx = this.vy = 0;
                if (game.input.left) {
                    this.direction = 3;
                    this.vx = -5;
                } else if (game.input.right) {
                    this.direction = 1;
                    this.vx = 5;
                } else if (game.input.up) {
                    this.direction = 0;
                    this.vy = -5;
                } else if (game.input.down) {
                    this.direction = 2;
                    this.vy = 5;
                }
                if (this.vx || this.vy) {
                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 50 : 0);
                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 50 : 0);
                    if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                        this.isMoving = true;
                        arguments.callee.call(this);
                    }
                }
            }
        });
		
		loadMap(game, "map.txt", "map.png", setmap);
    };
	
	function setmap(newmap)
	{
		map = newmap;
		init();
	}
	
	function replacemap(newmap)
	{
		stage.removeChild(player);
		stage.removeChild(map);
		map = newmap;
		stage.addChild(map);
		stage.addChild(player);
		
		player.x = 50;
		player.y = 50;
	}
	
	function init()
	{	
		stage.addChild(map);
		stage.addChild(player);
		game.rootScene.addChild(stage);
		
		game.rootScene.addEventListener('enterframe', function(e) {
			var x = Math.min((game.width  - 50) / 2 - player.x, 0);
			var y = Math.min((game.height - 50) / 2 - player.y, 0);
			x = Math.max(game.width,  x + map.width)  - map.width;
			y = Math.max(game.height, y + map.height) - map.height;
			stage.x = x;
			stage.y = y;
			
			if (player.x / 50 == 22 && player.y / 50 == 1)
			{		
				loadMap(game, "map2.txt", "map.png", replacemap);
			}
		});

		var pad = new Pad();
		pad.x = 0;
		pad.y = 0;
		game.rootScene.addChild(pad);
	}
	game.start();
};
