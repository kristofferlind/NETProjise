describe('Controller: ProjectsController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var ProjectsController,
        scope,
        modalInstance = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ProjectsController = $controller('ProjectsController', {
            $scope: scope,
            $modalInstance: modalInstance
        });
    }));

    it('should be defined', function() {
        expect(ProjectsController).toBeDefined();
    });
});
