/**
 * @ngdoc service
 * @name  StoryProvider
 * @description Manages data for stories and makes sure local instance is in sync with backend
 */
angular.module('projiSeApp').factory('StoryProvider', ['$http', 'socket', 'Sprint', '$timeout', function($http, socket, Sprint, $timeout) {
    'use strict';

    var tries = 0,
        //Promise so we can make sure its loaded at statechange
        backlog = $http.get('/api/stories').success(function (stories) {
            StoryProvider.backlog.length = 0;
            angular.copy(stories, StoryProvider.backlog);
            socket.syncUpdates('story', StoryProvider.backlog);
            //Sprintbacklog
            //var storiesInSprint = stories.filter(function (story) {
            //    return story.sprintId == StoryProvider.sprintId;
            //});
            //angular.copy(storiesInSprint, StoryProvider.sprintBacklog);
            //socket.syncUpdates('story', StoryProvider.sprintBacklog, true);
        }),
        sprintBacklog = function () {
            return StoryProvider.Sprint.sprint().succes(function () {
                var storiesInSprint = StoryProvider.backlog.filter(function (story) {
                    return story.sprintId == StoryProvider.sprintId;
                });
                angular.copy(storiesInSprint, StoryProvider.sprintBacklog);
                socket.syncUpdates('story', StoryProvider.sprintBacklog, true);
            })
        },

        //Promise so we can make sure its loaded at statechange also retries because sprintId might not be ready
        //Change this so we can work based on a promise instead
        //sprintBacklog = function() {
        //    return StoryProvider.backlog.filter(function (story) {
        //        console.log(story);
        //        return story.sprintId == StoryProvider.sprintId;
        //    })
        //},
        //sprintBacklog = function() {
        //    //If sprintId exists, we can make the request right away
        //    if (StoryProvider.sprintId) {
        //        return $http.get('/api/stories/' + StoryProvider.sprintId).success(function(stories) {
        //            StoryProvider.sprintBacklog.length = 0;
        //            angular.copy(stories, StoryProvider.sprintBacklog);
        //            socket.syncUpdates('story', StoryProvider.sprintBacklog, true);
        //        });
        //    } else {
        //        //If we've tried 10 times, stop trying
        //        if (tries >= 10) {
        //            return;
        //        }
        //        //Otherwise, try again in 50ms
        //        else {
        //            tries += 1;
        //            $timeout(function() {
        //                sprintBacklog();
        //            }, 50);
        //        }
        //    }
        //},
        StoryProvider = {
            promiseBacklog: backlog,
            promiseSprintBacklog: sprintBacklog,
            backlog: [],
            sprintBacklog: [],
            sprintId: Sprint.activeSprintId,
            sprint: Sprint.activeSprint()
        };

    //sprintBacklog();

    return StoryProvider;
}]);
