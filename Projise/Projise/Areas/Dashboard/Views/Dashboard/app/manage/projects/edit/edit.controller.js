/**
 * @ngdoc object
 * @name ProjectEditController
 * @description Viewlogic for editing document metadata
 */
angular.module('projiSeApp')
    .controller('projectEditController', ['$scope', '$modalInstance', 'project', function($scope, $modalInstance, project) {
        'use strict';

        $scope.editProject = project;

        $scope.update = function() {
            $modalInstance.close($scope.editProject);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
