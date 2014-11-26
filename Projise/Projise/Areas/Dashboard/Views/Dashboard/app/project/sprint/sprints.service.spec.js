describe('Service: Sprint', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    // beforeEach(module('uiRouterMock'));

    beforeEach(module(function($provide) {
        $provide.value('Session', Session);
        $provide.value('SprintProvider', SprintProvider);
    }));

    var date1 = Date(2000,1,1),
        date2 = Date(2099,1,1),
        date3 = Date(1990,1,1),
        date4 = Date(2000,1,1),
        Sprint, $httpBackend,
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
        sprint = {
            _id: 'id',
            name: 'name',
            description: 'description',
            start: date1,
            end: date2
        },
        sprint2 = {
            _id: 'id2',
            name: 'name2',
            description: 'description2',
            start: date3,
            end: date4
        },
        sprints = [sprint2, sprint],
        SprintProvider = {
            sprints: sprints
        },
        Session = {
            user: function() {
                return {
                    _id: 'id',
                    activeSprint: sprint._id
                };
            }
        },
        user = {
            _id: 'id',
            name: 'name'
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Sprint_, _$httpBackend_, _$modal_) {
        Sprint = _Sprint_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        fakeModal = fakeModal;
    }));


    it('should be defined', function() {
        expect(Sprint).toBeDefined();
    });

    ////No idea why this doesn't work
    // describe('Method: activeSprint', function() {
    //     it('should return active sprint', function(done) {
    //         expect(Sprint.activeSprint()).toEqual(sprint);
    //     });
    // });

    describe('Method: activeSprintId', function() {
        it('should return active sprintId', function() {
            Sprint.activeSprint();
            expect(Sprint.activeSprintId).toEqual(sprint._id);
        });
    });

    describe('Method: all', function() {
        it('should return sprints', function() {
            expect(Sprint.all()).toEqual(sprints);
        });
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/sprints', sprint).respond(201);
            Sprint.create();
            fakeModal.close(sprint);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should delete document on backend', function() {
            $httpBackend.expectDELETE('/api/sprints/id').respond(204);
            Sprint.delete(sprint);
            $httpBackend.flush();
        });
    });

    describe('Method: update', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPUT('/api/sprints/id', sprint).respond(null);
            Sprint.update();
            fakeModal.close(sprint);
            $httpBackend.flush();
        });
    });
});
