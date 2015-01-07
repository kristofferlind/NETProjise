describe('Service: DocumentManager', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));
    beforeEach(module('uiRouterMock'));

    // beforeEach(module(function($provide) {
    //     $provide.value('$modal', $modal);
    // }));

    var DocumentManager, $httpBackend,
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
        doc = 'document',
        docs = ['document1', 'document2'];

      // Initialize the controller and a mock scope

    beforeEach(inject(function (_DocumentManager_, _$httpBackend_, _$modal_) {
        DocumentManager = _DocumentManager_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        $httpBackend.expectGET('/api/documents').respond(docs);
        fakeModal = fakeModal;
    }));


    it('should be defined', function() {
        expect(DocumentManager).toBeDefined();
    });

    it('should fetch documents on load', function() {
        $httpBackend.flush();
        expect(DocumentManager.all).toEqual(docs);
    });

    describe('Method: create', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/documents', doc).respond(null);
            DocumentManager.create();
            fakeModal.close(doc);
            $httpBackend.flush();
        });
    });

    describe('Method: edit', function() {
        it('should show document and open editor');
    });

    describe('Method: show', function() {
        it('should fetch and show requested document');
    });

    describe('Method: update', function() {
        it('should request user input and save to backend', function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            $httpBackend.expectPOST('/api/documents', doc).respond(null);
            DocumentManager.create();
            fakeModal.close(doc);
            $httpBackend.flush();
        });
    });

    describe('Method: updateData', function() {
        it('should update data on backend', function() {
            var doc = {
                _id: 'id',
                data: 'data'
            };

            $httpBackend.expectPUT('/api/documents', doc).respond(201);
            DocumentManager.updateData(doc);
            $httpBackend.flush();
        });
    });

    describe('Method: delete', function() {
        it('should delete document on backend', function() {
            var doc = {
                _id: 'id',
                data: 'data'
            };

            $httpBackend.expectPUT('/api/documents', doc).respond(201);
            DocumentManager.updateData(doc);
            $httpBackend.flush();
        });
    });
});
