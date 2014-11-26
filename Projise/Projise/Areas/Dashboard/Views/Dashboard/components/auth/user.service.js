/**
 * @ngdoc service
 * @name  User
 * @description Manages userdata
 */
angular.module('projiSeApp')
    .factory('User', function($http, socket, $resource) {
    'use strict';

    return $resource('/api/users/:id/:controller', {
        id: '@_id'
    }, {
        changePassword: {
            method: 'PUT',
            params: {
                controller: 'password'
            }
        },
        get: {
            method: 'GET',
            params: {
                id: 'me'
            }
        }
    });
});
