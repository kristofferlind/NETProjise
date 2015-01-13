describe('Controller: sprintEditController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var sprintEditController,
        scope,
        modalInstance = {},
        sprint = {
            start: '',
            end: ''
        };

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        sprintEditController = $controller('sprintEditController', {
            $scope: scope,
            $modalInstance: modalInstance,
            sprint: sprint
        });
    }));

    it('should be defined', function() {
        expect(sprintEditController).toBeDefined();
    });
});
