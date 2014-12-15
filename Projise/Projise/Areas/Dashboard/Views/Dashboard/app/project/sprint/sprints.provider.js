/**
 * @ngdoc service
 * @name  SprintProvider
 * @description Manages data for sprints, to make sure its loaded when needed and syncing with backend
 */
angular.module('projiSeApp').factory('SprintProvider', function($http, socket) {
    'use strict';

    //Promise so we can make sure its done during statechange
    var promise = $http.get('/api/sprints').success(function(sprints) {
            SprintProvider.sprints.length = 0;
            angular.copy(sprints, SprintProvider.sprints);
            socket.syncUpdates('sprint', SprintProvider.sprints);
        }),
        SprintProvider = {
            promise: promise,
            sprints: []
        };

    return SprintProvider;
});
