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
   steve.lines = ["Welcome to the intro quest", "We hope you enjoy your stay"];
   sayLines(playerS1Line1, steve);
}

var playerS1Line1 = function() {
   IQPlayer.lines = ["What is that supposed to mean?", "Am I stuck here or something?"];
   sayLines(steveS1Line2, IQPlayer);
}

var steveS1Line2 = function() {
   steve.lines = ["Oh, you'll find out soon enough", "MUUUHHAHAHAHAHAHAA"];
   sayLines(steveS2Line1, steve);
}

var steveS2Line1 = function() { 
   loadMap(game_g, "map1.txt", "map1.gif", introQuestCombatMap);
   game_g.rootScene.addChild(hud_g);
   steve.lines = ["If you want to see your precious classroom again you're going to have to prove your worth.",
               "If you manage to defeat my legion of goons you will be brought back.",
               "It's not ilke I want to train you or anything, I just wana troll you that's all.",
               "BEGONE!!!"];
   //sayLines(playerS2Line1, steve);
   setTimeout(runSteveS2Line1, 100);
}

var runSteveS2Line1 = function() {
   sayLines(playerS2Line1, steve);
}

var playerS2Line1 = function() {
   IQPlayer.lines = ["Super..."];
   IQPlayer.isListeningToNPC = false;
   sayLines(steveS2Line2, IQPlayer);
}

var steveS2Line2 = function() {
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
               "I knew I should have spent more money on training than costumes.",
               "Bum out."];
      sayLines(playerS1Line2, steve);
   }
}

var playerS1Line2 = function() {
   //transport us back to the classroom
   game.rootScene.removeEventListener('enterframe', checkWinCondition);
   game_g.rootScene.removeChild(hud_g);
   loadMap(game_g, "maphome.txt", "maphome.gif", introQuestHomeMap);
   IQPlayer.lines = ["What a real jerk move man."];
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
   IQPlayer.isListeningToNPC = false;
   IQPlayer.quests.pop();
   console.log("You the baddest snail murker this side o da nississippi");
}

function sayLines(nextLine, speaker) {
   var bkg = new Sprite(game_g.width, game_g.height/6);
   var nxt = new Sprite(30, 30);
   var portrait = new Sprite(60, 60);
   var speaker = speaker;
   var l = new Label();
   var queueNextLine = nextLine;
   
   bkg.image = game_g.assets["label_bkg.png"];
   bkg.y = game_g.height - 50;
   bkg.x = 0;
   
   portrait.image = speaker.portrait;
   portrait.x = game_g.width - 60;
   portrait.y = game_g.height - 53;
   
   nxt.touchEnabled = true;
   nxt.image = game_g.assets["next.png"];
   nxt.x = 370;
   nxt.y = game_g.height - 30;
   
   nxt.addEventListener('touchend', function() {
      //When the current speaker has said all of his lines
      if(speaker.linesRead > speaker.lines.length - 2) {
         stage_g.removeChild(this);
         stage_g.removeChild(bkg);
         stage_g.removeChild(l);
         stage_g.removeChild(portrait);
         speaker.linesRead = 0;
         if(queueNextLine !== null) {
            queueNextLine();
         }
      }
      else {
         speaker.linesRead += 1;
         l.text = speaker.lines[speaker.linesRead];
      }
   });
   l.x = 50;
   l.y = game_g.height - 40;
   l.text = speaker.lines[speaker.linesRead];
   
   stage_g.addChild(bkg);
   stage_g.addChild(l);
   stage_g.addChild(nxt);
   stage_g.addChild(portrait);  
}

var introQuestCombatMap = function(newmap) {
   stage_g.removeChild(IQPlayer);
   stage_g.removeChild(map);
   var e_len = entities.length;
   for(var h = 0; h < e_len; h ++) {
      stage_g.removeChild(entities[h]);
      entities.pop(h);
   }
   map = newmap;
   stage_g.addChild(map);
   enemy1 = new Snail(32, 32, IQPlayer);
   enemy1.image = game.assets["snail.png"];
   enemy1.name = "Enemy";
   enemy1.x = 300;
   enemy1.y = 150;
   stage_g.addChild(IQPlayer);
   stage_g.addChild(enemy1);
   entities.push(enemy1);
   numEnemies += 1;
   
   IQPlayer.x = 64;
   IQPlayer.y = 64;
}

var introQuestHomeMap = function(newmap) {
   stage_g.removeChild(IQPlayer);
   stage_g.removeChild(map);
   var e_len = prevAcivityPeople.length;
   map = newmap;
   stage_g.addChild(map);
   for(var h = 0; h < e_len; h ++) {
      entities.push(prevAcivityPeople[h]);
      stage_g.addChild(entities[h]);
   }
   stage_g.addChild(IQPlayer);
   
   IQPlayer.x = 50;
   IQPlayer.y = 50;
}