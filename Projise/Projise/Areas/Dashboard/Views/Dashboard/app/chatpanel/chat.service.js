/**
 * ngdoc service
 * @name Chat
 * @description Service for Chat, manages messages
 */
angular.module('projiSeApp').factory('Chat', ['$http', 'socket', function($http, socket) {
    'use strict';

    //Fetch messages on load
    $http.get('/api/messages').success(function(messages) {
        //Update messages
        Chat.messages = angular.copy(messages);
        //Setup sync for messages
        socket.syncUpdates('message', Chat.messages);
    });

    var Chat = {
        messages: [],
        sendMessage: function(message) {
            return $http.post('/api/messages', message);
        }
    };

    return Chat;
}]);
