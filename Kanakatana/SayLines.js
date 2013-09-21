//REFACTOR: break into smaller functions.
function sayLines(nextLine, speaker) {
   var bkg = new Sprite(game.width, 80);
   var nxt = new Sprite(30, 30);
   var portrait = new Sprite(60, 60);
   var speaker = speaker;
   console.log(speaker.lines);
   var l = new Label();
   var queueNextLine = nextLine;
   var screenOffsetX = 0;
   var screenOffsetY = 0;
   
   bkg.image = game_g.assets["label_bkg.png"];
   bkg.y = game_g.height - 60;
   if(IQPlayer.x > game_g.width/2) {
    //  screenOffsetX = IQPlayer.x - game_g.width/2 + 25;
   }
   if(IQPlayer.x - game_g.width/2)
   bkg.x = 0 + screenOffsetX;
   
   portrait.image = speaker.portrait;
   portrait.x = game_g.width - 60 + screenOffsetX;
   portrait.y = game_g.height - 57;
   
   nxt.touchEnabled = true;
   nxt.image = game_g.assets["next.png"];
   nxt.x = 380 + screenOffsetX;
   nxt.y = game_g.height - 25;
   
   nxt.addEventListener('touchend', function() {
      //When the current speaker has said all of his lines
      if(speaker.linesRead > speaker.lines.length - 2) {
         textDisplay.removeChild(bkg);
         textDisplay.removeChild(l);
         textDisplay.removeChild(nxt);
         textDisplay.removeChild(portrait);
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
   l.x = 25 + screenOffsetX;
   l.y = game_g.height - 40;
   l.width = 350;
   l.text = speaker.lines[speaker.linesRead];
   
   textDisplay.addChild(bkg);
   textDisplay.addChild(l);
   textDisplay.addChild(nxt);
   textDisplay.addChild(portrait);
}
