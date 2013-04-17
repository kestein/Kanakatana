//This acts as an addition to the sprite class since I want the Sprite class for interaction purposes
//Make a sprite then define the NPC class to extend it ('class NPC extends Sprite' is what I want to do)
var NPC = Class.create(Sprite, {
   initialize:function(width, height, script){
      Sprite.call(this, width, height);
      //Put this in a diff function to act as a database for quests corresponding to lines
      this.lines = ["Who the hell do you think you are", 
       "Do you really think YOU can beat ME!??", "My hoard of goons will show you what's what!!"];
      this.linesRead = 0;
      /*var reader1 = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP'); //for them file IO
      reader1.open('get', script, true);
      reader1.onreadystatechange = function() {
         lines = new Array();
         if (reader1.responseText != null && reader1.responseText != "")
         {
            var t = reader1.responseText.split('\n'); //array of phrases for the NPC to say
            for(var a in t) {
               console.log("a is " + a);
               lines.push(t[a]);
            }
            console.log("lines is " + lines[1]);
            console.log("t is " + t[1]);
         }
      };
      reader1.send(null);*/
      //console.log(lines[0]);
   },
   /*parseNPCWords:function() {
      if (reader1.responseText != null && reader1.responseText != "")
      {
         lines = reader1.responseText.split('\n'); //array of phrases for the NPC to say
         //console.log(lines[3]);
      }
   },*/
   // Add a label w/ a background to the stage group
   // Put in a check to see if a label was not exited and only swap the label out
   sayLines:function(stage, game) {
      //Output each element in the lines array to the screen
      var bkg = new Sprite(800, 80);
      var nxt = new Sprite(30, 30);
      var portrait = new Sprite(60, 60);
      var NPC = this;
      var l = new Label(NPC.lines[NPC.linesRead]);
      
      bkg.image = game.assets["label_bkg.png"];
      bkg.y = game.height - 80;
      bkg.x = 0;
      nxt.touchEnabled = true;
      nxt.image = game.assets["next.png"];
      nxt.x = 50;
      nxt.y = game.height - 50;
      portrait.image = NPC.portrait;
      portrait.x = game.width - 70;
      portrait.y = game.height - 70;
      nxt.addEventListener('touchend', function() {
         //if(stage.childNodes[3] instanceof Label) console.log("si snor");
         if(NPC.linesRead > NPC.lines.length - 2) {
            stage.removeChild(this);
            stage.removeChild(bkg);
            stage.removeChild(l);
            stage.removeChild(portrait);
            NPC.linesRead = 0;
         }
         else {
            NPC.linesRead += 1;
            l.text = NPC.lines[NPC.linesRead];
         }
      });
      l.x = 50;
      l.y = game.height - 80;
      stage.addChild(bkg);
      stage.addChild(l);
      stage.addChild(nxt);
      stage.addChild(portrait);
      //implement quest system later
   }
});