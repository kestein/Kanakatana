
enchant();
var map;
var entities;

window.onload = function(){
    var game = new Game(800, 600);
	
    game.fps = 30;
	game.preload("map.png");
	game.preload("player.png");
   game.preload("steve_map_image.png");
   game.preload("label_bkg.png");
   game.preload("next.png");
   game.preload("steve_portrait.png")
	
	
	var player;
   var steve;
   var jane;
   var collidedEntity;
	var stage = new Group();
		
    game.onload = function(){	
		
		/** player things **/
		player = new Player(50, 50);
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
		//handles player movement while clicking. it adds a modifier to make the movement relative to the map and not the screen
		game.rootScene.addEventListener('touchstart', function(evt) {
			//console.log(map.collisionData.length);
			var xModifier = 0;
			var yModifier = 0;
			
			if(player.x < game.width/2) {
				xModifier = 0;
			}
			else if(player.x > (map.tileWidth * map.collisionData[0].length) - game.width/2) {
				xModifier = player.x - game.width/2 + player.width/2;
			}
			else if(player.x > game.width/2) {
				xModifier = player.x - game.width/2  + player.width/2;
			}
			
			if(player.y < game.height/2) {
				yModifier = 0;
			}
			else if(player.y > (map.tileHeight * map.collisionData.length) - game.height/2) {
				yModifier = player.y - game.height/2 + player.height/2;
			}
			else if(player.y > game.height/2) {
				yModifier = player.y - game.height/2 + player.height/2;
			}
			
			/*if(player.y > game.height/2) {
				yModifier = player.y - game.width/2 + player.width/2;
			}*/
			
			
			player.targetClick(evt.localX + xModifier, evt.localY + yModifier);
        });

		var pad = new Pad();
		pad.x = 0;
		pad.y = 0;
		game.rootScene.addChild(pad);
	}
	game.start();
};
