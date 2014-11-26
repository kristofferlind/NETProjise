describe('Service: Idea', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    // beforeEach(module('uiRouterMock'));

    // beforeEach(module(function($provide) {
    //     $provide.value('$modal', $modal);
    // }));

    var Idea, $httpBackend,
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
        idea = {
            _id: '1'
        },
        idea2 = {
            _id: '2'
        },
        ideas = [idea, idea2];

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Idea_, _$httpBackend_, _$modal_) {
        Idea = _Idea_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        $httpBackend.expectGET('/api/ideas').respond(ideas);
        fakeModal = fakeModal;
    }));


    it('should be defined', function() {
        expect(Idea).toBeDefined();
    });

    it('should fetch ideauments on load', function() {
        $httpBackend.flush();
        expect(Idea.all).toEqual(ideas);
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/ideas', idea).respond(null);
            Idea.create();
            fakeModal.close(idea);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should request delete on backend', function() {
            $httpBackend.expectDELETE('/api/ideas/1').respond(204);
            Idea.delete(idea);
            $httpBackend.flush();
        });
    });

    describe('Method: voteUp', function() {
        it('should post a positive vote', function() {
            $httpBackend.expectPUT('/api/ideas/1/up').respond(201);
            Idea.voteUp(idea);
            $httpBackend.flush();
        });
    });

    describe('Method: voteDown', function() {
        it('should post a negative vote', function() {
            $httpBackend.expectPUT('/api/ideas/1/down').respond(201);
            Idea.voteDown(idea);
            $httpBackend.flush();
        });
    });
});
