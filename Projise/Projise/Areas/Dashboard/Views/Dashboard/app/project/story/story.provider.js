/**
 * @ngdoc service
 * @name  StoryProvider
 * @description Manages data for stories and makes sure local instance is in sync with backend
 */
angular.module('projiSeApp').factory('StoryProvider', ['$http', 'socket', 'Sprint', '$timeout', '$state', function($http, socket, Sprint, $timeout, $state) {
    'use strict';

    var tries = 0,
        //Promise so we can make sure its loaded at statechange
        backlog = $http.get('/api/stories').success(function (stories) {
            StoryProvider.backlog.length = 0;
            angular.copy(stories, StoryProvider.backlog);
            socket.syncUpdates('story', StoryProvider.backlog);
        }),
        sprintBacklog = function () {
            return Sprint.setActiveSprint().then(function () {
                var storiesInSprint = StoryProvider.backlog.filter(function (story) {
                    return story.sprintId == Sprint.activeSprintId;
                });
                angular.copy(storiesInSprint, StoryProvider.sprintBacklog);
                socket.syncUpdates('story', StoryProvider.sprintBacklog, true);
            }, function (err) {
                $state.go('dashboard.project.project');
                //$location.path('/project');
                //document.location.href = '/dashboard/#/project';
            });
        },
        StoryProvider = {
            promiseBacklog: backlog,
            promiseSprintBacklog: sprintBacklog,
            backlog: [],
            sprintBacklog: [],
            //sprintId: Sprint.activeSprintId,
            //sprint: Sprint.activeSprint()
        };

    //sprintBacklog();

    return StoryProvider;
}]);
