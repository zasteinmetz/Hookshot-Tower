class Test extends Phaser.Scene {
    constructor(){
        super("testScene");
    }

    create(){
        this.MAX_VELOCITY = 300;    //maximum velocity in pixils per second
        this.physics.world.gravity.y = 1000;

        // make immovable ground out of tiles
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize){
            // leftover code from lecture .setScale(0.5)
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'placeholder').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.gravity = false;
            this.ground.add(groundTile);
        }
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'playerholder').setOrigin(0);
    }
}