'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    var serveStatic = require('serve-static')

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
      connect: {
         server: {
            options: {
               hostname: "localhost",
               keepalive: true,
               base:['./app'],
               port: 9000,
               middleware: function(connect) {
                 return [
                   serveStatic('.tmp'),
                   connect().use('/bower_components', serveStatic('./bower_components')),
                   serveStatic(appConfig.app)
                 ];
               },
               debug: true
            }
         }
      }
   });

   // grunt.loadNpmTasks('grunt-connect-proxy');
   grunt.loadNpmTasks('grunt-contrib-connect');

   grunt.registerTask('default', [

      'connect:server'
   ]);

};
