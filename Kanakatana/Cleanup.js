//this file is reserved for cleaning stages and entities and various related things.

//This removes dead entities.
function cleanEntities() {
	for(var i = 0; i < entities.length; i++) {
		if(entities[i].dead) {
			if(entities[i] instanceof Koru) {console.log("wtf")};
			stage.removeChild(entities[i]);
			entities.pop(entities[i]);
		}
	}
}