module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    jshint: {
      //list of source files to analyze
      all: [
        'Gruntfile.js',
        './*.src.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    coffeelint: {
      //list of source files to analyze
      all: './*.coffee',
      //reuse pattern specs coffeelint settings
      options: require('./spec/config.json').coffeelint
    },
    complexity: {
      js: {
        //list of source files to analyze
        src: ['./*.src.js'],
        options: {
          // show only maintainability errors
          errorsOnly: false,
          // http://en.wikipedia.org/wiki/Cyclomatic_complexity
          cyclomatic: 8,
          // http://en.wikipedia.org/wiki/Halstead_complexity_measures
          halstead: 10,
          maintainability: 100
        }
      }
    },
    clean: {
      coverage: '{,*/}/coverage/*'
    }
  });
  grunt.registerTask('default', [
    'coffeelint',
    'jshint',
    'complexity'
  ]);
};