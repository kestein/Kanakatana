var stage_g; //REFACTOR: these are global vars again! and they are repeated. 
var game_g;
var hud_g;
var steve;
var IQPlayer;
var prevAcivityPeople; //all of the talkable people from the previous place
var numEnemies = 0;//total number of enemies that you will fight in the quest

//function startIntroQuest(stage, game, prevAcivityPeople) {
function startQ2(player) {
	player.unlockedAbilities += 5;		//is this a hack? it may actually work. will need lvl 3 to see.
	console.log(player.unlockedAbilities);
	IQPlayer = player;
   stage_g = stage;
   game_g = game;
   hud_g = hud;
   
   
   prevAcivityPeople = new Array();
   for(var f = 0; f < entities.length; f++) {
      prevAcivityPeople.push(entities[f]);
   }
   //Set the NPC's for this interaction
   for(var g = 0; g < prevAcivityPeople.length; g++) {
      if(prevAcivityPeople[g].name == "steve") {
         steve = prevAcivityPeople[g];
         continue;
      }
   }
   steveS1Line1Q2();
}

var steveS1Line1Q2 = function() {
   steve.lines = ["Well...", "Lets get to it!"];
   sayLines(playerS1Line1Q2, steve);
}

var playerS1Line1Q2 = function() {
   IQPlayer.lines = ["Again?", "Isnt this a little intesnse?"];
   sayLines(steveS1Line2Q2, IQPlayer);
}

var steveS1Line2Q2 = function() {
   steve.lines = ["Well I was going to give a lecture on the next hirigana,", "but the snails are back in my garden!"];
   sayLines(steveS2Line1Q2, steve);
}

var steveS2Line1Q2 = function() { 
   loadMap(game_g, "map2.txt", "map1.gif", quest2CombatMap);
   game_g.rootScene.addChild(hud_g);
   steve.lines = ["You all seem smart. I am sure you will think of something.",
               "Now go save my tomatos."];
   //sayLines(playerS2Line1, steve);
   setTimeout(runSteveS2Line1Q2, 100);
}

var runSteveS2Line1Q2 = function() {
   sayLines(playerS2Line1Q2, steve);
}

var playerS2Line1Q2 = function() {
   IQPlayer.lines = ["I really hope my next teacher is a bit more sane."];
   sayLines(steveS2Line2Q2, IQPlayer);
}

var steveS2Line2Q2 = function() {
   IQPlayer.isListeningToNPC = false;
   game.rootScene.addEventListener('enterframe', checkWinConditionQ2);
   /*steve.lines = ["How did you defeat my legion of goons?!", 
               "I knew I should have spent more money on training than costumes.",
               "Bum out."];
   sayLines(playerS1Line2, steve);*/
}

var checkWinConditionQ2 = function() {
   /*var enemiesLeft = 0;
   if(entities.length == 0) {
      enemiesLeft = 0;
   }
   for(var a = 0; a < entities.length; a++) {
      if(entities[a] instanceof Enemy) {
         enemiesLeft += 1;
      }
   }*/
   if(numEnemies == 0) {
      IQPlayer.isListeningToNPC = true;
      steve.lines = ["Thank you for saving my garden again.", 
               "Class is dismissed for the day.","I will bring you back to your homeroom."];
      sayLines(playerS1Line2Q2, steve);
	  if(entities.length > 0) {
		for(var i = 0; i < entities.length; i++){
			entities[i].dead = true;
		}
		cleanEntities();
	  }
      game.rootScene.removeEventListener('enterframe', checkWinConditionQ2);
   }
}

var playerS1Line2Q2 = function() {
   //transport us back to the classroom
   game.rootScene.removeEventListener('enterframe', checkWinConditionQ2);
   game_g.rootScene.removeChild(hud_g);
   setTimeout(loadMap(game_g, "maphome.txt", "maphome.gif", homeMap), 300);
   IQPlayer.lines = ["What an intense day."];
   setTimeout(runPlayerS1Line2Q2, 100);
}

var runPlayerS1Line2Q2 = function() {
   sayLines(steveS1Line3Q2, IQPlayer);
}

var steveS1Line3Q2 = function() {
   steve.lines = ["Well, thats annoying, the door seems to have become a series of bookshelves."];
   sayLines(playerS1Line3Q2, steve);
}

var playerS1Line3Q2 = function() {
   IQPlayer.lines = ["HNGRAAAAAAAAA"];
   sayLines(endIntroQuestQ2, IQPlayer);
}

var endIntroQuestQ2 = function() {
   IQPlayer.isListeningToNPC = false;
   IQPlayer.quests.pop();
}