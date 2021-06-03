class HealthUI extends Phaser.Scene{
    // Player Health UI based on seperate health variable in Main
    constructor(){
        super("healthUI");
    }
    preload(){
        this.load.image('hearts', "./assets/hearttexture.png");
    }
    create(){
        this.createHearts();
    }

    update(){
        //reset health on restart
        if(health == 7){
            this.reset();
            health -= 1;
        }
        if(health <= 0){
            // make health 1 invisable after going below 0
            this.heart01.alpha = 0;
        }
        if(health <= 2){
            // make health 2 invisable after going below 2
            this.heart02.alpha = 0;
        }
        if(health <= 4){
            // make health 3 invisable after going below 4
            this.heart03.alpha = 0;
        }
    }

    reset(){
        //make hearts visable again
        console.log("I see you");
        this.heart01.alpha = 1;
        this.heart02.alpha = 1;
        this.heart03.alpha = 1;
    }

    //Player create function which might be a little unnecessary all things considered
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