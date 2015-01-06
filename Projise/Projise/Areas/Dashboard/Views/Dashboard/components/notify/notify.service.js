/*
    Service: Notify
    Description: Handles notifications, sends notifications as events that are then picked up by
    notifyDirective which shows them

    Example: Notify.success('notifying user was successful');
*/

angular.module('projiSeApp')

.factory('Notify', ['$rootScope', function($rootScope) {
    'use strict';
    //Sends notification message through event so that notifydirective can show it
    var notificationMessage = function(type, text) {
        var message = {
            type: type,
            text: text
        };

        //Send notification event
        $rootScope.$broadcast('NotificationMessage', message);
    },
        Notify = {
            //Send error notification
            error: function(text) {
                notificationMessage('error', text);
            },
            //Send info notification
            info: function(text) {
                notificationMessage('info', text);
            },
            //Send success notification
            success: function(text) {
                notificationMessage('success', text);
            },
            //Send warning notification
            warning: function(text) {
                notificationMessage('warning', text);
            },
        };

    return Notify;
}]);