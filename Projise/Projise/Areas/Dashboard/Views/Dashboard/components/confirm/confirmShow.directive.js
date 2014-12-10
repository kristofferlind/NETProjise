/**
 * @ngdoc directive
 * @name  confirmShow
 * @description Shows confirm message
 */
angular.module('projiSeApp')
.directive('confirmShow', function() {
    'use strict';
    // Runs during compile
    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'Areas/Dashboard/Views/Dashboard/components/confirm/confirm.html',
        replace: false,
        controller: function($scope, $rootScope) {
            //Close dialog
            $scope.close = function(dialog) {
                //Find index of dialog
                var index = $scope.confirmDialogs.indexOf(dialog);
                if (index > -1) {
                    $scope.confirmDialogs.splice(index, 1); //Remove dialog
                }
            };

            $scope.confirmDialogs = [];

            //Add dialog
            var addDialog = function(dialog) {
                $scope.$apply(function() {
                    $scope.confirmDialogs.push(dialog);
                });
            };

            //Confirm dialog, sends event to run onConfirm function
            $scope.yes = function(dialog) {
                $rootScope.$broadcast('confirmed:' + dialog.id, dialog);
                $scope.close(dialog); //Close dialog
            };

            //Listen for requests to add dialog
            $rootScope.$on('confirm:show', function(event, dialog) {
                addDialog(dialog); //Add dialog
            });
        }
    };
});
