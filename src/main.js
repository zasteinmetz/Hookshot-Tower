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
    },
    scene: [Menu, Test, Sample]
}

let game = new Phaser.Game(config);

let keyW, keyA, keyS, keyD;
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyENTER;
