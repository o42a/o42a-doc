module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      options: {
        strictMath: true
      },
      development: {
        files: {
          ".temp/bootstrap.css": "less/all.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          ".temp/bootstrap.min.css": "less/all.less"
        }
      }
    },
    concat: {
      options: {
        separator: ''
      },
      development: {
        src: [
          "less/banner.txt",
          ".temp/bootstrap.css"
        ],
        dest: "build/css/bootstrap.css"
      },
      production: {
        src: [
          "less/banner.txt",
          ".temp/bootstrap.min.css"
        ],
        dest: "build/css/bootstrap.min.css"
      }
    },
    wintersmith: {
      build: {}
    },
    clean: {
      options: {
        force: true
      },
      temp: [".temp"],
      built: ["build"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-wintersmith');

  grunt.registerTask('default', ['less', 'concat', 'wintersmith']);
  grunt.registerTask(
    'build',
    ['less:production', 'concat:production', 'wintersmith']);
};
