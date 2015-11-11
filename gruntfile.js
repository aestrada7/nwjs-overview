module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      'npm': {
        command: 'npm install'
      },
      'git-pull': {
        command: 'git pull --ff-only --all -p',
        options: {
          failOnError: false
        }
      },
      'nw': {
        command: '"node_modules/.bin/nw" nwjs-overview'
      }
    },
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('develop', ['shell:git-pull', 'shell:npm', 'shell:nw']);
};