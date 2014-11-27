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
                    'js/lib/jquery.min.js',
                    'js/lib/jquery.cookie.js',
                    'js/lib/jquery.placeholder.js',
                    'js/lib/moment-with-locales.min.js',
                    'js/lib/moment-range.min.js',
                    'js/lib/underscore-min.js',
                    'js/lib/angular.min.js',
                    'js/lib/angular-animate.min.js',
                    'js/lib/fastclick.js',
                    'js/lib/angular-ui-router.js',
                    'js/lib/angular-touch.min.js',
                    'js/lib/mm-foundation.min.js',
                    'js/lib/modernizr.js',
                    'js/lib/amplify.min.js',
                    'js/lib/easeljs-0.7.1.combined.js',
                    'js/lib/tweenjs-0.5.1.min.js',
                    'js/lib/flashplugin-0.5.2.combined.js',
                    'js/modules/core/core.js',
                    'js/modules/navigation/navigation.js',
                    'js/modules/profile/profile.js',
                    'js/modules/betting/betting.js',
                    'js/modules/interactive/interactive.js',
                    'js/modules/components/components.js',
                    'js/modules/cms/cms.js',
                    'js/modules/**/*.js',
                    'js/modules/**/**/*.js',
                    'js/main.js',
                    'js/routes.js',
                    'js/config.js',
                ],
                dest: 'js/app.js'
            }
        },

        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'js/modules/**/*.coffee',
                    // 'js/modules/**/*.js',
                    'js/main.js',
                    'js/routes.coffee',
                    'haml/**/*.haml',
                    'index.haml'
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
            bsFiles: {
                src: 'gjs/modules/**/*.js'
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        }




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
//
//


// {
//                     'html/betting.html': 'haml/betting.haml',
//                     'html/navigation/nav.html': 'haml/navigation/nav.haml'
//                    } 
/* EOF */