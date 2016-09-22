module.exports=function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass:{
            dist:{
                files:{
                    "tmp/style.tmp.css":"style/sass/style.scss"
                },
                style:'compressed'
            }
        },
        concat:{
            css:{
                src:["style/info.txt","tmp/style.tmp.css"],
                dest:"build/bakehard/style.css"
            }
        },
        copy:{
            php:{
                expand:true,
                flatten:true, 
                src:"php/*.php",
                dest:"build/bakehard"
            },
            assets:{
                expand:true,
                src:"assets/**",
                dest:"build/bakehard"
            },
        },
        clean:{
            options:{
                "no-write":false
            },
            bakehard:['build/bakehard/*'],
            tmp:['tmp/*']
        },
        compress:{
            build:{
                options:{
                    archive:"build/bakehard.zip",
                    mode:"zip"
                },
                files:[
                   {src:['build/bakehard/**']}
                ]
            }
        },
        shell:{
            rsync:{
                command:"rsync -r --delete -e 'ssh -p 18765' ./build/bakehard/ johnmcal@johnmcalhoun.com:~/public_html/bakehard/wp-content/themes/bakehard"
            }
        },
        browserify:{
            dist:{
                src:"js/main.js",
                dest:"tmp/main.js"
            },
            testLoad:{
                src:"js/load/test.js",
                dest:"js/load/data/test.js"
            },
            testConstants:{
                src:"js/constants/test.js",
                dest:"js/constants/data/test.js"
            },
            testNav:{
                src:"js/nav/test.js",
                dest:"js/nav/data/test.js"
            },
            testProgress:{
                src:"js/progress/test.js",
                dest:"js/progress/data/test.js"
            },
            testRoutes:{
                src:"js/routes/test.js",
                dest:"js/routes/data/test.js"
            },
            testtags:{
                src:"js/tags/test.js",
                dest:"js/tags/data/test.js"
            },
            testThumbnail:{
                src:"js/thumbnails/test.js",
                dest:"js/thumbnails/data/test.js"
            }
        },
        uglify:{
            dist:{
                files:{
                    "build/bakehard/js/bakehard.min.js":['tmp/main.js']
                }
            }
        },
        handlebars:{
            compile:{
                options:{
                    namespace:'JST',
                    node:true
                },
                files:{
                    "js/templates/templates.js":"js/templates/mustache/*.mustache"
                }
            }
        },
        browserSync:{
            js:{
                src:"./js",
                options:{
                    server:{
                        baseDir:"./js",
                        directory:true
                    }
                }, 
            }
        },
        connect:{
            js:{
                options:{
                    port:8000,
                    base:"js"
                }
            },
            dev:{
                options:{
                    port:8000,
                    base:"js",
                    keepalive:true
                }
            }
        },
        "start-selenium-server":{
            dev:{
                options:{
                    autostop:false,
                    downloadUrl:"http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar"
                }
            }
        },
        "stop-selenium-server":{
            dev:{}
        },
        webdriver:{
            dev:{
                configFile:"./wdio.conf.js"
            }
        },
    });

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('style',["sass:dist",
                                "concat:css"])
    grunt.registerTask('php',["copy:php"])
    grunt.registerTask('assets',["copy:assets"])
    grunt.registerTask('js',[   "handlebars",
                                "browserify:dist",
                                "uglify:dist"])
    grunt.registerTask('Clean',["clean:tmp"])
    grunt.registerTask('build',[    'clean:bakehard',
                                    'style',
                                    'php',
                                    'assets',
                                    'js'])
    grunt.registerTask('package',[  'build',
                                    'compress:build'])
    grunt.registerTask('upload',[   'build',
                                    'shell:rsync'])
    grunt.registerTask('testBuild',[
                                'browserify:testConstants',
                                'browserify:testLoad',
                                'browserify:testProgress',
                                'browserify:testNav',
                                'browserify:testRoutes',
                                'browserify:testThumbnail',
                                'browserify:testtags',
                                'handlebars' 
                                ]) 
    
    grunt.registerTask('test',[ 'connect:js',
                                'testBuild',
                                'start-selenium-server:dev', 
                                'force:webdriver:dev',
                                'stop-selenium-server:dev']) 

    grunt.registerTask('server','connect:dev')
    grunt.registerTask('default',[])
}







