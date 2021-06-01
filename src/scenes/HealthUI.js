class HealthUI extends Phaser.Scene{
    constructor(){
        super("healthUI");
    }
    preload(){
        this.load.image('hearts', "./assets/hearttexture.png");
    }
    create(){
        console.log("Hello");
        this.createHearts();
    }

    update(){
        if(health <= 0){
            this.heart01.destroy();
        }
        if(health <= 2){
            this.heart02.destroy();
        }
        if(health <= 4){
            this.heart03.destroy();
        }
    }

    createHearts(){
        if(health >= 2){
            console.log("first");
            this.heart01 = this.add.sprite(borderUISize - borderPadding, 16, 'hearts');
        }
        if(health >= 4){
            console.log("second");
            this.heart02 = this.add.sprite( (borderUISize - borderPadding) + this.heart01.width, 16, 'hearts');
        }
        if(health >= 6){
            console.log("third");
            this.heart03 = this.add.sprite( (borderUISize - borderPadding) + 2 * (this.heart01.width), 16, 'hearts');
        }
    }
}