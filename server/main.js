var path            = require('path');
var express         = require('express');
var favicon         = require('serve-favicon');

var router          = require('./router');
var errors          = require('./errors');

var public_dir = './public';
var verbose = true;

var web = express();
var errs = errors(verbose);

web.set('showStackError', true);

web
    .use(favicon(public_dir + '/favicon.ico'))
    .use('/', express.static(public_dir))
    .use(router())
    .use(errs.notFound)
    .use(errs.log)
    .use(errs.json)
    .use(errs.html);

web.listen(3000, function() {
    console.log('Server ready @ 3000');
});
