/**
 * @ngdoc object
 * @name ProjectAddUserController
 * @description Viewlogic for adding users to a project
 */
angular.module('projiSeApp')
    .controller('projectAddUserController', function($scope, $modalInstance) {
        'use strict';

        $scope.newUser = {};

        $scope.add = function() {
            $modalInstance.close($scope.newUser);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
