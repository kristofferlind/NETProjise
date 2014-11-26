/**
 * @ngdoc directive
 * @name scrollBottom
 * @description Scroll element to bottom on change
 */
angular.module('projiSeApp')

.directive('scrollBottom', function() {
    'use strict';

    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm) {
            var element = iElm[0];
            //Not quite sure this should actually be a $watch..
            $scope.$watch(function() {
                //Scroll to bottom
                element.scrollTop = element.scrollHeight;
            });
        }
    };
});
