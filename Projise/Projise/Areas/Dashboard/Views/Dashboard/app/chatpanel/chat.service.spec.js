describe('Service: Chat', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var Chat, $httpBackend,
        message = 'message',
        messages = ['message1', 'message2'];

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_Chat_, _$httpBackend_) {
        Chat = _Chat_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/messages').respond(messages);
    }));

    it('should be defined', function() {
        expect(Chat).toBeDefined();
    });

    it('should fetch posts on load', function() {
        $httpBackend.flush();
        expect(Chat.messages).toEqual(messages);
    });

    it('should make a post request on sendMessage', function() {
        $httpBackend.expectPOST('/api/messages', message).respond(201, '');
        Chat.sendMessage(message);
        $httpBackend.flush();
    });
});
