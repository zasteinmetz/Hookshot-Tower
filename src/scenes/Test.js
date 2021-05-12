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
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'placeholder').setScale(0.5).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.gravity = false;
            this.ground.add(groundTile);
        }
    }
}