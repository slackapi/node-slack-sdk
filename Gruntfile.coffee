module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-release'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'

  grunt.initConfig
    watch:
      coffee:
        files: [
          '**/*.coffee'   # Watch everything
          '!node_modules' # ...except dependencies
        ]
        tasks: ['shell:test']

    shell:
      test:
        command: 'npm test'
        options:
          stdout: true
          stderr: true