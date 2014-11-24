var entities = require('client/entities/');

module.exports.create = function(props) {
    var ent = entities[props.entity_type];

    if (!ent) {
        return console.error('Could not create entity of type '+entity_type);
    }

    if (props.definitions instanceof Array) {
        props.definitions.forEach(function(def) {
            props.group.add(ent(def));
        });

    } else {
        props.group.add(ent(def));
    }
}
