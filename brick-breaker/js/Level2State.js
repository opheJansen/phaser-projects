Level2 = function(game) {};
Level2.prototype = {
  preload: function () {
    game.load.image('paddle', 'assets/paddles.png');
    game.load.image('brick', 'assets/brick.png');
    game.load.image('ball', 'assets/ball.png');
  },
  create: function () {
    currentLevel = "Level2";
    // Start the Arcade physics system (for movements and collisions)
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // Set the background color to blue
    game.world.enableBody = true;
    this.paddle = game.add.sprite(180, 400, 'paddle');
    // game.physics.enable(player, Phaser.Physics.ARCADE);
    // Make sure the paddle won't move when it hits the ball
    this.paddle.body.immovable = true;
    this.paddle.body.collideWorldBounds = true;
    this.bricks = game.add.group();
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        // Create the brick at the correct position
        var brick = game.add.sprite(55+i*60, 55+j*35, 'brick');

        // Make sure the brick won't move when the ball hits it
        brick.body.immovable = true;

        // Add the brick to the group
        this.bricks.add(brick);
      }
    }
    this.ball = game.add.sprite(170, 300, 'ball');
    // Give the ball some initial speed
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 210;
    // Make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1);
    this.ball.body.collideWorldBounds = true;
    //  Register the keys.
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  },
  update: function () {
    // Move the paddle left/right when an arrow key is pressed
    if (this.leftKey.isDown) {
      this.paddle.body.velocity.x = -600;
    }  else if (this.rightKey.isDown) {
      this.paddle.body.velocity.x = 600;
    } else {
      // Stop the paddle when no key is pressed
      this.paddle.body.velocity.x = 0;
    }

    // Add collisions between the paddle and the ball
    game.physics.arcade.collide(this.paddle, this.ball);

    // Call the 'hit' function when the ball hits a brick
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

    // Restart the game if the ball is below the paddle
    if (this.ball.y > this.paddle.y-8){
      nextLevel = "Level2";
      game.state.start('Start', true, false, nextLevel);
    }

    bricks_count = this.bricks.countDead();
    if (this.bricks.length == bricks_count){
      nextLevel = "Level3";
      game.state.start('Restart', true, false, nextLevel);
    }
  },
  hit: function(ball, brick) {
    brick.kill();
  }
};
