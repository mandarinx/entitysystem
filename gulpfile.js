var gulp            = require('gulp');
var browserify      = require('browserify');
var aliasify        = require('aliasify');
var source          = require('vinyl-source-stream');
var remapify        = require('remapify');
var yargs           = require('yargs');
var del             = require('del');
var pkg             = require('./package.json');
var config          = require('./gulp_config.json');

var dir = config.dir;
var pattern = config.pattern;
var file = config.file;
var production = process.env.NODE_ENV === 'production';

var argv = yargs
    .default('config', 'config')
    .argv;

var aliasify_configured = aliasify.configure({
    aliases: {
        // 'rsvp':         './node_modules/rsvp/dist/commonjs/main.js',
        // 'comp':         'tools/components'
    },
    verbose: false
});

var browserify_options = {
    debug: true,
    basedir: __dirname
};

function scripts(source_file, source_dir, target_file) {
    var bundler, rebundle;
    bundler = browserify(source_file, browserify_options);

    bundler.transform(aliasify_configured);

    bundler.plugin(remapify, [{
        src: pattern.all.js,
        expose: '',
        cwd: source_dir
    }]);

    rebundle = function() {
        var stream = bundler.bundle({debug: !production})
            .pipe(source(target_file))
            .pipe(gulp.dest(dir.deploy.js))
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

gulp.task('default', ['clean'], function() {
    scripts(file.main, dir.src.root, dir.deploy.root);
});
