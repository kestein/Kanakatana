
enchant();
var map;
var entities;
var activeTarget;
var game;
var stage;
var hud;
var textDisplay;

window.onload = function(){
    game = new Game(480, 320);//30x20 text files
	
    game.fps = 30;
	game.preload("maphome.gif");
	game.preload("snail.png");
	game.preload("map1.gif");
   game.preload("map2.gif");
	game.preload("player.png");
	game.preload("chars.gif");
	game.preload("player_portrait.png");
	game.preload("label_bkg.png");
	game.preload("next.png");
	game.preload("steve_portrait.png")
	game.preload("enpitsu1.png");
	game.preload("enpitsu2.png");
	game.preload("onigiri.png");
	game.preload("usagi2.png");
	game.preload("awa.png");
	game.preload("ika.png");
	game.preload("katana1.png");
	game.preload("katana2.png");
	game.preload("Inazuma.png");
	game.preload("koru.png");
	game.preload("kirikabu.png");
	game.preload("kusari.png");
	game.preload("ketsueki.png");
	game.preload("ice.png");
	game.preload("a.jpg");
	game.preload("i.jpg");
	game.preload("u.jpg");
	game.preload("e.jpg");
	game.preload("o.jpg");
	game.preload("ka.jpg");
	game.preload("ki.jpg");
	game.preload("ku.jpg");
	game.preload("ke.jpg");
	game.preload("ko.jpg");
	game.preload("a_romanji.png");
	game.preload("i_romanji.png");
	game.preload("u_romanji.png");
	game.preload("e_romanji.png");
	game.preload("o_romanji.png");
	game.preload("ka_romanji.png");
	game.preload("ki_romanji.png");
	game.preload("ku_romanji.png");
	game.preload("ke_romanji.png");
	game.preload("ko_romanji.png");
   
   
   game.keybind(81, 'a');		//sets 'q' to the "a button"
	
	
	var player;
	var steve;
	var jane;
	var enemy1;
	var collidedEntity;
	var e1;
	stage = new Group();
	hud = new Group();
	textDisplay = new Group();
   
		
    game.onload = function(){	
		/** player things **/
		player = new Player(16, 22);
		player.image = game.assets["player.png"];
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
	  
	  
	  abilityHandler = new AbilityHandler(32, 32, player);
	  abilityHandler.x = 432;
	  abilityHandler.y = 0;
	  //console.log(abilityHandler.x);
	  
      entities = new Array();
      entities.push(steve);
      entities.push(jane);  
		
		
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
		hud.addChild(abilityHandler);
		game.rootScene.addChild(stage);
      game.rootScene.addChild(textDisplay);
		
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
			if(activeTarget) {
				activeTarget.x = evt.localX - stage.x;
				activeTarget.y = evt.localY - stage.y;
				activeTarget.moveTo(evt.localX - stage.x, evt.localY - stage.y)
				activeTarget.activate();
			}
			if(evt.localX > 34) {		//hack. fix this when implementing ability pannel.
				player.targetClick(-stage.x + evt.localX - player.width/2, evt.localY - stage.y - player.height/2 );
			}
			
        });
		
		game.rootScene.addEventListener('enterframe', function() {
			collideEntities();
		});
	}
	game.start();
};
