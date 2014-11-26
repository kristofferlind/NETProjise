describe('Controller: projectEditController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var project = {},
        projectEditController,
        scope,
        modalInstance = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        projectEditController = $controller('projectEditController', {
            $scope: scope,
            $modalInstance: modalInstance,
            project: project
        });
    }));

    it('should be defined', function() {
        expect(projectEditController).toBeDefined();
    });
});
