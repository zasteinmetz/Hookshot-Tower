class Grapple extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to the existing scene
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.scene = scene;
        this.body.allowGravity = false;
        this.setCollideWorldBounds = true;
        this.player = player;
        this.speed = 5.0;

        this.length = 200.0;
        this.minLength = 20.0;
        this.maxLength = this.player.ropeLength;
        this.newLine = this.scene.add.line(0,0,this.x,this.y,this.player.x,this.player.y, 0xff0000).setOrigin(0,0);
    }
    update() {
        this.oldLine = this.newLine;
        this.newLine = this.scene.add.line(0,0,this.x,this.y,this.player.x,this.player.y, 0xff0000).setOrigin(0,0);
        this.oldLine.destroy();
        
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.x, this.y) > this.length) {
            let slope = (this.player.y - this.y)/ (this.player.x - this.x);
            let radSlope = Math.atan(slope);
            let xComp = this.length * Math.cos(radSlope);
            let yComp = this.length * Math.sin(radSlope);
            if (Phaser.Math.Distance.Between(this.player.x,this.player.y, this.x + xComp, this.y + yComp) > this.length * 1.5) {
                xComp = -xComp;
                yComp = -yComp;
            }
            this.player.x = this.x + xComp;
            this.player.y = this.y + yComp;
        }
        if (this.player.climbing && this.length > this.minLength) {
            this.length -= this.speed;
            console.log('up');
            console.log(this.length);
        }
        if ( this.player.climbingUp && this.length < this.maxLength) {
            this.length += this.speed;
            console.log('down');
            console.log(this.length);
        }
    }
}