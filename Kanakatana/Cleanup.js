//this file is reserved for cleaning stages and entities and various related things.

//This removes dead entities.
function cleanEntities() {
	for(var i = 0; i < entities.length; i++) {
		if(entities[i].dead) {
			if(entities[i] instanceof Enemy) {//REFACTOR: move to its own function.
				numEnemies--;
			}
			stage.removeChild(entities[i]);
			entities.splice(i, 1);
		}
	}
}

