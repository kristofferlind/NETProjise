/**
 * @ngdoc object
 * @name TeamCreateCotroller
 * @description Viewlogic for creating teams
 */
angular.module('projiSeApp')
    .controller('teamCreateController', function($scope, $modalInstance) {
        'use strict';

        $scope.model = {
            newTeam: {}
        };

        $scope.create = function() {
            $modalInstance.close($scope.model.newTeam);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
