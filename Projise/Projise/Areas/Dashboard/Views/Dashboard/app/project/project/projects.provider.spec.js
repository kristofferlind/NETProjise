describe('Service: ProjectProvider', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('projiSeApp'));
    beforeEach(module('socketMock'));

    var ProjectProvider, $httpBackend,
        projects = ['project1', 'project2'];

      // Initialize the controller and a mock scope
    beforeEach(inject(function (_ProjectProvider_, _$httpBackend_) {
        ProjectProvider = _ProjectProvider_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/api/projects').respond(projects);
    }));

    it('should be defined', function() {
        expect(ProjectProvider).toBeDefined();
    });

    it('should populate projects', function() {
        ProjectProvider.promise.then(function() {
            expect(ProjectProvider.projects).toEqual(projects);
        });
        $httpBackend.flush();
    });
});
