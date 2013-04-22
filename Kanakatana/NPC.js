//This acts as an addition to the sprite class since I want the Sprite class for interaction purposes
//Make a sprite then define the NPC class to extend it ('class NPC extends Sprite' is what I want to do)
var NPC = Class.create(Sprite, {
   initialize:function(width, height, script){
      Sprite.call(this, width, height);
      this.lines = ["hue hue hue", "Trololo", "No really, this is dialogue"];
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
      l = new Label(this.lines[this.linesRead]);
      var bkg = new Sprite(600, 80);
      bkg.image = game.assets["label_bkg.png"];
      bkg.y = game.height - 80;
      bkg.x = 0;
      l.addEventListener('touchend', function() {
         //if(stage.childNodes[3] instanceof Label) console.log("si snor");
         stage.removeChild(this);
         stage.removeChild(bkg);
      });
      l.x = 50;
      l.y = game.height - 40;
      stage.addChild(bkg);
      stage.addChild(l);
      //l.buttonMode = 'right';
      //increment the lines read var
      this.linesRead += 1;
      //implement quest system later
      if(this.linesRead > this.lines.length - 1) this.linesRead = 0;
   }
});