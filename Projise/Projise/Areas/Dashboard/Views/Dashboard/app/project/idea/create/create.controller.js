/**
 * @ngdoc object
 * @name  ideaCreateController
 * @description Controller for modal to create an idea
 */
angular.module('projiSeApp')
    .controller('ideaCreateController', function($scope, $modalInstance) {
        'use strict';

        $scope.idea = {};

        $scope.create = function() {
            $modalInstance.close($scope.idea);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
