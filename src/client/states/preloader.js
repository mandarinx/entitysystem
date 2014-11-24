module.exports = new Phaser.State();

module.exports.preload = function() {
    var assets = {
        spritesheet: {
            entities: ['./entities.png', 32, 32]
        },
        bitmapFont: {
            'Boxy-Bold': ['./fonts/boxy_bold_8.png', './fonts/boxy_bold_8.xml']
        }
    };

    var game = this.game;

    Object.keys(assets).forEach(function(type) {
        Object.keys(assets[type]).forEach(function(id) {
            game.load[type].apply(game.load, [id].concat(assets[type][id]));
        });
    });
};

module.exports.update = function() {
    if (this.game.load.hasLoaded) {
        this.game.state.start('Game');
    }
};
