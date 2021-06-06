class Bat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to the existing scene
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setPushable(false);
        this.speed = 200.0;
        this.moveingLeft = true;
        this.setVelocityX(-this.speed);
    }
    // Causes bat to switch directions when colliding with X world bounds 
    // no longer necessary after added tiles on all sides
    update() {
        if(this.x < 0 ){
            this.setVelocityX(this.speed);
        }
        else if( this.x > game.config.width - this.width){
            this.setVelocityX(-this.speed);
        }
    }

    // Function that switches the bat's movement to be triggered on collision
    switchMovement(){
        if(this.moveingLeft == true){
            this.moveingLeft = false;
            //console.log('switch right');
            this.setVelocityX(this.speed);
        }
        else if(this.moveingLeft == false){
            this.moveingLeft = true;
            //console.log('switch left');
            this.setVelocityX(-this.speed);
        }
    }
}