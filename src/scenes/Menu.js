class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('background', "./assets/prototitle2_.jpg");
   }

   create(){
    this.scene.launch("healthUI");
    this.scene.sleep("healthUI");
       // add background
       this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

       // Google WebFont or whatever
       var add = this.add;
       var inp = this.input;
    
     // menu text configuration
     let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '35px',
        
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    //Add menu text
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) + 100, 'ENTER TO START', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) + 150, 'C FOR CREDITS', menuConfig).setOrigin(0.5);

    // define keys
    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);


    
    WebFont.load({
        google: {
            families: ['Bahianita']

        },
        active: function()
        {
            add.text(16, 0, 'Hookshot Tower', { fontFamily: 'Bahianita', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
        }
    })



   }

   update(){
       if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
        //this.scene.start('testScene');
        //this.scene.start('sampleScene');
        this.scene.wake("healthUI");
        //resets boolean and health variables for fresh restart
        oneFirstTime = false;
        health = 6;
        this.scene.start("level2Scene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditsScene');
            }
    }
}