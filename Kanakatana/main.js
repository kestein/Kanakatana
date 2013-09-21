
enchant();
var map;
var entities;
var activeTarget;//REFACTOR: remove this and rewrite
var game;
var stage;
var hud;
var textDisplay;//REFACTOR: remove this and rewrite
var abilityHandler;//REFACTOR: remove remove rthis and rewrite

window.onload = function(){
    game = new Game(480, 320);//30x20 text files. Each char in the file is 16 pixels
	
    game.fps = 30;
	//REFACTOR: remove unused images
	game.preload("maphome.gif");
	game.preload("snail.png");
	game.preload("quest_3_obj.png");
	game.preload("slime.png");
	game.preload("slimeball.png");
	game.preload("map1.gif");
	game.preload("map2.gif");
	game.preload("player.png");
	game.preload("chars.gif");
	game.preload("player_portrait.png");
	game.preload("label_bkg.png");
	game.preload("next.png");
	game.preload("steve_portrait.png");
	game.preload("shop_bkg.png");
	game.preload("enpitsu1.png");
	game.preload("enpitsu2.png");
	game.preload("onigiri.png");
	game.preload("usagi2.png");
	game.preload("awa.png");
	game.preload("buy.png");
	game.preload("ika.png");
	game.preload("katana1.png");
	game.preload("katana2.png");
	game.preload("Inazuma2.png");
	game.preload("koru.png");
	game.preload("kirikabu.png");
	game.preload("kusari.png");
	game.preload("ketsueki.png");
	game.preload("Credits.png");
	game.preload("close.png");
	game.preload("ice.png");
	game.preload("snailice.png");
	game.preload("slimeice.png");
	game.preload("store_portrait.png");
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
   
   
   game.keybind(81, 'left');		//sets 'q' to the "left" button
   game.keybind(87, 'right');    //sets 'w' to the "right" button
   game.keybind(69, 'down');     //sets 'e' to the "down" button
   game.keybind(82, 'up');       //sets 'r' to the "up" button
	
	var player;
	var steve;
	var jane;
	var enemy1; //REFACTOR: remove?
	var collidedEntity;
	var e1;
	stage = new Group();
	hud = new Group();
	textDisplay = new Group();
   
		
    game.onload = function(){	
		/** player things **/
		player = new Player(16, 22);
		player.portrait = game.assets["player_portrait.png"]; //REFACTOR: move to class.
		player.x = 150;
		player.y = 10;
		player.name = "player"; //REFACTOR: move to class.
		player.isListeningToNPC = false;
		player.linesRead = 0;
           
		steve = new NPC(32, 32, "test_lines.txt");//REFACTOR: Comment about variables.
		steve.image = game.assets["chars.gif"];
		steve.portrait = game.assets["steve_portrait.png"];
		steve.frame = 1;
		steve.name = "steve";
		steve.x = 100;
		steve.y = 30;
      
		jane = new NPC(32, 32, "test_lines.txt");//REFACTOR: Comment about variables.
		jane.image = game.assets["chars.gif"];
		jane.portrait = game.assets["store_portrait.png"];
		jane.frame = 7;
		jane.name = "jane";
		jane.x = 100;
		jane.y = 200;
		jane.lines.push("JK ;)!!");
	  
	  
		abilityHandler = new AbilityHandler(32, 32, player);
		abilityHandler.x = 432;
		abilityHandler.y = 0;
		
		creditSheet = new CreditSheet(100, 80, player);
		creditSheet.x = 380;//REFACTOR: Move to class.REFACTOR: scale to game size.
		creditSheet.y = 0;
	  
      entities = new Array();
      entities.push(steve);
      entities.push(jane);  
		
		
		loadMap(game, "maphome.txt", "maphome.gif", setmap);
    };
	//REFACTOR: .
	function setmap(newmap)
	{
		map = newmap;
		init();
	}
   //REFACTOR: .
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
   //REFACTOR: Comment.
	function init()
	{	
		stage.addChild(map);
		stage.addChild(player);
		stage.addChild(steve);	//REFACTOR: Should this be here?.
		stage.addChild(jane);
		hud.addChild(abilityHandler);
		hud.addChild(creditSheet);
		game.rootScene.addChild(stage);
		game.rootScene.addChild(textDisplay);
		
		
		game.rootScene.addEventListener('enterframe', function(e) {
			var x = Math.min((game.width  - 50) / 2 - player.x, 0);
			var y = Math.min((game.height - 50) / 2 - player.y, 0);
			x = Math.max(game.width,  x + map.width)  - map.width;
			y = Math.max(game.height, y + map.height) - map.height;
			stage.x = x;
			stage.y = y;
		});
		//handles player movement while clicking. it adds a modifier to make the movement relative to the map and not the screen
		game.rootScene.addEventListener('touchstart', function(evt) {
			if(activeTarget) {
				if(activeTarget.activeTargetJump) {		//REFACTOR: Clean this shit up.
					activeTarget.x = evt.localX - stage.x;
					activeTarget.y = evt.localY - stage.y;
					activeTarget.moveTo(evt.localX - stage.x, evt.localY - stage.y);
				}
				activeTarget.activate(evt.localX - stage.x, evt.localY - stage.y);
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
