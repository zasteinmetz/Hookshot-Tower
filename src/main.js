// global variables currently size of tile for ground subject to review
const tileSize = 35;

//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width : 854,
    height: 640,
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
    scene: [Menu, Test]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyENTER;