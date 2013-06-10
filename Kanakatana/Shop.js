var openShop = function(shopKeeper, player) {
   var bkg = new Sprite(game.width, game.height/6);
   var portrait = new Sprite(60, 60);
   var l = new Label();
   bkg.image = game.assets["label_bkg.png"];
   bkg.y = game.height - 50;
  
   portrait.image = shopKeeper.portrait;
   portrait.x = game.width - 60;
   portrait.y = game.height - 57;
   
   l.x = 25;
   l.y = game.height - 40;
   l.width = 350;
   l.text = "Welcome to the student store!";
   
   textDisplay.addChild(bkg);
   textDisplay.addChild(l);
   textDisplay.addChild(portrait);

   //Store stuff
   var storeBkg = new Sprite(game.width, 250);
   var close = new Sprite(50, 26);
   var nxt = new Sprite(30, 30);
   var credits = new Label();
   
   storeBkg.image = game.assets["shop_bkg.png"];
   storeBkg.x = 0;
   storeBkg.y = 0;
   close.image = game.assets["close.png"];
   close.x = 426;
   close.y = 220;
   credits.x = 380;
   credits.y = 10;
   credits.width = 80;
   credits.text = "Credits: " + player.credits;
   
   nxt.addEventListener('touchend', function() {
      textDisplay.removeChild(bkg);
      textDisplay.removeChild(l);
      textDisplay.removeChild(nxt);
      textDisplay.removeChild(portrait);
      player.isListeningToNPC = false;
      player.isMoving = true;
   });
   
   close.addEventListener('touchend', function() {
      textDisplay.removeChild(storeBkg);
      textDisplay.removeChild(close);
      textDisplay.removeChild(credits);
      textDisplay.removeChild(koBuy);
      textDisplay.removeChild(kiBuy);
      textDisplay.removeChild(kuBuy);
      textDisplay.removeChild(kaBuy);
      textDisplay.removeChild(keBuy);
      textDisplay.removeChild(koLabel);
      textDisplay.removeChild(kuLabel);
      textDisplay.removeChild(kiLabel);
      textDisplay.removeChild(keLabel);
      textDisplay.removeChild(kaLabel);
      textDisplay.removeChild(ko);
      textDisplay.removeChild(ku);
      textDisplay.removeChild(ki);
      textDisplay.removeChild(ke);
      textDisplay.removeChild(ka);
      textDisplay.removeChild(kaPrice);
      textDisplay.removeChild(koPrice);
      textDisplay.removeChild(kuPrice);
      textDisplay.removeChild(kiPrice);
      textDisplay.removeChild(kePrice);
      l.text = "Come again soon!"
      
      nxt.touchEnabled = true;
      nxt.image = game.assets["next.png"];
      nxt.x = 380;
      nxt.y = game.height - 25;
      textDisplay.addChild(nxt);
   });
   
   textDisplay.addChild(storeBkg);
   textDisplay.addChild(close);
   textDisplay.addChild(credits);
   
   //Ability Descriptions
   var koLabel = new Label();
   var kaLabel = new Label();
   var kuLabel = new Label();
   var keLabel = new Label();
   var kiLabel = new Label();
   
   koLabel.y = 180;
   kaLabel.y = 145;
   kuLabel.y = 110;
   kiLabel.y = 75;
   keLabel.y = 40;
   koLabel.x = kaLabel.x = keLabel.x = kuLabel.x = kiLabel.x = 20;
   koLabel.width = kaLabel.width = keLabel.width = kuLabel.width = kiLabel.width = 400;
   
   koLabel.text = "Koru: Leave a frozen trail to stun enemies";
   kuLabel.text = "Kusari: Get over here!! Grab enemies with chains of disruption";
   kaLabel.text = "Katana: The legendary sword available in the palm of your hands";
   kiLabel.text = "Kirikabu: Enemies can't get to you! Block their path with an impassable stump";
   keLabel.text = "Ketsueki: Shoot out a ball of blood that explodes upon killing enemies";
   
   koLabel.scale(.9, .9);
   kaLabel.scale(.9, .9);
   kuLabel.scale(.9, .9);
   kiLabel.scale(.9, .9);
   keLabel.scale(.9, .9);
   
   textDisplay.addChild(koLabel);
   textDisplay.addChild(kaLabel);
   textDisplay.addChild(keLabel);
   textDisplay.addChild(kuLabel);
   textDisplay.addChild(kiLabel);
   
   //Buy buttons
   var koBuy = new Sprite(50, 26);
   var kaBuy = new Sprite(50, 26);
   var kuBuy = new Sprite(50, 26);
   var keBuy = new Sprite(50, 26);
   var kiBuy = new Sprite(50, 26);
   
   koBuy.image = game.assets["buy.png"];
   kaBuy.image = game.assets["buy.png"];
   kuBuy.image = game.assets["buy.png"];
   keBuy.image = game.assets["buy.png"];
   kiBuy.image = game.assets["buy.png"];
   
   koBuy.touchEnabled = kaBuy.touchEnabled = keBuy.touchEnabled = kuBuy.touchEnabled = kiBuy.touchEnabled = true;
   
   koBuy.x = 426;
   koBuy.y = 180;
   kaBuy.x = 426;
   kaBuy.y = 145;
   kuBuy.x = 426;
   kuBuy.y = 110;
   kiBuy.x = 426;
   kiBuy.y = 75;
   keBuy.x = 426;
   keBuy.y = 40;
   
   textDisplay.addChild(koBuy);
   textDisplay.addChild(keBuy);
   textDisplay.addChild(kiBuy);
   textDisplay.addChild(kuBuy);
   textDisplay.addChild(kaBuy);
   
   //Kanji
   var ko = new Sprite(32, 32);
   var ku = new Sprite(32, 32);
   var ki = new Sprite(32, 32);
   var ke = new Sprite(32, 32);
   var ka = new Sprite(32, 32);
   
   ko.image = game.assets["ko.jpg"];
   ku.image = game.assets["ku.jpg"];
   ki.image = game.assets["ki.jpg"];
   ke.image = game.assets["ke.jpg"];
   ka.image = game.assets["ka.jpg"];
   
   ko.x = ki.x = ka.x = ku.x = ke.x = 5;
   ko.y = 180;
   ka.y = 145;
   ku.y = 110;
   ki.y = 75;
   ke.y = 40;
   
   textDisplay.addChild(ko);
   textDisplay.addChild(ka);
   textDisplay.addChild(ke);
   textDisplay.addChild(ku);
   textDisplay.addChild(ki);
   
   //Price for each ability
   var koPrice = new Label();
   var kuPrice = new Label();
   var kePrice = new Label();
   var kaPrice = new Label();
   var kiPrice = new Label();
   
   koPrice.width = kaPrice.width = kePrice.width = kuPrice.width = kiPrice.width = 50;
   koPrice.x = kaPrice.x = kePrice.x = kuPrice.x = kiPrice.x = 400;
   koPrice.y = 180;
   kaPrice.y = 145;
   kuPrice.y = 110;
   kiPrice.y = 75;
   kePrice.y = 40;
   
   var priceOfKO = 100;
   var priceOfKA = 100;
   var priceOfKI = 100;
   var priceOfKU = 100;
   var priceOfKE = 100;
   
   koPrice.text = "" + priceOfKO;
   kePrice.text = "" + priceOfKE;
   kuPrice.text = "" + priceOfKU;
   kiPrice.text = "" + priceOfKI;
   kaPrice.text = "" + priceOfKA;
   
   textDisplay.addChild(kaPrice);
   textDisplay.addChild(kePrice);
   textDisplay.addChild(kuPrice);
   textDisplay.addChild(kiPrice);
   textDisplay.addChild(koPrice);
   
   //EventListeners for buy buttons
   koBuy.addEventListener('touchend', function() {
      if(player.credits > priceOfKO) {
         //unlock ability
         player.credits -= priceOfKO;
         credits.text = "Credits: " + player.credits;
         koPrice.visible = false;
         ko.visible = false;
         koBuy.visible = false;
         koLabel.visible = false;
      }
   });
   kaBuy.addEventListener('touchend', function() {
      if(player.credits > priceOfKA) {
         //unlock ability
         player.credits -= priceOfKA;
         credits.text = "Credits: " + player.credits;
         kaPrice.visible = false;
         ka.visible = false;
         kaBuy.visible = false;
         kaLabel.visible = false;
      }
   });
   keBuy.addEventListener('touchend', function() {
      if(player.credits > priceOfKE) {
         //unlock ability
         player.credits -= priceOfKE;
         credits.text = "Credits: " + player.credits;
         kePrice.visible = false;
         ke.visible = false;
         keBuy.visible = false;
         keLabel.visible = false;
      }
   });
   kuBuy.addEventListener('touchend', function() {
      if(player.credits > priceOfKU) {
         //unlock ability
         player.credits -= priceOfKU;
         credits.text = "Credits: " + player.credits;
         kuPrice.visible = false;
         ku.visible = false;
         kuBuy.visible = false;
         kuLabel.visible = false;
      }
   });
   kiBuy.addEventListener('touchend', function() {
      if(player.credits > priceOfKI) {
         //unlock ability
         player.credits -= priceOfKI;
         credits.text = "Credits: " + player.credits;
         kiPrice.visible = false;
         ki.visible = false;
         kiBuy.visible = false;
         kiLabel.visible = false;
      }
   });
}