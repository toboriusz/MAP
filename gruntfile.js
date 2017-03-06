'use strict';

module.exports = function (grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		sass: {
			options: {
				includePaths: [
				'node_modules/bootstrap-sass/assets/stylesheets'
				]
			},
			dev: {
				options: { outputStyle: 'expanded' },
				files: {
					'css/style.css': 'scss/style.scss'
				}	
			}
		},
		watch: {
			grunt: { files: ['gruntfile.js'] },
			sass: {
				files: [ 'scss/**/*.scss' ],
				tasks: [ 'sass' ]
			},
			js: {
				files: [ 'js/**/*.js', '!js/vendor.js', '!js/script.js', '!js/script.js' ],
				tasks: [ 'browserify:script', 'concat' ]
			}
		},
		browserify: {
			script:{
				options: { external: [ 'jquery', 'lodash' ] },
				src: [ 'js/index.js' ],
				dest:  'js/script.js'
			},
			vendor:{
				src: [],
				dest: 'js/vendor.js',
				options: {
					require: [ 'lodash', 'jquery' ]
				}
			}
		},
		postcss: {
			options: {
				processors: [
			        require('pixrem')(), // add fallbacks for rem units
			        require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
			        require('cssnano')
			    ]
			},
			build: { expand: true, src: 'css/*.css', dest: './' }
		},
		uglify: {
			build: {
				files: {
					'js/scripts.js': ['js/scripts.js']
				}
			}
		},
		concat: {
			main: {
				src: ['js/vendor.js', 'js/script.js'],
				dest: 'js/scripts.js'
			}
		},
		clean: {
			js: ['js/script.js', 'js/vendor.js']
		}
	});

	grunt.registerTask('compile', 	['sass', 'browserify', 'concat'] );
	grunt.registerTask('build', 	['compile', 'postcss', 'uglify'] );
	grunt.registerTask('default', 	['compile', 'watch'] );
}