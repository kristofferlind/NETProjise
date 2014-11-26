/**
 * @ngdoc directive
 * @name  mongooseError
 * @description Remove server error when user updates input
 */
angular.module('projiSeApp')
.directive('mongooseError', function () {
    'use strict';

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.on('keydown', function() {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
});
