class Block extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setPushable(false);
        this.falling = false;
        this.fallSpeed = 150;
    }

    update() {
        if (this.falling == true) {
            this.setVelocityY(this.fallSpeed);
        }
        console.log('block');
    }

    fall() {
        this.falling = true;
    }
}