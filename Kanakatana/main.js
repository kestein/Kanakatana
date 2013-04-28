
enchant();
var map;
var entities;
var game;
var stage;
var hud;


window.onload = function(){
    game = new Game(480, 320);//30x20 text files
	
    game.fps = 30;
   game.preload("maphome.gif");
	game.preload("snail.png");
	game.preload("map1.gif");
	game.preload("player.png");
	game.preload("chars.gif");
   game.preload("player_portrait.png");
   game.preload("label_bkg.png");
   game.preload("next.png");
   game.preload("steve_portrait.png")
   game.preload("enpitsu1.png");
   game.preload("enpitsu2.png");
   game.preload("e.jpg");
   
   game.keybind(81, 'a');		//sets 'q' to the "a button"
	
	
	var player;
	var steve;
	var jane;
	var enemy1;
	var collidedEntity;
	var e1;
	stage = new Group();
	hud = new Group();
	
		
    game.onload = function(){	
		/** player things **/
		player = new Player(32, 32);
		player.image = game.assets["chars.gif"];
      player.portrait = game.assets["player_portrait.png"];
		player.x = 150;
		player.y = 10;
      player.name = "player";
      player.isListeningToNPC = false;
      player.linesRead = 0;
      
      steve = new NPC(32, 32, "test_lines.txt");
      steve.image = game.assets["chars.gif"];
      steve.portrait = game.assets["steve_portrait.png"];
	  steve.frame = 1;
     steve.name = "steve";
      steve.x = 100;
      steve.y = 30;
      
      jane = new NPC(32, 32, "test_lines.txt");
      jane.image = game.assets["chars.gif"];
      jane.portrait = game.assets["chars.gif"];
	  jane.frame = 7;
	  jane.name = "jane";
      jane.x = 100;
      jane.y = 200;
      jane.lines.push("JK ;)!!");
	  
	   enemy1 = new Enemy(32, 32, player);
	  enemy1 = new Snail(32, 32, player);
      enemy1.image = game.assets["snail.png"];
      enemy1.x = 600;
      //enemy1.name = "enemy1";
      enemy1.y = 150;
	  
	  e1 = new E(96, 96, player);
	  e1.image = game.assets["e.jpg"];
	  e1.x = 700;
      e1.y = 150;
	  
      entities = new Array();
      entities.push(steve);
      entities.push(jane);
	  entities.push(enemy1);
	  entities.push(e1);
	  
		
		
		loadMap(game, "maphome.txt", "maphome.gif", setmap);
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
   
	var replacemap = function(newmap)
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
		stage.addChild(enemy1);
		hud.addChild(e1);//remove this
		game.rootScene.addChild(stage);
		game.rootScene.addChild(hud);
		
		game.rootScene.addEventListener('enterframe', function(e) {
			var x = Math.min((game.width  - 50) / 2 - player.x, 0);
			var y = Math.min((game.height - 50) / 2 - player.y, 0);
			x = Math.max(game.width,  x + map.width)  - map.width;
			y = Math.max(game.height, y + map.height) - map.height;
			stage.x = x;
			stage.y = y;
			if (player.x / 48 == 22 && player.y / 50 == 1)
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
			//if(evt.localX < 700) {		//hack. fix this when implementing ability pannel.
				player.targetClick(evt.localX + xModifier - player.width/2, evt.localY + yModifier - player.height/2);
		//	}
        });
		
		game.rootScene.addEventListener('enterframe', function() {
			collideEntities();
		});
	}
	game.start();
};
