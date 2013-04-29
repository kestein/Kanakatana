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