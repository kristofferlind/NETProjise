/**
 * @ngdoc object
 * @name  socketMock
 * @description This is a mock to make testing components using sockets easier.
 */
angular.module('socketMock', [])
.factory('socket', function() {
    'use strict';

    return {
        socket: {
            connect: function() {},
            on: function() {},
            emit: function() {},
            receive: function() {}
        },
        syncUpdates: function() {},
        unsyncUpdates: function() {}
    };
});
