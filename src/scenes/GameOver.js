class GameOver extends Phaser.Scene{
    // Gameover screen using Menu fonts
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
   }

   create(){
    console.log(health + " health");
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
        this.scene.launch("healthUI");
        health = 6;
        this.scene.start("level2Scene");
        //resets the move so it doesn't flip back and forth between going on top and not
        this.scene.moveAbove("healthUI", "level2Scene");
        }
    }
}