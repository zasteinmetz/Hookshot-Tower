//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width : 1280,
    height: 960,
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
    scene: []
}

let game = new Phaser.Game(config);