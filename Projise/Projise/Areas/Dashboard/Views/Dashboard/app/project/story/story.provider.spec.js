describe('Service: StoryProvider', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    beforeEach(module(function($provide) {
        $provide.value('Sprint', mockSprint);
    }));

    var StoryProvider, $httpBackend,
        story = { id: 'id'},
        stories = [story, story],
        mockSprint = {
            activeSprintId: 'id',
            activeSprint: function() {
                return {id:'id'};
            }
        }

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_StoryProvider_, _$httpBackend_) {
        StoryProvider = _StoryProvider_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/api/stories').respond(stories);
        $httpBackend.whenGET('/api/stories/id').respond(story);
    }));

    it('should be defined', function() {
        expect(StoryProvider).toBeDefined();
    });

    it('should populate backlog', function(done) {
        StoryProvider.promiseBacklog.then(function() {
            expect(StoryProvider.backlog).toEqual(stories);
            done();
        });
        $httpBackend.flush();
    });
});
