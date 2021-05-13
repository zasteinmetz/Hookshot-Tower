class Test extends Phaser.Scene {
    constructor(){
        super("testScene");
    }
    preload(){
        this.load.image('placeholder', "assets/ObstacleOneCrate.png");
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
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        
        this.platform = this.add.group();
        for(let i = game.config.width/2 + tileSize; i < game.config.width; i += tileSize){
            // leftover code from lecture .setScale(0.5)
            let platformTile = this.physics.add.sprite(i, game.config.height/2, 'placeholder').setOrigin(0);
            platformTile.body.immovable = true;
            platformTile.body.allowGravity = false;
            this.platform.add(platformTile);
        }

        this.player = new Player(this, game.config.width/2, game.config.height/2, 'placeholder').setOrigin(0);
        // basic colliders no event just collides
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platform);
    
    }
}