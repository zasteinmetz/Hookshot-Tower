class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, length, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to the existing scene plus physics and gravity
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.body.allowGravity = true;
        //this.body.collideWorldBounds = true;
        this.grappling = false;
        this.climbing = false;
        this.climbingUp = false;
        this.swingLeft = false;
        this.swingRight = false;
        this.ropeLength = length;
    }
    update() {
        
    }
}