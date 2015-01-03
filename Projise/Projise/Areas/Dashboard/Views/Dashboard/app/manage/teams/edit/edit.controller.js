/**
 * @ngdoc object
 * @name TeamEditController
 * @description Viewlogic for editing team metadata
 */
angular.module('projiSeApp')
    .controller('teamEditController', ['$scope', '$modalInstance', 'team', function($scope, $modalInstance, team) {
        'use strict';

        $scope.model = {
            editTeam: team
        };

        $scope.update = function() {
            $modalInstance.close($scope.model.team);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
