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
   enemy1 = new Snail(32, 32, [150,300], [150,150], IQPlayer);
   enemy1.image = game.assets["snail.png"];
   enemy1.name = "Enemy";
   enemy1.x = 300;
   enemy1.y = 150;
   stage_g.addChild(IQPlayer);
   stage_g.addChild(enemy1);
   entities.push(enemy1);
   numEnemies += 3;
   
   enemy2 = new Snail(32, 32, [600,600], [400,150], IQPlayer);
   enemy2.image = game.assets["snail.png"];
   enemy2.name = "Enemy";
   enemy2.x = 300;
   enemy2.y = 150;
   stage_g.addChild(enemy2);
   entities.push(enemy2);
   
   enemy3 = new Slime(30, 40, [150,500], [200,200], IQPlayer);
   enemy3.image = game.assets["slime.png"];
   enemy3.name = "Enemy";
   enemy3.x = 150;
   enemy3.y = 200;
   stage_g.addChild(enemy3);
   entities.push(enemy3);
   
   IQPlayer.x = 64;
   IQPlayer.y = 64;
}

var quest2CombatMap = function(newmap) {
   stage_g.removeChild(IQPlayer);
   stage_g.removeChild(map);
   var e_len = entities.length;
   for(var h = 0; h < e_len; h ++) {
      stage_g.removeChild(entities[h]);
      entities.pop(h);
   }
   map = newmap;
   stage_g.addChild(map);
   enemy1 = new Snail(32, 32, [600,600], [400,150], IQPlayer);
   enemy1.image = game.assets["snail.png"];
   enemy1.name = "Enemy";
   enemy1.x = 500;
   enemy1.y = 150;
   
   enemy2 = new Snail(32, 32, [600,600], [400,150], IQPlayer);
   enemy2.image = game.assets["snail.png"];
   enemy2.name = "Enemy";
   enemy2.x = 300;
   enemy2.y = 150;
   
   enemy3 = new Snail(32, 32, [200,200,600], [200,300,150], IQPlayer);
   enemy3.image = game.assets["snail.png"];
   enemy3.name = "Enemy";
   enemy3.x = 200;
   enemy3.y = 150;
   
   enemy4 = new Snail(32, 32, [100,100,600], [200,300,450], IQPlayer);
   enemy4.image = game.assets["snail.png"];
   enemy4.name = "Enemy";
   enemy4.x = 300;
   enemy4.y = 450;
   
   stage_g.addChild(IQPlayer);
   stage_g.addChild(enemy1);
   stage_g.addChild(enemy2);
   entities.push(enemy1);
   entities.push(enemy2);
   stage_g.addChild(enemy3);
   entities.push(enemy3);
   stage_g.addChild(enemy4);
   entities.push(enemy4);
   numEnemies += 4;
   
   IQPlayer.x = 64;
   IQPlayer.y = 64;
}

var homeMap = function(newmap) {
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