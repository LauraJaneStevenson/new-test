function Snow(game, img,scale,rotation){
	Phaser.Sprite.call(this,game,game.rnd.integerInRange(-200,game.width+200), game.rnd.integerInRange(-100,game.height+64),img);

	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	
	game.physics.enable(this);
	//this.body.collideWorldBounds = true;
	this.body.angularVelocity = game.rnd.integerInRange(-180,180);
	this.body.velocity.y = game.rnd.integerInRange(100,130);
	this.body.velocity.x = 0;
	//this.body.gravity.y = game.rnd.integerInRange(13,20);


}

Snow.prototype = Object.create(Phaser.Sprite.prototype);
Snow.prototype.constructor = Snow; 

Snow.prototype.update = function(){

	// if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
	// 	//this.body.angularVelocity += 30;
	// 	game.physics.arcade.velocityFromAngle(this.angle, 30, this.body.velocity);

	// }


	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		//this.body.angularVelocity += 30;
		this.body.velocity.x =+ game.rnd.integerInRange(40,70);
		
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		//this.body.angularVelocity += 30;
		this.body.velocity.x =- game.rnd.integerInRange(40,70);
		
		
	}



	  if(this.body.position.y >= game.height+50){
        
        this.body.position.y = -200;
        this.body.position.x = game.rnd.integerInRange(-200,game.width+200);

    }



}