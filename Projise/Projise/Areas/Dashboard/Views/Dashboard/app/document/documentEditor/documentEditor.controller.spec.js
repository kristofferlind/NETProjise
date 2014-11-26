describe('Controller: DocumentEditorController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var DocumentEditorController,
        scope;

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        DocumentEditorController = $controller('DocumentEditorController', {
            $scope: scope,
        });
    }));

    it('should be defined', function() {
        expect(DocumentEditorController).toBeDefined();
    });
});
