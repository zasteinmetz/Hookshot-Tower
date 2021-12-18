class HealthUI extends Phaser.Scene{
    // Player Health UI based on seperate health variable in Main
    constructor(){
        super("healthUI");
    }
    preload(){
        this.load.atlas('hearts', "./assets/hearttexture.png", "./assets/hearttexture.json");
    }
    create(){
        this.createHearts();
        if(health >= 7){
            health = 6;
        }
    }

    update(){
        //console.log(health);
        //reset health on restart
        if(health >= 7){
            //this.reset();
            health = 6;
        }
        if(health <= 0){
            // make health 1 invisable after going below 0
            this.heart01.setTexture('hearts','heart3.png');
            this.heart02.setTexture('hearts','heart3.png');
            this.heart03.setTexture('hearts','heart3.png');
        }
        if(health == 1){
            this.heart01.setTexture('hearts','heart2.png');
            this.heart02.setTexture('hearts','heart3.png');
            this.heart03.setTexture('hearts','heart3.png');
        }
        if(health == 2){
            // make health 2 invisable after going below 2
            this.heart02.setTexture('hearts','heart3.png');
            this.heart03.setTexture('hearts','heart3.png');
        }
        if(health == 3){
            this.heart02.setTexture('hearts','heart2.png');
            this.heart03.setTexture('hearts','heart3.png');
        }
        if(health == 4){
            // make health 3 invisable after going below 4
            this.heart03.setTexture('hearts','heart3.png');
        }
        if(health == 5){
            this.heart03.setTexture('hearts','heart2.png');
        }
    }

    /*reset(){
        //make hearts visable again
        console.log("I see you");
        this.heart01.setTexture('hearts','heart.png');
        this.heart02.setTexture('hearts','heart.png');
        this.heart03.setTexture('hearts','heart.png');
    } */

    //Player create function which might be a little unnecessary all things considered
    createHearts(){
        if(health >= 2){
            console.log("first");
            this.heart01 = this.add.sprite(borderUISize - borderPadding, 16, 'hearts','heart.png');
            this.heart01.depth = 100;
        }
        if(health >= 4){
            console.log("second");
            this.heart02 = this.add.sprite( (borderUISize - borderPadding) + this.heart01.width, 16, 'hearts','heart.png');
            this.heart02.depth = 100;
        }
        if(health >= 6){
            console.log("third");
            this.heart03 = this.add.sprite( (borderUISize - borderPadding) + 2 * (this.heart01.width), 16, 'hearts','heart.png');
            this.heart03.depth = 100;
        }
    }
}