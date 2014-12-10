/**
 * @ngdoc service
 * @name TeamProvider
 * @description Provides teamdata for Teamservice and manages sync with backend
 */
angular.module('projiSeApp').factory('TeamProvider', function($http, socket) {
    'use strict';

    var promise = $http.get('/api/Team').success(function(teams) {
            TeamProvider.teams.length = 0;
            angular.copy(teams, TeamProvider.teams);
            socket.syncUpdates('team', TeamProvider.teams);
        }),
        TeamProvider = {
            promise: promise,
            teams: []
        };

    return TeamProvider;
});
