/**
 * @ngdoc object
 * @name  ManagerStates
 * @description Handles states and general settings for manager states
 */
angular.module('projiSeApp')
    .config(['$stateProvider', function($stateProvider) {
    'use strict';
    $stateProvider
        .state('dashboard.manage', {
            url: '',
            abstract: true
        })
        .state('dashboard.manage.projects', {
            url: '/',
            authenticate: true,
            resolve: {
                resolvedProjectProvider: ['ProjectProvider', function(ProjectProvider) {
                    return ProjectProvider.promise;
                }]
            },
            views: {
                'main@': {
                    templateUrl: 'Areas/Dashboard/Views/Dashboard/app/manage/projects/projects.html',
                    controller: 'ProjectsController'
                }
            }
        })
        .state('dashboard.manage.teams', {
            url: '/teams',
            authenticate: true,
            resolve: {
                resolvedTeamProvider: ['TeamProvider', function(TeamProvider) {
                    return TeamProvider.promise;
                }]
            },
            views: {
                'main@': {
                    templateUrl: 'Areas/Dashboard/Views/Dashboard/app/manage/teams/teams.html',
                    controller: 'TeamsController'
                }
            }
        });
}]);
