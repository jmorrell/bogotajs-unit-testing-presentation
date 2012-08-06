module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: [
        'grunt.js', 
        'basic/**/*.js', 
        'with-delete/**/*.js', 
        'with-delete-with-voting/**/*.js', 
        'backbone-refactor/**/*.js', 
        'specs/**/*.js'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true,
        jQuery: true,
        $: true,
        _: true,
        underscore: true
      }
    },
    jasmine: {
      all: ['specs/index.html']
    }
  });

  // Register additional tasks
  grunt.loadNpmTasks('grunt-jasmine-task');

  // Default task.
  grunt.registerTask('default', 'lint');
};
