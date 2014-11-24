var e;
var game;

function Entity() {
    game = require('client/states/game').game;
    Phaser.Sprite.call(this, game, 0, 0,
                       this._def.visuals.spritesheet,
                       parseInt(this._def.visuals.icon));
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

module.exports = function(definition) {
    e = Object.create(Entity.prototype, {
        _def: {
            value:      definition,
            enumerable: false,
            writable:   false
        }
    });
    Entity.apply(e);
    return e;
}
