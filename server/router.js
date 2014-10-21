var express         = require('express');
var path            = require('path');
var serveStatic     = require('serve-static');

module.exports = function() {
    var router = express.Router();

    router
        // .get('/:file?', function(req, res, next) {
        //     var file = req.params.file ? req.params.file : 'index.html';
        //     res.sendFile(path.resolve('./public/', file));
        // })

        .get('/phaser/:file', function(req, res) {
            res.sendFile(path.resolve('./node_modules/phaser/build/', req.params.file));
        });

    return router;
};

