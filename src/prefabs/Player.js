class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setCollideWorldBounds = true;
        // add object to the existing scene
        scene.add.existing(this); 
    }
}