module.exports = function(grunt) {
  var exec = require('child_process').exec;

  // Alias tasks for the most common sets of tasks.
  // Most of the time, you will use these.

  // By default, (i.e., if you invoke `grunt` without arguments), do
  // a new build.
  this.registerTask('default', ['server']);

  // Run a server. This is ideal for running the QUnit tests in the browser.
  this.registerTask('server', ['connect', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {},

      options: {
        port: 8000,
        base: '.'
      }
    },

    watch: {
      files: ['libs/**', 'js/**']
    },

    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      all: ['Gruntfile.js', 'js/**/*.js']
    }
  });

  // Load tasks from npm
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};
