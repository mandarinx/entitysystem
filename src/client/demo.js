// TODO: Could this be done automatically via a build script of some kind?
var boot        = require('./states/boot');
var preloader   = require('./states/preloader');
var game_state  = require('./states/game');

module.exports = function() {
    var game = new Phaser.Game(600, 400, Phaser.CANVAS, 'game',
                               null, false, false);

    game.state.add('Boot',      boot);
    game.state.add('Preloader', preloader);
    game.state.add('Game',      game_state);

    game.state.start('Boot');
}
