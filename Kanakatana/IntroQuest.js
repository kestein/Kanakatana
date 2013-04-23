var stage_g;
var game_g;
var steve;
var player;

function startIntroQuest(stage, game, people) {
   stage_g = stage;
   game_g = game;
   entites = people; //all of the talkable people on the map
   //Set the NPC's for this interaction
   for(var g = 0; g < people.length; g++) {
      if(people[g].name == "player") {
         player = people[g];
         continue;
      }
      if(people[g].name = "steve") {
         steve = people[g];
         continue;
      }
   }
   //immobilize the player
   steveS1Line1();
}

var steveS1Line1 = function() {
   steve.lines = ["Welcome to the intro quest", "We hope you enjoy your stay"];
   sayLines(playerS1Line1, steve);
}

var playerS1Line1 = function() {
   player.lines = ["What is that supposed to mean?", "Am I stuck here or something?"];
   sayLines(steveS1Line2, player);
}

var steveS1Line2 = function() {
   steve.lines = ["Oh, you'll find out soon enough", "MUUUHHAHAHAHAHAHAA"];
   sayLines(steveS2Line1, steve);
}

var steveS2Line1 = function() { 
   //Transport us to the next map we are going to. Put some animation in before this
   //loadMap(game, "map2.txt", "map.png", replacemap);
   steve.lines = ["If you want to see your precious classroom again you're going to have to prove your worth.",
               "If you manage to defeat my legion of goons you will be brought back.",
               "It's not ilke I want to train you or anything, I just wana troll you that's all.",
               "BEGONE!!!"];
   sayLines(playerS2Line1, steve);
}

var playerS2Line1 = function() {
   player.lines = ["Super..."];
   sayLines(steveS2Line2, player);
}

var steveS2Line2 = function() {
   //spawnEnemies()
   //Check to see if win conditions have been met
   steve.lines = [".......", "How did you defeat my legion of goons?!", 
               "I knew I should have spent more money on training than costumes.",
               "Oh bummer is me."];
   sayLines(playerS1Line2, steve);
}

var playerS1Line2 = function() {
   //transport us back to the classroom
   //loadMap(game, "map.txt", "map.png", replacemap);
   player.lines = ["What a real jerk move man."];
   sayLiens(steveS1Line3, player);
}

var steveS1Line3 = function() {
   steve.lines = ["Congratulations, you passed the test.", "Most people would beat me up now, but yo-"];
   sayLines(playerS1Line3, steve);
}

var playerS1Line3 = function() {
   player.lines = ["HNGRAAAAAAAAA"];
   sayLines(null, player);
}

function sayLines(nextLine, speaker) {
   var bkg = new Sprite(game_g.width, game_g.height/6);
   var nxt = new Sprite(30, 30);
   var portrait = new Sprite(60, 60);
   var speaker = speaker;
   var l = new Label();
   var queueNextLine = nextLine;
   
   bkg.image = game_g.assets["label_bkg.png"];
   bkg.y = game_g.height - 80;
   bkg.x = 0;
   
   portrait.image = speaker.portrait;
   portrait.x = game_g.width - 70;
   portrait.y = game_g.height - 70;
   
   nxt.touchEnabled = true;
   nxt.image = game_g.assets["next.png"];
   nxt.x = 50;
   nxt.y = game_g.height - 50;
   
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
         //listener.isListeningTospeaker = false;
      }
      else {
         speaker.linesRead += 1;
         l.text = speaker.lines[speaker.linesRead];
      }
   });
   l.x = 50;
   l.y = game_g.height - 80;
   l.text = speaker.lines[speaker.linesRead];
   
   stage_g.addChild(bkg);
   stage_g.addChild(l);
   stage_g.addChild(nxt);
   stage_g.addChild(portrait);  
}