module.exports = new Phaser.State();

var entitysystem = require('entitysystem/main');
var factory = require('client/factory');
var es;
var room;

module.exports.create = function() {
    var game = this.game;

    entitysystem('/data/entities.json')
    .then(entitysystemLoaded.bind(this), function(reason) {
        console.error(reason);
    });

    game.stage.backgroundColor = '#333333';

};

function entitysystemLoaded(instance) {
    es = instance;
    room = es.getByTags(['room', 'level1']);
    // var stuff_group = this.game.add.group(this.game.stage, 'stuff');

    factory.create({
        entity_type: 'entity',
        definitions: room,
        group:       this.game
    });

    var i = 0;
    stuff_group.forEachAlive(function(entity) {
        entity.x += (i * 32);
        i += 1;
    });

    // room.getByTags
}
