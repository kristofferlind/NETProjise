describe('Controller: ChatpanelController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var ChatpanelController, q,
        scope,
        Chat = {
            sendMessage: function () {
                var deferred = q.defer();
                deferred.resolve();
                return deferred.promise;
            }
        };

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, PanelSwitch, $timeout, $q) {
        scope = $rootScope.$new();
        q = $q;
        ChatpanelController = $controller('ChatpanelController', {
            $scope: scope,
            PanelSwitch: PanelSwitch, 
            $timeout: $timeout,
            Chat: Chat
        });
    }));

    it('should be defined', function() {
        expect(ChatpanelController).toBeDefined();
    });

    it('should send message on enter', function () {
        spyOn(Chat, 'sendMessage').and.callThrough();

        var sendEvent = {
            keyCode: 13,
            shiftKey: false,
            preventDefault: function() {}
        };

        scope.newMessage = {
            message: 'message'
        };

        scope.sendMessage(sendEvent);
        expect(Chat.sendMessage).toHaveBeenCalledWith(scope.newMessage);
    });

    it('should add newline on shift+enter', function() {
        spyOn(Chat, 'sendMessage').and.callThrough();

        var sendEvent = {
            keyCode: 13,
            shiftKey: true,
            preventDefault: function() {}
        };

        scope.newMessage = {
            message: 'message'
        };

        scope.sendMessage(sendEvent);
        expect(Chat.sendMessage).not.toHaveBeenCalled();
    });

    it('should not send message if its empty', function() {
        var sendEvent = {
            keyCode: 13,
            shiftKey: false,
            preventDefault: function() {}
        };

        spyOn(sendEvent, 'preventDefault').and.callThrough();
        spyOn(Chat, 'sendMessage').and.callThrough();

        scope.newMessage = {
            message: ''
        };

        scope.sendMessage(sendEvent);
        expect(sendEvent.preventDefault).toHaveBeenCalled();
        expect(Chat.sendMessage).not.toHaveBeenCalled();
    });
});

