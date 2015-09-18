
module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Project configuration.
	grunt.initConfig({

		uglify: {
			options: {
				compress: {
					warnings: false
				},
				mangle: true,
				preserveComments: 'some'
			},
			nestedlist: {
				src: 'jquery.nestedlist.src.js',
				dest: 'jquery.nestedlist.js'
			}
		}

	});

	// JS distribution task.
	grunt.registerTask('dist-js', ['uglify:nestedlist']);

	// Default task.
	grunt.registerTask('default', ['dist-js']);
};