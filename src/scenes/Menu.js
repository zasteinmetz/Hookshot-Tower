class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
      
   }

   create(){
 
    
    
   
   
    
    
    
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
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), 'HookShot Tower', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) + 100, 'ENTER TO START', menuConfig).setOrigin(0.5);
    // define keys
    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
   }

   update(){
    if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
        //this.scene.start('testScene');
        this.scene.start('sampleScene');
        }
    }
}