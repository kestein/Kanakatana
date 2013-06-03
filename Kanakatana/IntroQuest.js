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
   steve.lines = ["Welcome to the first day of class", "Today we will be studying the first 5 hirigana",
   "Hirigana are not only an inportant way of writing Japanese...", "...They are also magical symbols of imense power!",
   "Master hirigana, and you master the very, very basics of writing and reading Japanese.",
   "You also get to blow stuff up with your mind!"];
   sayLines(playerS1Line1, steve);
}

var playerS1Line1 = function() {
   IQPlayer.lines = ["My first day of training to become a hirigana master. I am so excited!","Though not as excited as Prof. Substitute."];
   sayLines(steveS1Line2, IQPlayer);
}

var steveS1Line2 = function() {
   steve.lines = ["Lets start with what you know as the vowels. A, I, U, E, and O.", "Awa starts with A and means bubble. It shields you",
   "Inazuma starts with I and means lightning. YOU SHOOT LIGHTNING!", "Usagi starts with U and means rabbit. It turns you into a speedy rabbit.",
   "Enpitsu starts with E, and means Pencil. Launch a giant summoned pencil in front of you."];
   sayLines(steveS2Line1, steve);
}

var steveS2Line1 = function() { 
   loadMap(game_g, "map1.txt", "map1.gif", introQuestCombatMap);
   //loadMap(game_g, "map3.txt", "map2.gif", introQuestCombatMap);
   game_g.rootScene.addChild(hud_g);
   steve.lines = ["And now I have teleported you all to various places around the school gardens.",
               "Clear out the snails to test your new powers",
			   "It WILL be tough at first, but you will eventually get the hang of it",
               "...",
               "BEGONE!!!"];
   setTimeout(runSteveS2Line1, 100);
}

var runSteveS2Line1 = function() {
   sayLines(playerS2Line1, steve);
}

var playerS2Line1 = function() {
   IQPlayer.lines = ["Is the problem that the snails are eating the plants?",
   "Or is the Problem that the snails are giant?",
   "Oh well, violence solves it either way!"];
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
//console.log(entities.length);
   /*var enemiesLeft = 0;
   if(entities.length == 0) {
      enemiesLeft = 0;
   }
   for(var a = 0; a < entities.length; a++) {
      if(entities[a] instanceof Enemy) {
         enemiesLeft += 1;
		 //console.log(enemiesLeft);
      }
   }*/
   console.log(numEnemies);
   if(numEnemies == 0) {
      IQPlayer.isListeningToNPC = true;
      steve.lines = ["Good job everyone!", 
               "I will teleport you all back to the clasroom now."];
      sayLines(playerS1Line2, steve);
      game.rootScene.removeEventListener('enterframe', checkWinCondition);
   }
}

var playerS1Line2 = function() {
   //transport us back to the classroom
   //game.rootScene.removeEventListener('enterframe', checkWinCondition);
   game_g.rootScene.removeChild(hud_g);
   loadMap(game_g, "maphome.txt", "maphome.gif", homeMap);
   IQPlayer.lines = ["I did it!", "Praise the sun."];
   setTimeout(runPlayerS1Line2, 100);
}

var runPlayerS1Line2 = function() {
   sayLines(steveS1Line3, IQPlayer);
}

var steveS1Line3 = function() {
   steve.lines = ["Congratulations, you passed the test.", "Talk to me when you are ready for your next test."];
   sayLines(playerS1Line3, steve);
}

var playerS1Line3 = function() {
   IQPlayer.lines = ["Already?!"];
   sayLines(endIntroQuest, IQPlayer);
}

var endIntroQuest = function() {
   IQPlayer.lines = [];
   steve.lines = [];
   IQPlayer.isListeningToNPC = false;
   IQPlayer.quests.pop();
   //console.log("You the baddest snail murker this side o da nississippi");
}