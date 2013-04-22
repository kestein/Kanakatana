var stage_g;
var game_g;

function introQuest(partiesInvolved, stage, game) {
   //The peeps involved with this quest
   var player;
   var steve;
   var doneWithLine = false;
   stage_g = stage;
   game_g = game;
   for(var g = 0; g < partiesInvolved.length; g++) {
      if(partiesInvolved[g].name == "player") {
         player = partiesInvolved[g];
         continue;
      }
      if(partiesInvolved[g].name = "steve") {
         steve = partiesInvolved[g];
         continue;
      }
   }
   var dialogue = [["Welcome to the intro quest", "We hope you enjoy your stay"], //steve
                ["What is that supposed to mean?", "Am I stuck here or something?"], //player
                ["Oh, you'll find out soon enough", "MUUUHHAHAHAHAHAHAA"]]; //steve
   //Which party says which dialogue. THIS ARRAY MUST BE THE SAME SIZE AS THE DIALOGUE ARRAY
   var whoSaysWhat = [steve, player, steve];
   sayDialogue(dialogue, whoSaysWhat);
   //Transport us to the next map we are going to. Put some animation in before this
   //loadMap(game, "map2.txt", "map.png", replacemap);
   dialogue = [["If you want to see your precious classroom again you're going to have to prove your worth.",
               "If you manage to defeat my legion of goons you will be brought back.",
               "It's not ilke I want to train you or anything, I just wana troll you that's all.",
               "BEGONE!!!"]
               ["Super..."]];
   whoSaysWhat = [steve, player];
   sayDialogue(dialogue, whoSaysWhat);
   //spawnEnemies()
   /*while(numEnemeies > 0) {
      checkEnemiesAlive();
   }*/
   dialogue = [[".......", "How did you defeat my legion of goons?!", 
               "I knew I should have spent more money on training than costumes.",
               "Oh bummer is me."]];
   whoSaysWhat = [steve];
   sayDialogue(dialogue, whoSaysWhat);
   //loadMap(game, "map.txt", "map.png", replacemap);
   dialogue = [["What a real jerk move man."],
               ["Congratulations, you passed the test.", "Most people would beat me up now, but yo-"],
               ["HNGRAAAAAAAAA"]];
   whoSaysWhat = [player, steve, player];
   //End event/quest
}

function sayDialogue(dialogue, whoSaysWhat) {
   var dialogueLen = dialogue.length;
   console.log("it is " + dialogueLen);
   for(var t = 0; t < dialogue.length; t++) {
         whoSaysWhat[t].lines = dialogue[t];
         sayLines(whoSaysWhat[t]);
      introQuest.doneWithLine = false;
      //while(introQuest.doneWithLine == false);
   }
}
   
function sayLines(speaker) {
   //Output each element in the lines array to the screen
   var bkg = new Sprite(game_g.width, game_g.height/6);
   var nxt = new Sprite(30, 30);
   var portrait = new Sprite(60, 60);
   var speaker = speaker;
   var l = new Label();
   var done = false;
   //var listener = listener;//The player
   
   //immobilize the player
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
      //if(stage.childNodes[3] instanceof Label) console.log("si snor");
      if(speaker.linesRead > speaker.lines.length - 2) {
         stage_g.removeChild(this);
         stage_g.removeChild(bkg);
         stage_g.removeChild(l);
         stage_g.removeChild(portrait);
         speaker.linesRead = 0;
         done = true;
         introQuest.doneWithLine = true;
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