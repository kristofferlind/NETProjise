describe('Controller: teamEditController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var team = {},
        teamEditController,
        scope,
        modalInstance = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        teamEditController = $controller('teamEditController', {
            $scope: scope,
            $modalInstance: modalInstance,
            team: team
        });
    }));

    it('should be defined', function() {
        expect(teamEditController).toBeDefined();
    });
});
