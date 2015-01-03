/**
 * @ngdoc service
 * @name  Session
 * @description Handles session data
 */
angular.module('projiSeApp').factory('Session', ['$http', '$rootScope', 'socket', function($http, $rootScope, socket) {
    'use strict';

    var promise = $http.get('/api/users/me').success(function (user) {
            $rootScope.user = {};
            angular.copy(user, _user);
            socket.syncUpdates('user', _user);
            angular.copy(user, $rootScope.user);
            socket.syncUpdates('user', $rootScope.user);
        }),
        _user = {},
        Session = {
            promise: promise,
            user: function() {
                return _user;
            },
        };

    return Session;
}]);
