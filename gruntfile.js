module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-version');

	// Default task.
	grunt.registerTask('default', ['jshint','build','karma:unit']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['clean','html2js:main','concat','uglify','less','copy']);
	grunt.registerTask('release', ['clean','html2js:main','jshint','concat','uglify','karma:unit','less','copy']);
	grunt.registerTask('test-watch', ['karma:watch']);

	// Print a timestamp (useful for when watching)
	grunt.registerTask('timestamp', function() {
		grunt.log.subhead(Date());
	});

	var karmaConfig = function(configFile, customOptions) {
	var options = { configFile: configFile, keepalive: true };
	var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
	return grunt.util._.extend(options, customOptions, travisOptions);
	};

	// Project configuration.
	grunt.initConfig({
	distdir: 'assets',
	pkg: grunt.file.readJSON('package.json'),
	banner:
	'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
	src: {
		js: ['client/src/**/*.js'],
		specs: ['client/test/**/*.spec.js'],
		scenarios: ['client/test/**/*.scenario.js'],
		html: ['client/src/index.html'],
		tpl: ['client/src/js/**/*.tpl.html'],
		css: [
			'client/src/css/bootstrap/bootstrap.less',
			'client/lib/ng-tags-input/ng-tags-input.css',
			'client/lib/ng-tags-input/ng-tags-input.bootstrap.css',
			'client/lib/bootstrap-additions/dist/bootstrap-additions.css',
			'client/lib/angular-motion/dist/angular-motion.css',
			'client/src/css/default.css'
		], // recess:build doesn't accept ** in its file patterns
		lessWatch: ['client/src/css/**/*.less']
	},
	clean: ['<%= distdir %>'],
	copy: {
		main: {
			files: [
				{ dest: '<%= distdir %>/fonts', src : '**', expand: true, cwd: 'client/lib/bootstrap/fonts' }
				,{ dest: '<%= distdir %>/js', src : 'jquery.min.js', expand: true, cwd: 'client/lib/jquery/dist' }
				//,{ dest: '<%= distdir %>', src : '*', expand: true, cwd: 'src', filter: 'isFile' }
			]
		}
	},
	karma: {
		unit: { options: karmaConfig('client/test/config/unit.js') },
		watch: { options: karmaConfig('client/test/config/unit.js', { singleRun:false, autoWatch: true}) }
	},
	html2js: {
		main: {
			options: {
				base: 'client/src/js'
			},
				src: ['<%= src.tpl %>'],
			dest: '<%= distdir %>/js/templates.js'
		}
	},
	concat:{
		dist:{
			options: {
				banner: "<%= banner %>"
			},
			src:['<%= distdir %>/js/templates.js','<%= src.js %>'],
			dest:'<%= distdir %>/js/<%= pkg.name %>.js'
		},
		angular: {
			src:[
				'client/lib/angular/angular.js', 
				'client/lib/angular-route/angular-route.js', 
				'client/lib/angular-animate/angular-animate.js', 
				'client/lib/angular-strap/dist/angular-strap.js',
				'client/lib/angular-strap/dist/angular-strap.tpl.js',
				'client/lib/ng-tags-input/ng-tags-input.js'
			],
			dest: '<%= distdir %>/js/angular.js'
		},
      	index: {
			src: ['client/src/index.html'],
			dest: '<%= distdir %>/index.html',
			options: {
				process: true
			}
      	}
	},
	uglify: {
		dist:{
			options: {
				banner: "<%= banner %>",
				mangle: true,
				compress: true
			},
			files: {
				'<%= distdir %>/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		},
		angular: {
			src:['<%= concat.angular.dest %>'],
			dest: '<%= distdir %>/js/angular.min.js'
		}
	},
	less: {
		build: {
			files: {
				'<%= distdir %>/css/<%= pkg.name %>.css': ['<%= src.css %>'] 
			},
			options: {
				compile: true
			}
		},
		min: {
			files: {
				'<%= distdir %>/css/<%= pkg.name %>.min.css': ['<%= src.css %>']
			},
			options: {
				compress: true
			}
		}
	},
	watch:{
		all: {
		files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
		tasks:['default','timestamp']
		},
		build: {
		files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
		tasks:['build','timestamp']
		}
	},
	jshint:{
		files:['gruntFile.js', 'client/src/**/*.js', '<%= src.specs %>', '<%= src.scenarios %>'],
		options:{
		curly:true,
		eqeqeq:true,
		immed:true,
		latedef:true,
		newcap:true,
		noarg:true,
		sub:true,
		boss:true,
		eqnull:true,
		smarttabs: true,
		globals:{}
		}
	},
	version: {
	    project: {
	      src: ['package.json', 'bower.json']
	    }
	}
	});

};