function sayLines(nextLine, speaker) {
   var bkg = new Sprite(game_g.width, game_g.height/6);
   var nxt = new Sprite(30, 30);
   var portrait = new Sprite(60, 60);
   var speaker = speaker;
   var l = new Label();
   var queueNextLine = nextLine;
   var screenOffsetX = 0;
   var screenOffsetY = 0;
   
   bkg.image = game_g.assets["label_bkg.png"];
   bkg.y = game_g.height - 50;
   if(IQPlayer.x > game_g.width/2) {
      screenOffsetX = IQPlayer.x - game_g.width/2 + 25;
   }
   if(IQPlayer.x - game_g.width/2)
   bkg.x = 0 + screenOffsetX;
   
   portrait.image = speaker.portrait;
   portrait.x = game_g.width - 60 + screenOffsetX;
   portrait.y = game_g.height - 53;
   
   nxt.touchEnabled = true;
   nxt.image = game_g.assets["next.png"];
   nxt.x = 370 + + screenOffsetX;
   nxt.y = game_g.height - 30;
   
   nxt.addEventListener('touchend', function() {
      //When the current speaker has said all of his lines
      if(speaker.linesRead > speaker.lines.length - 2) {
         /*stage_g.removeChild(this);
         stage_g.removeChild(bkg);
         stage_g.removeChild(l);
         stage_g.removeChild(portrait);*/
         textDisplay.removeChild(bkg);
         textDisplay.removeChild(l);
         textDisplay.removeChild(nxt);
         textDisplay.removeChild(portrait);
         speaker.linesRead = 0;
         if(queueNextLine !== null) {
            console.log(queueNextLine);
            queueNextLine();
         }
      }
      else {
         speaker.linesRead += 1;
         l.text = speaker.lines[speaker.linesRead];
      }
   });
   l.x = 50 + screenOffsetX;
   l.y = game_g.height - 40;
   l.text = speaker.lines[speaker.linesRead];
   
   /*stage_g.addChild(bkg);
   stage_g.addChild(l);
   stage_g.addChild(nxt);
   stage_g.addChild(portrait);  */
   textDisplay.addChild(bkg);
   textDisplay.addChild(l);
   textDisplay.addChild(nxt);
   textDisplay.addChild(portrait);
}
