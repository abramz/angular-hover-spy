module.exports = function (grunt) {

  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n',
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**'], 
          dest: 'build/'
        }]
      }
    },
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'gzip',
        sourceMap: 'build/hover-spy.min.js.map'
      },
      build: {
        src: 'src/hover-spy.js',
        dest: 'build/hover-spy.min.js'
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'test/karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },

    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/*.js']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'karma:unit', 'copy', 'uglify']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-watch', ['karma:watch']);
  grunt.registerTask('build', ['default']);
};