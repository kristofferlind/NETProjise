'use strict';

/**
 * @ngdoc object
 * @name  DocumentStates
 * @description Defines routes and general settings for document states
 */
angular.module('projiSeApp')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('dashboard.document', {
                url: '/documents',
                authenticate: true,
                resolve: {
                    resolvedProjectProvider: ['ProjectProvider', function(ProjectProvider) {
                        return ProjectProvider.promise;
                    }],
                    resolvedSprintProvider: ['SprintProvider', function(SprintProvider) {
                        return SprintProvider.promise;
                    }]
                },
                views: {
                    'main@': {
                        templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentManager/documentManager.html',
                        controller: 'DocumentManagerController'
                    }
                }
            })
            .state('dashboard.document.list', {
                url: '/list',
                authenticate: true,
                views: {
                    'manager': {
                        templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentManager/documentList.html',
                        controller: 'DocumentListController'
                    },
                    'viewer': {
                        templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentViewer/documentViewer.html',
                        controller: 'DocumentViewerController'
                    }
                }
            })
            .state('dashboard.document.editor', {
                authenticate: true,
                url: '/edit',
                views: {
                    'manager': {
                        templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentEditor/documentEditor.html',
                        controller: 'DocumentEditorController'
                    },
                    'viewer': {
                        templateUrl: 'Areas/Dashboard/Views/Dashboard/app/document/documentViewer/documentViewer.html',
                        controller: 'DocumentViewerController'
                    }
                }
            });
    }]);
