class Sample extends Phaser.Scene {
    constructor(){
        super("sampleScene");
    }
    preload(){
        this.load.image('placeholder', './assets/ObstacleOneCrate.png');
        this.load.image('sampleTiles', "./assets/TowerSpritesheet.png");
        this.load.image('sampleTiles', "./assets/TowerSpritesheet.tsx");
        this.load.image('player', './assets/obody.png');
        this.load.tilemapTiledJSON('sampleTileMap',"./assets/sampleTileMap.json");
        this.load.audio('grapple','./assets/splat.wav');
    }

    create(){
        this.MAX_VELOCITY = 300;    //maximum velocity in pixels per second
        this.physics.world.gravity.y = 800;

        const sampleMap = this.add.tilemap('sampleTileMap');
        const sampleTileset = sampleMap.addTilesetImage("TowerSpritesheet", 'sampleTiles');
        const platforms = sampleMap.createLayer('Tile Layer 1', sampleTileset, 0, 0);
        platforms.setCollisionByProperty({
            collides: true
        });
        this.speed = 200.0;

        
        this.player = new Player(this, 180, 0, 300.0, 'player').setOrigin(0);
        this.player.collides = true;
        this.physics.add.collider(this.player, platforms);
        
        this.bat01 = new Bat(this, 200, 100, '').setOrigin(0);
        this.bat01.collides = true;
        this.physics.add.collider(this.bat01, platforms, (obj1, obj2) => {
            obj1.switchMovement();
        });

        this.cameras.main.setBounds(0, 0, sampleMap.widthInPixels, sampleMap.heightInPixels);
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
            
            
            if(Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY) <= this.player.ropeLength) {
                //createGrapple(pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY);
                this.sound.play('grapple');
                let grappleSpawn = new Grapple(this, this.player, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY, 'placeholder', 0);
                this.grappleGroup.add(grappleSpawn);
                

            
                this.input.on('pointerup', function (pointer) {
                    //grappleSpawn.player.setVelocityY(-this.speed);
                    grappleSpawn.destroy();
                    
                });
            }
            

        }, this);
    
    }

    update(){
        this.bat01.update();
        if (keyW.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-2.0 * this.speed);
        } else if (keyS.isDown) {
            this.player.setVelocityY(this.speed);
            this.player.climbingUp = true;
        }
        if (keyW.isDown) {
            this.player.climbing = true;
        }
        if (keyS.isUp) {
            this.player.climbingUp = false;
        }
        if(keyW.isUp) {
            this.player.climbing = false;
        }
        if(keyA.isDown) {
            this.player.setVelocityX(-this.speed);
        } else if (keyD.isDown) {
            this.player.setVelocityX(this.speed);
        } else {
            this.player.setVelocityX(0.0);
        }
    }


    // create functions

    createGrapple(x, y) {
        let grappleSpawn = new Grapple(this, x, y, 'placeholder', 0);
        this.grappleGroup.add(grappleSpawn);
        return grappleSpawn;
    }
}