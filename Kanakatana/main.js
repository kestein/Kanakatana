
enchant();


window.onload = function(){
    var game = new Game(800, 600);
	
    game.fps = 30;
	game.preload("map.png");
	game.preload("player.png");
	game.preload("NPC.png");
	game.preload("Enemy.png");
	game.preload("label_bkg.png");
	
	var map;	
	var player;
    var steve;
	var enemy1;
	var stage = new Group();
		
    game.onload = function(){	
		
		/** player things **/
		player = new Player(50, 50);
		player.image = game.assets["player.png"];
		player.x = 50;
		player.y = 50;
      
        steve = new NPC(50, 50, "test_lines.txt");
        steve.image = game.assets["NPC.png"];
        steve.x = 150;
        steve.y = 150;
	  
  	    enemy1 = new Enemy(50, 50);
	    enemy1.image = game.assets["Enemy.png"];
	    enemy1.x = 300;
	    enemy1.y = 300;
	  
        player.addEventListener('enterframe', function() {
        /*    this.frame = this.direction;
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
            }*/
            if(player.intersect(steve)) {
               player.x = 50;
               player.y = 50;
               steve.sayLines(stage, game);
            }
			
        });
		game.rootScene.addEventListener('touchstart', function(evt) {
			if(!map.hitTest(evt.localX, evt.localY)) {
				player.targetClick(evt.localX, evt.localY);
			}
        });
		
		//bresenham's line algorithm
		function calcStraightLine (startCoordinates, endCoordinates) {
			var coordinatesArray = new Array();
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
			coordinatesArray.push(new Coordinates(y1, x1));
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
			coordinatesArray.push(new Coordinates(y1, x1));
			if (Math.abs(x1-x2)<0.0001 && Math.abs(y1-y2)<0.0001) break;
			}
			// Return the result
    return coordinatesArray;
  }
		
		//end click to move
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
        stage.addChild(steve);
		stage.addChild(enemy1);
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
