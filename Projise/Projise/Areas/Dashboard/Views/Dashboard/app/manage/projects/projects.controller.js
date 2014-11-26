/**
 * @ngdoc object
 * @name ProjectsController
 * @description Viewlogic for managing projects
 */
angular.module('projiSeApp')
    .controller('ProjectsController', function($scope, Project, Team) {
        'use strict';

        $scope.Project = Project;
        $scope.activeProject = Project.activeProject();
        $scope.Team = Team;
    });
