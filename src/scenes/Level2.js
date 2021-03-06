class Level2 extends Phaser.Scene {
    // Second complete level
    constructor(){
        super("level2Scene");
    }
    preload(){
        this.load.image('placeholder', './assets/Grapple.png');
        this.load.image('towerTileset', "./assets/tilesheet2.png");
        this.load.image('player', './assets/obody.png');
        this.load.atlas("bat", "./assets/battexture.png","./assets/battexture.json");
        this.load.tilemapTiledJSON('Level2TileMap',"./assets/Level2.json");
        this.load.audio('grapple','./assets/splat.wav');
        this.load.audio('snap','./assets/plunk.wav');
        this.load.audio('background_music','./assets/2021-03-07_-_Haunted_Memories_-_David_Fesliyan.mp3');

    }
    create(){
        //makes sure hearts render on top
        this.scene.moveBelow("healthUI", "level2Scene");
        this.scene.pause("healthUI");
        this.MAX_VELOCITY = 300;    //maximum velocity in pixels per second
        this.physics.world.gravity.y = 800;
        

        back_music = this.sound.add('background_music');
        back_music.loop = true;
        back_music.play();

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNames("bat", {
                prefix: "bat",
                suffix: ".png",
                start: 1,
                end: 3,
                zeroPad: 1
            }), 
            repeat: -1,
            yoyo: true,
        });

        const level2Map = this.add.tilemap('Level2TileMap');
        const towerTiles = level2Map.addTilesetImage("tilesheet2", 'towerTileset');
        const platforms = level2Map.createLayer('Tile Layer 1', towerTiles, 0, 0);
        const spikes = level2Map.createLayer('Spikes', towerTiles, 0, 0);

        platforms.setCollisionByProperty({
            collides: true,
            damages: false
        });

        spikes.setCollisionByProperty({
            collides: true,
            damages: true
        });
        this.speed = 200.0;

        
        this.player = new Player(this, 2 * game.config.width - 224, game.config.height * 2 - 64, 200.0, 'player').setOrigin(0);
        this.player.collides = true;
        //this.player.damages = true;
        this.physics.add.collider(this.player, platforms);
        //spike collison added immunity so couldn't be hit multiple times
        this.physics.add.collider(this.player, spikes,  (obj1, obj2) => {
            if(immune == false){
                this.scene.resume("healthUI");
                immune = true;
                health -= 2;
                console.log("spike hit");
                this.time.delayedCall(1500, () => {
                    this.scene.pause("healthUI");
                    immune = false;
                    console.log("spike hitable");
                }, null, this);
            }
        });

        // Make group for bat collisions
        this.batGroup = this.add.group({
            runChildUpdate: true     // updates to each child
        });

        // Make bat objects that turn when they collide with a platform
        this.bat01 = new Bat(this, 200, 14 * 32, 'bat').play('fly');
        this.bat01.collides = true;
        this.batGroup.add(this.bat01);
        // Bat collider to switch movement
        this.physics.add.collider(this.bat01, platforms, (obj1, obj2) => {
            obj1.switchMovement();
        });

        this.bat02 = new Bat(this, 200, 24 * 32, 'bat').play('fly');
        this.bat02.collides = true;
        this.batGroup.add(this.bat02);
        // Bat collider to switch movement
        this.physics.add.collider(this.bat02, platforms, (obj1, obj2) => {
            obj1.switchMovement();
        });

        this.bat03 = new Bat(this, (game.config.width * 2) - (32 * 2) , 9 * 32, 'bat').play('fly');
        this.bat03.collides = true;
        this.batGroup.add(this.bat03);
        // Bat collider to switch movement
        this.physics.add.collider(this.bat03, platforms, (obj1, obj2) => {
            obj1.switchMovement();
        });

        this.bat04 = new Bat(this, (game.config.width) - (5 * 32), 6 * 32, 'bat').play('fly');
        this.bat04.collides = true;
        this.batGroup.add(this.bat04);
        // Bat collider to switch movement
        this.physics.add.collider(this.bat04, platforms, (obj1, obj2) => {
            obj1.switchMovement();
        }); 

        // Player collider with Bat group added immunity so couldn't be hit multiple times
        this.physics.add.collider(this.player, this.batGroup, (obj1, obj2) => {
            if(immune == false){
                this.scene.resume("healthUI");
                immune = true;
                health--;
                obj2.switchMovement();
                console.log("bat hit");
                this.time.delayedCall(1500, () => {
                    this.scene.pause("healthUI");
                    immune = false;
                    console.log("bat hitable");
                }, null, this);
            }
        });

        this.physics.world.setBounds( 0, 0, level2Map.widthInPixels, level2Map.heightInPixels );

        this.cameras.main.setBounds(0, 0, level2Map.widthInPixels, level2Map.heightInPixels);
        //this.cameras.main.zoom = 0.5;
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
            if((Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY) <= this.player.ropeLength) && platforms.hasTileAtWorldXY(pointer.x + this.cameras.main.scrollX , pointer.y + this.cameras.main.scrollY, this.cameras.main, this.level2Map   )) {
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
                    
                    
                },this);
            }
            

        }, this);
        console.log("Health = " + health);
        this.scene.pause("healthUI");
        console.log("Health = " + health)
    }

    update(){
        if(health <= 0){
            this.scene.stop("healthUI");
            health = 6;
            immune = false;
            console.log('health = ' + health);
            //this.scene.restart("level2Scene");
            back_music.stop();
            this.scene.start("gameOverScene");
        }

        if (this.player.y >= 30 * 32){
            back_music.stop();
            this.scene.start("level1Scene");
        }
        if (this.player.y <= 0 ){
            back_music.stop();
            this.scene.start("winScene");
            health = 7;
            this.scene.stop("healthUI");
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