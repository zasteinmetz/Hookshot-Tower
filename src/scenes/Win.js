class Win extends Phaser.Scene{
    //Ending Win scene using same font code from menu
    constructor(){
        super("winScene");
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
    
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) + 100, 'ENTER TO GO TO MENU', menuConfig).setOrigin(0.5);
    // define keys
    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    
    WebFont.load({
        google: {
            families: ['Bahianita']

        },
        active: function()
        {
            add.text(game.config.width/8 * 3 - 16, game.config.height/8 * 3, 'You Win!', { fontFamily: 'Bahianita', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
        }
    })



   }

   update(){
    if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.scene.start("menuScene");
        }
    }
}