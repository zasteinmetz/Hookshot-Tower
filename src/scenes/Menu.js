class Menu extends Phaser.Scene{
    // Menu scene with special font
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('background', "./assets/prototitle2_.jpg");
        this.load.audio('background_music','./assets/2021-03-07_-_Haunted_Memories_-_David_Fesliyan.mp3');

   }

   create(){
    //Starts concurrent Health UI Scene and immediately sets it to sleep
    this.scene.launch("healthUI");
    this.scene.sleep("healthUI");
       // add background
       this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

    back_music = this.sound.add('background_music');
    back_music.loop = true;
    back_music.play();
    
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
        back_music.stop();

        //Wakes UI scene
        this.scene.wake("healthUI");
        //resets boolean and health variables for fresh restart
        oneFirstTime = false;
        health = 7;
        this.scene.start("level1Scene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditsScene');
            }
    }
}