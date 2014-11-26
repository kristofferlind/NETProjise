describe('Controller: documentCreateController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var documentCreateController,
        scope,
        modalInstance = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        documentCreateController = $controller('documentCreateController', {
            $scope: scope,
            $modalInstance: modalInstance
        });
    }));

    it('should be defined', function() {
        expect(documentCreateController).toBeDefined();
    });
});
