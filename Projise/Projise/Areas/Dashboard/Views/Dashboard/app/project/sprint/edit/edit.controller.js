/**
 * @ngdoc object
 * @name  SprintEditController
 * @description Handles modal for editing sprints
 */
angular.module('projiSeApp')
    .controller('sprintEditController', function($scope, $modalInstance, sprint) {
        'use strict';

        $scope.sprint = sprint;

        $scope.update = function() {
            $modalInstance.close($scope.sprint);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
