function Mario(game,x,y) {
this.name = "Mario";
this.facing  = "R";
this.actualWidth = 19;
this.actualHeight = 35;
this.count = 0;
this.count2 = 0
this.right = false;
this.stop = 0;
this.stop2 = 0;
this.entRight = false;
this.entLeft = false;
    //this.animation = new Animation(AM.getAsset("./img/RobotMario.png"), 0, 0, 206, 110, 0.02, 30, true, true);
   // (spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
this.MovingFrames = [new Frame(9,88,19,35),new Frame(30,88,19,35),new Frame(51,88,19,35),new Frame(72,88,19,35),
    new Frame(92,88,19,35), new Frame(114,88,19,35),new Frame(135,88,19,35),new Frame(156,88,19,35) ]
   this.idleFrame = [new Frame(9,88,19,35)];
   this.animation = new Animation(AM.getAsset("./img/MarioReverse.png"), 435, 730, 43, 90, .08, this.MovingFrames.length, true, true, false, this.MovingFrames);
   this.Ranimation = new Animation(AM.getAsset("./img/Mario.png"), 435, 730, 43, 90, .08, this.MovingFrames.length, true, false, false, this.MovingFrames);
   this.idleAnimation = new Animation(AM.getAsset("./img/Mario.png"), 9,88,19,35, .08, 1, true, false, false, this.idleFrame)
   this.idleLeftAnimation = new Animation(AM.getAsset("./img/MarioReverse.png"), 9,88,19,35, .08, 1, true, true, false, this.idleFrame);
   this.animation.actualHeight = 19;
   this.idleAnimation.actualHeight = 19;
   this.idleAnimation.actualWidth = 19;
   this.idleLeftAnimation.actualHeight = 19;
   this.idleLeftAnimation.actualWidth = 19;
   this.animation.actualWidth = 19;
   this.Ranimation.actualHeight = 19;
   this.Ranimation.actualWidth = 35;
  //this.animation.
  this.currentAnimation = this.animation;
    this.jumping = false;
    this.kicking = false;
    this.m_left = false;
    this.radius = 100;
    this.ground = 400;
    this.scaleBy = 5;
    this.speed = 5;
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



Mario.prototype = new Entity();
Mario.prototype.constructor = Mario;
Mario.prototype.collide = function(other) {
	return this.currentBox.collide(other.currentBox);
}
Mario.prototype.isAttacking = function() {
	return (this.kicking)
}

var range = 200;
var spotted = true;
var rightWall = 1190;
var leftWall = -5;
var distance = -500;

Mario.prototype.update = function () {
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
    
    
    if(this.x != rightWall && !this.right) {
        this.count++;
        this.movingRight = true;
        //console.log("STOP" + stop)
        if(this.count % 20 == 0) {
            this.stop ++
        }
        if(this.stop > 5 && this.entRight) {
           // console.log("I stopped!")
            
            this.movingRight = false;
            this.currentAnimation = this.idleAnimation;
            this.facing = "L"
        }if(this.stop > 12) {
            this.facing = "R";
            this.movingRight = true;
            this.stop = 0
        }
        
    }
    else{
        this.movingRight = false;
        //this.facing = "L"
        this.right = true;
        this.count = 0

    }
    if(this.x >=-5 && this.right) {
        this.count2 ++;
        this.movingLeft = true;
        if(this.count2 % 20 == 0) {
            this.stop2++;
        }
        if(this.stop2 > 5 && this.entLeft) {

            this.facing = "R"
            this.movingLeft = false;
        }if(this.stop2 > 12) {
            this.facing ="L";
            this.movingLeft = true;
            this.stop2 = 0
        }

    }else {
        this.right = false;
        this.movingLeft = false;
        //this.facing = "R"
        this.count2 = 0;
    }
    


       
        //count = 0;
    
    if (this.movingRight) {
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
        if(this.facing == "R") {
            this.currentAnimation = this.idleAnimation;
        } else {
            this.currentAnimation = this.idleLeftAnimation;
        }
        
    }
   //console.log("DIstance" + count)
    
    
    count ++;
    
    for (var i = 0; i < this.game.entities.length; i++) {
        
        var ent = this.game.entities[i];
        if(ent.name == "Boo") {
          //  console.log("Mario facing: " + this.facing);
          //  console.log("Boo facing: " + ent.facing);
            
            
                 
                
                 
            
            if(ent.appearAnimation.isDone()) {
                ent.appearAnimation.elapsedTime = 0;
            }
            if(ent.disappearAnimation.isDone()) {
                ent.disappearAnimation.elapsedTime = 0;
            }
            if(this.x < ent.x && (Math.abs(this.x - ent.x) > range)) {
                                        this.entLeft = true;
                                        this.entRight = false;
                						ent.facing = "L";
                						ent.currentAnimation = ent.animation;
                						
                						ent.x -= ent.speed;
                					}
                else if(this.x > ent.x && (Math.abs(this.x - ent.x) > range-10)) {
                                        this.entLeft = false;
                                        this.entRight = true;
                						ent.facing = "R";
                						ent.currentAnimation = ent.Ranimation
                						
                						ent.x += ent.speed;
                					}
        
        
        
         else {
             if(Math.abs(this.x - ent.x) < 100) {
                //console.log("THird")
                 if(this.facing == "R") {
                     this.movingRight = false;
                     this.facing ="L"
                 } else {
                     this.movingLeft = false;
                     this.facing = "R"
                 }
             }
            if(ent.facing == "R" && this.facing == "L") {
                
                ent.currentAnimation = ent.appearLeftAnimation;
            } else if(ent.facing == "L" && this.facing == "R"){
                ent.currentAnimation = ent.disappearLeftAnimation;
            }
             else {
                 if(ent.facing == "R") {
                    ent.currentAnimation = ent.idleLeftAnimation;
                    
                }else {
                    ent.currentAnimation = ent.idleAnimation;
                }
                if(ent.appearLeftAnimation.isDone()) {
                    ent.appearLeftAnimation.elapsedTime = 0;
                    spotted = true;
                    this.count = 0;
                    this.count2 = 0
                    
                }
                if(ent.disappearLeftAnimation.isDone()) {
                    ent.disappearLeftAnimation.elapsedTime = 0;
                    spotted = true;
                   this.count = 0;
                    this.count2 = 0;
                }
        }
    }

        
        
        

    
}
    }

    Entity.prototype.update.call(this);
}



Mario.prototype.draw = function (ctx) {
    //time = this.leftAnimation.elapsedTime;
    
    this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);

    
    // }else {
    //     this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    // }
    
    Entity.prototype.draw.call(this);
}
