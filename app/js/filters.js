'use strict';

/* Filters */

//angular.module('phonecatFilters', []).filter('checkmark', function() {
//  return function(input) {
//    return input ? '\u2713' : '\u2718';
//  };
//});


var filterModule = angular.module("phonecatFilters", []);
filterModule.filter('checkmark', function(){
    return function(input) {
        return input ? '\u2713' : '\u2718';
    }
});