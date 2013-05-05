var stage_g;
var game_g;
var hud_g;
var steve;
var IQPlayer;
var prevAcivityPeople; //all of the talkable people from the previous place
var numEnemies = 0;//total number of enemies that you will fight in the quest

//function startIntroQuest(stage, game, prevAcivityPeople) {
function startQ2(player) {
//hack
	  hud.addChild(u1);
	  //end hack
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
   steve.lines = ["Welcome to the int- err, second quest", "We hope you enjoy your stay"];
   sayLines(playerS1Line1Q2, steve);
}

var playerS1Line1Q2 = function() {
   IQPlayer.lines = ["What is that supposed to mean?", "Am I stuck here or something?", "Woah, deja vu..."];
   sayLines(steveS1Line2Q2, IQPlayer);
}

var steveS1Line2Q2 = function() {
   steve.lines = ["Oh, you'll find out soon enough", "MUUUHHAHAHAHAHAHAA"];
   sayLines(steveS2Line1Q2, steve);
}

var steveS2Line1Q2 = function() { 
   loadMap(game_g, "map1.txt", "map1.gif", introQuestCombatMap);
   game_g.rootScene.addChild(hud_g);
   steve.lines = ["If you want to see your precious classroom again you're going to have to prove your worth.",
               "If you manage to defeat my legion of goons you will be brought back.",
               "It's not ilke I want to train you or anything, I just wana troll you that's all.",
               "BEGONE!!!"];
   //sayLines(playerS2Line1, steve);
   setTimeout(runSteveS2Line1Q2, 100);
}

var runSteveS2Line1Q2 = function() {
   sayLines(playerS2Line1Q2, steve);
}

var playerS2Line1Q2 = function() {
   IQPlayer.lines = ["Super..."];
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
               "I knew I should have spent more money on training than costumes.",
               "Bum out."];
      sayLines(playerS1Line2Q2, steve);
   }
}

var playerS1Line2Q2 = function() {
   //transport us back to the classroom
   game.rootScene.removeEventListener('enterframe', checkWinConditionQ2);
   game_g.rootScene.removeChild(hud_g);
   loadMap(game_g, "maphome.txt", "maphome.gif", homeMap);
   IQPlayer.lines = ["What a real jerk move man."];
   setTimeout(runPlayerS1Line2Q2, 100);
}

var runPlayerS1Line2Q2 = function() {
   sayLines(steveS1Line3Q2, IQPlayer);
}

var steveS1Line3Q2 = function() {
   steve.lines = ["Congratulations, you passed the test.", "Most people would beat me up now, but yo-"];
   sayLines(playerS1Line3Q2, steve);
}

var playerS1Line3Q2 = function() {
   IQPlayer.lines = ["HNGRAAAAAAAAA"];
   sayLines(endIntroQuestQ2, IQPlayer);
}

var endIntroQuestQ2 = function() {
   IQPlayer.isListeningToNPC = false;
   IQPlayer.quests.pop();
   console.log("You the baddest snail murker this side o da nississippi");
}