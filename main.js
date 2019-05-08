var game = new Phaser.Game(600,600, Phaser.AUTO);
//var cursors; 
var player;
var bad;
var platforms;
var cursors;
var diamond;
var stars;
var score = 0;
var scoreText;
var hitPlatform;



//I dont exactly understand why the curly braces are there
//or exactly why this take in the game object as its argument my question is what is goin gon upder the hood 
var MainMenu = function(game){};
MainMenu.prototype = {

	preload: function(){
		console.log('MainMenu : preload');
		

	},

	create: function(){
		this.game.stage.backgroundColor = '#806000';
		this.cursors = this.input.keyboard.createCursorKeys();
		console.log('MainMenu: create');
		this.game.add.text(16, 16, 'Press down arrow to Start', { fontSize: '32px', fill: '#000' });

	},
	update: function(){
		if(this.cursors.down.isDown){
			game.state.start('GamePlay');
		}

	}

}

var GamePlay = function(game){};
GamePlay.prototype = {
	preload: function(){
		console.log('GamePlay: preload');
		//this.game.load.image('diamond', 'assets/diamond.png');
		this.game.load.image('sky', 'assets/sky.png');
		this.game.load.image('flake', 'assets/snowflake-01.png');
		game.load.image('diamond', 'assets/diamond.png');
   	 	game.load.image('ground', 'assets/platform.png');
    	game.load.image('star', 'assets/star.png');
    	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
		//this.game.load.path = 'assets/';
		//this.game.load.atlas('sprites','sprites.png','sprites.json');
	},

	create: function(){
		
		//  We're going to be using physics, so enable the Arcade Physics system
 	   	game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');


		 //  The platforms group contains the ground and the 2 ledges we can jump on
    	this.platforms = game.add.group();

   		 //  We will enable physics for any object that is created in this group
    	this.platforms.enableBody = true;
    	// Here we create the ground.
    	var ground = this.platforms.create(0, game.world.height - 64, 'ground');

    	 //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
   		 ground.scale.setTo(2, 2);
   		//  This stops it from falling away when you jump on it
    	ground.body.immovable = true;

    	//  Now let's create two ledges
   	 	var ledge = this.platforms.create(400, 400, 'ground');
    	ledge.body.immovable = true;

    	ledge = this.platforms.create(-150, 550, 'ground');
    	ledge.body.immovable = true;


    	ledge = this.platforms.create(550, 150, 'ground');
    	ledge.body.immovable = true;

     	ledge = this.platforms.create(-300, 200, 'ground');
    	ledge.body.immovable = true;

    	diamond = this.game.add.sprite(Math.random() * 550,Math.random() * 550, 'diamond');

  	 	game.physics.arcade.enable(diamond);

  	 	player = game.add.sprite(32, game.world.height - 400, 'dude');
  	 	this.game.physics.arcade.enable(player);
  	 	player.body.bounce.y = .1;
    	player.body.gravity.y = 300;
    	player.body.collideWorldBounds = true;
    	player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);

  	 	bad = this.game.add.sprite(game.width - 100, game.height-100, 'baddie');
    	this.game.physics.arcade.enable(bad);
    	bad.body.velocity.x = 70;
    	bad.collideWorldBounds = true;
    	bad.animations.add('bright', [0, 1, 2, 3], 10, true);
    	bad.animations.add('bleft', [3,2,1,0], 10, true);

    	this.stars = game.add.group();
    	this.stars.enableBody = true;
    	for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

    }

		this.cursors = this.input.keyboard.createCursorKeys();
		for(i=0;i<200;i++){
			this.snowflake = new Snow(this.game,'flake',.2,0);
			this.game.add.existing(this.snowflake);

		}

		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
		
		console.log('MainMenu: create');
		//this.game.add.text(16, 16, 'Playing game!', { fontSize: '32px', fill: '#000' });
		console.log('GamePlay: create');

	},
	update: function(){
		//scoreText = this.game.add.text(game.world.width-300, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
			
			this.game.physics.arcade.collide(this.stars, this.platforms);
			this.game.physics.arcade.collide(player, this.platforms);
			

			//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    		this.game.physics.arcade.overlap(player, this.stars, collectStar, null, this);

    		this.game.physics.arcade.overlap(player, diamond, collectDiamond, null, this);

     		this.game.physics.arcade.overlap(player, bad, deductBaddie, null, this);

    		player.body.velocity.x = 0;

    	if (this.cursors.left.isDown)
    	{
        //  Move to the left
        	player.body.velocity.x = -150;
        	player.animations.play('left');
    	}
    	else if (this.cursors.right.isDown)
    	{
        	//  Move to the right
        	player.body.velocity.x = 150;
        	player.animations.play('right');
    	}
    	else
    	{
        	//  Stand still
        	player.animations.stop();

        	player.frame = 4;
    	}

    	 //  Allow the player to jump if they are touching the ground.
   	 	if (this.cursors.up.isDown)
    	{
        	player.body.velocity.y = -350;
    	}

    	 if(bad.body.position.x >= 600 || bad.body.position.x <= 0){
        	console.log(bad.body.position.x);
        	bad.body.velocity.x = bad.body.velocity.x * -1;

    } 
    
    bad.animations.play('bleft');

    
   		



	}


}

var GameOver = function(game){};
GameOver.prototype = {
	// preload: function(){

	// },

	create: function(){
		this.cursors = this.input.keyboard.createCursorKeys();
		console.log('MainMenu: create');
		this.game.add.text(16, 16, 'GameOver!', { fontSize: '32px', fill: '#000' });

	},
	update: function(){
			if(this.cursors.left.isDown){
			game.state.start('MainMenu');
		}

	}
}




function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function collectDiamond (player, diamond) {
    
    // Removes the star from the screen
    diamond.kill();

    //  Add and update the score
    score += 50;
    scoreText.text = 'Score: ' + score;

}

function deductBaddie (player, bad) {
    
    // Removes the star from the screen
    bad.kill();

    //  Add and update the score
    score -= 25;
    scoreText.text = 'Score: ' + score;
    game.state.start('GameOver');

}




game.state.add('MainMenu',MainMenu);
game.state.add('GamePlay',GamePlay);
game.state.add('GameOver',GameOver);
game.state.start('MainMenu');





