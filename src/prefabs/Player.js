class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, length, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to the existing scene
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.body.allowGravity = true;
        this.setCollideWorldBounds = true;
        this.climbing = false;
        this.climbingUp = false;
        this.ropeLength = length;
    }
    update() {
        
    }
}