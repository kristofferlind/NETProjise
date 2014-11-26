describe('Controller: teamCreateController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var teamCreateController,
        scope,
        modalInstance = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        teamCreateController = $controller('teamCreateController', {
            $scope: scope,
            $modalInstance: modalInstance
        });
    }));

    it('should be defined', function() {
        expect(teamCreateController).toBeDefined();
    });
});
