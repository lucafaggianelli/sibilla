module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration will be written here
    jshint: {
      all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
    },

    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: [ 'app/*.js', 'tmp/*.js' ],
        dest: 'dist/app.js'
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'build/<%= pkg.name %>-linux64-<%= pkg.version %>.tar.gz',
          mode: 'tgz'
        },
        files: [{
          cwd: 'build/sibilla-linux-x64/',
          src: ['**'],
          dest: 'sibilla',
          expand: true
        }]
      }
    },

    packelectron: {
    
    },

    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
        tasks: [ 'concat:dist', 'jshint' ],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
        tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
        options: {
          atBegin: true
        }
      }
    }
  });

  // Loading of tasks and registering tasks will be written here
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('tasks/');

  grunt.registerTask('dev', [ 'watch:dev' ]);
  grunt.registerTask('pack', [ 'concat:dist', 'packelectron', 'compress:dist' ]);
};
