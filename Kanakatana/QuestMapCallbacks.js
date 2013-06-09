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
   enemy1 = new Snail(32, 32, [250,400], [150,150], IQPlayer);
   enemy1.x = 300;
   enemy1.y = 150;
   
   stage_g.addChild(enemy1);
   entities.push(enemy1);
   
   
   enemy2 = new Snail(32, 32, [450,450], [320,150], IQPlayer);
   enemy2.x = 450;
   enemy2.y = 150;
   stage_g.addChild(enemy2);
   entities.push(enemy2);
   
   enemy3 = new Slime(30, 40, [150,450], [320,320], IQPlayer);
   enemy3.x = 150;
   enemy3.y = 320;
   stage_g.addChild(enemy3);
   entities.push(enemy3);
   
   IQPlayer.x = 64;
   IQPlayer.y = 64;
   stage_g.addChild(IQPlayer);
   numEnemies += 3;
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
   enemy1.name = "Enemy";
   enemy1.x = 500;
   enemy1.y = 150;
   
   enemy2 = new Snail(32, 32, [550,600], [400,150], IQPlayer);
   enemy2.x = 300;
   enemy2.y = 150;
   
   enemy3 = new Snail(32, 32, [200,200,600], [200,300,150], IQPlayer);
   enemy3.x = 200;
   enemy3.y = 150;
   
   enemy4 = new Snail(32, 32, [100,100,600], [200,300,450], IQPlayer);
   enemy4.x = 300;
   enemy4.y = 450;
   
   enemy5 = new Slime(30, 40, [200,100,600], [100,100,150], IQPlayer);
   enemy5.x = 500;
   enemy5.y = 100;
   
   stage_g.addChild(IQPlayer);
   stage_g.addChild(enemy1);
   stage_g.addChild(enemy2);
   entities.push(enemy1);
   entities.push(enemy2);
   stage_g.addChild(enemy3);
   entities.push(enemy3);
   stage_g.addChild(enemy4);
   entities.push(enemy4);
   stage_g.addChild(enemy5);
   entities.push(enemy5);
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
   //remove any enemeies left in entities
   for(var a = 0; a < entities.length; a++) {
      if(entities[a] instanceof Enemy) {
         entities[a].health = 0;
         entities[a].dead = true;
      }
   }
   cleanEntities(); //in cleanup.js
   for(var h = 0; h < e_len; h ++) {
      entities.push(prevAcivityPeople[h]);
      stage_g.addChild(entities[h]);
   }
   stage_g.addChild(IQPlayer);
   IQPlayer.x = 50;
   IQPlayer.y = 50;
}