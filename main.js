var AM = new AssetManager();
var socket = io.connect("http://24.16.255.56:8888");


//var snd = new Audio("./sounds/mk.mp3");
// snd.volume = .05
// snd.play();



function Background(game, spritesheet) {
	this.game = game;
	this.spritesheet = spritesheet;
	this.ctx = game.ctx;
	this.x = 0;
	this.y = 0;
}


Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function(ctx, xView, yView) {
	// easiest way: draw the entire map changing only the destination coordinate in canvas
	// canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
	// context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
	
	// didactic way:
	// var sx, sy, dx, dy;
	// var sWidth, sHeight, dWidth, dHeight;
	
	// // offset point to crop the image
	// sx = xView;
	// sy = yView;
	
	// // dimensions of cropped image			
	// sWidth =  ctx.canvas.width;
	// sHeight = ctx.canvas.height;

	// // if cropped image is smaller than canvas we need to change the source dimensions
	// if(3840 - sx < sWidth){ // Hardcoding: this.image.width == 3840
	// 	sWidth = 3840 - sx;
	// }
	// if(720 - sy < sHeight){
	// 	sHeight = 720 - sy; 
	// }
	
	// // location on canvas to draw the croped image
	// dx = 0;
	// dy = 0;
	// // match destination with source to not scale the image
	// dWidth = sWidth;
	// dHeight = sHeight;									
	
	ctx.drawImage(this.spritesheet, this.x - xView, this.y - yView);
}						

Background.prototype.update = function() {

}


/* KHOA:
	wrapper class for side scrolling background
*/
// possibles axis to move the camera
function Rectangle(left, top, width, height){
	this.left = left || 0;
	this.top = top || 0;
    this.width = width || 0;
	this.height = height || 0;
	this.right = this.left + this.width;
	this.bottom = this.top + this.height;
}

Rectangle.prototype = new Entity();
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
	this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
}

Rectangle.prototype.within = function(r) {
	return (r.left <= this.left && 
			r.right >= this.right &&
			r.top <= this.top && 
			r.bottom >= this.bottom);
}		

Rectangle.prototype.overlaps = function(r) {
	return (this.left < r.right && 
			r.left < this.right && 
			this.top < r.bottom &&
			r.top < this.bottom);
}







function Frame(startX, startY, frameWidth, frameHeight) {
	this.startX = startX;
	this.startY = startY;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
}

function Box(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Box.prototype.collide = function(other) {
	return (this.x < other.x + other.width
		&& this.x + this.width > other.x
		&& this.y < other.y + other.height
		&& this.y + this.height > other.y);
}

AM.queueDownload("./img/Mario.png");
AM.queueDownload("./img/MarioReverse.png");
AM.queueDownload("./img/Boo.png");
AM.queueDownload("./img/BooReverse.png");
AM.queueDownload("./img/marioBG.gif");


AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	var gameEngine = new GameEngine();
	gameEngine.Rectangle = Rectangle;
	var bg = new Background(gameEngine, AM.getAsset("./img/marioBG.gif"));
	var mario = new Mario(gameEngine,500,420);
	var boo = new Boo(gameEngine,500,420);
	gameEngine.addEntity(bg);
	gameEngine.addEntity(boo);
	gameEngine.addEntity(mario);
	gameEngine.init(ctx);
	gameEngine.start();


	socket.on("load", function (data) {
		var entities = data.gameState;
		gameEngine.entities = [];
		gameEngine.addEntity(bg);
		for(var i =0; i < entities.length; i++) {
			if (entities[i].name == "Mario"){
				// mario = new Mario(gameEngine, entities[i].x, entities[i].y)
				// mario.x= entities[i].x;
				// mario.y= entities[i].y;
				// mario.count = entities[i].count;
				// mario.count2 = entities[i].count2;
				// mario.right = entities[i].right;
				// mario.stop = entities[i].stop;
				// mario.stop2 = entities[i].stop2;
				// mario.entRight = entities[i].entRight;
				// mario.entLeft = entities[i].entLeft;
				gameEngine.addEntity(new Mario(gameEngine, entities[i].x, entities[i].y));
			}
			if (entities[i].name == "Boo"){
				//boo = null;
				gameEngine.addEntity(new Boo(gameEngine, entities[i].x, entities[i].y));
			}
			
		}
	});
	document.getElementById("save").onclick = function(e) {
		e.preventDefault();
		console.log(gameEngine.entities);
		//gameEngine.entites = [];
		var entities = gameEngine.entities;
		//var entities = gameEngine.entities;
		//the data that is to be sended
		var savedState = { studentname: "Mahad Fahiye", statename: "savedData", gameState: [] };
		for (var i = 0; i < gameEngine.entities.length; i++) {
			if (gameEngine.entities[i].name === "Mario") {
				var mario = gameEngine.entities[i];
				savedState.gameState.push({
					name: "Mario",
					x: mario.x,
					y: mario.y,
					count: mario.count,
					count2: mario.count2,
					right: mario.right, 
					stop: mario.stop,
					stop2: mario.stop2,
					entRight: mario.entRight,
					entLeft: mario.entLeft
				});
			} else if(gameEngine.entities[i].name === "Boo") {
				var boo = gameEngine.entities[i];
				savedState.gameState.push({name: "Boo",
				x: boo.x,
				y: boo.y
				});
				
			}
		}

		//send the data to the server to be saved
		socket.emit("save", savedState);  
	} 
	document.getElementById("load").onclick = function(e) {
		e.preventDefault();
		console.log("Trying to load");
		socket.emit("load", { studentname: "Mahad Fahiye", statename: "savedData" });
	}
	socket.on("connect", function () {
		console.log("Socket connected.")
	});
	socket.on("disconnect", function () {
		console.log("Socket disconnected.")
	});
	socket.on("reconnect", function () {
		console.log("Socket reconnected.")
	});
	
	// socket.emit("save", { studentname: "Chris Marriott", statename: "aState", data: "Goodbye World" });
	// socket.emit("load", { studentname: "Chris Marriott", statename: "aState" });
	// socket.emit("load", { studentname: "Chris Marriott", statename: "theState" });
	// //var goku = new Gokku(gameEngine);
	//camera.follow(mario, canvas.width/2, canvas.height/2);

	//subzero.healthBar.x = 600;
	//subzero.healthBar.y = 80;
	
	// $('.enter_link').click(function() { 
    //     $(this).parent().fadeOut(500);
//  });
	
	//gameEngine.addEntity(camera);


	//gameEngine.addEntity(scorpionBot2);
	// gameEngine.addEntity(gokku);
	//gameEngine.addEntity(subzero);
	//gameEngine.addEntity(ryu);

	

})