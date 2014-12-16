describe('Controller: documentEditController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var documentMeta = {},
        documentEditController,
        scope,
        modalInstance = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        documentEditController = $controller('documentEditController', {
            $scope: scope,
            $modalInstance: modalInstance,
            documentMeta: documentMeta
        });
    }));

    it('should be defined', function() {
        expect(documentEditController).toBeDefined();
    });
});
