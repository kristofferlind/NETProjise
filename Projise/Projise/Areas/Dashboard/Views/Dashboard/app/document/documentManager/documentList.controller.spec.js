describe('Controller: DocumentListController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var DocumentListController,
        scope;

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        DocumentListController = $controller('DocumentListController', {
            $scope: scope,
        });
    }));

    it('should be defined', function() {
        expect(DocumentListController).toBeDefined();
    });
});
