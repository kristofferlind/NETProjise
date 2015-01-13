/**
 * @ngdoc object
 * @name  SprintEditController
 * @description Handles modal for editing sprints
 */
angular.module('projiSeApp')
    .controller('sprintEditController', ['$scope', '$modalInstance', 'sprint', function($scope, $modalInstance, sprint) {
        'use strict';

        sprint.start = sprint.start.substr(0, 10);
        sprint.end = sprint.end.substr(0, 10);

        $scope.sprint = sprint;

        $scope.update = function() {
            $modalInstance.close($scope.sprint);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
