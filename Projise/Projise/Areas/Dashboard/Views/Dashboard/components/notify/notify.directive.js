/*
    Directive: notify
    Description: Logic for showing notifications
*/

angular.module('projiSeApp')

.directive('notify', function() {
    'use strict';

    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'Areas/Dashboard/Views/Dashboard/components/notify/notify.partial.html',
        replace: true,
        transclude: true,
        controller: ['$scope', '$timeout', '$rootScope', function($scope, $timeout, $rootScope) {
            //Add notification
            var addNotification = function(notification) {
                //ttl = time to live, sets the time the notification is shown based on length of message
                var ttl = 1000 + notification.text.length * 65;
                $scope.notifications.push(notification);
                $timeout(function() {
                    $scope.deleteNotification(notification);
                }, ttl);
            };

            $scope.notifications = [];

            //Delete notification
            $scope.deleteNotification = function(notification) {
                //Find index of notification
                var index = $scope.notifications.indexOf(notification);
                if (index > -1) {
                    //Delete notification
                    $scope.notifications.splice(index, 1);
                }
            };

            //Add Notification on NotificationMessage event
            $rootScope.$on('NotificationMessage', function(event, notification) {
                //Make sure we arent currently in a $digest cycle
                if (!$scope.$$phase) {
                    //Trigger $digest for addNotification
                    $scope.$apply(function() {
                        addNotification(notification);
                    });
                    //$digest is already running, add notification
                } else {
                    addNotification(notification);
                }
            });
        }],
    };
});