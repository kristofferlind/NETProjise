/**
 * @ngdoc object
 * @name TeamsController
 * @description Viewlogic for managing teams
 */
angular.module('projiSeApp')
    .controller('TeamsController', function($scope, Team) {
        'use strict';

        $scope.Team = Team;

        $scope.showEditTeam = false;

        $scope.model = {
            newUser: ''
        };

        $scope.addUser = function() {
            Team.Users.add($scope.model.newUser);
            $scope.model.newUser = '';
        };

    });
