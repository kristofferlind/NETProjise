// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      //'Dashboard/bower_components/jquery/dist/jquery.js',
      'Dashboard/bower_components/angular/angular.js',
      'Dashboard/bower_components/angular-mocks/angular-mocks.js',
      'Dashboard/bower_components/angular-resource/angular-resource.js',
      'Dashboard/bower_components/angular-cookies/angular-cookies.js',
      'Dashboard/bower_components/angular-sanitize/angular-sanitize.js',
      //'Dashboard/bower_components/angular-route/angular-route.js',
      'Dashboard/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'Dashboard/bower_components/lodash/dist/lodash.compat.js',
      //'Dashboard/bower_components/angular-socket-io/socket.js',
      'Dashboard/bower_components/angular-ui-router/release/angular-ui-router.js',
      'Dashboard/bower_components/angular-markdown-directive/markdown.js',
      'Dashboard/bower_components/showdown/src/showdown.js',
      'Dashboard/app/app.js',
      'Dashboard/app/**/*.js',
      'Dashboard/components/**/*.js',
      'Dashboard/app/**/*.html',
      'Dashboard/components/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'html2js',
      '!(node_modules)/!(bower_components)/**/!(*spec).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'Dashboard/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'Dashboard/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
