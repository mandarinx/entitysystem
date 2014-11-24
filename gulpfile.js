var gulp            = require('gulp');
var connect         = require('gulp-connect');
var browserify      = require('browserify');
var aliasify        = require('aliasify');
var source          = require('vinyl-source-stream');
var remapify        = require('remapify');
var yargs           = require('yargs');
var del             = require('del');
var pkg             = require('./package.json');
var config          = require('./gulp_config.json');

var dir             = config.dir;
var pattern         = config.pattern;
var file            = config.file;
var production      = process.env.NODE_ENV === 'production';

var argv = yargs
    .default('config', 'config')
    .argv;

var aliasify_configured = aliasify.configure({
    aliases: {
        'entitysystem':     dir.src.entitysystem,
        'client':           dir.src.client
    },
    verbose: false
});

var browserify_options = {
    debug:      !production,
    basedir:    __dirname
};

function scripts(source_file, source_dir, target_file) {
    var bundler;
    var rebundle;

    bundler = browserify(source_dir + source_file, browserify_options);
    bundler.transform(aliasify_configured);

    bundler.plugin(remapify, [{
        src:    pattern.all.js,
        expose: '',
        cwd:    source_dir
    }]);

    rebundle = function() {
        var stream = bundler.bundle()
            .pipe(source(target_file))
            .pipe(gulp.dest(dir.deploy.root))
            .pipe(connect.reload());

        return stream;
    };

    bundler.on('update', rebundle);
    return rebundle();
};

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', function (cb) {
    del([dir.deploy.root], cb);
});

// gulp.task('entitysystem', function (cb) {
//     return scripts(file.main, dir.src.entitysystem, 'entitysystem.js');
// });

gulp.task('client', function (cb) {
    return scripts(file.main, dir.src.client, 'client.js');
});

gulp.task('default', ['clean', 'client'], function() {
    // gulp.watch(dir.src.entitysystem + pattern.all.any, ['entitysystem']);
    gulp.watch(dir.src.root + pattern.all.any, ['client']);
});
