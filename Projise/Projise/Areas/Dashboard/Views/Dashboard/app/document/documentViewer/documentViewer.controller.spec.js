describe('Controller: DocumentViewerController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var DocumentViewerController,
        scope;

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        DocumentViewerController = $controller('DocumentViewerController', {
            $scope: scope,
        });
    }));

    it('should be defined', function() {
        expect(DocumentViewerController).toBeDefined();
    });
});
