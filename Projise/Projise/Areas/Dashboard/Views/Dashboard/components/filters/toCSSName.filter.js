/**
 * @ngdoc filter
 * @name  toCSSName
 * @description Make lowercase and replace ' ' with '-'.
 */
angular.module('projiSeApp')
.filter('toCSSName', function() {
    'use strict';
    return function(input) {
        //Do nothing if input is undefined
        if (input === undefined) {
            return;
        }
        //to lowercase
        var output = input.toLowerCase();

        //replace ' ' with '-'
        output = output.replace(' ', '-');

        return output;
    };
});
