describe('Service: Task', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var Task, $httpBackend,
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
        task = {
            _id: 'id',
            name: 'name',
            description: 'description',
            isDone: false,
            storyId: undefined
        },
        task2 = {
            _id: 'id2',
            name: 'name2',
            description: 'description2',
            isDone: false,
            storyId: undefined
        },
        tasks = [task, task2],
        story = {
            _id: 'id',
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Task_, _$httpBackend_, _$modal_) {
        Task = _Task_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        fakeModal = fakeModal;
    }));

    it('should be defined', function() {
        expect(Task).toBeDefined();
    });

    describe('Method: setAll and Property: all', function() {
        it('should return story tasks', function() {
            $httpBackend.expectGET('/api/tasks/id').respond(tasks);
            Task.setAll(story);
            $httpBackend.flush();
            expect(Task.all).toEqual(tasks);
        });
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            $httpBackend.expectPOST('/api/tasks', task).respond(201);
            Task.create(task);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should delete document on backend', function() {
            $httpBackend.expectDELETE('/api/tasks/id').respond(204);
            Task.delete(task);
            $httpBackend.flush();
        });
    });

    describe('Method: edit', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPUT('/api/tasks/id', task).respond(null);
            Task.edit();
            fakeModal.close(task);
            $httpBackend.flush();
        });
    });

    describe('Method: update', function() {
        it('should update document on backend', function () {
            $httpBackend.expectPUT('/api/tasks/id', task).respond(null);
            Task.update(task);
            $httpBackend.flush();
        });
    });
});
