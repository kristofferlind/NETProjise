describe('Service: Story', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    // beforeEach(module('uiRouterMock'));

    beforeEach(module(function($provide) {
        $provide.value('Session', Session);
        $provide.value('StoryProvider', StoryProvider);
        $provide.value('Sprint', Sprint);
        $provide.value('Task', Task);
    }));

    var Story, $httpBackend,
        $modal = {
            open: function() {}
        },
        fakeModal = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( item ) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack( item );
            },
            dismiss: function( type ) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback( type );
            }
        },
        story = {
            _id: 'id',
            name: 'name',
            description: 'description',
            userId: 'id'
        },
        story2 = {
            _id: 'id',
            name: 'name',
            description: 'description'
        },
        stories = [story, story2],
        StoryProvider = {
            backlog: stories,
            sprintBacklog: stories
        },
        Sprint = {
            activeSprintId: 'id'
        },
        Task = {
            all: [],
            setAll: function() {}
        },
        Session = {
            user: function() {
                return {
                    _id: 'id',
                    activeStory: story._id
                };
            }
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Story_, _$httpBackend_, _$modal_) {
        Story = _Story_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        fakeModal = fakeModal;
    }));


    it('should be defined', function() {
        expect(Story).toBeDefined();
    });

    describe('Method: backlog', function() {
        it('should return backlog stories', function() {
            expect(Story.backlog()).toEqual(stories);
        });
    });

    describe('Method: sprintBacklog', function() {
        it('should return stories in sprint backlog', function() {
            expect(Story.sprintBacklog()).toEqual(stories);
        });
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/stories', story).respond(201);
            Story.create();
            fakeModal.close(story);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should delete document on backend', function() {
            $httpBackend.expectDELETE('/api/stories/id').respond(204);
            Story.delete(story);
            $httpBackend.flush();
        });
    });

    describe('Method: edit', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPUT('/api/stories/id', story).respond(null);
            Story.edit();
            fakeModal.close(story);
            $httpBackend.flush();
        });
    });

    describe('Method: update', function() {
        it('should delete document on backend', function() {
            $httpBackend.expectPUT('/api/stories/id', story).respond(null);
            Story.update(story);
            $httpBackend.flush();
        });
    });

    describe('SprintBacklog: ', function() {
        var editedStory = story;
        editedStory.sprintId = 'id';

        describe('Method: add', function() {

            it('should add story to sprint backlog (add sprintId to story)', function() {
                $httpBackend.expectPUT('/api/stories/id', editedStory).respond(null);
                Story.SprintBacklog.add(story);
                $httpBackend.flush();
            });
        });

        describe('Method: remove', function() {
            it('should remove story from sprint backlog (remove sprintId from story', function() {
                $httpBackend.expectPUT('/api/stories/id', story).respond(null);
                Story.SprintBacklog.remove(editedStory);
                $httpBackend.flush();
            });
        });
    });

    describe('User: ', function() {
        describe('Method: setStory and property story', function() {
            it('should set user story', function() {
                Story.User.setStory();
                expect(Story.User.story).toEqual(story);
            });
        });

        //Need to change the injected list of stories for backlog to make this test work
        // describe('Method: start', function() {
        //     it('should set status to in progress and append userId', function() {
        //         var editedStory = {
        //             _id: 'id',
        //             name: 'name',
        //             description: 'description',
        //             status: 'in progress',
        //             userId: 'id'
        //         };

        //         $httpBackend.expectPUT('/api/stories/id', editedStory).respond(null);
        //         Story.User.start(story2);
        //         $httpBackend.flush();
        //     });
        // });

        describe('Method: stop', function() {
            it('should set status to not started and remove userId', function() {
                var editedStory = {
                    _id: 'id',
                    name: 'name',
                    description: 'description',
                    status: 'not started'
                };

                $httpBackend.expectPUT('/api/stories/id', editedStory).respond(201);
                Story.User.stop(story2);
                $httpBackend.flush();
            });
        });

        describe('Method: finish', function() {
            it('should set status to completed and remove userId', function() {
                var editedStory = {
                    _id: 'id',
                    name: 'name',
                    description: 'description',
                    status: 'completed'
                };

                $httpBackend.expectPUT('/api/stories/id', editedStory).respond(null);
                Story.User.finish(story2);
                $httpBackend.flush();
            });
        });
    });
});
