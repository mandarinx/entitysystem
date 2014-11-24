var express         = require('express');
var path            = require('path');
var serveStatic     = require('serve-static');

module.exports = function() {
    var router = express.Router();

    router
        .get('/js/:file', function(req, res, next) {
            res.sendFile(path.resolve('./build/', req.params.file));
        })

        .get('/data/:file', function(req, res, next) {
            res.sendFile(path.resolve('./data/', req.params.file));
        })

        .get('/phaser/:file', function(req, res) {
            res.sendFile(path.resolve('./node_modules/phaser/build/', req.params.file));
        });

    return router;
};

