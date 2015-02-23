module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-release'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-contrib-coffee'

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

    coffee:
      options:
        bare: true
      index:
        files:
          'index.js': 'index.coffee'
      examples:
        expand: true
        cwd: 'examples'
        src: ['*.coffee']
        dest: 'examples'
        ext: '.js'
      classes:
        expand: true
        cwd: 'src'
        src: ['*.coffee']
        dest: 'src'
        ext: '.js'

  grunt.registerTask 'prepublish', ['coffee']
