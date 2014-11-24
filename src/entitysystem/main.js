var request = require('superagent');
var RSVP    = require('rsvp');

function EntitySystem() {}

// Use Object.defineProperty to define private methods

EntitySystem.prototype = {
    filterByTag: function(tag, list) {
        var es = this;
        list = list || this._data.entities;
        return list.filter(function(ent) {
            if (ent.tags) {
                if (ent.tags.indexOf(tag) > -1) {
                    return es.getEntity(ent);
                }
            }
        });
    },

    getByTags: function(tags) {
        if (typeof tags === 'string') {
            tags = [tags];
        }
        if (!tags instanceof Array) {
            return console.error('Tags must be either string or '+
                                 'an array of tags');
        }

        var filtered;
        var es = this;

        tags.forEach(function(tag, num) {
            filtered = num === 0 ?
                es.filterByTag(tag) :
                es.filterByTag(tag, filtered);
        });

        return filtered;
    },

    getByID: function(ids) {
        if (typeof ids === 'string') {
            ids = [ids];
        }
        if (!ids instanceof Array) {
            return console.error('ID must be either a string or an array');
        }

        var entities = [];
        var c, e, i, l = this._data.entities.length;

        for (i=0; i<l; i+=1) {
            e = this._data.entities[i];
            if (ids.indexOf(e._id) > -1) {
                entities.push(e);
                c += 1;
            }
            if (c === ids.length) {
                break;
            }
        }

        return entities;
    },

    getEntity: function(entity) {
        if (entity.children) {
            entity.children = this.getByID(entity.children);
        }

        return entity;
    }
};

module.exports = function(file) {
    return new RSVP.Promise(function(resolve, reject) {
        request
        .get(file)
        .end(function(res) {
            if (res.ok) {
                resolve(Object.create(EntitySystem.prototype, {
                    _data: {
                        value:      res.body,
                        enumerable: false,
                        writable:   false
                    }
                }));
            } else {
                reject('Error loading '+file);
            }
        });
    });
}
