var path = require('path');
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),



        concurrent: {
            buildjs: ['newer:coffee'],
            buildhaml: ['newer:haml:dist', 'haml:dev'],
            builduglify: ['uglify']
        },

        concat: {

            dist: {
                src: [
           
                ],
                dest: 'js/app.js'
            }
        },

        watch: {
            scripts: {
                files: [
                ],
                tasks: ['concurrent:buildjs', 'concurrent:buildhaml', 'concat', 'play:success', 'uglify'],
                options: {
                    debounceDelay: 100,
                    spawn: false,
                    livereload: 80
                }
            },
        },

        play: {
            success: {
                file: './grunt-success.mp3'
            }
        },
        haml: {


            dist: {
                // files: grunt.file.expandMapping(['haml/**/*.haml'], 'html/', {
                //     rename: function(a, b, c) {
                //         var ret = b.replace(/haml/g, 'html');
                //         // console.log(a,b,ret);
                //         return ret;
                //     }
                // }),
                // src: 'haml/**/*.haml',
                files: [{
                    expand: true,
                    cwd: 'haml/',
                    src: ['**/*.haml'],
                    dest: 'html',
                    ext: '.html',
                    rename: function(a, b, c) {
                        return a + '/' + b;
                    }
                }]
            },
            dev: {
                files: {
                    'index.php': 'index.haml'
                }
            }
        },
        coffee: {
            glob_to_multiple: {
                expand: true,
                cwd: 'js/',
                src: ['**/*.coffee'],
                ext: '.js',
                dest: 'js',
                rename: function(a, b, c) {
                    // console.log('renaming to',a + '/' + b);
                    return a + '/' + b;
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    // dead_code: true,
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'js/app.min.js': ['js/app.js']
                }
            }
        },


        browserSync: {
 


    });
    grunt.loadNpmTasks('grunt-play');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-closure-compiler');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-haml2html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['watch']);

};
 
/* EOF */