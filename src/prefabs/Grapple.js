class Grapple extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, tilemap, player, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to the existing scene
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.scene = scene;
        this.tilemap = tilemap;
        this.body.allowGravity = false;
        this.setCollideWorldBounds = true;
        this.player = player;
        this.speed = 5.0;
        this.swingSpeed = 0.05;
        this.swingLeftMax = ((5.0 * Math.PI) / 6.0);
        this.swingRightMax = ((13.0 * Math.PI) / 6.0);
        this.maxFallSpeed = 400.0;

        this.radSlope = 0.0;
        this.length = 200.0;
        this.minLength = 20.0;
        this.maxLength = this.player.ropeLength;
        this.newLine = this.scene.add.line(0,0,this.x,this.y,this.player.x,this.player.y, 0xff0000).setOrigin(0,0);
    }
    update() {
        //this.player.setVelocityY(0.0);
        this.oldLine = this.newLine;
        this.newLine = this.scene.add.line(0,0,this.x,this.y,this.player.x,this.player.y, 0xff0000).setOrigin(0,0);
        this.oldLine.destroy();
        let blocked = false;
        
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.x, this.y) > this.length) {
            let slope = (this.player.y - this.y)/ (this.player.x - this.x);
            this.radSlope = Math.atan(slope);

            if ( this.player.swingLeft && this.swingRightMax < this.radSlope < this.swingLeftMax) {
                this.radSlope += Math.abs(Math.sin(this.radSlope)) * this.swingSpeed;
                console.log('swinging Left');
            }
            if ( this.player.swingRight && this.swingRightMax < this.radSlope < this.swingLeftMax) {
                this.radSlope -= Math.abs(Math.sin(this.radSlope)) * this.swingSpeed;
                console.log('swinging Right');
            }

            let xComp = this.length * Math.cos(this.radSlope);
            let yComp = this.length * Math.sin(this.radSlope);
            if (Phaser.Math.Distance.Between(this.player.x,this.player.y, this.x + xComp, this.y + yComp) > this.length * 1.5) {
                xComp = -xComp;
                yComp = -yComp;
            }
            
            if (!this.tilemap.hasTileAtWorldXY(this.x + xComp, this.y + yComp)){
                this.player.x = this.x + xComp;
                this.player.y = this.y + yComp;
                blocked = false;
            } else {
                blocked = true;
                this.player.setVelocityY(0.0);
            }
        }
        if (!blocked && this.player.climbing && this.length > this.minLength) {
            this.length -= this.speed;
            //console.log('up');
            //console.log(this.length);
        }
        if ( this.player.climbingUp && this.length < this.maxLength) {
            this.length += this.speed;
            //console.log('down');
            //console.log(this.length);
        }
        
        // problem area
        if ( this.player.body.velocity.y > this.maxFallSpeed) {
            this.player.setVelocityY(this.maxFallSpeed)
            
        }
    }
}