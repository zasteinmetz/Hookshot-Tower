class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene");
    }

    preload(){        
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('background', "./assets/prototitle2_.jpg");
   }

   create(){
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
     
     WebFont.load({
         google: {
             families: ['Bahianita']
 
         },
         active: function()
         {
             add.text(16, 0, 'Hookshot Tower', { fontFamily: 'Bahianita', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
         }
     })
 
 
    
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), 'Credits:\nProgramming: Zackary Steinmetz, Alexander Barclay\nArt Design: Alexander Barclay, Gabrielle Velasco\nAudio Design: Gabrielle Velasco, Ethan Jung\nUI: Ethan Jung, Gabrielle Velasco\nGame Design: Zackary Steinmetz, Ethan Jung,\nAlexander Barclay, Gabrielle Velasco', '26px').setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) + 150, 'Press C to back to Menu', menuConfig).setOrigin(0.5);
    // define keys
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
   }

   update(){
       //Cause the background to slowly move down thought it was a cool effect 
       //but not sure if worth keeping
       //this.background.tilePositionY -= 1;
    if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('menuScene');
            }
    }
}