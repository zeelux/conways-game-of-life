/// <reference path="../../scripts/require.js" />

requirejs.config({
    baseUrl: '../../modules', // Change this setting to point to your own module folder to test your own code.
    paths: {
        lib: '../scripts',
        jquery: '../scripts/jquery-2.0.3.min',
        underscore: '../scripts/underscore',
        jasmine: '../scripts/jasmine',
        'jasmine-html': '../scripts/jasmine-html',
        'knockout-core': '../scripts/knockout-2.3.0',
        'knockout': '../scripts/knockout-es5.min',
        d3: '../scripts/d3.min',
        kinetic: '../scripts/kinetic-v4.4.3.min'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'jasmine-html': {
            deps: ['jasmine']
        },
        'knockout': {
            deps: ['knockout-core']
        },
        'd3': {
            exports: 'd3'
        }
    }
    // ,urlArgs: '_ts=' + (new Date()).getTime()
});

define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore');

    require('jasmine-html');

    // require each test file
    require('UnitTests/boardTests');


    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    jasmine.VERBOSE = true;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();
});