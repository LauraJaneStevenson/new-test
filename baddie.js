function Baddie(game, img,scale,rotation){
	Phaser.Sprite.call(this,game,game.rnd.integerInRange(game.width+200,game.width+700), game.rnd.integerInRange(-100,game.height+64),img);

	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	
	game.physics.enable(this);
	//this.body.collideWorldBounds = true;
	this.body.angularVelocity = game.rnd.integerInRange(-180,180);
	this.body.velocity.x = game.rnd.integerInRange(-100,-130);
	//this.body.gravity.y = game.rnd.integerInRange(13,20);


}

Baddie.prototype = Object.create(Phaser.Sprite.prototype);
Baddie.prototype.constructor = Baddie; 

Baddie.prototype.update = function(){

	

	  if(this.body.position.x <= -150){
        
        this.body.position.x = game.width+200;
        this.body.position.y = game.rnd.integerInRange(0,game.height);

    }



}