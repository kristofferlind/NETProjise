/**
 * @ngdoc object
 * @name ProjectCreateController
 * @description Viewlogic for creating projects
 */
angular.module('projiSeApp')
    .controller('projectCreateController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
        'use strict';

        $scope.newProject = {};

        $scope.create = function() {
            $modalInstance.close($scope.newProject);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
