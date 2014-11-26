describe('Controller: storyEditController', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var storyEditController,
        scope,
        modalInstance = {},
        story = {};

      // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        storyEditController = $controller('storyEditController', {
            $scope: scope,
            $modalInstance: modalInstance,
            story: story
        });
    }));

    it('should be defined', function() {
        expect(storyEditController).toBeDefined();
    });
});
