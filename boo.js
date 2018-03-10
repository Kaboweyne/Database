function Boo(game,x,y) {
    this.name = "Boo";
    this.facing  = "R";
    this.actualWidth = 19;
    this.actualHeight = 35;
    //this.animation = new Animation(AM.getAsset("./img/RobotBoo.png"), 0, 0, 206, 110, 0.02, 30, true, true);
   // (spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
   this.MovingFrames = [new Frame(3,86,34,31),new Frame(38,86,34,31),new Frame(72,86,34,31), new Frame(105,86,34,31)]
   this.appearFrames = [new Frame(2,351,34,31),new Frame(36,351,34,31),new Frame(69,351,34,31),new Frame(104,351,32,31),
    new Frame(134,351,32,31),new Frame(162,351,30,31),new Frame(189,351,22,31),new Frame(207,351,22,31),new Frame(226,351,22,31),
    new Frame(244,351,22,31)];
   this.disappearFrames = [new Frame(244,351,22,31),new Frame(226,351,22,31),new Frame(207,351,22,31),new Frame(189,351,22,31),
    new Frame(162,351,30,31),new Frame(134,351,34,31),new Frame(104,351,34,31),new Frame(69,351,34,31),new Frame(36,351,34,31),
    new Frame(2,351,34,31)];
   this.idleFrame = [new Frame(3,86,34,31)];
   this.Ranimation = new Animation(AM.getAsset("./img/BooReverse.png"), 435, 730, 43, 90, .2, this.MovingFrames.length, false, true, false, this.MovingFrames);
   this.animation = new Animation(AM.getAsset("./img/Boo.png"), 435, 730, 43, 90, .2, this.MovingFrames.length, false, false, false, this.MovingFrames);
   this.idleAnimation = new Animation(AM.getAsset("./img/Boo.png"), 9,88,19,35, .08, 1, true, false, false, this.idleFrame)
   this.idleLeftAnimation = new Animation(AM.getAsset("./img/BooReverse.png"), 9,88,19,35, .08, 1, true, true, false, this.idleFrame);
   this.disappearLeftAnimation = new Animation(AM.getAsset("./img/Boo.png"), 9,88,19,35, .1, this.appearFrames.length, false, false, true, this.appearFrames);
   this.disappearAnimation = new Animation(AM.getAsset("./img/BooReverse.png"), 9,88,19,35, .1, this.disappearFrames.length, false, true, true, this.disappearFrames);
   this.appearAnimation = new Animation(AM.getAsset("./img/Boo.png"), 9,88,19,35, .1, this.appearFrames.length, false, false, true, this.disappearFrames);
   this.appearLeftAnimation = new Animation(AM.getAsset("./img/BooReverse.png"), 9,88,19,35, .1, this.appearFrames.length, false, true, true, this.appearFrames);
   this.animation.actualHeight = 19;
   this.idleAnimation.actualHeight = 19;
   this.idleAnimation.actualWidth = 0;
   this.idleLeftAnimation.actualHeight = 19;
   this.idleLeftAnimation.actualWidth = 19;
   this.animation.actualWidth = 35;
   this.Ranimation.actualHeight = 19;
   this.Ranimation.actualWidth = 19;
   this.disappearAnimation.actualHeight = 19;
   this.disappearAnimation.actualWidth = 19;
   this.appearAnimation.actualHeight = 19;
   this.appearAnimation.actualWidth = 19;
   this.appearLeftAnimation.actualHeight = 19;
   this.appearLeftAnimation.actualWidth = 19;
   this.disappearLeftAnimation.actualHeight = 19;
   this.disappearLeftAnimation.actualWidth = 19;
  //this.animation.
  this.currentAnimation = this.animation;
    this.jumping = false;
    this.kicking = false;
    this.m_left = false;
    this.radius = 100;
    this.ground = 400;
    this.scaleBy = 5;
    this.speed = 3;
    this.x = x;
    this.y = y;
    this.movingRight = false;
    this.movingLeft = false;
    this.currentBox = (20, 120, 96 * this.scaleBy, 158 * this.scaleBy);
    this.velocity = { x: 5 * 1000, y: 5 * 1000 };
    
    Entity.call(this, game, x, y);
}
var attack = false;
var rand = Math.floor(Math.random() * Math.floor(2))



Boo.prototype = new Entity();
Boo.prototype.constructor = Boo;
Boo.prototype.collide = function(other) {
	return this.currentBox.collide(other.currentBox);
}
Boo.prototype.isAttacking = function() {
	return (this.kicking)
}
var count = 0;
var count2 = 0
Boo.prototype.update = function () {
    // if(this.game.moveLeft) {
    //     this.movingLeft = true;
    // } else {
    //     this.movingLeft = false;
    // }
    // if(this.game.moveRight) {
    //     this.movingRight = true;
    // }else{
    //     this.movingRight = false;
    // }
    console.log(this.name);
    if (this.movingRight) {
        console.log("Im here");
        //IF THIS IS NOT GETTING ATTACKED THE DO IT
            this.currentAnimation = this.Ranimation;
            this.facing = "R";

            if ((this.x < 1190)) {
                this.x += this.speed;
            }	

            if ((this.x < 640) || (this.x > 3200 && this.x < 3720)) {
                //this.xView += this.speed;
            }
        }
    
        
    else if (this.movingLeft) {
        this.facing = "L";
            
                if(this.x>=-5) {
                    this.x -= this.speed;
                }
            

            
            this.currentAnimation = this.animation;

            }
    else{
        if(this.facing == "L") {
            this.currentAnimation = this.disappearAnimation;
        } else {
            this.currentAnimation = this.idleLeftAnimation;
        }
        
    }
    
    
    count ++;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(count % 80 == 0) {

        
        
        

    }
}

    Entity.prototype.update.call(this);
}



Boo.prototype.draw = function (ctx) {
    //time = this.leftAnimation.elapsedTime;
    
    this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);

    
    // }else {
    //     this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    // }
    
    Entity.prototype.draw.call(this);
}
