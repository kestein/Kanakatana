var stage_g;
var game_g;
var hud_g;
var steve;
var IQPlayer;
var prevAcivityPeople; //all of the talkable people from the previous place
var numEnemies = 0;//total number of enemies that you will fight in the quest

//function startIntroQuest(stage, game, prevAcivityPeople) {
function startIntroQuest(player) {
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
   steveS1Line1();
}

var steveS1Line1 = function() {
   steve.lines = ["Welcome to the first day of class", "Pop quiz!"];
   sayLines(playerS1Line1, steve);
}

var playerS1Line1 = function() {
   IQPlayer.lines = ["What!? Are you kidding me?!", "You haven't even lectured us?","How is this fair?"];
   sayLines(steveS1Line2, IQPlayer);
}

var steveS1Line2 = function() {
   steve.lines = ["Oh, fine. Here is how it works", "You get thrown into a magical dungeon.", "You have some kana with magical powers",
   "Use these kana to defeat the enemies.", "There. Happy?"];
   sayLines(steveS2Line1, steve);
}

var steveS2Line1 = function() { 
   loadMap(game_g, "map1.txt", "map1.gif", introQuestCombatMap);
   //loadMap(game_g, "map2.txt", "map1.gif", quest2CombatMap);
   game_g.rootScene.addChild(hud_g);
   steve.lines = ["If you manage to defeat my legion of goons, you will have proven you know Japanese",
               "Wait...",
			   "Maybe I should have thought this out a little more.",
               "...",
               "BEGONE!!!"];
   //sayLines(playerS2Line1, steve);
   setTimeout(runSteveS2Line1, 100);
}

var runSteveS2Line1 = function() {
   sayLines(playerS2Line1, steve);
}

var playerS2Line1 = function() {
   IQPlayer.lines = ["I think we need a new teacher."];
   sayLines(steveS2Line2, IQPlayer);
}

var steveS2Line2 = function() {
   IQPlayer.isListeningToNPC = false;
   game.rootScene.addEventListener('enterframe', checkWinCondition);
   /*steve.lines = ["How did you defeat my legion of goons?!", 
               "I knew I should have spent more money on training than costumes.",
               "Bum out."];
   sayLines(playerS1Line2, steve);*/
}

var checkWinCondition = function() {
   var enemiesLeft = 0;
   if(entities.length == 0) {
      enemiesLeft = 0;
   }
   for(var a = 0; a < entities.length; a++) {
      if(entities[a] instanceof Enemy) {
         enemiesLeft += 1;
      }
   }
   if(enemiesLeft == 0) {
      IQPlayer.isListeningToNPC = true;
      steve.lines = ["How did you defeat my legion of goons?!", 
               "I knew naming my pet snail 'Legion of goons' wouldnt actually make him powerful",
               "Bum out."];
      sayLines(playerS1Line2, steve);
      game.rootScene.removeEventListener('enterframe', checkWinCondition);
   }
}

var playerS1Line2 = function() {
   //transport us back to the classroom
   //game.rootScene.removeEventListener('enterframe', checkWinCondition);
   game_g.rootScene.removeChild(hud_g);
   loadMap(game_g, "maphome.txt", "maphome.gif", homeMap);
   IQPlayer.lines = ["This is rediculous. I wouldn't be supprised if", " you are replaced by next monday."];
   setTimeout(runPlayerS1Line2, 100);
}

var runPlayerS1Line2 = function() {
   sayLines(steveS1Line3, IQPlayer);
}

var steveS1Line3 = function() {
   steve.lines = ["Congratulations, you passed the test.", "Most people would beat me up now, but yo-"];
   sayLines(playerS1Line3, steve);
}

var playerS1Line3 = function() {
   IQPlayer.lines = ["HNGRAAAAAAAAA"];
   sayLines(endIntroQuest, IQPlayer);
}

var endIntroQuest = function() {
   IQPlayer.lines = [];
   steve.lines = [];
   IQPlayer.isListeningToNPC = false;
   IQPlayer.quests.pop();
   console.log("You the baddest snail murker this side o da nississippi");
}