// global variables currently size of tile for ground subject to review
const tileSize = 35;

//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width : 640,
    height: 480,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },/*
        scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 480,
        zoom: 2
    },*/
    scene: [Menu, Sample, Level1, GameOver, Credits, Level2, Win, Test]
}

let game = new Phaser.Game(config);

// Boolean value for whether or not player has passed 
// through first level for first time
let oneFirstTime;

// immune function for damage
let immune = false;

let keyW, keyA, keyS, keyD;
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyENTER;
let keyC;
let health;
