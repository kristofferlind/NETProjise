/**
 * @ngdoc service
 * @name  SprintProvider
 * @description Manages data for sprints, to make sure its loaded when needed and syncing with backend
 */
angular.module('projiSeApp').factory('SprintProvider', ['$http', 'socket', '$rootScope', function($http, socket, $rootScope) {
    'use strict';

    //Promise so we can make sure its done during statechange
    var promise = $http.get('/api/sprints').success(function (sprints) {
        SprintProvider.sprints.length = 0;
        angular.copy(sprints, SprintProvider.sprints);
        socket.syncUpdates('sprint', SprintProvider.sprints, false, updated);
    }),
    updated = function (event, item, array) {
        $rootScope.$broadcast('sprints:updated');
    },

    SprintProvider = {
        promise: promise,
        sprints: []
    };

    return SprintProvider;
}]);
