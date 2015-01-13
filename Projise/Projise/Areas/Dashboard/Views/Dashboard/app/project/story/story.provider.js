/**
 * @ngdoc service
 * @name  StoryProvider
 * @description Manages data for stories and makes sure local instance is in sync with backend
 */
angular.module('projiSeApp').factory('StoryProvider', ['$http', 'socket', 'Sprint', '$timeout', '$location', '$q', function($http, socket, Sprint, $timeout, $location, $q) {
    'use strict';

    var tries = 0,
        //Promise so we can make sure its loaded at statechange
        backlog = $http.get('/api/stories').success(function (stories) {
            StoryProvider.backlog.length = 0;
            angular.copy(stories, StoryProvider.backlog);
            socket.syncUpdates('story', StoryProvider.backlog);
        }),
        sprintBacklog = function () {
            var deferred = $q.defer();
            var sprints = Sprint.all();
            if (sprints && sprints.length > 0) {
                Sprint.setActiveSprint().then(function () {
                    var storiesInSprint = StoryProvider.backlog.filter(function (story) {
                        return story.sprintId == Sprint.activeSprintId;
                    });
                    angular.copy(storiesInSprint, StoryProvider.sprintBacklog);
                    socket.syncUpdates('story', StoryProvider.sprintBacklog, true);
                    deferred.resolve();
                }, function (err) {
                    $location.path('/project');
                    deferred.reject();
                });
            } else {
                if (tries >= 10) {
                    deferred.reject();
                } else {
                    tries++;
                    $timeout(function () {
                        sprintBacklog();
                    }, 50);
                }
            }
            return deferred.promise;
        },
        StoryProvider = {
            promiseBacklog: backlog,
            promiseSprintBacklog: sprintBacklog,
            backlog: [],
            sprintBacklog: [],
        };

    return StoryProvider;
}]);
