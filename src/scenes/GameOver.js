class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
   }

   create(){

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
    
    //this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding), 'Endless Runner', menuConfig).setOrigin(0.5);
    //this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), 'HookShot Tower', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) + 100, 'ENTER TO CONTINUE', menuConfig).setOrigin(0.5);
    // define keys
    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    
    WebFont.load({
        google: {
            families: ['Bahianita']

        },
        active: function()
        {
            add.text(game.config.width/8 * 3 - 16, game.config.height/8 * 3, 'GameOver', { fontFamily: 'Bahianita', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
        }
    })



   }

   update(){
    if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
        //this.scene.start('testScene');
        //this.scene.start('sampleScene');
        this.scene.start("level2Scene");
        }
    }
}