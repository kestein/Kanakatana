
enchant();


window.onload = function(){
    var game = new Game(800, 600);
	
    game.fps = 30;
	game.preload("map.png");
	game.preload("player.png");
   game.preload("steve_map_image.png");
   game.preload("label_bkg.png");
   game.preload("next.png");
   game.preload("steve_portrait.png")
	
	var map;	
	var player;
   var steve;
   var jane;
   var collidedEntity;
	var stage = new Group();
		
    game.onload = function(){	
		
		/** player things **/
		player = new Sprite(50, 50);
		player.image = game.assets["player.png"];
		player.x = 50;
		player.y = 50;
      player.isListeningToNPC = false;
      
      steve = new NPC(50, 50, "test_lines.txt");
      steve.image = game.assets["steve_map_image.png"];
      steve.portrait = game.assets["steve_portrait.png"];
      steve.x = 150;
      steve.y = 150;
      
      jane = new NPC(50, 50, "test_lines.txt");
      jane.image = game.assets["steve_portrait.png"];
      jane.portrait = game.assets["steve_map_image.png"];
      jane.x = 100;
      jane.y = 200;
      jane.lines.push("JK ;)!!");
      
      entities = new Array();
      entities.push(steve);
      entities.push(jane);
      
     // game.keybind(71, 'thing');//bind the g key to action thing
      
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
            //Make an array of NPCs to do these sorts of checks
            checkCollisions(player, entities);
        });
		
		loadMap(game, "map.txt", "map.png", setmap);
    };
	
	function setmap(newmap)
	{
		map = newmap;
		init();
	}
	
   //Use a button press to trigger conversation with NPCs
function checkCollisions(player, entities) {
   for(var t = 0; t < entities.length; t++) {
      if(player.intersect(entities[t])) {
         player.isMoving = false;
         if(player.direction == 0) {//moving up
            player.y += 5;
         }
         if(player.direction == 2) {//moving down
            player.y -= 5;
         }
         if(player.direction == 1) {//moving right
            player.x -= 5;
         }
         if(player.direction == 3) {//moving left
            player.x += 5;
         }
         if(!player.isListeningToNPC) {
            entities[t].sayLines(stage, game, player);
            player.isListeningToNPC = true;
         }
      }
   }
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
      stage.addChild(jane);
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
