var stage_g;
var game_g;
var hud_g;
var steve;
var IQPlayer;
var prevAcivityPeople; //all of the talkable people from the previous place
var numEnemies = 0;//total number of enemies that you will fight in the quest

function startQ3(player) {
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
   steveS1Line1Q3();
}

var steveS1Line1Q3 = function() {
   steve.lines = ["-This is a gold min for cheap labour.", "I'm gonna have to find more of these people so I can-"];
   sayLines(playerS1Line1Q3, steve);
}

var playerS1Line1Q3 = function() {
   IQPlayer.lines = ["HI PROFESSOR HOW IS IT GOING?!?!"];
   sayLines(steveS1Line2Q3, IQPlayer);
}

var steveS1Line2Q3 = function() {
   steve.lines = ["HRMRGHHEGH!!", "I mean, hello again.", "What do you want?"];
   sayLines(playerS1Line2Q3, steve);
}

var playerS1Line2Q3 = function() {
   IQPlayer.lines = ["Well I've been training pretty hard recently.", "I think I'm ready to go even deeper!"];
   sayLines(steveS1Line3Q3, IQPlayer);
}

var steveS1Line3Q3 = function() {
   steve.lines = ["Ah yes, your enthusiasm is appreciated.", "Unfortunately my garden is fine and needs no more care."];
   sayLines(playerS1Line4Q3, steve);
}

var playerS1Line4Q3 = function() {
   IQPlayer.lines = ["Garden? Is that why you had me doing all that stuff?", "Look, I just wanna be a master at this stuff.", 
                      "Maybe you have something more difficult for me to do?"];
   sayLines(steveS1Line4Q3, IQPlayer);
}

var steveS1Line4Q3 = function() {
   steve.lines = ["NO!", "-er wait, I could get her to do THAT-", "On second thought yes, there is one more quest I have for you.",
                      "It's pretty dangerous though, are you sure you are up for it?"];
   sayLines(playerS1Line5Q3, steve);
}

var playerS1Line5Q3 = function() {
   IQPlayer.lines = ["I was born ready."];
   sayLines(steveS1Line5Q3, IQPlayer);
}

var steveS1Line5Q3 = function() {
   steve.lines = ["Very well, your wish is my command."];
   sayLines(steveS1Line6Q3, steve);
}

var steveS1Line6Q3 = function() {
   loadMap(game_g, "map3.txt", "map2.gif", quest3CombatMap);
   game_g.rootScene.addChild(hud_g);
   steve.lines = ["There is a treasure beyond words at the end of this corridor.", 
                   "If you can retrieve it for me-", "well it would be pretty cool."];
   //sayLines(playerS2Line1, steve);
   setTimeout(runSteveS2Line1Q3, 100);
}

var runSteveS2Line1Q3 = function() {
   sayLines(playerS2Line1Q3, steve);
}

var playerS2Line1Q3 = function() {
   IQPlayer.lines = ["Finally something fun.", "I wonder what this treasure could be?"];
   sayLines(questStart, IQPlayer);
}

var questStart = function() {
   IQPlayer.isListeningToNPC = false;
}

var asdf = function() {
   console.log("end of the line pal");
}