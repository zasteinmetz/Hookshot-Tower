class Level1 extends Phaser.Scene {
    // first complete level without obstacles so they can play with grapple
    constructor(){
        super("level1Scene");
    }
    preload(){
        this.load.image('placeholder', './assets/Grapple.png');
        this.load.image('towerTileset', "./assets/tilesheet2.png");
        this.load.image('player', './assets/obody.png');
        this.load.tilemapTiledJSON('Level1TileMap',"./assets/Level1.json");
        this.load.audio('grapple','./assets/splat.wav');
        this.load.audio('snap','./assets/plunk.wav');
        this.load.audio('background_music','./assets/2021-03-07_-_Haunted_Memories_-_David_Fesliyan.mp3');

    }
    create(){
        //this.scene.moveBelow("healthUI", "level1Scene");
        this.scene.pause("healthUI");
        this.MAX_VELOCITY = 300;    //maximum velocity in pixels per second
        this.physics.world.gravity.y = 800;
        

        back_music = this.sound.add('background_music');
        back_music.loop = true;
        back_music.play();

        // add tilemap
        const level1Map = this.add.tilemap('Level1TileMap');
        const towerTiles = level1Map.addTilesetImage("tilesheet2", 'towerTileset');
        const platforms = level1Map.createLayer('Tile Layer 1', towerTiles, 0, 0);
        platforms.setCollisionByProperty({
            collides: true,
            damages: false
        });
        this.speed = 200.0;

        //Add explanatory text to teach mechanics
        this.firstNote = this.add.text( (6 * 32), (game.config.height * 2) - (4 * 32), 'WASD to move', "28px").setOrigin(0.5);
        this.secondNote = this.add.text( (10 * 32), (game.config.height * 2) - (9 * 32), 'Click RMB (Right Mouse Button) on a platform to grapple', "28px").setOrigin(0.5);

        this.player = new Player(this, 180, game.config.height * 2 - 64, 200.0, 'player').setOrigin(0);
        this.player.collides = true;
        //this.player.damages = true;
        this.physics.add.collider(this.player, platforms);
        if (oneFirstTime == true){
            this.player.y = 32;
            this.player.x = 29 * 32;
        }

        this.physics.world.setBounds( 0, 0, level1Map.widthInPixels, level1Map.heightInPixels );

        this.cameras.main.setBounds(0, 0, level1Map.widthInPixels, level1Map.heightInPixels);
        //this.cameras.main.setZoom(1.75);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.grappleGroup = this.add.group();
        this.grappleGroup.runChildUpdate = true;

        this.input.on('pointerdown', function (pointer) {

            console.log('down');
            console.log('x: ' + pointer.x + ' y: ' + pointer.y);
            let success = false;
            //console.log(Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.x + this.cameras.main.scrollX , pointer.y + this.cameras.main.scrollY) <= this.player.ropeLength);
            //console.log(platforms.hasTileAtWorldXY(pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY , this.cameras.main, this.level1Map));
            if((Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY) <= this.player.ropeLength) && platforms.hasTileAtWorldXY(pointer.x + this.cameras.main.scrollX , pointer.y + this.cameras.main.scrollY, this.cameras.main, this.level1Map   )) {
                //createGrapple(pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY);
                success = true;
                console.log("Works");
                this.sound.play('grapple');
                this.grappleSpawn = new Grapple(this, platforms, this.player, pointer.x + (this.cameras.main.scrollX), pointer.y + (this.cameras.main.scrollY), 'placeholder', 0);
                this.grappleGroup.add(this.grappleSpawn);
                this.player.grappling = true;
                

            
                this.input.on('pointerup', function (pointer) {
                    //grappleSpawn.player.setVelocityY(-this.speed);
                    if(success)
                        this.player.grappling = false;
                    this.grappleSpawn.destruct();
                    
                    
                    
                }, this);
            }
            

        }, this);
    
    }

    update(){
        if (this.player.y <= 0 ){
            back_music.stop();
            this.scene.start("level2Scene");
            //resets the move so it doesn't flip back and forth between going on top and not
            this.scene.moveAbove("healthUI", "level2Scene");
            oneFirstTime = true;
        }
        
        if (keyW.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-2.0 * this.speed);
        } else if (keyS.isDown) {
            this.player.setVelocityY(this.speed);
            if (this.player.grappling)
                this.player.climbingUp = true;
        }
        if (keyW.isDown && this.player.grappling) {
            this.player.climbing = true;
        }
        if (keyS.isUp) {
            this.player.climbingUp = false;
        }
        if(keyW.isUp) {
            this.player.climbing = false;
        }
        if(keyA.isDown) {
            if(!(!this.player.grappling && (this.player.swingLeft || this.player.swingRight))){
                if(this.player.grappling){
                    if(!this.grappleSpawn.blocked){
                        this.player.setVelocityX(-this.speed * 0.75);
                    } else {
                        this.player.setVelocityX(this.player.body.velocity.x/1.5);
                    }
                } else {
                    this.player.setVelocityX(-this.speed * 0.75);
                }
            }
            if(this.player.grappling && !this.grappleSpawn.blocked)
                this.player.swingLeft = true;
            this.player.swingRight = false;
        } else if (keyD.isDown) {
            if(!(!this.player.grappling && (this.player.swingLeft || this.player.swingRight))){
                if(this.player.grappling){
                    if(!this.grappleSpawn.blocked){
                        this.player.setVelocityX(this.speed * 0.75);
                    } else {
                        this.player.setVelocityX(this.player.body.velocity.x/1.5);
                    }
                } else {
                    this.player.setVelocityX(this.speed * 0.75);
                }
            }
            this.player.swingLeft = false;
            if(this.player.grappling && !this.grappleSpawn.blocked)
                this.player.swingRight = true;
        } else {
            this.player.setVelocityX(this.player.body.velocity.x/1.1);
            this.player.swingLeft = false;
            this.player.swingRight = false;
        }
    }


    
}