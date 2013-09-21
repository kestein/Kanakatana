//REFACTOR: Think of a cleaner way to add enemies, like a function or something.
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

//2160x320 map
var quest3CombatMap = function(newmap) {
   stage_g.removeChild(IQPlayer);
   stage_g.removeChild(map);
   var e_len = entities.length;
   for(var h = 0; h < e_len; h ++) {
      stage_g.removeChild(entities[h]);
      entities.pop(h);
   }
   map = newmap;
   stage_g.addChild(map);
   
   enemy1 = new Snail(32, 32, [600,600], [150,150], IQPlayer);
   enemy1.x = 500;
   enemy1.y = 150;
   
   enemy2 = new Snail(32, 32, [550,600], [100,150], IQPlayer);
   enemy2.x = 400;
   enemy2.y = 150;
   
   enemy3 = new Snail(32, 32, [400,300,600], [200,70,150], IQPlayer);
   enemy3.x = 500;
   enemy3.y = 150;
   
   enemy4 = new Snail(32, 32, [1000,1000,1000], [200,60,50], IQPlayer);
   enemy4.x = 1000;
   enemy4.y = 200;
   
   enemy5 = new Slime(30, 40, [800,700,600], [100,100,150], IQPlayer);
   enemy5.x = 500;
   enemy5.y = 100;
   
   enemy6 = new Slime(30, 40, [2000], [100], IQPlayer);
   enemy6.x = 2000;
   enemy6.y = 100;
   
   enemy7 = new Snail(32, 32, [2000,1930], [100, 90], IQPlayer);
   enemy7.x = 2000;
   enemy7.y = 100;
   
   enemy8 = new Slime(30, 40, [2000], [100], IQPlayer);
   enemy8.x = 2000;
   enemy8.y = 100;
   
   enemy9 = new Slime(30, 40, [1500], [100], IQPlayer);
   enemy9.x = 1500;
   enemy9.y = 100;
   
   enemyA = new Slime(30, 40, [1430], [30], IQPlayer);
   enemyA.x = 1430;
   enemyA.y = 30;
   
   enemyB = new Slime(30, 40, [1200], [78], IQPlayer);
   enemyB.x = 1200;
   enemyB.y = 78;
   
   winner = new Sprite(32, 32);
   winner.image = game.assets["quest_3_obj.png"];
   winner.x = 2000;
   winner.y = 77;
   winner.name = "end";
   
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
   stage_g.addChild(enemy6);
   entities.push(enemy6);
   entities.push(enemy5);
   stage_g.addChild(enemy7);
   entities.push(enemy7);
   stage_g.addChild(enemy8);
   entities.push(enemy8);
   stage_g.addChild(enemy9);
   entities.push(enemy9);
   stage_g.addChild(enemyA);
   entities.push(enemyA);
   stage_g.addChild(enemyB);
   entities.push(enemyB);
   stage_g.addChild(winner);
   entities.push(winner);
   numEnemies += 10;
   
   IQPlayer.x = 66;
   IQPlayer.y = 66;
}

var homeMap = function(newmap) {
   stage_g.removeChild(IQPlayer);
   stage_g.removeChild(map);
   var e_len = prevAcivityPeople.length;
   map = newmap;
   stage_g.addChild(map);
   //remove any enemeies left in entities
   for(var a = 0; a < entities.length; a++) {
      entities[a].dead = true;
      /*if(entities[a] instanceof Enemy) {
         entities[a].health = 0;
         entities[a].dead = true;
      }*/
   }
   cleanEntities(); //in cleanup.js
   //console.log(entities);
   activeTarget = null;
   for(var h = 0; h < e_len; h ++) {
      entities.push(prevAcivityPeople[h]);
      stage_g.addChild(entities[h]);
   }
   stage_g.addChild(IQPlayer);
   IQPlayer.x = 50;
   IQPlayer.y = 50;
}