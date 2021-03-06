// This is an invisible object that is added to the 'hud'. It handles switching out hirigana for romanji, and for
// swapping hirigana out.
var AbilityHandler = Class.create (Sprite, {
	initialize:function(width, height, player) {
		Sprite.call(this, width, height);
		this.x = 432;
		this.y = 0;
		this.maxUsableAbilities = 3;	//possible hack must be less than or equal to unlocked abilities.
		this.unlockedAbilities = player.unlockedAbilities;//REFACTOR: remove this
		this.usableAbilities = [];
		this.hackFixTheShopArray = [true, true, true, true, true, false, false, false, false, false];//REFACTOR: Make this the main thing.
		this.currentAbility;
		this.abilityNum = Math.floor(Math.random() * this.maxUsableAbilities); 
		var i;
      this.whenButtonWasPressed = 0;
		
		
		this.addEventListener('addedtoscene', function() {
			for(i = 0; i < this.maxUsableAbilities; i++) {
				this.addToHud(i,player);
			}
		})
		this.addEventListener('enterframe', function() {
			this.unlockedAbilities = player.unlockedAbilities;//REFACTOR: remove
         if(this.age - this.whenButtonWasPressed > 15) {
            if(game.input.left) {
               this.usableAbilities[0].dispatchEvent(new Event('touchstart'));
               this.whenButtonWasPressed = this.age;
            }
            if(game.input.right) {
               this.usableAbilities[1].dispatchEvent(new Event('touchstart'));
               this.whenButtonWasPressed = this.age;
            }
            if(game.input.down) {
               this.usableAbilities[2].dispatchEvent(new Event('touchstart'));
               this.whenButtonWasPressed = this.age;
            }
            if(game.input.up && this.maxUsableAbilities > 3) {
               this.usableAbilities[3].dispatchEvent(new Event('touchstart'));
               this.whenButtonWasPressed = this.age;
            }
         }
		})
	},
	//adds an ability to the hud at index i
	addToHud:function(i, player) {
		this.usableAbilities[i] = this.fetchAbilities(this.pickUnusedAbility(), player);
		this.usableAbilities[i].y = 14 + (50 * i);
		hud.addChild(this.usableAbilities[i]);
	},
	
	
	//takes an integer and returns the proper ability.
	fetchAbilities:function(key, player) {
		if(key == 0) {
			return new A(32, 32, player, this);
		}
		else if(key == 1) {
			return new I(32, 32, player, this);
		}
		else if(key == 2) {
			return new U(32, 32, player, this);
		}
		else if(key == 3) {
			return new E(32, 32, player, this);
		}
		else if(key == 4) {
			return new O(32, 32, player, this);
		}
		else if(key == 5) {
			return new Ka(32, 32, player, this);
		}
		else if(key == 6) {
			return new Ki(32, 32, player, this);
		}
		else if(key == 7) {
			return new Ku(32, 32, player, this);
		}
		else if(key == 8) {
			return new Ke(32, 32, player, this);
		}
		else if(key == 9) {
			return new Ko(32, 32, player, this);
		}
	},

//picks an abilityNum for an ability that is not currently in use
	pickUnusedAbility:function() {
		var unusedAbility = Math.floor(Math.random() * this.unlockedAbilities);//REFACTOR: remove
		console.log("first " + unusedAbility);
		while(this.isInUse(unusedAbility, this.usableAbilities) ) {
			unusedAbility = Math.floor(Math.random() * this.unlockedAbilities);//REFACTOR: remove
			console.log("retry " + unusedAbility);
			
		}
		return unusedAbility;
	},
	
	//checks to see if an ability is already in the ability bar. super hach
	isInUse:function(ability, array) {
		var i;
		if(ability == 999) {	//hack A
			return true;
		}
		if(!this.hackFixTheShopArray[ability]) {
				console.log("redo1 " +ability);
				return true;
			}
		for(i = 0; i < array.length; i++) {
		console.log(this.hackFixTheShopArray[ability])
		console.log("num check " +ability)
			
			if(array[i] == null  && !this.hackFixTheShopArray[ability]) {		//hack
			console.log("redo2 " +ability);
				return true;
			}
			else if(array[i] == null){
				return false;
			}
			if(array[i].abilityNum == ability || !this.hackFixTheShopArray[ability]) {
			
				return true;
			}
		}
		return false;
	},
	
	//checks to see if an number is already in the array.
	intIsInUse:function(ability, array) {
		var i;
		if(ability == 999) {	//hack A
			return true;
		}
		for(i = 0; i < array.length; i++) {
			console.log(array[i]);
			console.log(ability);
			if(array[i].abilityNum == ability) {
				return true;
			}
		}
		return false;
	},
	
	//Switches between romanji and hirigana, then scrambles them if changing to romanji.
	swapAll:function() {
		var i;
		for(i = 0; i < this.usableAbilities.length; i++) {
			this.usableAbilities[i].swapImage();
		}
		if(this.usableAbilities[0].romanji) {
			this.scramble();
		}
	},
	
	//Scrambles the abilities locations
	scramble:function() {
		var oldAbilities = this.usableAbilities;
		var newAbilities = [];
		var idx;
		for(i = 0; i < this.maxUsableAbilities; i++) {
			idx = Math.floor(Math.random() * this.usableAbilities.length);
			newAbilities[i] = oldAbilities.splice(idx-i,1)[0];
			newAbilities[i].y = 14 + (50 * i);
		}
		this.usableAbilities = newAbilities;
	},
	
	//picks a new ability to fill the place of the executed ability.
	pickNewAbility:function(player) {
		if(this.maxUsableAbilities != this.unlockedAbilities) {
			for(i = 0; i < this.maxUsableAbilities; i++) {
				if(this.usableAbilities[i].abilityNum == this.currentAbility.abilityNum) {
					
					hud.removeChild(this.usableAbilities[i]);
					//this.usableAbilities[i] = null;
					this.addToHud(i, player);
				}
			}
		}
	}
	
	//this.usableAbilities[index].dispatchEvent('touchend')
	
});