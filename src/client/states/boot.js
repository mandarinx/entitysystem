module.exports = new Phaser.State();

module.exports.create = function() {
    var game = this.game;
    var scale = game.scale;

    game.input.maxPointers = 1;
    game.antialias = false;
    Phaser.Canvas.setSmoothingEnabled(game.context, false);

    game.stage.scaleMode = Phaser.ScaleManager.NO_SCALE;
    scale.maxWidth = 600;
    scale.maxHeight = 400;
    scale.forceLandscape = true;
    scale.pageAlignHorizontally = true;
    scale.pageAlignVertically = true;
    scale.setScreenSize(true);

    // TODO: Doesn't work in Chrome. Get's reset
    game.context.imageSmoothingEnabled = false;
    game.context.mozImageSmoothingEnabled = false;
    game.context.oImageSmoothingEnabled = false;
    game.context.webkitImageSmoothingEnabled = false;
    game.context.msImageSmoothingEnabled = false;

    game.state.start('Preloader');
};
