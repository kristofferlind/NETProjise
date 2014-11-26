/**
 * @ngdoc directive
 * @name  confirmDialog
 * @todo  generating what looks like a guid for this is kind of insane, just use itemId
 * @description Tell confirmShow to display dialog. Run onConfirm function on yes
 */
angular.module('projiSeApp')

.directive('confirmDialog', function() {
    'use strict';

    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        controller: function($scope, $element, $attrs, $rootScope) {
            var s4 = function() {
                return (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
            };

            var message = $attrs.confirmMessage || 'Are you sure?',
                id = (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toLowerCase(),
                dialog = {
                    id: id,
                    message: message
                };

            //Execute on click
            $element.bind('click', function() {
                //Tell dialogShow to display dialog
                $rootScope.$broadcast('confirm:show', dialog);
                //Listen for confirm (yes)
                $rootScope.$on('confirmed:' + id, function() {
                    $scope.$eval($attrs.onConfirm);
                });
            });
        },
    };
});
