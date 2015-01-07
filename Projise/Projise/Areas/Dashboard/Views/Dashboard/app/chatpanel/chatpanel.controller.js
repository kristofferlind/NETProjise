//chatpanel.controller.js
/**
 * @ngdoc object
 * @name ChatPanelController
 * @todo move most of sendMessage logic to a directive (on-enter, shift-key:true default:false..)
 * @todo panelstate should be moved to directive
 * @description Viewlogic for Chatpanel, manages panelstate and sending messages
 */
angular.module('projiSeApp').controller('ChatpanelController', ['$scope', 'PanelSwitch', '$timeout', 'Chat', function($scope, PanelSwitch, $timeout, Chat) {
    'use strict';

    //Make Chat service available in view
    $scope.Chat = Chat;

    $scope.newMessage = {
        message: ''
    };

    $scope.chatpanelActive = PanelSwitch.chatpanel.get();

    $scope.$on('chatpanel:switched', function() {
        $scope.chatpanelActive = PanelSwitch.chatpanel.get();

        if ($scope.chatpanelActive !== PanelSwitch.chatpanel.get()) {
            $timeout(function() {
                $scope.chatpanelActive = PanelSwitch.chatpanel.get();
            });
        }
    });

    $scope.sendMessage = function($event) {
        // if enter & shift
        if ($event.keyCode === 13 && $event.shiftKey) {
            return false;
        } else {
            //if enter & not shift
            if ($event.keyCode === 13 && !$event.shiftKey) {
                //empty messages are kind of useless
                if ($scope.newMessage.message === '') {
                    $event.preventDefault(); //we dont want a newline in this case
                    return false;
                }
                $event.preventDefault(); //no newline
                //add message to firebase
                Chat.sendMessage($scope.newMessage).then(function () {
                    //clear input field
                    $scope.newMessage.message = '';
                });
            }
        }
    };
}]);
